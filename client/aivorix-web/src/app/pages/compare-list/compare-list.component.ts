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
        <h1>Find the right AI tool for the way you work.</h1>
        <p class="lead">
          See the practical differences in features, pricing and day-to-day use.
          Every comparison includes a review date and links to official sources.
        </p>
        <a routerLink="/compare" class="btn primary"
          >Compare any two AI tools</a
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
      title: "Best AI Tool Comparisons: Features, Pricing and Use Cases",
      description:
        "Compare leading AI tools side by side. Understand pricing, features, strengths and best use cases for ChatGPT, Claude, Gemini, Copilot and more.",
      path: "/comparisons",
    });
  }
}
