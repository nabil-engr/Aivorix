import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NEWS } from "../../data/news.data";
import { SeoService } from "../../services/seo.service";
@Component({
  standalone: true,
  imports: [RouterLink],
  template: `@if (article) {
      <article>
        <header class="article-hero">
          <div class="container article-width">
            <a routerLink="/news" class="back">← AI News</a>
            <div>
              <span class="chip">{{ article.category }}</span
              ><span class="date">{{ article.date }}</span>
            </div>
            <h1>{{ article.title }}</h1>
            <p class="lead">{{ article.summary }}</p>
            <div class="fact-box">
              Verified source:
              <a
                [href]="article.sourceUrl"
                target="_blank"
                rel="nofollow noopener"
                >{{ article.sourceName }} ↗</a
              >
            </div>
          </div>
        </header>
        <div class="container article-width article-body">
          @for (p of article.body; track p) {
            <p>{{ p }}</p>
          }
          <h2>Key takeaways</h2>
          <ul>
            @for (t of article.takeaways; track t) {
              <li>{{ t }}</li>
            }
          </ul>
          <div class="source-panel">
            <h3>Source and verification</h3>
            <p>
              This Aivorix article is an original summary and analysis. The
              factual release/reporting source is linked below. Product details
              can change after publication.
            </p>
            <a
              class="btn"
              [href]="article.sourceUrl"
              target="_blank"
              rel="nofollow noopener"
              >Read the original source</a
            >
          </div>
        </div>
      </article>
    } @else {
      <section class="page-hero">
        <div class="container">
          <h1>Article not found</h1>
          <a routerLink="/news">Back to AI News</a>
        </div>
      </section>
    }`,
})
export class NewsDetailComponent implements OnInit {
  article: any;
  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
  ) {}
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get("slug");
    this.article = NEWS.find((x) => x.slug === slug);
    if (!this.article) {
      this.seo.noIndex();
      return;
    }
    this.seo.set({
      title: this.article.title,
      description: this.article.summary,
      path: "/news/" + this.article.slug,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: this.article.title,
        datePublished: this.article.date,
        dateModified: this.article.date,
        author: { "@type": "Organization", name: "Aivorix Editorial" },
        publisher: { "@type": "Organization", name: "Aivorix" },
        mainEntityOfPage: "https://aivorix.com/news/" + this.article.slug,
      },
    });
  }
}
