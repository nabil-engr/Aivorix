import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AI_TOOLS } from "../../data/tools.data";
import { SeoService } from "../../services/seo.service";
@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `<section class="page-hero">
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
          placeholder="Search tools, companies or use cases..."
        />
      </div>
    </section>
    <section class="section">
      <div class="container tool-directory">
        @for (t of filtered(); track t.slug) {
          <a class="card tool-card" [routerLink]="['/tools', t.slug]"
            ><div>
              <span class="chip">{{ t.category }}</span
              ><span class="date">Verified {{ t.verified }}</span>
            </div>
            <h2>{{ t.name }}</h2>
            <p class="muted">{{ t.company }}</p>
            <p>{{ t.bestFor }}</p>
            <strong>{{ t.price }}</strong
            ><span class="open">View tool details</span></a
          >
        }
      </div>
    </section>`,
})
export class ToolsComponent implements OnInit {
  q = "";
  items = AI_TOOLS;
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.set({
      title: "AI Tools Directory: Compare Features, Pricing and Uses",
      description:
        "Explore AI tools for writing, coding, research, design, video and productivity. Compare features, pricing notes and the tasks each product handles best.",
      path: "/tools",
    });
  }
  filtered() {
    const s = this.q.toLowerCase().trim();
    return s
      ? this.items.filter((x) =>
          (x.name + " " + x.company + " " + x.category + " " + x.bestFor)
            .toLowerCase()
            .includes(s),
        )
      : this.items;
  }
}
