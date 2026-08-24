using System.Globalization;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using Aivorix.Api.Data;
using Aivorix.Api.Models;
using Aivorix.Api.Services;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Services.AddSingleton<SubmissionStore>();
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("forms", limiter =>
    {
        limiter.PermitLimit = 8;
        limiter.Window = TimeSpan.FromMinutes(1);
        limiter.QueueLimit = 0;
    });
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
    context.Response.Headers["X-Frame-Options"] = "SAMEORIGIN";
    context.Response.Headers["Content-Security-Policy"] =
        "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; " +
        "script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self'; " +
        "base-uri 'self'; form-action 'self'";
    await next();
});

app.UseRateLimiter();
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = context =>
    {
        if (Regex.IsMatch(context.File.Name, @"\.[A-Fa-f0-9]{8,}\."))
        {
            context.Context.Response.Headers.CacheControl = "public,max-age=31536000,immutable";
        }
    }
});

static bool IsValidEmail(string? email) =>
    !string.IsNullOrWhiteSpace(email) &&
    email.Length <= 254 &&
    Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$");

app.MapPost("/api/newsletter", async (
    NewsletterRequest request,
    SubmissionStore store,
    CancellationToken cancellationToken) =>
{
    if (!string.IsNullOrWhiteSpace(request.Website))
    {
        return Results.Ok();
    }

    if (!IsValidEmail(request.Email))
    {
        return Results.BadRequest(new { error = "Valid email required" });
    }

    await store.SaveAsync("newsletter.json", new
    {
        email = request.Email.Trim().ToLowerInvariant(),
        createdUtc = DateTimeOffset.UtcNow
    }, cancellationToken);
    return Results.Ok(new { ok = true });
}).RequireRateLimiting("forms");

app.MapPost("/api/leads", async (
    LeadRequest request,
    SubmissionStore store,
    CancellationToken cancellationToken) =>
{
    if (!string.IsNullOrWhiteSpace(request.Website))
    {
        return Results.Ok();
    }

    if (string.IsNullOrWhiteSpace(request.Name) ||
        request.Name.Length > 200 ||
        !IsValidEmail(request.Email) ||
        string.IsNullOrWhiteSpace(request.Message) ||
        request.Message.Length > 4000 ||
        request.Company?.Length > 200)
    {
        return Results.BadRequest(new { error = "Invalid submission" });
    }

    await store.SaveAsync("leads.json", new
    {
        name = request.Name.Trim(),
        email = request.Email.Trim().ToLowerInvariant(),
        company = request.Company?.Trim(),
        message = request.Message.Trim(),
        createdUtc = DateTimeOffset.UtcNow
    }, cancellationToken);
    return Results.Ok(new { ok = true });
}).RequireRateLimiting("forms");

string BaseUrl() => builder.Configuration["Site:BaseUrl"]?.TrimEnd('/') ?? "https://aivorix.com";

app.MapGet("/sitemap.xml", () =>
{
    var baseUrl = BaseUrl();
    var xml = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
    foreach (var path in SiteCatalog.Paths)
    {
        xml.Append($"<url><loc>{WebUtility.HtmlEncode(baseUrl + path)}</loc></url>");
    }

    xml.Append("</urlset>");
    return Results.Text(xml.ToString(), "application/xml", Encoding.UTF8);
});

app.MapGet("/news-sitemap.xml", () =>
{
    var baseUrl = BaseUrl();
    var cutoff = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-2));
    var xml = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">");

    foreach (var news in SiteCatalog.News)
    {
        if (!DateOnly.TryParse(news.Date, CultureInfo.InvariantCulture, DateTimeStyles.None, out var date) || date < cutoff)
        {
            continue;
        }

        xml.Append($"<url><loc>{WebUtility.HtmlEncode(baseUrl + "/news/" + news.Slug)}</loc>");
        xml.Append("<news:news><news:publication><news:name>Aivorix</news:name><news:language>en</news:language></news:publication>");
        xml.Append($"<news:publication_date>{news.Date}</news:publication_date><news:title>{WebUtility.HtmlEncode(news.Title)}</news:title></news:news></url>");
    }

    xml.Append("</urlset>");
    return Results.Text(xml.ToString(), "application/xml", Encoding.UTF8);
});

app.MapGet("/robots.txt", () => Results.Text(
    $"User-agent: *\nAllow: /\n\nSitemap: {BaseUrl()}/sitemap.xml\nSitemap: {BaseUrl()}/news-sitemap.xml\n",
    "text/plain"));

app.MapGet("/feed.xml", () =>
{
    var baseUrl = BaseUrl();
    var encodedBaseUrl = WebUtility.HtmlEncode(baseUrl);
    var xml = new StringBuilder($"<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\"><channel><title>Aivorix AI News</title><link>{encodedBaseUrl}</link><description>Source-backed AI news</description>");

    foreach (var news in SiteCatalog.News.Take(20))
    {
        if (!DateTimeOffset.TryParse(news.Date, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out var publishedAt))
        {
            continue;
        }

        var articleUrl = WebUtility.HtmlEncode($"{baseUrl}/news/{news.Slug}");
        xml.Append($"<item><title>{WebUtility.HtmlEncode(news.Title)}</title><link>{articleUrl}</link><guid>{articleUrl}</guid><pubDate>{publishedAt:R}</pubDate></item>");
    }

    xml.Append("</channel></rss>");
    return Results.Text(xml.ToString(), "application/rss+xml", Encoding.UTF8);
});

foreach (var routePath in SiteCatalog.Paths)
{
    var relativePath = routePath.Trim('/');
    var prerenderedFile = relativePath.Length == 0
        ? Path.Combine(app.Environment.WebRootPath, "index.html")
        : Path.Combine(
            app.Environment.WebRootPath,
            relativePath.Replace('/', Path.DirectorySeparatorChar),
            "index.html");

    app.MapGet(routePath, () => Results.File(prerenderedFile, "text/html; charset=utf-8"));
}

app.MapGet("/health", () => Results.Ok(new { status = "ok", utc = DateTimeOffset.UtcNow }));
app.MapFallback(async context =>
{
    context.Response.StatusCode = StatusCodes.Status404NotFound;
    context.Response.ContentType = "text/html; charset=utf-8";
    await context.Response.SendFileAsync(Path.Combine(app.Environment.WebRootPath, "index.html"));
});

app.Run();
