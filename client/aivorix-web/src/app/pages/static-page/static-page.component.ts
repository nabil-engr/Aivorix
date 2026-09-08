import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { SeoService } from "../../services/seo.service";
import { RANKING_RUBRICS, CAPABILITY_LABELS } from "../../data/task-fit.data";

const PAGES: Record<string, readonly [string, string, string]> = {
  about: [
    "About Aivorix",
    "Aivorix is an independent AI news and comparison publication built to help people understand fast-changing AI products before they spend time or money on them.",
    "We separate factual product information from editorial judgment. Official provider pages are preferred for model names, plan structure and pricing. Reputable reporting is used for company news when primary sources are incomplete or when independent reporting is itself the story.",
  ],
  methodology: [
    "Comparison methodology",
    "Our comparisons are workflow-first. We do not manufacture one universal score and call it objective.",
    "We publish two distinct views: task-fit scores for the whole catalog, and original results for models included in named benchmarks. Task-fit scores count documented features using the weights below. The weights are Aivorix editorial choices; provider documentation supports the feature inputs. We have not run a laboratory evaluation or reproduced a third-party review score.",
  ],
  editorial: [
    "Editorial policy",
    "Accuracy, traceability and useful context are the core rules.",
    "News summaries are written in our own words and link to the source. Significant factual corrections should be updated transparently. Affiliate relationships must never change a factual table or hide a cheaper relevant option. Sponsored content should be labeled. We do not publish fake hands-on claims for products we have not tested.",
  ],
  affiliate: [
    "Affiliate disclosure",
    "Aivorix may use affiliate links in the future.",
    "If an affiliate relationship is active, we may earn a commission when a reader buys through an eligible link. It should not increase the reader’s price. Affiliate compensation must not determine comparison facts or ranking methodology, and affiliate links should be labeled near the recommendation.",
  ],
  privacy: [
    "Privacy policy",
    "This starter site is designed to collect as little personal data as practical.",
    "The newsletter and contact endpoints accept information a visitor voluntarily submits. Before production, update this policy with your real analytics, advertising, cookie, email-service and hosting vendors. Do not claim “no tracking” after adding analytics or ad scripts.",
  ],
  terms: [
    "Terms of use",
    "Aivorix content is informational, not a guarantee of product availability, pricing or performance.",
    "AI services change quickly and may differ by region or account. Readers should verify material purchasing decisions on the provider’s official site. Aivorix is not affiliated with the companies it covers unless explicitly stated.",
  ],
  contact: [
    "Contact",
    "Send corrections, source updates, partnership questions or editorial feedback.",
    "Complete the form below. Your submission is sent securely to the Aivorix lead endpoint.",
  ],
  advertise: [
    "Advertise with Aivorix",
    "Reach readers who are actively comparing AI products and following model releases.",
    "Potential formats include clearly labeled sponsorships, newsletter placements and display advertising. Paid relationships must be separated from editorial comparison facts. Replace this copy with your real media-kit metrics after you have verified traffic data.",
  ],
  "404": [
    "Page not found",
    "The page you requested does not exist or may have moved.",
    "Use the main navigation to browse AI news, comparisons and tool profiles.",
  ],
};

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <div class="container article-width">
        <span class="eyebrow">Aivorix</span>
        <h1>{{ page[0] }}</h1>
        <p class="lead">{{ page[1] }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container article-width article-body">
        <p>{{ page[2] }}</p>

        @if (key === "methodology") {
          <section>
            <h2>How other ranking sites score products</h2>
            <p><a href="https://documentation.g2.com/docs/research-scoring-methodologies" target="_blank" rel="noopener">G2</a> combines user satisfaction and market presence within product categories. Its review-based score is different from a coding or reasoning test.</p>
            <p><a href="https://artificialanalysis.ai/methodology/capability-indices" target="_blank" rel="noopener">Artificial Analysis</a> combines independently run evaluations with use-case weights. Aivorix does not claim to reproduce that methodology or its results through feature counting.</p>
            <h2>Our task-fit formula</h2>
            <p>Score = sum of weights for criteria supported by the linked provider evidence. Each criterion receives its full weight or zero; weights total 100 in every category. The same rubric applies to every catalog entry. We do not normalize to the current leader or add a popularity bonus.</p>
            <p>A zero means no supporting feature evidence has been recorded for that criterion. It can reflect a specialist product or a gap in our review; it does not prove the product is incapable. A score of 100 means all five criteria are documented, not perfect quality. Equal scores share a competition rank (1, 1, 3); tied entries are displayed alphabetically.</p>
            @for (rubric of rankingRubrics; track rubric.slug) {
              <h3>{{ rubric.title }}</h3>
              <ul>
                @for (item of rubric.criteria; track item.key) {
                  <li>{{ capabilityLabels[item.key] }}: {{ item.weight }} points</li>
                }
              </ul>
            }
            <h2>Evidence boundaries</h2>
            <p>Every homepage row links the reviewed source and states its product surface. An API model may require application integration; a product feature may require a paid plan. Code execution means a documented hosted runtime or terminal, not merely an API caller running its own function. Repository support means a documented coding workflow across repository files, not a generic file upload.</p>
            <p>Provider feature descriptions are not hands-on tests. Citation support does not guarantee accurate citations, and the presence of a reasoning mode does not establish reasoning quality. Review scope and feature support were checked September 7, 2026. Source publication dates can be older.</p>
            <h2>Published benchmarks</h2>
            <p>The separate benchmark view uses <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener">OpenAI's Astra evaluation tables</a>, with model names, evaluation versions and provider-report attribution. AA Intelligence Index, BrowseComp, OSWorld and DeepSWE have different tasks and units; their values are never averaged into the task-fit score. Only models with reported results appear in that view. Different provider harnesses, model effort and production app settings can change outcomes.</p>
          </section>
        }

        @if (key === "contact") {
          <form
            class="card contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="website"
            (ngSubmit)="submitContact()"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div class="field-row">
              <label>
                Name
                <input
                  name="name"
                  [(ngModel)]="name"
                  required
                  maxlength="200"
                  autocomplete="name"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  [(ngModel)]="email"
                  required
                  maxlength="254"
                  autocomplete="email"
                />
              </label>
            </div>
            <label>
              Company <span>(optional)</span>
              <input
                name="company"
                [(ngModel)]="company"
                maxlength="200"
                autocomplete="organization"
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                [(ngModel)]="message"
                required
                maxlength="4000"
                rows="7"
              ></textarea>
            </label>
            <label class="honeypot" aria-hidden="true">
              Website
              <input
                name="website"
                [(ngModel)]="website"
                tabindex="-1"
                autocomplete="off"
              />
            </label>
            <div class="form-actions">
              <button class="btn primary" type="submit" [disabled]="submitting">
                {{ submitting ? "Sending…" : "Send message" }}
              </button>
              <p class="form-msg" role="status" aria-live="polite">
                {{ formStatus }}
              </p>
            </div>
          </form>
        }

        @if (key === "404") {
          <a routerLink="/" class="btn primary">Go home</a>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .contact-form {
        display: grid;
        gap: 18px;
        margin-top: 28px;
      }
      .field-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
      label {
        display: grid;
        gap: 7px;
        color: var(--text);
        font-weight: 700;
      }
      label span {
        color: var(--muted);
        font-size: 0.85rem;
        font-weight: 400;
      }
      input,
      textarea {
        width: 100%;
        border: 1px solid var(--line-strong);
        border-radius: 4px;
        background: var(--surface);
        color: var(--text);
        padding: 12px 14px;
        font: inherit;
        outline: none;
        resize: vertical;
      }
      input:focus,
      textarea:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 2px rgba(18, 92, 87, 0.12);
      }
      .honeypot {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
      .form-actions {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
      }
      .form-msg {
        margin: 0;
        color: var(--muted);
      }
      button:disabled {
        cursor: wait;
        opacity: 0.7;
      }
      @media (max-width: 620px) {
        .field-row {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class StaticPageComponent implements OnInit {
  readonly rankingRubrics = RANKING_RUBRICS;
  readonly capabilityLabels = CAPABILITY_LABELS;
  key = "";
  page = PAGES["404"];
  name = "";
  email = "";
  company = "";
  message = "";
  website = "";
  formStatus = "";
  submitting = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.key = this.route.snapshot.data["page"] || "404";
    this.page = PAGES[this.key] || PAGES["404"];

    if (this.key === "404") {
      this.seo.noIndex();
      return;
    }

    this.seo.set({
      title: this.page[0],
      description: this.page[1],
      path:
        "/" + this.route.snapshot.url.map((segment) => segment.path).join("/"),
    });
  }

  async submitContact(): Promise<void> {
    if (this.submitting) {
      return;
    }

    this.submitting = true;
    this.formStatus = "";

    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: this.name,
        email: this.email,
        company: this.company,
        message: this.message,
        website: this.website,
      });
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        this.formStatus =
          response.status === 429
            ? "Too many attempts. Please wait a minute and try again."
            : "Could not send your message. Check the form and try again.";
        return;
      }

      this.formStatus = "Thanks — your message has been sent.";
      this.name = "";
      this.email = "";
      this.company = "";
      this.message = "";
      this.website = "";
    } catch {
      this.formStatus =
        "Could not send your message right now. Please try again later.";
    } finally {
      this.submitting = false;
    }
  }
}
