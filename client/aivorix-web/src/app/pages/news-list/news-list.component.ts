import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NEWS } from "../../data/news.data";
import { SeoService } from "../../services/seo.service";
import { CacheService } from "../../services/cache.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule, PaginationComponent],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">AI News</span>
        <h1>AI news, explained without the jargon.</h1>
        <p class="lead">
          Understand what changed, why it matters and whether it affects the AI
          tools you use. Every story links to its original source.
        </p>
        <input
          class="search"
          [(ngModel)]="q"
          (ngModelChange)="onSearchChange()"
          placeholder="Search AI news..."
          aria-label="Search news"
        />
      </div>
    </section>
    <section class="section">
      <div class="container news-list" id="news-container">
        @if (paginatedItems().length === 0) {
          <div class="card" style="padding: 32px; text-align: center; color: var(--muted);">
            <p>No news articles found matching "<strong>{{ q }}</strong>".</p>
          </div>
        } @else {
          @for (a of paginatedItems(); track a.slug) {
            <article class="list-card">
              <div>
                <span class="chip">{{ a.category }}</span>
                <span class="date">{{ a.date }}</span>
              </div>
              <h2>
                <a [routerLink]="['/news', a.slug]">{{ a.title }}</a>
              </h2>
              <p>{{ a.summary }}</p>
              <div class="source">Source: {{ a.sourceName }}</div>
            </article>
          }

          <app-pagination
            [currentPage]="currentPage"
            [totalItems]="filtered().length"
            [pageSize]="pageSize"
            itemName="articles"
            (pageChange)="onPageChange($event)"
          ></app-pagination>
        }
      </div>
    </section>
  `,
})
export class NewsListComponent implements OnInit {
  q = "";
  currentPage = 1;
  readonly pageSize = 10;
  readonly items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

  constructor(
    private seo: SeoService,
    private cache: CacheService,
  ) {}

  ngOnInit() {
    this.seo.set({
      title: "Latest AI News, Model Releases and Product Updates",
      description:
        "Read the latest AI news in plain English, including model launches, product updates, pricing changes, safety research and major industry developments.",
      path: "/news",
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  filtered() {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.items;

    const cacheKey = `news:filter:${s}`;
    const cached = this.cache.get<typeof this.items>(cacheKey);
    if (cached) return cached;

    const results = this.items.filter((x) =>
      (x.title + " " + x.summary + " " + x.category)
        .toLowerCase()
        .includes(s),
    );
    return this.cache.set(cacheKey, results);
  }

  paginatedItems() {
    const list = this.filtered();
    const start = (this.currentPage - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (typeof window !== "undefined") {
      const el = document.getElementById("news-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }
}
