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
        <h1>Know what each AI product is actually for.</h1>
        <p class="lead">
          Release timelines, version-by-version changes, benchmark evidence,
          feature explainers and verified roadmap notes.
        </p>
        <input
          class="search"
          [(ngModel)]="q"
          placeholder="Search ChatGPT, Claude, research, coding…"
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
            ><span class="open">Open research dossier →</span></a
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
      title: "AI Tools Directory",
      description:
        "Research dossiers for major AI tools with release history, version changes, benchmark evidence, feature explainers and official roadmap sources.",
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
