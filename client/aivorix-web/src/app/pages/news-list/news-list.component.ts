import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NEWS } from "../../data/news.data";
import { SeoService } from "../../services/seo.service";
@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `<section class="page-hero">
      <div class="container">
        <span class="eyebrow">AI News</span>
        <h1>What changed, why it matters.</h1>
        <p class="lead">
          Original summaries and context linked back to primary or reputable
          reporting sources.
        </p>
        <input
          class="search"
          [(ngModel)]="q"
          placeholder="Search news…"
          aria-label="Search news"
        />
      </div>
    </section>
    <section class="section">
      <div class="container news-list">
        @for (a of filtered(); track a.slug) {
          <article class="list-card">
            <div>
              <span class="chip">{{ a.category }}</span
              ><span class="date">{{ a.date }}</span>
            </div>
            <h2>
              <a [routerLink]="['/news', a.slug]">{{ a.title }}</a>
            </h2>
            <p>{{ a.summary }}</p>
            <div class="source">
              Primary/reporting source: {{ a.sourceName }}
            </div>
          </article>
        }
      </div>
    </section>`,
})
export class NewsListComponent implements OnInit {
  q = "";
  items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.set({
      title: "AI News",
      description:
        "Source-backed AI news covering OpenAI, Anthropic, Google, Meta, SpaceXAI, Perplexity and the fast-changing AI market.",
      path: "/news",
    });
  }
  filtered() {
    const s = this.q.trim().toLowerCase();
    return s
      ? this.items.filter((x) =>
          (x.title + " " + x.summary + " " + x.category)
            .toLowerCase()
            .includes(s),
        )
      : this.items;
  }
}
