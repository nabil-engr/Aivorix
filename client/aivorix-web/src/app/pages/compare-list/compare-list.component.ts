import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { SeoService } from "../../services/seo.service";
@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `<section class="page-hero">
      <div class="container">
        <span class="eyebrow">AI Comparisons</span>
        <h1>Compare every AI tool and model pair.</h1>
        <p class="lead">
          See the practical differences in features, pricing and day-to-day use.
          Browse {{ items.length }} consistent pair guides covering products and models. Every page includes a review date, practical fit and official sources.
        </p>
        <a routerLink="/compare" class="btn primary"
          >Compare any two AI tools</a
        >
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="comparison-search card">
          <label for="comparison-query">Search comparisons</label>
          <input id="comparison-query" type="search" [(ngModel)]="query" placeholder="Try GPT-6 Astra vs Claude Sonnet 5" />
          <span>{{ filtered.length }} comparisons</span>
        </div>
        <div class="comparison-grid">
        @for (c of filtered; track c.slug) {
          <a
            class="card comparison-card"
            [routerLink]="['/comparisons', c.slug]"
            ><div class="vs">VS</div>
            <h2>{{ c.title }}</h2>
            <p>{{ c.intro }}</p>
            <div class="verified">Verified {{ c.updated }}</div></a
          >
        }
        </div>
      </div>
    </section>`,
  styles: [`
    .comparison-search{display:grid;grid-template-columns:auto minmax(240px,1fr) auto;gap:14px;align-items:center;margin-bottom:24px;padding:18px}
    .comparison-search label{font-weight:800}.comparison-search input{min-height:46px;border:1px solid var(--line-strong);background:var(--surface);padding:0 14px;color:var(--text)}
    .comparison-search span{color:var(--muted);font-size:.8rem}.comparison-card p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
    @media(max-width:680px){.comparison-search{grid-template-columns:1fr}.comparison-search span{justify-self:start}}
  `],
})
export class CompareListComponent implements OnInit {
  items = COMPARISONS;
  query = "";
  get filtered() {
    const term = this.query.trim().toLowerCase();
    if (!term) return this.items;
    return this.items.filter(item => `${item.title} ${item.intro} ${item.left} ${item.right}`.toLowerCase().includes(term));
  }
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.set({
      title: "AI Model Comparisons: Every Tool, Price and Feature Pair",
      description:
        `Search ${this.items.length} AI comparisons covering GPT-6 Astra, GPT-5.6, GPT-5.5, Claude Fable, Opus, Sonnet, Haiku, ChatGPT, Gemini and more.`,
      path: "/comparisons",
      jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Aivorix AI comparisons", mainEntity: { "@type": "ItemList", numberOfItems: this.items.length } },
    });
  }
}
