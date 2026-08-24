import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { AI_TOOLS } from "../../data/tools.data";
import { SeoService } from "../../services/seo.service";
@Component({
  standalone: true,
  imports: [RouterLink],
  template: `@if (c) {
      <article>
        <header class="article-hero">
          <div class="container article-width">
            <a routerLink="/comparisons" class="back">← Comparisons</a
            ><span class="eyebrow">Last verified {{ c.updated }}</span>
            <h1>{{ c.title }}</h1>
            <p class="lead">{{ c.intro }}</p>
          </div>
        </header>
        <div class="container article-width article-body">
          <div class="verdict">
            <span class="eyebrow">Quick verdict</span>
            <p>{{ c.verdict }}</p>
          </div>
          <div class="winner-grid">
            <div class="card">
              <small>Choose {{ left?.name }} for</small>
              <h3>{{ c.bestLeft }}</h3>
            </div>
            <div class="card">
              <small>Choose {{ right?.name }} for</small>
              <h3>{{ c.bestRight }}</h3>
            </div>
          </div>
          <h2>Side-by-side comparison</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>{{ left?.name }}</th>
                  <th>{{ right?.name }}</th>
                </tr>
              </thead>
              <tbody>
                @for (r of c.rows; track r[0]) {
                  <tr>
                    <th>{{ r[0] }}</th>
                    <td>{{ r[1] }}</td>
                    <td>{{ r[2] }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <h2>How we reached this verdict</h2>
          <p>
            We compare documented product capabilities, current plan structure,
            workflow fit and official provider information. We do not turn
            vendor benchmark charts into a universal “winner” score because
            evaluation harnesses and settings differ.
          </p>
          <div class="source-panel">
            <h3>Official sources</h3>
            <ul>
              @for (s of c.sources; track s) {
                <li>
                  <a [href]="s" target="_blank" rel="nofollow noopener">{{
                    s
                  }}</a>
                </li>
              }
            </ul>
          </div>
          <p class="updated-note">
            AI products change fast. This comparison was checked on
            {{ c.updated }}. Re-check pricing, regional availability and plan
            limits before buying.
          </p>
        </div>
      </article>
    } @else {
      <section class="page-hero">
        <div class="container"><h1>Comparison not found</h1></div>
      </section>
    }`,
})
export class CompareDetailComponent implements OnInit {
  c: any;
  left: any;
  right: any;
  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
  ) {}
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get("slug");
    this.c = COMPARISONS.find((x) => x.slug === slug);
    if (!this.c) {
      this.seo.noIndex();
      return;
    }
    this.left = AI_TOOLS.find((t) => t.slug === this.c.left);
    this.right = AI_TOOLS.find((t) => t.slug === this.c.right);
    this.seo.set({
      title: this.c.title,
      description: this.c.intro,
      path: "/comparisons/" + this.c.slug,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: this.c.title,
        dateModified: this.c.updated,
        author: { "@type": "Organization", name: "Aivorix Editorial" },
      },
    });
  }
}
