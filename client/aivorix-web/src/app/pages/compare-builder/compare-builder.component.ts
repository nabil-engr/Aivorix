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
  a = "chatgpt";
  b = "claude";

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.set({
      title: "AI Comparison Builder",
      description:
        "Compare ChatGPT, Claude, Gemini, Perplexity, Grok, Meta AI and Microsoft Copilot side by side.",
      path: "/compare",
    });
  }

  get left() {
    return this.tools.find((tool) => tool.slug === this.a);
  }

  get right() {
    return this.tools.find((tool) => tool.slug === this.b);
  }

  get matching() {
    return COMPARISONS.find(
      (comparison) =>
        (comparison.left === this.a && comparison.right === this.b) ||
        (comparison.left === this.b && comparison.right === this.a),
    );
  }
}
