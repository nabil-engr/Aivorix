import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { SeoService } from "../../services/seo.service";

const PAGES: Record<string, readonly [string, string, string]> = {
  about: [
    "About Aivorix",
    "Aivorix is an independent AI news and comparison publication built to help people understand fast-changing AI products before they spend time or money on them.",
    "We separate factual product information from editorial judgment. Official provider pages are preferred for model names, plan structure and pricing. Reputable reporting is used for company news when primary sources are incomplete or when independent reporting is itself the story.",
  ],
  methodology: [
    "Comparison methodology",
    "Our comparisons are workflow-first. We do not manufacture one universal score and call it objective.",
    "We check official product pages, release notes and help centers; record a verification date; compare pricing units correctly; distinguish consumer subscriptions from API token pricing; flag region-dependent limits; and avoid presenting vendor benchmarks as neutral tests. Editorial verdicts are clearly framed as judgments about fit, not mathematical facts.",
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

        @if (key === "contact") {
          <form class="card contact-form" (ngSubmit)="submitContact()">
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
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          company: this.company,
          message: this.message,
          website: this.website,
        }),
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
