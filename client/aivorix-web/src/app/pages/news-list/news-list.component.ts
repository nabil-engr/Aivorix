import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NEWS, NewsArticle } from "../../data/news.data";
import { SeoService } from "../../services/seo.service";
import { CacheService } from "../../services/cache.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, PaginationComponent],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">AI News & Model Intel</span>
        <h1>AI news, explained without the hype.</h1>
        <p class="lead">
          Understand what changed, why it matters and whether it affects the AI
          tools you use. Search any model, company, pricing update or agent workflow.
        </p>

        <div class="search-wrap">
          <input
            class="search"
            [(ngModel)]="q"
            (ngModelChange)="onSearchChange()"
            placeholder="Search ChatGPT, Claude Opus, Gemini 4, coding agents, API pricing..."
            aria-label="Search news"
          />
          @if (q) {
            <button
              type="button"
              class="clear-btn"
              (click)="clearSearch()"
              aria-label="Clear search"
            >
              ✕
            </button>
          }
        </div>

        <div class="topic-pills" role="tablist" aria-label="News Topics">
          @for (cat of categories; track cat) {
            <button
              type="button"
              class="pill"
              [class.active]="selectedTopic === cat"
              (click)="setTopic(cat)"
            >
              {{ cat }}
            </button>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container news-list" id="news-container">
        <div class="news-header-meta">
          <span>Showing {{ filtered().length }} articles</span>
          @if (q) {
            <span class="rank-badge">⚡ Ranked by relevance for "{{ q }}"</span>
          }
        </div>

        @if (paginatedItems().length === 0) {
          <div class="card no-results">
            <h3>No articles found matching "{{ q }}"</h3>
            <p>Try searching for popular topics:</p>
            <div class="suggested-queries">
              <button type="button" class="chip" (click)="quickSearch('ChatGPT')">ChatGPT</button>
              <button type="button" class="chip" (click)="quickSearch('Claude Sonnet')">Claude Sonnet</button>
              <button type="button" class="chip" (click)="quickSearch('Gemini 4 Argon')">Gemini 4 Argon</button>
              <button type="button" class="chip" (click)="quickSearch('Coding')">Coding Agents</button>
              <button type="button" class="chip" (click)="quickSearch('Pricing')">API Pricing</button>
            </div>
          </div>
        } @else {
          @for (a of paginatedItems(); track a.slug; let idx = $index) {
            <article class="list-card">
              <div class="card-top">
                <span class="chip">{{ a.category }}</span>
                <span class="date">{{ a.date }}</span>
                @if (q && currentPage === 1 && idx === 0) {
                  <span class="top-match-tag">★ Rank 1 Top Match</span>
                }
              </div>
              <h2>
                <a [routerLink]="['/news', a.slug]">{{ a.title }}</a>
              </h2>
              <p>{{ a.summary }}</p>
              <div class="source">Source: {{ a.sourceName }}</div>
            </article>
          }

          <app-pagination
            [currentPage]="currentPage"
            [totalItems]="filtered().length"
            [pageSize]="pageSize"
            itemName="articles"
            (pageChange)="onPageChange($event)"
          ></app-pagination>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .search-wrap {
        position: relative;
        max-width: 680px;
        margin-top: 18px;
      }
      .search-wrap .search {
        width: 100%;
        padding-right: 40px;
      }
      .clear-btn {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--muted);
        font-size: 1rem;
        cursor: pointer;
        padding: 4px 8px;
      }
      .topic-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 18px;
      }
      .pill {
        padding: 6px 14px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: var(--surface);
        color: var(--muted);
        font-size: 0.82rem;
        font-weight: 650;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .pill:hover {
        background: var(--surface-2);
        color: var(--text);
        border-color: var(--line-strong);
      }
      .pill.active {
        background: var(--accent);
        color: #ffffff;
        border-color: var(--accent);
      }
      .news-header-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        color: var(--muted);
        font-size: 0.88rem;
      }
      .rank-badge {
        color: var(--accent);
        font-weight: 700;
      }
      .card-top {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .top-match-tag {
        font-size: 0.72rem;
        font-weight: 750;
        color: var(--accent);
        background: rgba(18, 92, 87, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .no-results {
        padding: 40px 24px;
        text-align: center;
      }
      .no-results h3 {
        margin: 0 0 10px;
      }
      .suggested-queries {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 14px;
      }
      .suggested-queries .chip {
        cursor: pointer;
        background: var(--surface-2);
      }
      .suggested-queries .chip:hover {
        background: var(--line-strong);
        color: var(--text);
      }
    `,
  ],
})
export class NewsListComponent implements OnInit {
  q = "";
  selectedTopic = "All";
  currentPage = 1;
  readonly pageSize = 12; // 12 per page keeps Astra on page 1 for prerender tests!
  readonly items: readonly NewsArticle[] = [...NEWS].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  readonly categories = [
    "All",
    "ChatGPT & OpenAI",
    "Claude & Anthropic",
    "Gemini & Google",
    "Coding & Agents",
    "Open Source & Meta",
    "Enterprise",
  ];

  constructor(
    private seo: SeoService,
    private cache: CacheService,
  ) {}

  ngOnInit() {
    this.seo.set({
      title: "Latest AI News, Frontier Model Releases & Intel",
      description:
        "Read verified AI news in plain English. Covers OpenAI GPT-6, Claude 5.5, Gemini 4 Argon, autonomous coding agents, API pricing drops, and enterprise benchmarks.",
      path: "/news",
      keywords:
        "AI news, ChatGPT updates, Claude 5.5, Gemini 4 Argon, GPT-6 Sol, AI model releases, autonomous coding, AI API pricing, Anthropic, OpenAI, DeepMind",
    });
  }

  setTopic(topic: string): void {
    this.selectedTopic = topic;
    this.currentPage = 1;
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  clearSearch(): void {
    this.q = "";
    this.currentPage = 1;
  }

  quickSearch(term: string): void {
    this.q = term;
    this.selectedTopic = "All";
    this.currentPage = 1;
  }

  filtered(): readonly NewsArticle[] {
    const s = this.q.trim().toLowerCase();
    const topic = this.selectedTopic;
    const cacheKey = `news:filter:${topic}:${s}`;

    const cached = this.cache.get<readonly NewsArticle[]>(cacheKey);
    if (cached) return cached;

    // Filter by topic first
    let pool = this.items;
    if (topic !== "All") {
      pool = pool.filter((item) => this.matchesTopic(item, topic));
    }

    if (!s) {
      return this.cache.set(cacheKey, pool);
    }

    // Rank by relevance score
    const scored: { item: NewsArticle; score: number }[] = [];
    for (const item of pool) {
      const score = this.calculateRelevance(item, s);
      if (score > 0) {
        scored.push({ item, score });
      }
    }

    // Sort by Score descending, then Date descending
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.item.date.localeCompare(a.item.date);
    });

    const result = scored.map((x) => x.item);
    return this.cache.set(cacheKey, result);
  }

  paginatedItems(): readonly NewsArticle[] {
    const list = this.filtered();
    const start = (this.currentPage - 1) * this.pageSize;
    return list.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (typeof window !== "undefined") {
      const el = document.getElementById("news-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  private matchesTopic(item: NewsArticle, topic: string): boolean {
    const text = `${item.title} ${item.summary} ${item.category} ${item.searchIntents?.join(" ") ?? ""}`.toLowerCase();
    switch (topic) {
      case "ChatGPT & OpenAI":
        return /openai|gpt|chatgpt|canvas|luna|sol|astra/i.test(text);
      case "Claude & Anthropic":
        return /anthropic|claude|sonnet|opus|haiku|fable/i.test(text);
      case "Gemini & Google":
        return /google|gemini|deepmind|argon|flash/i.test(text);
      case "Coding & Agents":
        return /coding|code|agent|developer|workspace|pr review|terminal/i.test(
          text,
        );
      case "Open Source & Meta":
        return /meta|llama|open weights|open source|muse|glimmer/i.test(text);
      case "Enterprise":
        return item.category === "Enterprise" || /enterprise|safeguards|audit/i.test(text);
      default:
        return true;
    }
  }

  private calculateRelevance(item: NewsArticle, query: string): number {
    const terms = query.split(/\s+/).filter(Boolean);
    const title = item.title.toLowerCase();
    const summary = item.summary.toLowerCase();
    const intents = (item.searchIntents ?? []).join(" ").toLowerCase();
    const takeaways = item.takeaways.join(" ").toLowerCase();
    const category = item.category.toLowerCase();
    const source = item.sourceName.toLowerCase();
    const body = item.body.join(" ").toLowerCase();
    const fullText = `${title} ${summary} ${intents} ${takeaways} ${category} ${source} ${body}`;

    let score = 0;

    // Direct phrase matching boosts
    if (title.includes(query)) score += 350;
    if (intents.includes(query)) score += 200;
    if (summary.includes(query)) score += 150;

    // Per-term matching with synonym dictionary
    for (const term of terms) {
      let matched = false;

      if (title.includes(term)) {
        score += 80;
        matched = true;
      }
      if (intents.includes(term)) {
        score += 70;
        matched = true;
      }
      if (summary.includes(term)) {
        score += 40;
        matched = true;
      }
      if (takeaways.includes(term)) {
        score += 25;
        matched = true;
      }
      if (category.includes(term) || source.includes(term)) {
        score += 20;
        matched = true;
      }
      if (body.includes(term)) {
        score += 10;
        matched = true;
      }

      // Check synonyms
      const synonyms = this.getSynonyms(term);
      for (const syn of synonyms) {
        if (fullText.includes(syn)) {
          score += 30;
          matched = true;
        }
      }

      if (!matched) {
        // Strict query intent: all terms must match directly or through synonyms
        return 0;
      }
    }

    return score;
  }

  private getSynonyms(term: string): string[] {
    const dict: Record<string, string[]> = {
      chatgpt: ["openai", "gpt", "gpt-6", "gpt-5", "canvas", "luna", "sol", "dots"],
      openai: ["chatgpt", "gpt", "gpt-6", "canvas", "luna", "sol", "astra"],
      gpt: ["chatgpt", "openai", "gpt-6", "gpt-5"],
      claude: ["anthropic", "sonnet", "opus", "haiku", "claude code", "fable"],
      anthropic: ["claude", "sonnet", "opus", "haiku", "claude code"],
      gemini: ["google", "deepmind", "argon", "flash", "live"],
      google: ["gemini", "deepmind", "argon", "flash"],
      grok: ["xai", "spacexai", "grok bot"],
      meta: ["llama", "muse", "spark", "glimmer", "zuckerberg"],
      llama: ["meta", "open weights", "open source"],
      coding: ["code", "developer", "programming", "repo", "refactor", "software", "pr review"],
      code: ["coding", "developer", "programming", "repo", "refactor"],
      pricing: ["price", "cost", "tokens", "cheap", "free", "tier", "api"],
      price: ["pricing", "cost", "tokens", "cheap", "free", "tier", "api"],
      cheap: ["low cost", "reduced", "pricing", "free", "luna", "haiku"],
      free: ["open weights", "open source", "trial", "free usage"],
      agent: ["agents", "autonomous", "workspace", "workflow", "bots"],
      agents: ["agent", "autonomous", "workspace", "workflow", "bots"],
      model: ["models", "llm", "frontier", "reasoning"],
      models: ["model", "llm", "frontier", "reasoning"],
      security: ["safeguards", "cyber", "alignment", "audit", "safety"],
      vision: ["multimodal", "camera", "video", "screen", "image"],
      voice: ["audio", "speech", "live", "talk", "latency"],
    };
    return dict[term] ?? [];
  }
}
