import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { COMPARISON_PROFILE_MAP } from "../../data/comparison-profiles.data";
import { SeoService } from "../../services/seo.service";
@Component({
  standalone: true,
  imports: [RouterLink],
  template: `@if (c) {
      <article class="comparison-detail">
        <header class="article-hero">
          <div class="container article-width">
            <div class="comparison-meta">
              <a routerLink="/comparisons" class="back"
                ><span aria-hidden="true">←</span> Comparisons</a
              >
              <span class="meta-divider" aria-hidden="true"></span>
              <span class="verified"
                ><span class="verified-dot" aria-hidden="true"></span>Last
                verified {{ c.updated }}</span
              >
            </div>
            <h1>{{ c.title }}</h1>
            <p class="lead">{{ c.intro }}</p>
          </div>
        </header>
        <div class="container article-width article-body">
          <section class="verdict" aria-labelledby="quick-verdict">
            <span class="eyebrow">Quick verdict</span>
            <h2 id="quick-verdict">{{ left?.name }} or {{ right?.name }}?</h2>
            <p>{{ c.verdict }}</p>
          </section>
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
          <div class="profile-summary-grid">
            @for (profile of [left, right]; track profile?.slug) {
              <div class="card">
                <small>{{ profile?.provider }} · {{ profile?.kind }}</small>
                <h3>{{ profile?.name }}</h3>
                <p>{{ profile?.description }}</p>
                <a [href]="profile?.source" target="_blank" rel="nofollow noopener">Official specification ↗</a>
              </div>
            }
          </div>
          <div class="comparison-section-heading">
            <span>01</span>
            <h2>Side-by-side comparison</h2>
          </div>
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
                @for (r of comparisonRows; track r[0]) {
                  <tr>
                    <th>{{ r[0] }}</th>
                    <td>{{ r[1] }}</td>
                    <td>{{ r[2] }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div class="comparison-section-heading">
            <span>02</span>
            <h2>How we reached this verdict</h2>
          </div>
          <p>
            We looked at the things that affect everyday use: what each product
            can do, how its plans are structured, where it fits into your
            existing workflow, and what the provider currently documents.
            Benchmark results are useful context, but they are not a universal
            winner score because test settings and tools vary.
          </p>
          <div class="comparison-section-heading"><span>03</span><h2>Common questions</h2></div>
          <section class="faq-list">
            @for (faq of faqs; track faq.question) {
              <details><summary>{{ faq.question }}</summary><p>{{ faq.answer }}</p></details>
            }
          </section>
          <section class="source-panel" aria-labelledby="official-sources">
            <div class="comparison-section-heading compact">
              <span>04</span>
              <h3 id="official-sources">Official sources</h3>
            </div>
            <p class="source-intro">
              Use these provider pages to confirm current features, pricing and
              availability.
            </p>
            <ul>
              @for (s of c.sources; track s) {
                <li>
                  <a [href]="s" target="_blank" rel="nofollow noopener">{{
                    s
                  }}</a>
                </li>
              }
            </ul>
          </section>
          <p class="updated-note">
            AI tools change quickly. We checked this page on {{ c.updated }}.
            Before you subscribe, confirm the latest price, regional
            availability and usage limits on the provider website.
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
  get faqs() {
    if (!this.c || !this.left || !this.right) return [];
    return [
      { question: `${this.left.name} or ${this.right.name}: which should I choose?`, answer: `Choose ${this.left.name} for ${this.c.bestLeft.toLowerCase()}. Choose ${this.right.name} for ${this.c.bestRight.toLowerCase()}. Validate the decision with your own prompts and total task cost.` },
      { question: `Is ${this.left.name} cheaper than ${this.right.name}?`, answer: `Pricing units can differ. ${this.left.name}: ${this.left.pricing}. ${this.right.name}: ${this.right.pricing}. Check tool charges, plan limits, caching and long-context rules before comparing totals.` },
      { question: `Which is better for coding and agent work?`, answer: `Capability depends on the selected product surface, tools and harness. ${this.left.name} is positioned for ${this.left.bestFor.toLowerCase()}; ${this.right.name} is positioned for ${this.right.bestFor.toLowerCase()}. Run the same repository task on both.` },
      { question: `How do their context windows compare?`, answer: `${this.left.name} lists ${this.left.context}; ${this.right.name} lists ${this.right.context}. A larger limit does not by itself guarantee better retrieval or lower cost.` },
    ];
  }
  get comparisonRows(): readonly (readonly string[])[] {
    if (!this.c || !this.left || !this.right) return [];
    const important = [
      ["Company", this.left.provider, this.right.provider],
      ["Product category", `${this.left.kind} · ${this.left.category}`, `${this.right.kind} · ${this.right.category}`],
      ["Current pricing note", this.left.pricing, this.right.pricing],
      ["Best suited to", this.left.bestFor, this.right.bestFor],
      [
        "Key capabilities",
        this.left.features.join("; "), this.right.features.join("; "),
      ],
      ["Last verified", this.left.verified, this.right.verified],
      ["Official product source", this.left.source, this.right.source],
    ] as const;
    const existing = new Set(
      this.c.rows.map((row: readonly string[]) => row[0].toLowerCase()),
    );
    return [
      ...this.c.rows,
      ...important.filter((row) => !existing.has(row[0].toLowerCase())),
    ];
  }
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
    this.left = COMPARISON_PROFILE_MAP.get(this.c.left);
    this.right = COMPARISON_PROFILE_MAP.get(this.c.right);
    this.seo.set({
      title: this.c.title,
      description: `${this.c.intro} See current price, context window, features and best-use guidance.`,
      path: "/comparisons/" + this.c.slug,
      jsonLd: { "@context": "https://schema.org", "@graph": [
        { "@type": "Article", headline: this.c.title, dateModified: this.c.updated, author: { "@type": "Organization", name: "Aivorix Editorial" }, about: [this.left.name, this.right.name] },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Comparisons", item: "https://aivorix.com/comparisons" },
          { "@type": "ListItem", position: 2, name: this.c.title, item: `https://aivorix.com/comparisons/${this.c.slug}` },
        ] },
        { "@type": "FAQPage", mainEntity: this.faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      ] },
    });
  }
}
