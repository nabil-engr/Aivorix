# Validation report

## Update: 2026-09-07 — source-backed ranking views

- Default homepage: 5 task-fit categories, each scoring all 28 catalog entries with an explicit weighted feature-coverage rubric. Scores are editorial calculations, not third-party ratings or measured accuracy.
- Evidence: ranking-evidence.data.ts stores reviewed primary URLs, short feature summaries, credited capability keys and product/plan scope. task-fit.data.ts computes points and competition ranks; ties share rank.
- Separate published-benchmark mode: AA Intelligence Index v4.1.1, BrowseComp, OSWorld 2.0 and DeepSWE v1.1 from OpenAI's Astra evaluation tables. Only reported models are displayed; no feature scores are mixed into those results. Astra values: 61.2, 91.5%, 72.6%, 74.1% respectively.
- Methodology page explains G2 vs evaluation-based ranking, exact weights, missing-evidence handling and limitations. Every chart row has expandable score/source details.
- Content checks validate all-tool coverage, weight totals, score sums, evidence for awarded points, rank ties, ordering and published Astra values. Prerender checks validate controls, source details and removal of Not ranked from the default HTML.
- Angular production build passed (68 prerendered routes, about 540 kB initial bundle). No backend logic changed. Interactive browser verification remains unavailable; build/data/prerender checks were used.

## Update: 2026-09-07 — Astra and complete benchmark coverage

- Angular production build: passed; 68 routes prerendered, 512 kB initial bundle.
- ASP.NET Core Release build (`--no-restore`): passed, zero warnings/errors.
- `node scripts/check-content.mjs --prerender`: checks unique slugs, comparison references, all-tool coverage in every benchmark tab, missing-score semantics, product signals, Astra dossier/news/comparison presence, backend catalog synchronization and prerendered pages.
- Current content: 16 news articles, 11 comparisons, 28 catalog entries, 5 benchmark views. Astra and GPT-5.6 Sol have separate model entries; compare builder defaults to that pair.
- Missing benchmark results remain null/N/A and unranked. Earlier model scores are preserved under their original model labels. Recorded scores were not re-verified in this change.
- Astra facts sourced from OpenAI model specification, model guidance and model comparison documentation, checked September 7. Article date is an editorial briefing date, not an asserted launch date.
- Backend catalog regenerated with `node scripts/check-content.mjs --sync-catalog`.
- Browser visual/interaction verification unavailable in this session. No live deployment or form submissions performed.

The report below is retained as historical evidence; it does not describe the current Netlify deployment.

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
