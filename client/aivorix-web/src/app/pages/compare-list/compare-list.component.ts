import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { SeoService } from "../../services/seo.service";
import { CacheService } from "../../services/cache.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, PaginationComponent],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">AI Comparisons</span>
        <h1>Compare every AI tool and model pair.</h1>
        <p class="lead">
          See the practical differences in features, pricing and day-to-day use.
          Browse {{ items.length }} consistent pair guides covering products and
          models. Every page includes a review date, practical fit and official
          sources.
        </p>
        <a routerLink="/compare" class="btn primary">Compare any two AI tools</a>
      </div>
    </section>
    <section class="section">
      <div class="container" id="comparison-container">
        <div class="comparison-search card">
          <label for="comparison-query">Search comparisons</label>
          <input
            id="comparison-query"
            type="search"
            [(ngModel)]="query"
            (ngModelChange)="onSearchChange()"
            placeholder="Try GPT-6 Astra vs Claude Sonnet 5"
          />
          <span>{{ filtered.length }} comparisons</span>
        </div>

        @if (paginatedItems.length === 0) {
          <div class="card" style="padding: 32px; text-align: center; color: var(--muted); margin-bottom: 24px;">
            <p>No comparisons found matching "<strong>{{ query }}</strong>".</p>
          </div>
        } @else {
          <div class="comparison-grid">
            @for (c of paginatedItems; track c.slug) {
              <a class="card comparison-card" [routerLink]="['/comparisons', c.slug]">
                <div class="vs">VS</div>
                <h2>{{ c.title }}</h2>
                <p>{{ c.intro }}</p>
                <div class="verified">Verified {{ c.updated }}</div>
              </a>
            }
          </div>

          <app-pagination
            [currentPage]="currentPage"
            [totalItems]="filtered.length"
            [pageSize]="pageSize"
            itemName="comparisons"
            (pageChange)="onPageChange($event)"
          ></app-pagination>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .comparison-search {
        display: grid;
        grid-template-columns: auto minmax(240px, 1fr) auto;
        gap: 14px;
        align-items: center;
        margin-bottom: 24px;
        padding: 18px;
      }
      .comparison-search label {
        font-weight: 800;
      }
      .comparison-search input {
        min-height: 46px;
        border: 1px solid var(--line-strong);
        background: var(--surface);
        padding: 0 14px;
        color: var(--text);
      }
      .comparison-search span {
        color: var(--muted);
        font-size: 0.8rem;
      }
      .comparison-card p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      @media (max-width: 680px) {
        .comparison-search {
          grid-template-columns: 1fr;
        }
        .comparison-search span {
          justify-self: start;
        }
      }
    `,
  ],
})
export class CompareListComponent implements OnInit {
  readonly items = COMPARISONS;
  query = "";
  currentPage = 1;
  readonly pageSize = 24;

  constructor(
    private seo: SeoService,
    private cache: CacheService,
  ) {}

  ngOnInit() {
    this.seo.set({
      title: "AI Model Comparisons: Every Tool, Price and Feature Pair",
      description: `Search ${this.items.length} AI comparisons covering GPT-6 Astra, GPT-5.6, GPT-5.5, Claude Fable, Opus, Sonnet, Haiku, ChatGPT, Gemini and more.`,
      path: "/comparisons",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Aivorix AI comparisons",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: this.items.length,
        },
      },
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  get filtered() {
    const term = this.query.trim().toLowerCase();
    if (!term) return this.items;

    const cacheKey = `comp:filter:${term}`;
    const cached = this.cache.get<typeof this.items>(cacheKey);
    if (cached) return cached;

    const results = this.items.filter((item) =>
      `${item.title} ${item.intro} ${item.left} ${item.right}`
        .toLowerCase()
        .includes(term),
    );
    return this.cache.set(cacheKey, results);
  }

  get paginatedItems() {
    const list = this.filtered;
    const start = (this.currentPage - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (typeof window !== "undefined") {
      const el = document.getElementById("comparison-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }
}
