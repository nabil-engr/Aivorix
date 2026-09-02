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
        <h1>The AI updates worth knowing.</h1>
        <p class="lead">
          Clear, original summaries of important AI launches, business moves and
          safety developments, with links to the reporting behind each story.
        </p>
        <input
          class="search"
          [(ngModel)]="q"
          placeholder="Search AI news..."
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
              Source: {{ a.sourceName }}
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
      title: "Latest AI News, Model Releases and Product Updates",
      description:
        "Read the latest AI news in plain English, including model launches, product updates, pricing changes, safety research and major industry developments.",
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
