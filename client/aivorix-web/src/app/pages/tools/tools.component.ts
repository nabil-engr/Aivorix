import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AI_TOOLS } from "../../data/tools.data";
import { SeoService } from "../../services/seo.service";
import { CacheService } from "../../services/cache.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule, PaginationComponent],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">AI Tools Directory</span>
        <h1>Choose an AI tool that fits your real work.</h1>
        <p class="lead">
          Browse clear profiles of leading AI tools for writing, coding, research,
          design, video, audio and everyday productivity.
        </p>
        <input
          class="search"
          [(ngModel)]="q"
          (ngModelChange)="onSearchChange()"
          placeholder="Search tools, companies or use cases..."
          aria-label="Search tools"
        />
      </div>
    </section>
    <section class="section">
      <div class="container" id="tools-container">
        @if (paginatedItems().length === 0) {
          <div class="card" style="padding: 32px; text-align: center; color: var(--muted);">
            <p>No tools found matching "<strong>{{ q }}</strong>".</p>
          </div>
        } @else {
          <div class="tool-directory">
            @for (t of paginatedItems(); track t.slug) {
              <a class="card tool-card" [routerLink]="['/tools', t.slug]">
                <div>
                  <span class="chip">{{ t.category }}</span>
                  <span class="date">Verified {{ t.verified }}</span>
                </div>
                <h2>{{ t.name }}</h2>
                <p class="muted">{{ t.company }}</p>
                <p>{{ t.bestFor }}</p>
                <strong>{{ t.price }}</strong>
                <span class="open">View tool details</span>
              </a>
            }
          </div>

          <app-pagination
            [currentPage]="currentPage"
            [totalItems]="filtered().length"
            [pageSize]="pageSize"
            itemName="tools"
            (pageChange)="onPageChange($event)"
          ></app-pagination>
        }
      </div>
    </section>
  `,
})
export class ToolsComponent implements OnInit {
  q = "";
  currentPage = 1;
  readonly pageSize = 12;
  readonly items = AI_TOOLS;

  constructor(
    private seo: SeoService,
    private cache: CacheService,
  ) {}

  ngOnInit() {
    this.seo.set({
      title: "AI Tools Directory: Compare Features, Pricing and Uses",
      description:
        "Explore AI tools for writing, coding, research, design, video and productivity. Compare features, pricing notes and the tasks each product handles best.",
      path: "/tools",
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  filtered() {
    const s = this.q.toLowerCase().trim();
    if (!s) return this.items;

    const cacheKey = `tools:filter:${s}`;
    const cached = this.cache.get<typeof this.items>(cacheKey);
    if (cached) return cached;

    const results = this.items.filter((x) =>
      (x.name + " " + x.company + " " + x.category + " " + x.bestFor)
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
      const el = document.getElementById("tools-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }
}
