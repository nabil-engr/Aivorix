import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { AI_TOOLS } from "../../data/tools.data";
import { SeoService } from "../../services/seo.service";

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Interactive</span>
        <h1>AI comparison builder</h1>
        <p class="lead">
          Pick two products to compare their current profile, pricing note and
          documented feature set.
        </p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="picker card">
          <label>
            Tool A
            <select [(ngModel)]="a" aria-label="First AI tool">
              @for (tool of tools; track tool.slug) {
                <option [ngValue]="tool.slug" [disabled]="tool.slug === b">
                  {{ tool.name }}
                </option>
              }
            </select>
          </label>
          <div class="vs big" aria-hidden="true">VS</div>
          <label>
            Tool B
            <select [(ngModel)]="b" aria-label="Second AI tool">
              @for (tool of tools; track tool.slug) {
                <option [ngValue]="tool.slug" [disabled]="tool.slug === a">
                  {{ tool.name }}
                </option>
              }
            </select>
          </label>
        </div>

        @if (left && right) {
          <div class="builder-grid">
            <div class="card tool-profile">
              <span class="chip">{{ left.category }}</span>
              <h2>{{ left.name }}</h2>
              <p>{{ left.bestFor }}</p>
              <strong>{{ left.price }}</strong>
              <ul>
                @for (feature of left.features; track feature) {
                  <li>{{ feature }}</li>
                }
              </ul>
              <a [routerLink]="['/tools', left.slug]">Full profile →</a>
            </div>
            <div class="card tool-profile">
              <span class="chip">{{ right.category }}</span>
              <h2>{{ right.name }}</h2>
              <p>{{ right.bestFor }}</p>
              <strong>{{ right.price }}</strong>
              <ul>
                @for (feature of right.features; track feature) {
                  <li>{{ feature }}</li>
                }
              </ul>
              <a [routerLink]="['/tools', right.slug]">Full profile →</a>
            </div>
          </div>
        }

        @if (left && right) {
          <nav class="compare-jump" aria-label="Comparison sections">
            <a href="#coverage">Visual comparison</a>
            <a href="#full-comparison">Full comparison</a>
            <a href="#decision-guide">Decision guide</a>
          </nav>

          <section id="coverage" class="compare-deep-section">
            <div class="compare-heading"><span>01</span><div><p class="eyebrow">Visual comparison</p><h2>Documented workflow coverage</h2>
              <p>These bars summarize use cases mentioned in each product profile. They show documented breadth, not model intelligence or benchmark performance.</p></div></div>
            <div class="coverage-chart">
              @for (dimension of dimensions; track dimension.label) {
                <div class="coverage-row">
                  <div class="coverage-label"><strong>{{ dimension.label }}</strong><small>{{ dimension.description }}</small></div>
                  <div class="paired-bars">
                    <div class="bar-line"><span>{{ left.name }}</span><div class="coverage-track"><i class="coverage-fill first" [style.width.%]="coverageScore(left, dimension)"></i></div><b>{{ coverageScore(left, dimension) }}%</b></div>
                    <div class="bar-line"><span>{{ right.name }}</span><div class="coverage-track"><i class="coverage-fill second" [style.width.%]="coverageScore(right, dimension)"></i></div><b>{{ coverageScore(right, dimension) }}%</b></div>
                  </div>
                </div>
              }
            </div>
          </section>

          <section id="full-comparison" class="compare-deep-section">
            <div class="compare-heading"><span>02</span><div><p class="eyebrow">End-to-end comparison</p><h2>Everything that matters before you choose</h2></div></div>
            <div class="table-wrap builder-table"><table>
              <thead><tr><th>What to compare</th><th>{{ left.name }}</th><th>{{ right.name }}</th></tr></thead>
              <tbody>
                @for (row of detailRows; track row.label) {
                  <tr><th scope="row">{{ row.label }}</th><td [attr.data-label]="left.name">{{ row.left }}</td><td [attr.data-label]="right.name">{{ row.right }}</td></tr>
                }
                <tr><th scope="row">Documented features</th>
                  <td [attr.data-label]="left.name"><ul>@for (feature of left.features; track feature) { <li>{{ feature }}</li> }</ul></td>
                  <td [attr.data-label]="right.name"><ul>@for (feature of right.features; track feature) { <li>{{ feature }}</li> }</ul></td>
                </tr>
              </tbody>
            </table></div>
          </section>

          <section id="decision-guide" class="compare-deep-section">
            <div class="compare-heading"><span>03</span><div><p class="eyebrow">Decision guide</p><h2>Which tool fits your work?</h2></div></div>
            <div class="decision-grid">
              <article><small>Choose {{ left.name }} if...</small><h3>{{ left.bestFor }}</h3><ul>@for (feature of left.features.slice(0, 3); track feature) { <li>{{ feature }}</li> }</ul></article>
              <article><small>Choose {{ right.name }} if...</small><h3>{{ right.bestFor }}</h3><ul>@for (feature of right.features.slice(0, 3); track feature) { <li>{{ feature }}</li> }</ul></article>
            </div>
            <div class="shared-ground"><span class="eyebrow">Practical takeaway</span><p>{{ quickConclusion }}</p></div>
          </section>
        }
        @if (matching) {
          <div class="match card">
            <h3>We have a detailed editorial comparison for this pair.</h3>
            <a
              class="btn primary"
              [routerLink]="['/comparisons', matching.slug]"
              >Read {{ matching.title }}</a
            >
          </div>
        } @else {
          <div class="match card">
            <div>
              <h3>No dedicated editorial comparison yet.</h3>
              <p class="muted">
                The product profiles above still provide a quick documented
                overview.
              </p>
            </div>
            <a class="btn" routerLink="/comparisons">Browse comparisons</a>
          </div>
        }
      </div>
    </section>
  `,
})
export class CompareBuilderComponent implements OnInit {
  readonly tools = AI_TOOLS;
  readonly dimensions = [
    { label: "Research", terms: ["research", "search", "source", "web"], description: "Finding and analyzing information" },
    { label: "Coding", terms: ["code", "coding", "developer", "cli"], description: "Software and technical work" },
    { label: "Creative", terms: ["image", "video", "design", "creative"], description: "Visual and content creation" },
    { label: "Productivity", terms: ["productivity", "document", "workspace", "meeting"], description: "Everyday work organization" },
    { label: "Business", terms: ["enterprise", "team", "brand", "organization"], description: "Professional deployment" },
    { label: "Multimodal", terms: ["image", "voice", "audio", "video"], description: "Work beyond plain text" },
  ] as const;  a = "chatgpt";
  b = "claude";

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.set({
      title: "Compare AI Tools Side by Side: Features, Pricing and Use Cases",
      description:
        "Compare any two AI tools across pricing, features, workflow coverage, strengths and trade-offs, including ChatGPT, Claude, Gemini, Copilot and more.",
      path: "/compare",
    });
  }

  get left() {
    return this.tools.find((tool) => tool.slug === this.a);
  }

  get right() {
    return this.tools.find((tool) => tool.slug === this.b);
  }

  get detailRows() {
    if (!this.left || !this.right) return [];
    return [
      { label: "Company", left: this.left.company, right: this.right.company },
      { label: "Product type", left: this.left.category, right: this.right.category },
      { label: "Best for", left: this.left.bestFor, right: this.right.bestFor },
      { label: "Pricing snapshot", left: this.left.price, right: this.right.price },
      { label: "Free access", left: this.freeAccess(this.left), right: this.freeAccess(this.right) },
      { label: "Last checked", left: this.left.verified, right: this.right.verified },
      { label: "Official source", left: this.left.source, right: this.right.source },
    ];
  }

  get quickConclusion(): string {
    if (!this.left || !this.right) return "";
    return "Choose " + this.left.name + " when your priority is " + this.left.bestFor.toLowerCase() +
      ". Choose " + this.right.name + " when you mainly need " + this.right.bestFor.toLowerCase() +
      ". Test both with one real task before subscribing.";
  }

  coverageScore(tool: any, dimension: { terms: readonly string[] }): number {
    const profile = [tool.category, tool.bestFor, ...tool.features].join(" ").toLowerCase();
    const matches = dimension.terms.filter((term) => profile.includes(term)).length;
    return Math.round((matches / dimension.terms.length) * 100);
  }

  private freeAccess(tool: any): string {
    return tool.price.toLowerCase().includes("free")
      ? "Free option mentioned; limits may apply"
      : "No free option confirmed in this profile";
  }
  get matching() {
    return COMPARISONS.find(
      (comparison) =>
        (comparison.left === this.a && comparison.right === this.b) ||
        (comparison.left === this.b && comparison.right === this.a),
    );
  }
}
