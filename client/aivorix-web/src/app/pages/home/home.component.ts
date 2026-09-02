import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import {
  BenchmarkView,
  HOME_BENCHMARKS,
  PRODUCT_SIGNALS,
} from "../../data/home-benchmarks.data";
import { NEWS } from "../../data/news.data";
import { AI_TOOLS } from "../../data/tools.data";
import { SeoService } from "../../services/seo.service";

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <section class="benchmark-hero">
      <div class="container">
        <div class="benchmark-intro">
          <div>
            <span class="eyebrow">Aivorix benchmark desk · September 2026</span>
            <h1>There is no single “best AI.”<br /><span>The task decides.</span></h1>
          </div>
          <div class="intro-copy">
            <p>
              Compare leading AI products by the work that matters: reasoning,
              deep research, tool use and repository-scale coding.
            </p>
            <div class="actions">
              <a routerLink="/compare" class="btn primary">Build your comparison</a>
              <a routerLink="/tools" class="btn">Explore all dossiers</a>
            </div>
          </div>
        </div>

        <div class="benchmark-console">
          <div class="benchmark-tabs" role="tablist" aria-label="Benchmark category">
            @for (benchmark of benchmarks; track benchmark.slug) {
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="selectedBenchmarkSlug === benchmark.slug"
                [class.active]="selectedBenchmarkSlug === benchmark.slug"
                (click)="selectBenchmark(benchmark.slug)"
              >
                <span>0{{ $index + 1 }}</span>{{ benchmark.tabLabel }}
              </button>
            }
          </div>

          <div class="benchmark-stage" role="tabpanel">
            <div class="chart-column">
              <div class="chart-heading">
                <div>
                  <span class="chart-eyebrow">{{ currentBenchmark.eyebrow }}</span>
                  <h2>{{ currentBenchmark.title }}</h2>
                  <p>{{ currentBenchmark.description }}</p>
                </div>
                <span class="chart-scale">{{ currentBenchmark.scaleLabel }}</span>
              </div>

              <div class="bar-chart" aria-label="Benchmark score chart">
                <div class="axis" aria-hidden="true">
                  <span>0</span><span>25%</span><span>50%</span><span>75%</span><span>MAX</span>
                </div>
                @for (entry of currentBenchmark.entries; track entry.toolSlug; let rank = $index) {
                  <div class="bar-row">
                    <a class="bar-label" [routerLink]="['/tools', entry.toolSlug]">
                      <span class="rank">{{ rank + 1 }}</span>
                      <span><strong>{{ entry.tool }}</strong><small>{{ entry.model }}</small></span>
                    </a>
                    <div class="bar-plot">
                      <div
                        class="bar-track"
                        role="img"
                        [attr.aria-label]="entry.tool + ' scored ' + entry.displayScore + ' on ' + currentBenchmark.title"
                      >
                        <span
                          class="bar-fill"
                          [class.leader]="rank === 0"
                          [style.width.%]="barWidth(entry.score, currentBenchmark.max)"
                        ></span>
                      </div>
                      <strong class="bar-score">{{ entry.displayScore }}</strong>
                      <small>{{ entry.note }}</small>
                    </div>
                  </div>
                }
              </div>
            </div>

            <aside class="evidence-card">
              <span class="evidence-label">Source & methodology</span>
              <div class="source-grade"><span></span>{{ currentBenchmark.sourceType }}</div>
              <h3>{{ currentBenchmark.sourceName }}</h3>
              <p>{{ currentBenchmark.methodology }}</p>
              <dl>
                <div><dt>Verified</dt><dd>{{ currentBenchmark.verified }}</dd></div>
                <div><dt>Products tested</dt><dd>{{ currentBenchmark.entries.length }}</dd></div>
              </dl>
              <a [href]="currentBenchmark.sourceUrl" target="_blank" rel="nofollow noopener">
                Open benchmark source <span aria-hidden="true">↗</span>
              </a>
              <div class="fairness-note">
                <strong>Fair comparison rule</strong>
                <span>Scores are comparable only inside the currently selected tab.</span>
              </div>
            </aside>
          </div>
        </div>

        <div class="signal-heading">
          <div>
            <span class="eyebrow">All {{ tools.length }} products</span>
            <h2>One useful signal for every AI tool</h2>
          </div>
          <p>
            These cards use different task-specific measurements and are not a shared ranking.
          </p>
        </div>
        <div class="signal-grid">
          @for (signal of productSignals; track signal.toolSlug) {
            <article class="signal-card">
              <div class="signal-top">
                <a [routerLink]="['/tools', signal.toolSlug]">{{ signal.tool }}</a>
                <span>0{{ $index + 1 }}</span>
              </div>
              <strong>{{ signal.value }}</strong>
              <h3>{{ signal.metric }}</h3>
              <p>{{ signal.context }}</p>
              <a class="signal-source" [href]="signal.sourceUrl" target="_blank" rel="nofollow noopener">
                {{ signal.sourceName }} ↗
              </a>
            </article>
          }
        </div>
        <p class="benchmark-disclaimer">
          Benchmark scores are snapshots, not guarantees. Model effort, agent harness, tools,
          product plan and test date can change the result.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">Latest</span><h2>AI news without the noise</h2></div>
          <a routerLink="/news">All news →</a>
        </div>
        <div class="news-grid">
          @for (article of news.slice(0, 6); track article.slug) {
            <article class="card news-card">
              <span class="chip">{{ article.category }}</span><p class="date">{{ article.date }}</p>
              <h3><a [routerLink]="['/news', article.slug]">{{ article.title }}</a></h3>
              <p>{{ article.summary }}</p><div class="source">Source: {{ article.sourceName }}</div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">Buyer guides</span><h2>Popular AI comparisons</h2></div>
          <a routerLink="/compare" class="btn small">Build a comparison</a>
        </div>
        <div class="comparison-grid">
          @for (comparison of comps.slice(0, 6); track comparison.slug) {
            <a class="card comparison-card" [routerLink]="['/comparisons', comparison.slug]">
              <div class="vs">VS</div><h3>{{ comparison.title }}</h3><p>{{ comparison.intro }}</p>
              <span>Updated {{ comparison.updated }} →</span>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">Directory</span><h2>AI tools at a glance</h2></div>
          <a routerLink="/tools">View directory →</a>
        </div>
        <div class="tool-strip">
          @for (tool of tools; track tool.slug) {
            <a [routerLink]="['/tools', tool.slug]" class="tool-pill"><strong>{{ tool.name }}</strong><small>{{ tool.category }}</small></a>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container newsletter card">
        <div><span class="eyebrow">Weekly brief</span><h2>One useful AI email. No hype dump.</h2><p>New model releases, major pricing changes and the comparisons worth revisiting.</p></div>
        <form (ngSubmit)="subscribe()">
          <input type="email" name="email" [(ngModel)]="email" placeholder="you@example.com" required aria-label="Email" />
          <button class="btn primary" type="submit">Subscribe</button><p class="form-msg">{{ message }}</p>
        </form>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .benchmark-hero { padding: 64px 0 48px; border-bottom: 1px solid var(--line); background: var(--surface); }
    .benchmark-intro { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(310px, .65fr); gap: 70px; align-items: end; margin-bottom: 44px; }
    .benchmark-intro h1 { max-width: 850px; margin: 14px 0 0; font-size: clamp(3rem, 6.7vw, 6.4rem); font-weight: 740; letter-spacing: -.07em; line-height: .92; }
    .benchmark-intro h1 span { color: var(--accent); }
    .intro-copy > p { margin: 0; color: var(--muted); font-size: 1.1rem; line-height: 1.65; }
    .intro-copy .actions { margin-bottom: 0; }

    .benchmark-console { border: 1px solid var(--line-strong); background: var(--bg); box-shadow: var(--shadow); }
    .benchmark-tabs { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-bottom: 1px solid var(--line-strong); background: var(--surface-2); }
    .benchmark-tabs button { min-height: 58px; display: flex; align-items: center; gap: 12px; padding: 13px 16px; border: 0; border-right: 1px solid var(--line); background: transparent; color: var(--muted); font-size: .8rem; font-weight: 750; text-align: left; cursor: pointer; }
    .benchmark-tabs button:last-child { border-right: 0; }
    .benchmark-tabs button span { color: var(--line-strong); font-family: Georgia, 'Times New Roman', serif; font-size: .76rem; }
    .benchmark-tabs button:hover { background: var(--surface); color: var(--text); }
    .benchmark-tabs button.active { box-shadow: inset 0 -3px 0 var(--accent); background: var(--surface); color: var(--text); }
    .benchmark-tabs button.active span { color: var(--accent); }

    .benchmark-stage { display: grid; grid-template-columns: minmax(0, 1fr) 300px; }
    .chart-column { min-width: 0; padding: 30px 32px 34px; background: var(--surface); }
    .chart-heading { display: flex; justify-content: space-between; gap: 28px; align-items: end; margin-bottom: 31px; }
    .chart-eyebrow, .evidence-label { color: var(--accent); font-size: .68rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
    .chart-heading h2 { margin: 7px 0 5px; font-size: clamp(1.7rem, 3vw, 2.7rem); letter-spacing: -.04em; }
    .chart-heading p { max-width: 640px; margin: 0; color: var(--muted); font-size: .9rem; line-height: 1.55; }
    .chart-scale { flex: 0 0 210px; color: var(--muted); font-size: .7rem; line-height: 1.45; text-align: right; }
    .axis { display: grid; grid-template-columns: repeat(5, 1fr); margin: 0 67px 9px 205px; color: var(--muted); font-size: .62rem; font-weight: 700; }
    .axis span:not(:first-child) { text-align: right; }
    .bar-chart { position: relative; }
    .bar-row { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 15px; align-items: center; min-height: 70px; border-top: 1px solid var(--line); }
    .bar-row:last-child { border-bottom: 1px solid var(--line); }
    .bar-label { display: grid; grid-template-columns: 24px 1fr; gap: 9px; align-items: center; color: var(--text); }
    .bar-label:hover strong { color: var(--accent); }
    .bar-label .rank { color: var(--muted); font-family: Georgia, 'Times New Roman', serif; font-size: .75rem; }
    .bar-label strong, .bar-label small { display: block; }
    .bar-label strong { font-size: .9rem; }
    .bar-label small { max-width: 155px; margin-top: 2px; overflow: hidden; color: var(--muted); font-size: .67rem; text-overflow: ellipsis; white-space: nowrap; }
    .bar-plot { display: grid; grid-template-columns: minmax(0, 1fr) 54px 150px; gap: 12px; align-items: center; }
    .bar-track { position: relative; height: 23px; overflow: hidden; border-left: 1px solid var(--line-strong); background: repeating-linear-gradient(to right, transparent 0, transparent calc(25% - 1px), var(--line) calc(25% - 1px), var(--line) 25%); }
    .bar-fill { display: block; height: 100%; background: #899591; transition: width .35s ease; }
    .bar-fill.leader { background: var(--accent); }
    .bar-score { font-family: Georgia, 'Times New Roman', serif; font-size: 1.15rem; text-align: right; }
    .bar-plot > small { color: var(--muted); font-size: .66rem; line-height: 1.35; }

    .evidence-card { padding: 30px 24px; border-left: 1px solid var(--line-strong); background: var(--surface-2); }
    .source-grade { display: flex; align-items: center; gap: 8px; margin-top: 24px; color: var(--muted); font-size: .72rem; font-weight: 750; }
    .source-grade span { width: 7px; height: 7px; border-radius: 50%; background: var(--positive); }
    .evidence-card h3 { margin: 10px 0; font-size: 1.35rem; line-height: 1.25; }
    .evidence-card > p { color: var(--muted); font-size: .8rem; line-height: 1.6; }
    .evidence-card dl { margin: 24px 0; border-top: 1px solid var(--line); }
    .evidence-card dl div { display: flex; justify-content: space-between; gap: 14px; padding: 10px 0; border-bottom: 1px solid var(--line); }
    .evidence-card dt, .evidence-card dd { margin: 0; font-size: .72rem; }
    .evidence-card dt { color: var(--muted); }
    .evidence-card dd { font-weight: 750; text-align: right; }
    .evidence-card > a { color: var(--accent); font-size: .78rem; font-weight: 800; }
    .fairness-note { margin-top: 25px; padding: 14px; border: 1px solid var(--line-strong); background: var(--surface); }
    .fairness-note strong, .fairness-note span { display: block; }
    .fairness-note strong { margin-bottom: 5px; font-size: .72rem; }
    .fairness-note span { color: var(--muted); font-size: .68rem; line-height: 1.5; }

    .signal-heading { display: flex; justify-content: space-between; gap: 34px; align-items: end; margin: 45px 0 18px; }
    .signal-heading h2 { margin: 7px 0 0; font-size: clamp(1.6rem, 3vw, 2.5rem); letter-spacing: -.04em; }
    .signal-heading > p { max-width: 420px; margin: 0; color: var(--muted); font-size: .83rem; line-height: 1.55; text-align: right; }
    .signal-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid var(--line-strong); border-left: 1px solid var(--line-strong); }
    .signal-card { min-height: 218px; display: flex; flex-direction: column; padding: 18px; border-right: 1px solid var(--line-strong); border-bottom: 1px solid var(--line-strong); background: var(--surface); }
    .signal-top { display: flex; justify-content: space-between; gap: 10px; }
    .signal-top a { font-size: .78rem; font-weight: 800; }
    .signal-top a:hover { color: var(--accent); }
    .signal-top span { color: var(--line-strong); font-family: Georgia, 'Times New Roman', serif; font-size: .72rem; }
    .signal-card > strong { display: block; margin: 24px 0 4px; font-family: Georgia, 'Times New Roman', serif; font-size: 2.25rem; letter-spacing: -.045em; }
    .signal-card h3 { margin: 0; font-size: .87rem; line-height: 1.35; }
    .signal-card p { margin: 6px 0 15px; color: var(--muted); font-size: .7rem; line-height: 1.45; }
    .signal-source { margin-top: auto; color: var(--accent); font-size: .66rem; font-weight: 750; }
    .benchmark-disclaimer { margin: 15px 0 0; color: var(--muted); font-size: .7rem; line-height: 1.5; }

    @media (max-width: 1000px) {
      .benchmark-intro { grid-template-columns: 1fr; gap: 25px; }
      .intro-copy { max-width: 700px; }
      .benchmark-stage { grid-template-columns: 1fr; }
      .evidence-card { border-top: 1px solid var(--line-strong); border-left: 0; }
      .signal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 720px) {
      .benchmark-hero { padding-top: 45px; }
      .benchmark-intro h1 { font-size: clamp(2.8rem, 15vw, 5rem); }
      .benchmark-tabs { grid-template-columns: 1fr; }
      .benchmark-tabs button { border-right: 0; border-bottom: 1px solid var(--line); }
      .benchmark-tabs button:last-child { border-bottom: 0; }
      .chart-column { padding: 24px 18px 28px; }
      .chart-heading { display: block; }
      .chart-scale { display: block; margin-top: 12px; text-align: left; }
      .axis { display: none; }
      .bar-row { grid-template-columns: 1fr; gap: 8px; padding: 15px 0; }
      .bar-plot { grid-template-columns: minmax(0, 1fr) 52px; }
      .bar-plot > small { grid-column: 1 / -1; }
      .signal-heading { display: block; }
      .signal-heading > p { margin-top: 10px; text-align: left; }
    }

    @media (max-width: 480px) {
      .signal-grid { grid-template-columns: 1fr; }
      .signal-card { min-height: 190px; }
    }
  `,
})
export class HomeComponent implements OnInit {
  readonly news = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
  readonly comps = COMPARISONS;
  readonly tools = AI_TOOLS;
  readonly benchmarks = HOME_BENCHMARKS;
  readonly productSignals = PRODUCT_SIGNALS;
  selectedBenchmarkSlug = HOME_BENCHMARKS[0].slug;
  email = "";
  message = "";

  constructor(private readonly seo: SeoService) {}

  get currentBenchmark(): BenchmarkView {
    return (
      HOME_BENCHMARKS.find(
        (benchmark) => benchmark.slug === this.selectedBenchmarkSlug,
      ) ?? HOME_BENCHMARKS[0]
    );
  }

  ngOnInit(): void {
    this.seo.set({
      title: "AI Benchmarks by Task — ChatGPT, Claude, Gemini & More",
      description:
        "Compare leading AI tools across independent intelligence, deep research, tool-use and coding-agent benchmarks with visible sources and methodology notes.",
      path: "/",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Aivorix",
        url: "https://aivorix.com",
        description:
          "Source-backed AI benchmark charts, news and product comparisons",
      },
    });
  }

  selectBenchmark(slug: string): void {
    this.selectedBenchmarkSlug = slug;
  }

  barWidth(score: number, max: number): number {
    return Math.min(100, Math.max(0, (score / max) * 100));
  }

  async subscribe(): Promise<void> {
    if (
      typeof window !== "undefined" &&
      window.location.hostname.endsWith(".github.io")
    ) {
      this.message = "Newsletter signup needs the API server and is unavailable on GitHub Pages.";
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, website: "" }),
      });
      this.message = response.ok
        ? "Thanks — you're on the list."
        : "Could not subscribe right now.";
      if (response.ok) this.email = "";
    } catch {
      this.message = "Could not subscribe right now.";
    }
  }
}
