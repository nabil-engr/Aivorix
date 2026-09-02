<h1><a href="https://nabil-engr.github.io/Aivorix/">Live site</a></h1>

# Aivorix — AI News & Comparison Website

Production-oriented starter built with **ASP.NET Core 8 + Angular 21 SSR/prerender**.

## Brand

The exact-name web search for **Aivorix** and `aivorix.com` returned no indexed results on 2026-08-24. This is not a registrar or trademark guarantee. Check domain and trademark availability before launch.

## Included

- Professional responsive UI
- Angular SSR/prerender-ready routing
- 10 source-backed AI news articles
- 10 detailed comparison pages
- Interactive compare builder
- AI tools directory
- Verification dates and official sources
- Dynamic standard sitemap + Google News sitemap
- RSS feed
- robots.txt
- Canonical URLs
- Open Graph / Twitter metadata
- NewsArticle, Article, WebSite, SoftwareApplication JSON-LD
- Editorial policy, methodology, affiliate disclosure, privacy, terms
- Newsletter and lead endpoints with rate limiting + honeypot support
- Security headers (CSP, Referrer-Policy, X-Content-Type-Options, Permissions-Policy)

## Local requirements

- .NET 8 SDK
- Node.js 20+ (Node 22 recommended)
- npm

## Build

```bash
./build.sh
```

or on Windows PowerShell:

```powershell
./build.ps1
```

If your local PowerShell policy blocks unsigned workspace scripts, use a process-scoped bypass:

```powershell
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\build.ps1
```

## Development

Frontend:

```bash
cd client/aivorix-web
npm install
npm start
```

Backend:

```bash
dotnet run --project server/Aivorix.Api
```

## Before launch

1. Buy/confirm your real domain.
2. Replace `https://aivorix.com` in `SeoService`, `appsettings.json`, robots and canonical config if your domain differs.
3. Replace `hello@aivorix.com`.
4. Add your real analytics/ad scripts and update Privacy accordingly.
5. Add affiliate links only after approval and label them clearly.
6. Connect newsletter/lead storage to your production email/CRM. JSON file storage is intentionally dependency-free for the starter.
7. Re-verify comparison facts immediately before launch. AI plan pricing and limits change frequently.

## Important content policy

The included articles are original summaries based on linked primary/reputable sources. Do not auto-copy publisher articles. If you later automate news ingestion, store source metadata and write original summaries with human review.
