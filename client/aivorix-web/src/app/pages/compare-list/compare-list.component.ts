import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { SeoService } from "../../services/seo.service";
@Component({
  standalone: true,
  imports: [RouterLink],
  template: `<section class="page-hero">
      <div class="container">
        <span class="eyebrow">AI Comparisons</span>
        <h1>Compare tools by workflow, not hype.</h1>
        <p class="lead">
          Every page includes a verification date and links to the official
          product/model sources used.
        </p>
        <a routerLink="/compare" class="btn primary"
          >Interactive compare builder</a
        >
      </div>
    </section>
    <section class="section">
      <div class="container comparison-grid">
        @for (c of items; track c.slug) {
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
    </section>`,
})
export class CompareListComponent implements OnInit {
  items = COMPARISONS;
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.set({
      title: "AI Comparisons",
      description:
        "Side-by-side comparisons of ChatGPT, Claude, Gemini, Perplexity, Grok, Microsoft Copilot, Meta AI and leading models.",
      path: "/comparisons",
    });
  }
}
