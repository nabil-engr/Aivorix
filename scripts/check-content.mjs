import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(path.join(root, 'client/aivorix-web/package.json'));
const ts = require('typescript');
const dataDir = path.join(root, 'client/aivorix-web/src/app/data');
const cache = new Map();
function readData(name) {
  const file = path.resolve(dataDir, name.endsWith('.ts') ? name : `${name}.ts`);
  if (cache.has(file)) return cache.get(file);
  const module = { exports: {} };
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  new Function('require', 'module', 'exports', compiled)(readData, module, module.exports);
  cache.set(file, module.exports);
  return module.exports;
}

const { AI_TOOLS } = readData('tools.data');
const { NEWS } = readData('news.data');
const { COMPARISONS } = readData('comparisons.data');
const { COMPARISON_PROFILES } = readData('comparison-profiles.data');
const { HOME_BENCHMARKS, PRODUCT_SIGNALS } = readData('home-benchmarks.data');
const { AI_TOOL_DETAILS } = readData('tool-details.data');
const { TASK_FIT_VIEWS, RANKING_RUBRICS, scoreTool } = readData('task-fit.data');
const { RANKING_EVIDENCE } = readData('ranking-evidence.data');
const { PUBLISHED_BENCHMARKS } = readData('published-benchmarks.data');
const slugs = new Set(AI_TOOLS.map(tool => tool.slug));
const comparisonSlugs = new Set(COMPARISON_PROFILES.map(profile => profile.slug));
for (const items of [AI_TOOLS, NEWS, COMPARISONS]) {
  assert.equal(new Set(items.map(item => item.slug)).size, items.length, 'Duplicate slug');
}
for (const article of NEWS) {
  assert(article.summary.length >= 70 && article.summary.length <= 220, `${article.slug}: summary length`);
  assert.equal(article.body.length, 3, `${article.slug}: news should have three readable sections`);
  assert.equal(article.takeaways.length, 3, `${article.slug}: news should have three takeaways`);
  assert(new URL(article.sourceUrl).protocol === 'https:', `${article.slug}: invalid source`);
  const copy = `${article.title} ${article.summary} ${article.body.join(' ')}`;
  assert(!/documentation briefing is not a claim|Aivorix has added|no independent benchmark score is inferred/i.test(copy), `${article.slug}: internal editorial wording copy`);
}
for (const comparison of COMPARISONS) {
  assert(comparisonSlugs.has(comparison.left) && comparisonSlugs.has(comparison.right), 'Invalid comparison profile');
  assert.notEqual(comparison.left, comparison.right);
  assert(comparison.rows.length >= 6, 'Comparison needs useful side-by-side fields');
  assert(comparison.sources.length >= 2 && comparison.sources.every(source => new URL(source).protocol === 'https:'), 'Comparison needs official HTTPS sources');
}
assert.equal(new Set(COMPARISON_PROFILES.map(profile => profile.slug)).size, COMPARISON_PROFILES.length, 'Duplicate comparison profile');
assert(COMPARISON_PROFILES.some(profile => profile.slug === 'gpt-5-6-terra'));
assert(COMPARISON_PROFILES.some(profile => profile.slug === 'gpt-5-6-luna'));
assert(COMPARISON_PROFILES.some(profile => profile.slug === 'gpt-5-5'));
assert(COMPARISON_PROFILES.some(profile => profile.slug === 'claude-fable-5-1'));
assert(COMPARISON_PROFILES.some(profile => profile.slug === 'claude-opus-5'));
assert(COMPARISON_PROFILES.some(profile => profile.slug === 'claude-sonnet-5'));
assert(COMPARISON_PROFILES.some(profile => profile.slug === 'claude-haiku-4-5'));
const comparisonPairCount = new Set(COMPARISONS.map(item => [item.left, item.right].sort().join('::'))).size;
assert.equal(comparisonPairCount, COMPARISON_PROFILES.length * (COMPARISON_PROFILES.length - 1) / 2, 'Every comparison pair must exist');
for (const view of HOME_BENCHMARKS) {
  assert.deepEqual(new Set(view.entries.map(entry => entry.toolSlug)), slugs, `${view.slug}: incomplete coverage`);
  assert.equal(view.entries.length, slugs.size, 'Duplicate benchmark tool');
  let missing = false;
  for (const entry of view.entries) {
    if (entry.score === null) {
      missing = true;
      assert.equal(entry.displayScore, 'N/A');
    } else {
      assert(!missing, 'Ranked entries must precede unranked entries');
      assert(Number.isFinite(entry.score) && entry.score >= 0 && entry.score <= view.max);
    }
  }
  assert.equal(view.entries.find(entry => entry.toolSlug === 'gpt-6-astra').score, null,
    'Do not give Astra an unsupported score');
}
assert.deepEqual(new Set(PRODUCT_SIGNALS.map(signal => signal.toolSlug)), slugs);
assert(AI_TOOL_DETAILS['gpt-6-astra'].sources.length >= 3);
assert(NEWS.some(article => article.slug.includes('gpt-6-astra')));
assert(COMPARISONS.some(item => item.left === 'gpt-6-astra' || item.right === 'gpt-6-astra'));

assert.deepEqual(new Set(Object.keys(RANKING_EVIDENCE)), slugs, 'Every tool needs reviewed evidence');
for (const rubric of RANKING_RUBRICS) {
  assert.equal(rubric.criteria.reduce((total, item) => total + item.weight, 0), 100);
  assert.equal(new Set(rubric.criteria.map(item => item.key)).size, 5);
  const view = TASK_FIT_VIEWS.find(item => item.slug === rubric.slug);
  assert.deepEqual(new Set(view.entries.map(item => item.toolSlug)), slugs);
  assert.equal(view.entries.length, slugs.size);
  for (const [index, entry] of view.entries.entries()) {
    assert(Number.isFinite(entry.score) && entry.score >= 0 && entry.score <= 100);
    assert.equal(entry.score, entry.breakdown.reduce((total, item) => total + item.points, 0));
    assert(index === 0 || entry.score <= view.entries[index - 1].score, 'Score order');
    assert.equal(entry.rank, 1 + view.entries.filter(other => other.score > entry.score).length, 'Tie rank');
    for (const item of scoreTool(entry.toolSlug, rubric)) {
      assert.equal(item.points > 0, item.sources.length > 0, 'Every point must have evidence');
    }
    assert(entry.evidence.every(source => new URL(source.url).protocol === 'https:'));
  }
}
// Check meaningful distinctions: a media specialist has no invented coding points.
assert.equal(TASK_FIT_VIEWS.find(view => view.slug === 'coding').entries.find(entry => entry.toolSlug === 'midjourney').score, 0);
assert.equal(TASK_FIT_VIEWS.find(view => view.slug === 'coding').entries.find(entry => entry.toolSlug === 'cursor').score, 100);
assert.equal(TASK_FIT_VIEWS.find(view => view.slug === 'research').entries.find(entry => entry.toolSlug === 'perplexity').score, 100);
for (const view of PUBLISHED_BENCHMARKS) {
  assert.equal(new Set(view.entries.map(entry => entry.toolSlug)).size, view.entries.length);
  assert(view.entries.every(entry => slugs.has(entry.toolSlug) && Number.isFinite(entry.score) && entry.evidence.length));
}
assert.equal(PUBLISHED_BENCHMARKS.find(view => view.slug === 'coding').entries.find(entry => entry.toolSlug === 'gpt-6-astra').score, 74.1);
assert.equal(PUBLISHED_BENCHMARKS.find(view => view.slug === 'tools').entries.find(entry => entry.toolSlug === 'gpt-6-astra').score, 72.6);

const fixed = ['/', '/news', '/comparisons', '/compare', '/tools', '/about', '/methodology',
  '/editorial-policy', '/affiliate-disclosure', '/privacy', '/terms', '/contact', '/advertise'];
const paths = [...fixed, ...NEWS.map(x => `/news/${x.slug}`),
  ...COMPARISONS.map(x => `/comparisons/${x.slug}`), ...AI_TOOLS.map(x => `/tools/${x.slug}`)];
const quote = value => JSON.stringify(value);
const publicBase = 'https://aivorix.netlify.app';
const escapeXml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const routeDate = route => NEWS.find(item => route === `/news/${item.slug}`)?.date
  ?? COMPARISONS.find(item => route === `/comparisons/${item.slug}`)?.updated
  ?? AI_TOOLS.find(item => route === `/tools/${item.slug}`)?.verified
  ?? '2026-09-08';
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(route => `  <url><loc>${publicBase}${route}</loc><lastmod>${routeDate(route)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${NEWS.map(article => `  <url><loc>${publicBase}/news/${escapeXml(article.slug)}</loc><news:news><news:publication><news:name>Aivorix</news:name><news:language>en</news:language></news:publication><news:publication_date>${escapeXml(article.date)}</news:publication_date><news:title>${escapeXml(article.title)}</news:title></news:news></url>`).join('\n')}\n</urlset>\n`;
const catalog = `// Generated by node scripts/check-content.mjs --sync-catalog\nnamespace Aivorix.Api.Data;\npublic static class SiteCatalog\n{\n    public static readonly string[] Paths = new[] { ${paths.map(quote).join(', ')} };\n    public static readonly (string Slug, string Date, string Title)[] News = new[] { ${NEWS.map(x => `(${quote(x.slug)}, ${quote(x.date)}, ${quote(x.title)})`).join(', ')} };\n}\n`;
const catalogPath = path.join(root, 'server/Aivorix.Api/Data/SiteCatalog.cs');
const sitemapPath = path.join(root, 'client/aivorix-web/public/sitemap.xml');
const newsSitemapPath = path.join(root, 'client/aivorix-web/public/news-sitemap.xml');
if (process.argv.includes('--sync-catalog')) {
  fs.writeFileSync(catalogPath, catalog);
  fs.writeFileSync(sitemapPath, sitemap);
  fs.writeFileSync(newsSitemapPath, newsSitemap);
}
assert.equal(fs.readFileSync(catalogPath, 'utf8'), catalog, 'Backend catalog stale: run with --sync-catalog');
assert.equal(fs.readFileSync(sitemapPath, 'utf8'), sitemap, 'Static sitemap stale: run with --sync-catalog');
assert.equal(fs.readFileSync(newsSitemapPath, 'utf8'), newsSitemap, 'Static news sitemap stale: run with --sync-catalog');

if (process.argv.includes('--prerender')) {
  const output = path.join(root, 'client/aivorix-web/dist/aivorix-web/browser');
  for (const route of paths) {
    const html = fs.readFileSync(path.join(output, route.slice(1), 'index.html'), 'utf8');
    assert(html.includes('<title>'), `Missing title: ${route}`);
    if (route.includes('gpt-6-astra') || ['/tools', '/news', '/comparisons', '/compare'].includes(route)) {
      assert(html.includes('GPT-6 Astra'), `Missing Astra: ${route}`);
    }
  }
  const home = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
  assert(home.includes('Task-fit scores') && home.includes('Published benchmarks') && home.includes('Why this score?'), 'Missing ranking controls/evidence');
  assert(!home.includes('Not ranked') && !home.includes('>N/A<'), 'Default ranking must score every entry');
}
console.log(`Content checks passed: ${AI_TOOLS.length} tools, ${COMPARISON_PROFILES.length} comparison profiles, ${COMPARISONS.length} comparisons, ${NEWS.length} news, ${paths.length} routes.`);
