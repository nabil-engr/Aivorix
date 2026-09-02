import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NEWS } from "../../data/news.data";
import { SeoService } from "../../services/seo.service";

type NewsArticle = (typeof NEWS)[number];

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `@if (article) {
      <article>
        <header class="article-hero">
          <div class="container article-shell">
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

        <div class="container article-shell article-layout">
          <main class="article-body">
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
                factual release/reporting source is linked below. Product
                details can change after publication.
              </p>
              <a
                class="btn"
                [href]="article.sourceUrl"
                target="_blank"
                rel="nofollow noopener"
                >Read the original source</a
              >
            </div>
          </main>

          <aside class="recent-panel" aria-label="Recent AI news">
            <div class="aside-heading">
              <span class="eyebrow">Latest</span>
              <h2>Recent news</h2>
            </div>
            @for (item of recent; track item.slug) {
              <a class="recent-item" [routerLink]="['/news', item.slug]"
                ><span>{{ item.category }} · {{ item.date }}</span
                ><strong>{{ item.title }}</strong></a
              >
            }
            <a class="all-news" routerLink="/news">View all AI news →</a>
          </aside>
        </div>

        @if (related.length) {
          <section class="related-news">
            <div class="container article-shell">
              <div class="section-head">
                <div>
                  <span class="eyebrow">Keep reading</span>
                  <h2>Related news</h2>
                </div>
                <a routerLink="/news">All news →</a>
              </div>
              <div class="related-grid">
                @for (item of related; track item.slug) {
                  <a class="related-card" [routerLink]="['/news', item.slug]"
                    ><div>
                      <span class="chip">{{ item.category }}</span
                      ><span class="date">{{ item.date }}</span>
                    </div>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.summary }}</p>
                    <strong>Read article →</strong></a
                  >
                }
              </div>
            </div>
          </section>
        }
      </article>
    } @else {
      <section class="page-hero">
        <div class="container">
          <h1>Article not found</h1>
          <a routerLink="/news">Back to AI News</a>
        </div>
      </section>
    }`,
  styles: `
    .article-shell {
      width: min(1120px, calc(100% - 40px));
    }
    .article-hero .article-shell {
      max-width: 1120px;
    }
    .article-layout {
      display: grid;
      grid-template-columns: minmax(0, 760px) 280px;
      gap: 72px;
      align-items: start;
      padding-top: 24px;
    }
    .article-body {
      min-width: 0;
    }
    .recent-panel {
      position: sticky;
      top: 92px;
      padding: 24px 0 0;
      border-top: 2px solid var(--text);
    }
    .aside-heading h2 {
      margin: 5px 0 18px;
      font-size: 1.55rem;
    }
    .recent-item {
      display: block;
      padding: 17px 0;
      border-top: 1px solid var(--line);
      color: var(--text);
    }
    .recent-item span {
      display: block;
      margin-bottom: 7px;
      color: var(--muted);
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .recent-item strong {
      font-size: 0.94rem;
      line-height: 1.38;
    }
    .recent-item:hover strong,
    .all-news:hover {
      color: var(--accent);
    }
    .all-news {
      display: inline-block;
      margin-top: 17px;
      color: var(--accent);
      font-size: 0.84rem;
      font-weight: 800;
    }
    .related-news {
      padding: 68px 0 84px;
      border-top: 1px solid var(--line);
      background: var(--surface-2);
    }
    .section-head {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      align-items: end;
      margin-bottom: 27px;
    }
    .section-head h2 {
      margin: 6px 0 0;
      font-size: clamp(2rem, 4vw, 3rem);
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }
    .related-card {
      display: flex;
      flex-direction: column;
      min-height: 280px;
      padding: 23px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--text);
    }
    .related-card:hover {
      border-color: var(--accent);
    }
    .related-card .date {
      margin-left: 9px;
    }
    .related-card h3 {
      margin: 20px 0 11px;
      font-size: 1.18rem;
      line-height: 1.25;
    }
    .related-card p {
      margin: 0 0 20px;
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.6;
    }
    .related-card > strong {
      margin-top: auto;
      color: var(--accent);
      font-size: 0.8rem;
    }
    @media (max-width: 900px) {
      .article-layout {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      .recent-panel {
        position: static;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 28px;
      }
      .aside-heading,
      .all-news {
        grid-column: 1 / -1;
      }
      .related-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 620px) {
      .article-shell {
        width: min(100% - 28px, 1120px);
      }
      .recent-panel,
      .related-grid {
        grid-template-columns: 1fr;
      }
      .section-head {
        display: block;
      }
      .section-head > a {
        display: inline-block;
        margin-top: 12px;
      }
    }
  `,
})
export class NewsDetailComponent implements OnInit {
  article?: NewsArticle;
  recent: NewsArticle[] = [];
  related: NewsArticle[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get("slug");
    this.article = NEWS.find((item) => item.slug === slug);
    if (!this.article) {
      this.seo.noIndex();
      return;
    }
    const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
    this.recent = sorted.filter((item) => item.slug !== slug).slice(0, 5);
    this.related = sorted
      .filter(
        (item) =>
          item.slug !== slug && item.category === this.article?.category,
      )
      .slice(0, 3);
    if (this.related.length < 3) {
      const selected = new Set(this.related.map((item) => item.slug));
      this.related.push(
        ...sorted
          .filter((item) => item.slug !== slug && !selected.has(item.slug))
          .slice(0, 3 - this.related.length),
      );
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
