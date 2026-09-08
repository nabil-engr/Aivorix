# Aivorix project memory

## Complete comparison matrix: 2026-09-08

The comparison system now has 35 selectable profiles: all 28 tool catalog entries plus GPT-5.6 Terra, GPT-5.6 Luna, GPT-5.5, Claude Fable 5.1, Claude Opus 5, Claude Sonnet 5 and Claude Haiku 4.5. Astra and Sol reuse their existing catalog identities. Programmatic canonical pairing covers every unique profile pair while retaining hand-written editorial overrides, producing 596 comparison pages and 653 total prerendered routes.

The /compare builder compares three choices in aligned cards/rows for capability, token pricing where applicable, context and access. Comparison details resolve model and product profiles from comparison-profiles.data.ts, show consistent side-by-side fields, FAQs, official sources, and Article/BreadcrumbList/FAQPage schema. /comparisons is searchable and exposes CollectionPage/ItemList metadata. `scripts/check-content.mjs` verifies profile uniqueness, requested models, official HTTPS sources, useful rows and complete nC2 pair coverage. `SiteCatalog.cs` was regenerated. Production build and prerender checks passed; direct browser interaction remained unavailable. Published to Netlify production in deploy `6a9f8f3115d51b329933a749`; live HTTP checks confirmed the new bundle, three selectors, 596 count and a representative Terra-vs-Fable page.

## Latest ranking change: 2026-09-07

Published to production in Netlify deploy 6a9ea3ff1b5e06135a5d394b (https://aivorix.netlify.app). Final Angular entry bundle: main-2B3K3KJO.js.

User asked to replace missing ranks using other websites' data. Researched G2 satisfaction/market-presence scoring and Artificial Analysis weighted evaluations. Default homepage now uses TASK_FIT_VIEWS from task-fit.data.ts: all 28 tools scored across five categories by a disclosed weighted, binary documented-feature rubric. These are Aivorix feature-coverage scores, not third-party review ratings or performance tests. Zero means no recorded criterion evidence, not inability; ties share competition rank.

ranking-evidence.data.ts stores per-tool primary sources, capability keys, summaries and plan/product scope. Published benchmark mode uses published-benchmarks.data.ts: current OpenAI Astra table values, named tested models and evaluation versions. Astra scores: AA v4.1.1 61.2, BrowseComp 91.5%, OSWorld 72.6%, DeepSWE 74.1%. Only reported models appear in this mode. Old HOME_BENCHMARKS remains historical data, no longer the homepage's displayed ranking. Methodology and per-row expandable sources explain both views. Astra dossier and signal now include its published coding result. Content checks cover points, sources, sorting, ties and all catalog entries; Angular build passed with 68 routes.

## Live deployment: 2026-09-07

Published Astra/benchmark changes to https://aivorix.netlify.app using Netlify CLI production deploy 6a9ea03d5356e805e6ade890. Correct site ID is e660d5f4-7c8e-4e4a-ac16-8ce8a0e5f178; local .netlify/state.json was corrected from a stale ID. Verified live HTTP 200 and Astra content on homepage, Astra dossier, Astra news, Astra-vs-Sol comparison and /compare; homepage includes the updated catalog-count label. Earlier notes saying no deployment are superseded by this entry.

## Latest change: 2026-09-07 — GPT-6 Astra

User requested all tools in every benchmark category and Astra coverage across news, comparisons, dossiers and compare builder. Implemented 28 catalog entries (added Astra and GPT-5.6 Sol), 16 news, 11 comparisons and 68 prerendered routes. Builder defaults to Astra vs Sol. Full Astra dossier and documentation briefing use official developers.openai.com sources verified September 7; do not treat briefing date as launch date.

HOME_BENCHMARKS now expands recorded snapshots with every catalog tool. Missing scores are null, displayed as N/A / Not ranked after scored rows, without fake bars/ranks or transferring scores to newer models. Each tab reports catalog count and scored count. All-tools editorial ratings for new models are pending. Product signals cover all 28 entries. Historical numerical results remain historical.

scripts/check-content.mjs validates content, benchmark coverage and catalog synchronization; --sync-catalog regenerates SiteCatalog.cs; --prerender checks built pages. Angular production build and .NET Release build passed. See the current section of VALIDATION.md. Changes are local; no deployment performed. The older onboarding snapshot below is historical.

Reviewed 2026-09-07 at commit ee524a2. User asked to understand the repository, README, validation report and live site, then preserve that understanding. User communicates in Bangla/Banglish. This is repository-backed memory, not a guarantee of account-wide conversational recall.

## Product and design

Aivorix is an English-language independent AI news, product comparison and tools publication. Live URL supplied by the user: https://aivorix.netlify.app/. Positioning: source-backed information, practical workflow fit, transparent editorial judgments. Homepage headline: “There is no single ‘best AI.’ The task decides.”

Design uses warm ivory backgrounds (#f4f2ea), near-white surfaces (#fffdf7), dark text (#151816), deep teal accent (#125c57), restrained borders and small radii. Global styling is in client/aivorix-web/src/styles.css; larger page components also carry inline styles. Sticky header, mobile menu, editorial cards, comparison tables, dossier navigation and four-column footer.

## Architecture and file map

- Frontend: client/aivorix-web; Angular 21 standalone components, TypeScript 5.9, forms, router, hydration, SSR/prerender. package.json has start/build/build:prod, no test script.
- app.routes.ts defines home, news list/detail, comparisons list/detail, interactive /compare, tools list/detail, about, methodology, editorial-policy, affiliate-disclosure, privacy, terms, contact, advertise and wildcard 404.
- app.routes.server.ts prerenders 13 fixed routes plus all content slugs; wildcard uses server rendering. Current data implies 64 known routes, not a newly verified build count.
- Content is bundled TypeScript data, not a CMS/API feed: news.data.ts, comparisons.data.ts, tools.data.ts, tool-details.data.ts, home-benchmarks.data.ts under src/app/data.
- Current counts from source: 15 news articles, 10 comparisons, 26 tools, 5 homepage benchmark views, 26 product signals. News listing and homepage sort news newest first; homepage shows six news and six comparisons.
- Tool catalog: ChatGPT, Claude, Gemini, Perplexity, Grok, Meta AI, Microsoft Copilot, Gemini Notebook (slug notebooklm), GitHub Copilot, Cursor, Midjourney, Adobe Firefly, Canva Magic Studio, Runway, ElevenLabs, Synthesia, Jasper, Grammarly, Notion AI, Poe, You.com, Character.AI, DeepSeek, Le Chat, Cohere, Otter.ai.
- Tool dossiers show overview, release history, then-vs-now tables, performance evidence, feature explanations, limitations, announced roadmap and sources. tool-detail.component.ts generates a fallback dossier when no custom AI_TOOL_DETAILS entry exists.
- Search filters news/tools locally. Compare builder defaults to ChatGPT vs Claude, prevents choosing the same tool in both selectors, and finds an editorial comparison in either pair order.
- Benchmark tabs: All AI tools (default editorial Utility Index), Overall intelligence, Deep research, Tool use, Coding agents. The all-tools index is explicitly an editorial estimate; other views contain named external evaluations and provenance notes. Stored scores/model claims were read as site content, not independently fact-checked in this review.
- News detail includes takeaways, source verification, recent/related news; comparison detail includes verdict, best-fit guidance, side-by-side table, methodology and official sources.
- SEO: src/app/services/seo.service.ts manages title, description, robots, canonical, Open Graph, Twitter and JSON-LD; invalid content removes stale canonical/structured data and sets noindex/SSR 404. Base URL remains https://aivorix.com, also hardcoded in some structured data.
- src/server.ts is the Express/Angular SSR entry, port 4000 by default. app.config.ts enables hydration and scroll/anchor restoration.
- Backend: server/Aivorix.Api, ASP.NET Core 8 minimal API. Program.cs provides /api/newsletter, /api/leads, /health, /sitemap.xml, /news-sitemap.xml, /feed.xml, /robots.txt, known prerendered routes and fallback. Security headers and form rate limit (8/minute) are configured there.
- SubmissionStore.cs stores JSON under App_Data using a semaphore and atomic temp-file replacement. Backend has email/length validation and honeypot handling. SiteCatalog.cs duplicates frontend paths/news metadata: keep it synchronized when content changes.

## Deployment and forms

netlify.toml builds npm run build:prod with Node 22 and publishes client/aivorix-web/dist/aivorix-web/browser; catch-all rewrite goes to /index.html with status 200. This deploys static output, not the .NET backend.

Current newsletter and contact handlers POST URL-encoded data to / using Netlify form-name fields and Netlify form markup. They no longer call the .NET form endpoints. Contact has submitting state, honeypot, fields and response messages. Actual Netlify submission receipt was NOT tested; no messages or subscriptions were sent.

.github/workflows/deploy.yml separately deploys GitHub Pages on main pushes, building with /Aivorix/ base href. README still links https://nabil-engr.github.io/Aivorix/; the user's current supplied site is Netlify.

build.ps1/build.sh install/build Angular, scripts/copy-client-to-api.mjs copies browser output into API wwwroot, then restores/builds .NET Release. PowerShell script checks exit codes. Local frontend: npm start from client/aivorix-web. Backend: dotnet run --project server/Aivorix.Api. Node 22 recommended, .NET 8 required for full build.

## Review evidence and known discrepancies

README.md and VALIDATION.md were read. VALIDATION.md is dated 2026-08-24 and records historical passing builds/runtime checks, 10 news, 8 tools, 4 benchmark views and 41 routes. It is stale relative to current source and Netlify deployment; do not present those results as current tests.

Direct HTTP checks on 2026-09-07 confirmed 200 route-specific HTML for /, /news, /tools, /compare, /comparisons/chatgpt-vs-claude, /tools/chatgpt and /contact. Homepage sections matched current source: utility landscape, product signals, news, comparisons, tools and newsletter. Live canonical points to https://aivorix.com/.

Live /health and /sitemap.xml returned 200 text/html containing the homepage, not JSON/XML. This is consistent with the Netlify fallback. /robots.txt returned plain text; repository robots references aivorix.com sitemap URLs. Other backend endpoints were not live-verified. Do not infer availability from an HTTP 200 alone.

Browser runtime reported no available browser (discovery returned []); web open also failed, but direct HTTP retrieval succeeded. No rendered screenshot inspection, responsive interaction checks, new builds or full regression tests were completed in this read-only onboarding. Visual understanding comes from source CSS/templates, and live understanding from fetched HTML.

Other follow-up candidates, not changes authorized by this onboarding: align production domain/canonicals/robots; serve real static sitemap/feed or connect backend; update README/validation; replace starter privacy/advertising copy; correct contact copy still describing a lead endpoint; verify Netlify form delivery. Methodology page does not yet explain the homepage Utility Index calculation in detail. Content pricing, benchmarks and model names need separate source verification before factual updates.

## Continuing work

Read this file at the start of future work, then inspect current git status and relevant source. Preserve existing design and editorial distinctions unless the user requests changes. Refresh dated observations when making changes. Do not assume this review authenticated externally linked AI claims or proved deployed form/backend behavior. Initial worktree was clean; this onboarding adds memory and its AGENTS.md entry only.
