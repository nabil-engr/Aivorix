# Validation report

Generated: 2026-08-24

## Content integrity

- News articles: 10
- Comparisons: 10
- Tool profiles: 8
- Homepage benchmark views: 4
- Homepage product benchmark signals: 8/8 tools
- Unique news slugs: 10/10
- Unique comparison slugs: 10/10
- All comparison tool references valid: True
- Every article has a source URL: True
- Every tool has an official/source URL: True

## Build and dependency checks

- npm dependencies installed: 421 packages audited
- npm vulnerabilities: 0
- Angular 21 production SSR build: Passed
- Static routes prerendered: 41
- NuGet vulnerable packages: 0
- ASP.NET Core Release build: Passed with 0 warnings and 0 errors
- Full Windows `build.ps1`: Passed
- Windows build script now stops immediately when any npm, Angular, copy, restore, or .NET build step fails

## Runtime smoke checks

- Sitemap routes: 41/41 returned HTTP 200 with route-specific prerendered HTML
- Homepage benchmark hero: Rendered first with 4 chart tabs and 8 product signal cards
- Browser JS/CSS entry assets: Passed
- Health, sitemap, news sitemap, RSS, and robots endpoints: Passed
- Sitemap/news sitemap/RSS XML parsing: Passed
- Newsletter and lead validation/persistence: Passed
- Contact form rendering and API wiring: Passed
- Honeypot behavior: Passed without persistence
- Concurrent submission persistence: 8/8 requests passed; no partial/temp files remained
- Mobile navigation and duplicate-tool comparison guards: Present in prerendered output
- Angular Node SSR: Full server-rendered HTML for known and unknown routes
- Angular Node SSR invalid routes: HTTP 404, `noindex`, no stale canonical or JSON-LD
- Unknown routes and invalid content slugs: HTTP 404
- Security headers: Present

## Visual-system regression

- Theme: Warm neutral editorial palette with one deep-teal accent
- Legacy purple/cyan gradients and dark-glass tokens remaining: 0
- Responsive navigation, cards, forms, comparison tables, and footer: Updated to the shared design system
- Favicon and 1200×630 social preview: Updated
- Compiled CSS, favicon, and social-preview assets: HTTP 200
