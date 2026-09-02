import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { AI_TOOL_DETAILS, ToolDossier } from "../../data/tool-details.data";
import { AI_TOOLS } from "../../data/tools.data";
import { SeoService } from "../../services/seo.service";

type AiTool = (typeof AI_TOOLS)[number];
type Comparison = (typeof COMPARISONS)[number];

function buildFallbackDossier(tool: AiTool): ToolDossier {
  return {
    launched: "See official product history",
    currentRelease: "Current product",
    releaseStatus: `Feature and plan availability verified ${tool.verified}`,
    positioning: `${tool.name} is a ${tool.category.toLowerCase()} product from ${tool.company}, best suited to ${tool.bestFor.toLowerCase()}.`,
    modelNote:
      "The product, its underlying models and its subscription limits can change independently. Verify the official source before purchase or deployment.",
    overview: [
      `${tool.name} focuses on ${tool.bestFor.toLowerCase()}. Its current profile includes ${tool.features.join(", ")}.`,
      `Aivorix treats pricing, plan limits, model routing and regional availability as time-sensitive. The official provider page remains the final source of truth.`,
    ],
    timeline: [
      {
        date: tool.verified,
        title: "Current product profile verified",
        status: "Current",
        summary: `Aivorix reviewed the public product and plan information available for ${tool.name}.`,
        changes: tool.features,
        sourceUrl: tool.source,
      },
    ],
    comparisonLabel: "Product scope: quick reference",
    comparison: [
      {
        dimension: "Primary category",
        previous: "Earlier product scope varies",
        current: tool.category,
        difference: "Use current provider documentation",
      },
      {
        dimension: "Best fit",
        previous: "General availability",
        current: tool.bestFor,
        difference: "Evaluate with a representative workflow",
      },
      {
        dimension: "Pricing",
        previous: "Plans change over time",
        current: tool.price,
        difference: "Re-check before buying",
      },
      {
        dimension: "Feature set",
        previous: "Earlier releases may differ",
        current: tool.features.join("; "),
        difference: "Plan and region limits may apply",
      },
    ],
    powerHeadline: "Evidence before rankings",
    powerNote:
      "No universal performance score is assigned without a directly comparable, independently reproducible evaluation.",
    metrics: [
      {
        value: `${tool.features.length}`,
        label: "Documented capability areas",
        detail:
          "High-level capabilities included in this current Aivorix profile.",
        sourceUrl: tool.source,
      },
      {
        value: tool.verified,
        label: "Last verified",
        detail:
          "The date on which this product profile was last editorially checked.",
        sourceUrl: tool.source,
      },
      {
        value: "Official",
        label: "Primary source",
        detail:
          "Product and plan claims link to the provider's own documentation.",
        sourceUrl: tool.source,
      },
    ],
    features: tool.features.map((feature) => ({
      name: feature,
      availability: "Plan and region dependent",
      howItWorks: `This capability is part of ${tool.name}'s documented product profile.`,
      usefulFor: tool.bestFor,
      caution:
        "Confirm current limits, privacy terms and commercial-use rights.",
    })),
    limitations: [
      "Plan limits and regional availability can change.",
      "Provider descriptions are not independent performance tests.",
      "Test quality, latency, privacy and total cost on your own workflow.",
    ],
    roadmap: [
      {
        title: "Future updates",
        status: "No public date",
        detail:
          "Aivorix does not infer an unannounced roadmap. Follow the official provider source for confirmed releases.",
        sourceUrl: tool.source,
      },
    ],
    sources: [
      {
        title: `${tool.name} official product information`,
        publisher: tool.company,
        date: tool.verified,
        url: tool.source,
      },
    ],
  };
}
@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (tool && dossier) {
      <section class="detail-hero">
        <div class="container detail-width">
          <a routerLink="/tools" class="back">&larr; AI Tools directory</a>
          <div class="hero-layout">
            <div>
              <div class="hero-kicker">
                <span class="chip">{{ tool.category }}</span
                ><span>Research dossier</span>
              </div>
              <h1>{{ tool.name }}</h1>
              <p class="lead">{{ dossier.positioning }}</p>
              <p class="model-note">{{ dossier.modelNote }}</p>
            </div>
            <aside class="release-card" aria-label="Current release summary">
              <span class="release-label">Current release</span>
              <strong>{{ dossier.currentRelease }}</strong>
              <p>{{ dossier.releaseStatus }}</p>
              <span class="verified">Verified {{ tool.verified }}</span>
            </aside>
          </div>
          <div class="facts" aria-label="Product facts">
            <div>
              <span>First released</span><strong>{{ dossier.launched }}</strong>
            </div>
            <div>
              <span>Company</span><strong>{{ tool.company }}</strong>
            </div>
            <div>
              <span>Best for</span><strong>{{ tool.bestFor }}</strong>
            </div>
            <div>
              <span>Pricing</span><strong>{{ tool.price }}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="section detail-section">
        <div class="container detail-width detail-layout">
          <aside class="dossier-nav" aria-label="On this page">
            <span>On this page</span>
            <a [routerLink]="[]" fragment="overview">Overview</a
            ><a [routerLink]="[]" fragment="history">Release history</a>
            <a [routerLink]="[]" fragment="comparison">Then vs now</a
            ><a [routerLink]="[]" fragment="power">Power evidence</a>
            <a [routerLink]="[]" fragment="features">How features work</a
            ><a [routerLink]="[]" fragment="roadmap">What's next</a>
            <a [routerLink]="[]" fragment="sources">Sources</a>
          </aside>

          <main class="dossier-content">
            <section id="overview" class="content-section intro-section">
              <span class="section-index">01 / OVERVIEW</span>
              <h2>What {{ tool.name }} is today</h2>
              @for (paragraph of dossier.overview; track paragraph) {
                <p class="body-copy">{{ paragraph }}</p>
              }
              <div class="evidence-note">
                <strong>Reading note</strong>
                <p>
                  Product features and underlying models are documented
                  separately. Roadmap items include only provider-announced
                  work; rumors are excluded.
                </p>
              </div>
            </section>

            <section id="history" class="content-section">
              <span class="section-index">02 / RELEASE HISTORY</span>
              <div class="section-heading">
                <div>
                  <h2>Major versions and what changed</h2>
                  <p>
                    Selected milestones that materially changed the product.
                  </p>
                </div>
                <span class="count"
                  >{{ dossier.timeline.length }} milestones</span
                >
              </div>
              <div class="timeline">
                @for (item of dossier.timeline; track item.title) {
                  <article
                    class="timeline-item"
                    [attr.data-status]="item.status"
                  >
                    <div class="timeline-meta">
                      <time>{{ item.date }}</time
                      ><span>{{ item.status }}</span>
                    </div>
                    <div class="timeline-copy">
                      <h3>{{ item.title }}</h3>
                      <p>{{ item.summary }}</p>
                      <ul class="change-list">
                        @for (change of item.changes; track change) {
                          <li>{{ change }}</li>
                        }
                      </ul>
                      <a
                        [href]="item.sourceUrl"
                        target="_blank"
                        rel="nofollow noopener"
                        >Official release note
                        <span aria-hidden="true">&nearr;</span></a
                      >
                    </div>
                  </article>
                }
              </div>
            </section>

            <section id="comparison" class="content-section">
              <span class="section-index">03 / THEN VS NOW</span>
              <h2>{{ dossier.comparisonLabel }}</h2>
              <p class="section-intro">
                The comparison uses provider-published capabilities and named
                evaluations, not a generic marketing score.
              </p>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Dimension</th>
                      <th>Previous</th>
                      <th>Current</th>
                      <th>Measured difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (row of dossier.comparison; track row.dimension) {
                      <tr>
                        <th scope="row">{{ row.dimension }}</th>
                        <td data-label="Previous">{{ row.previous }}</td>
                        <td data-label="Current">{{ row.current }}</td>
                        <td data-label="Difference">
                          <strong>{{ row.difference }}</strong>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </section>

            <section id="power" class="content-section power-section">
              <span class="section-index">04 / POWER EVIDENCE</span>
              <h2>{{ dossier.powerHeadline }}</h2>
              <p class="section-intro">{{ dossier.powerNote }}</p>
              <div class="metric-grid">
                @for (metric of dossier.metrics; track metric.label) {
                  <article class="metric-card">
                    <strong>{{ metric.value }}</strong>
                    <h3>{{ metric.label }}</h3>
                    <p>{{ metric.detail }}</p>
                    @if (metric.sourceUrl) {
                      <a
                        [href]="metric.sourceUrl"
                        target="_blank"
                        rel="nofollow noopener"
                        >Check evidence
                        <span aria-hidden="true">&nearr;</span></a
                      >
                    }
                  </article>
                }
              </div>
            </section>

            <section id="features" class="content-section">
              <span class="section-index">05 / FEATURES EXPLAINED</span>
              <div class="section-heading">
                <div>
                  <h2>How the important features work</h2>
                  <p>
                    What happens behind the button, where it helps and what to
                    verify.
                  </p>
                </div>
              </div>
              <div class="feature-list">
                @for (
                  feature of dossier.features;
                  track feature.name;
                  let index = $index
                ) {
                  <article class="feature-row">
                    <span class="feature-number">0{{ index + 1 }}</span>
                    <div class="feature-main">
                      <h3>{{ feature.name }}</h3>
                      <span class="availability">{{
                        feature.availability
                      }}</span>
                    </div>
                    <div class="feature-explanation">
                      <p>
                        <strong>How it works:</strong> {{ feature.howItWorks }}
                      </p>
                      <p><strong>Best use:</strong> {{ feature.usefulFor }}</p>
                      @if (feature.caution) {
                        <p class="caution">
                          <strong>Watch:</strong> {{ feature.caution }}
                        </p>
                      }
                    </div>
                  </article>
                }
              </div>
              <div class="limits-panel">
                <div>
                  <span class="section-index">LIMITS</span>
                  <h3>What the headline features do not guarantee</h3>
                </div>
                <ul>
                  @for (limit of dossier.limitations; track limit) {
                    <li>{{ limit }}</li>
                  }
                </ul>
              </div>
            </section>

            <section id="roadmap" class="content-section">
              <span class="section-index">06 / WHAT'S NEXT</span>
              <h2>Announced roadmap, without speculation</h2>
              <p class="section-intro">
                Status reflects the provider's latest public wording. “No public
                date” means there is no verified launch schedule.
              </p>
              <div class="roadmap-list">
                @for (item of dossier.roadmap; track item.title) {
                  <article>
                    <div>
                      <span class="roadmap-status">{{ item.status }}</span>
                      <h3>{{ item.title }}</h3>
                    </div>
                    <p>{{ item.detail }}</p>
                    @if (item.sourceUrl) {
                      <a
                        [href]="item.sourceUrl"
                        target="_blank"
                        rel="nofollow noopener"
                        >Official announcement
                        <span aria-hidden="true">&nearr;</span></a
                      >
                    }
                  </article>
                }
              </div>
            </section>

            <section id="sources" class="content-section sources-section">
              <span class="section-index">07 / SOURCES</span>
              <div class="section-heading">
                <div>
                  <h2>Primary sources</h2>
                  <p>
                    Provider announcements, help documentation and system
                    information.
                  </p>
                </div>
                <span class="count"
                  >{{ dossier.sources.length }} references</span
                >
              </div>
              <ol class="source-list">
                @for (
                  source of dossier.sources;
                  track source.url;
                  let index = $index
                ) {
                  <li>
                    <span class="source-number">{{ index + 1 }}</span>
                    <div>
                      <a
                        [href]="source.url"
                        target="_blank"
                        rel="nofollow noopener"
                        >{{ source.title }}
                        <span aria-hidden="true">&nearr;</span></a
                      >
                      <p>{{ source.publisher }} · {{ source.date }}</p>
                    </div>
                  </li>
                }
              </ol>
              <p class="method-note">
                Last editorial verification: {{ tool.verified }}. Prices, access
                limits, preview status and model routing can change after this
                date.
              </p>
            </section>

            @if (related.length) {
              <section class="content-section related-section">
                <span class="section-index">RELATED</span>
                <h2>Compare {{ tool.name }}</h2>
                <div class="related-grid">
                  @for (comparison of related; track comparison.slug) {
                    <a [routerLink]="['/comparisons', comparison.slug]"
                      ><h3>{{ comparison.title }}</h3>
                      <p>{{ comparison.verdict }}</p>
                      <span>Open comparison &rarr;</span></a
                    >
                  }
                </div>
              </section>
            }
          </main>
        </div>
      </section>
    } @else {
      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">AI Tools directory</span>
          <h1>Tool not found</h1>
          <p class="lead">This research dossier is not available.</p>
          <a class="btn" routerLink="/tools">Back to AI tools</a>
        </div>
      </section>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .detail-width {
      width: min(1180px, calc(100% - 40px));
    }
    .detail-hero {
      padding: 44px 0 0;
      border-bottom: 1px solid var(--line);
      background: var(--surface);
    }
    .back {
      display: inline-flex;
      margin-bottom: 42px;
      color: var(--muted);
      font-size: 0.9rem;
      font-weight: 700;
    }
    .back:hover {
      color: var(--accent);
    }
    .hero-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 64px;
      align-items: end;
    }
    .hero-kicker {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 0.78rem;
      font-weight: 750;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    h1 {
      max-width: 760px;
      margin: 0 0 18px;
      font-size: clamp(3.2rem, 7vw, 6.8rem);
      line-height: 0.9;
      letter-spacing: -0.065em;
    }
    .lead {
      max-width: 760px;
      margin: 0;
      font-size: clamp(1.15rem, 2vw, 1.48rem);
      line-height: 1.5;
    }
    .model-note {
      max-width: 760px;
      margin: 20px 0 0;
      padding-left: 18px;
      border-left: 2px solid var(--accent);
      color: var(--muted);
      line-height: 1.65;
    }
    .release-card {
      padding: 24px;
      border: 1px solid var(--line-strong);
      border-top: 3px solid var(--accent);
      background: var(--bg);
    }
    .release-label {
      display: block;
      margin-bottom: 13px;
      color: var(--muted);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .release-card strong {
      display: block;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.65rem;
      line-height: 1.15;
    }
    .release-card p {
      margin: 10px 0 17px;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.55;
    }
    .verified {
      color: var(--accent);
      font-size: 0.78rem;
      font-weight: 800;
    }
    .facts {
      display: grid;
      grid-template-columns: 1fr 0.7fr 1.45fr 1.3fr;
      margin-top: 50px;
      border-top: 1px solid var(--line);
    }
    .facts div {
      min-width: 0;
      padding: 20px 22px 24px 0;
    }
    .facts div + div {
      padding-left: 22px;
      border-left: 1px solid var(--line);
    }
    .facts span {
      display: block;
      margin-bottom: 8px;
      color: var(--muted);
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .facts strong {
      display: block;
      font-size: 0.91rem;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }
    .detail-section {
      padding-top: 54px;
    }
    .detail-layout {
      display: grid;
      grid-template-columns: 190px minmax(0, 1fr);
      gap: 64px;
      align-items: start;
    }
    .dossier-nav {
      position: sticky;
      top: 96px;
      display: grid;
      gap: 2px;
      padding-top: 8px;
    }
    .dossier-nav > span {
      margin-bottom: 12px;
      color: var(--text);
      font-size: 0.74rem;
      font-weight: 850;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }
    .dossier-nav a {
      padding: 8px 0;
      border-bottom: 1px solid transparent;
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 650;
    }
    .dossier-nav a:hover {
      border-bottom-color: var(--line);
      color: var(--accent);
    }
    .dossier-content {
      min-width: 0;
    }
    .content-section {
      scroll-margin-top: 116px;
      padding: 24px 0 80px;
      border-bottom: 1px solid var(--line);
    }
    .content-section:last-child {
      border-bottom: 0;
    }
    .section-index {
      display: inline-block;
      margin-bottom: 20px;
      color: var(--accent);
      font-size: 0.72rem;
      font-weight: 850;
      letter-spacing: 0.11em;
    }
    .content-section h2 {
      max-width: 780px;
      margin: 0 0 19px;
      font-size: clamp(2rem, 4vw, 3.25rem);
      line-height: 1.05;
      letter-spacing: -0.035em;
    }
    .body-copy {
      max-width: 790px;
      margin: 0 0 18px;
      font-size: 1.08rem;
      line-height: 1.8;
    }
    .section-intro,
    .section-heading p {
      max-width: 760px;
      color: var(--muted);
      line-height: 1.7;
    }
    .evidence-note {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 24px;
      margin-top: 34px;
      padding: 22px 24px;
      border: 1px solid var(--line);
      background: var(--surface);
    }
    .evidence-note strong {
      font-size: 0.8rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .evidence-note p {
      margin: 0;
      color: var(--muted);
      line-height: 1.6;
    }
    .section-heading {
      display: flex;
      justify-content: space-between;
      gap: 28px;
      align-items: end;
      margin-bottom: 27px;
    }
    .section-heading h2,
    .section-heading p {
      margin-bottom: 0;
    }
    .section-heading p {
      margin-top: 10px;
    }
    .count {
      flex: 0 0 auto;
      padding-bottom: 4px;
      color: var(--muted);
      font-size: 0.78rem;
      font-weight: 750;
    }
    .timeline {
      border-top: 1px solid var(--line-strong);
    }
    .timeline-item {
      display: grid;
      grid-template-columns: 160px minmax(0, 1fr);
      gap: 26px;
      padding: 30px 0;
      border-bottom: 1px solid var(--line);
    }
    .timeline-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .timeline-meta time {
      font-size: 0.9rem;
      font-weight: 800;
    }
    .timeline-meta span {
      padding: 4px 7px;
      border: 1px solid var(--line-strong);
      color: var(--muted);
      font-size: 0.66rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .timeline-item[data-status="Current"] .timeline-meta span {
      border-color: var(--accent);
      color: var(--accent);
    }
    .timeline-copy h3 {
      margin: 0 0 8px;
      font-size: 1.35rem;
    }
    .timeline-copy > p {
      margin: 0 0 16px;
      color: var(--muted);
      line-height: 1.65;
    }
    .change-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px 24px;
      margin: 0 0 18px;
      padding: 0;
      list-style: none;
    }
    .change-list li {
      position: relative;
      padding-left: 15px;
      font-size: 0.9rem;
      line-height: 1.45;
    }
    .change-list li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.6em;
      width: 5px;
      height: 5px;
      background: var(--accent);
    }
    .timeline-copy a,
    .metric-card a,
    .roadmap-list a {
      color: var(--accent);
      font-size: 0.82rem;
      font-weight: 800;
    }
    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--line-strong);
      background: var(--surface);
    }
    table {
      width: 100%;
      min-width: 760px;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 17px 18px;
      border-right: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      text-align: left;
      vertical-align: top;
      font-size: 0.88rem;
      line-height: 1.55;
    }
    tr:last-child th,
    tr:last-child td {
      border-bottom: 0;
    }
    th:last-child,
    td:last-child {
      border-right: 0;
    }
    thead th {
      background: var(--surface-2);
      color: var(--muted);
      font-size: 0.7rem;
      letter-spacing: 0.07em;
      text-transform: uppercase;
    }
    tbody th {
      width: 18%;
      background: var(--bg);
    }
    tbody td strong {
      color: var(--accent-dark);
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1px;
      margin-top: 30px;
      border: 1px solid var(--line-strong);
      background: var(--line);
    }
    .metric-card {
      min-height: 250px;
      padding: 25px;
      background: var(--surface);
    }
    .metric-card > strong {
      display: block;
      margin-bottom: 27px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 2.35rem;
      letter-spacing: -0.04em;
    }
    .metric-card h3 {
      margin: 0 0 10px;
      font-size: 0.98rem;
    }
    .metric-card p {
      margin: 0 0 16px;
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.6;
    }
    .feature-list {
      border-top: 1px solid var(--line-strong);
    }
    .feature-row {
      display: grid;
      grid-template-columns: 48px 220px minmax(0, 1fr);
      gap: 22px;
      padding: 28px 0;
      border-bottom: 1px solid var(--line);
    }
    .feature-number {
      color: var(--muted);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1rem;
    }
    .feature-main h3 {
      margin: 0 0 10px;
      font-size: 1.15rem;
    }
    .availability {
      display: inline-block;
      color: var(--accent);
      font-size: 0.72rem;
      font-weight: 800;
      line-height: 1.4;
    }
    .feature-explanation p {
      margin: 0 0 9px;
      color: var(--muted);
      font-size: 0.91rem;
      line-height: 1.65;
    }
    .feature-explanation strong {
      color: var(--text);
    }
    .feature-explanation .caution {
      padding-left: 12px;
      border-left: 2px solid var(--line-strong);
    }
    .limits-panel {
      display: grid;
      grid-template-columns: 0.9fr 1.35fr;
      gap: 46px;
      margin-top: 40px;
      padding: 30px;
      border: 1px solid var(--line-strong);
      background: var(--surface-2);
    }
    .limits-panel .section-index {
      margin-bottom: 12px;
    }
    .limits-panel h3 {
      margin: 0;
      font-size: 1.45rem;
      line-height: 1.25;
    }
    .limits-panel ul {
      margin: 0;
      padding-left: 18px;
    }
    .limits-panel li {
      margin-bottom: 12px;
      color: var(--muted);
      line-height: 1.6;
    }
    .roadmap-list {
      margin-top: 30px;
      border-top: 1px solid var(--line-strong);
    }
    .roadmap-list article {
      display: grid;
      grid-template-columns: 240px minmax(0, 1fr) 150px;
      gap: 25px;
      align-items: start;
      padding: 25px 0;
      border-bottom: 1px solid var(--line);
    }
    .roadmap-list h3 {
      margin: 7px 0 0;
      font-size: 1.07rem;
    }
    .roadmap-list p {
      margin: 0;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.65;
    }
    .roadmap-status {
      color: var(--accent);
      font-size: 0.68rem;
      font-weight: 850;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .source-list {
      margin: 28px 0 0;
      padding: 0;
      border-top: 1px solid var(--line-strong);
      list-style: none;
    }
    .source-list li {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 14px;
      padding: 19px 0;
      border-bottom: 1px solid var(--line);
    }
    .source-number {
      color: var(--muted);
      font-family: Georgia, "Times New Roman", serif;
    }
    .source-list a {
      color: var(--text);
      font-weight: 750;
    }
    .source-list a:hover {
      color: var(--accent);
    }
    .source-list p {
      margin: 5px 0 0;
      color: var(--muted);
      font-size: 0.8rem;
    }
    .method-note {
      margin: 22px 0 0;
      color: var(--muted);
      font-size: 0.8rem;
      line-height: 1.6;
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 27px;
    }
    .related-grid a {
      display: flex;
      flex-direction: column;
      min-height: 180px;
      padding: 22px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--text);
    }
    .related-grid a:hover {
      border-color: var(--accent);
    }
    .related-grid h3 {
      margin: 0 0 10px;
      font-size: 1.12rem;
    }
    .related-grid p {
      margin: 0 0 18px;
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.55;
    }
    .related-grid span {
      margin-top: auto;
      color: var(--accent);
      font-size: 0.8rem;
      font-weight: 800;
    }
    @media (max-width: 900px) {
      .hero-layout {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .release-card {
        max-width: 520px;
      }
      .facts {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .facts div:nth-child(3) {
        border-left: 0;
        border-top: 1px solid var(--line);
      }
      .facts div:nth-child(4) {
        border-top: 1px solid var(--line);
      }
      .detail-layout {
        grid-template-columns: 1fr;
        gap: 0;
      }
      .dossier-nav {
        position: static;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0;
        padding: 0 0 30px;
        border-bottom: 1px solid var(--line);
      }
      .dossier-nav > span {
        grid-column: 1 / -1;
      }
      .metric-grid {
        grid-template-columns: 1fr;
      }
      .metric-card {
        min-height: 0;
      }
      .feature-row {
        grid-template-columns: 42px 190px minmax(0, 1fr);
      }
      .roadmap-list article {
        grid-template-columns: 200px minmax(0, 1fr);
      }
      .roadmap-list article > a {
        grid-column: 2;
      }
    }
    @media (max-width: 640px) {
      .detail-width {
        width: min(100% - 28px, 1180px);
      }
      .detail-hero {
        padding-top: 28px;
      }
      .back {
        margin-bottom: 30px;
      }
      h1 {
        font-size: clamp(3rem, 18vw, 5rem);
      }
      .facts {
        grid-template-columns: 1fr;
        margin-top: 36px;
      }
      .facts div,
      .facts div + div {
        padding: 16px 0;
        border-left: 0;
        border-top: 1px solid var(--line);
      }
      .dossier-nav {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .content-section {
        padding-bottom: 60px;
      }
      .section-heading {
        display: block;
      }
      .count {
        display: block;
        margin-top: 12px;
      }
      .evidence-note {
        grid-template-columns: 1fr;
        gap: 8px;
      }
      .timeline-item {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .timeline-meta {
        flex-direction: row;
        align-items: center;
      }
      .change-list {
        grid-template-columns: 1fr;
      }
      .table-wrap {
        overflow: visible;
        border: 0;
        background: transparent;
      }
      table,
      tbody,
      tr,
      th,
      td {
        display: block;
        min-width: 0;
      }
      thead {
        display: none;
      }
      tbody tr {
        margin-bottom: 14px;
        border: 1px solid var(--line-strong);
        background: var(--surface);
      }
      tbody th,
      tbody td {
        width: auto;
        padding: 13px 15px;
        border-right: 0;
      }
      tbody td::before {
        content: attr(data-label);
        display: block;
        margin-bottom: 4px;
        color: var(--muted);
        font-size: 0.64rem;
        font-weight: 850;
        letter-spacing: 0.07em;
        text-transform: uppercase;
      }
      .feature-row {
        grid-template-columns: 34px minmax(0, 1fr);
      }
      .feature-explanation {
        grid-column: 2;
      }
      .limits-panel {
        grid-template-columns: 1fr;
        gap: 22px;
        padding: 23px;
      }
      .roadmap-list article {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .roadmap-list article > a {
        grid-column: 1;
      }
      .related-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ToolDetailComponent implements OnInit {
  tool?: AiTool;
  dossier?: ToolDossier;
  related: Comparison[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get("slug");
    this.tool = AI_TOOLS.find((item) => item.slug === slug);
    if (!this.tool) {
      this.seo.noIndex();
      return;
    }
    this.dossier =
      AI_TOOL_DETAILS[this.tool.slug] ?? buildFallbackDossier(this.tool);
    this.related = COMPARISONS.filter(
      (comparison) =>
        comparison.left === this.tool?.slug ||
        comparison.right === this.tool?.slug,
    );
    this.seo.set({
      title: `${this.tool.name}: release history, versions, features & roadmap`,
      description: `${this.tool.name} research dossier: launch date, version timeline, previous-vs-current evidence, how key features work, limitations and officially announced roadmap. Verified ${this.tool.verified}.`,
      path: `/tools/${this.tool.slug}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: this.tool.name,
        applicationCategory: "AIApplication",
        description: this.dossier.positioning,
        datePublished: this.dossier.launched,
        dateModified: this.tool.verified,
        author: { "@type": "Organization", name: this.tool.company },
      },
    });
  }
}
