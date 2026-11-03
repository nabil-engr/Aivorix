import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { COMPARISONS } from "../../data/comparisons.data";
import { COMPARISON_PROFILES, ComparisonProfile } from "../../data/comparison-profiles.data";
import { SeoService } from "../../services/seo.service";

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page-hero compare-hero"><div class="container">
      <span class="eyebrow">Compare up to three</span><h1>Compare AI models and tools side by side</h1>
      <p class="lead">Check pricing, context, reasoning, modalities, tools and best use cases using one consistent comparison format.</p>
    </div></section>
    <section class="section compare-workspace"><div class="container wide">
      <div class="comparison-columns selectors" [style.--column-count]="selected.length">
        @for (slot of selections; track $index; let index = $index) {
          <label class="selector-card"><span>Choice {{ index + 1 }}</span>
            <select [(ngModel)]="selections[index]" [attr.aria-label]="'AI choice ' + (index + 1)">
              @for (profile of profiles; track profile.slug) {
                <option [ngValue]="profile.slug" [disabled]="isSelectedElsewhere(profile.slug, index)">{{ profile.name }} · {{ profile.kind }}</option>
              }
            </select>
          </label>
        }
      </div>
      <div class="comparison-columns profile-grid" [style.--column-count]="selected.length">
        @for (profile of selected; track profile.slug) {
          <article class="profile-card">
            <div class="model-art" [attr.data-provider]="profile.provider"><span>{{ initials(profile.name) }}</span></div>
            <span class="profile-kind">{{ profile.provider }} · {{ profile.kind }}</span><h2>{{ profile.name }}</h2>
            <p>{{ profile.description }}</p><strong>Best for: {{ profile.bestFor }}</strong>
            @if (profile.toolSlug) { <a class="btn" [routerLink]="['/tools', profile.toolSlug]">Full profile</a> }
            <a class="btn primary" [href]="profile.source" target="_blank" rel="nofollow noopener">Official source</a>
          </article>
        }
      </div>
      @for (section of sections; track section.title) {
        <section class="spec-section"><div class="section-label">{{ section.title }}</div>
          @for (field of section.fields; track field.key) {
            <div class="spec-row"><div class="field-label">{{ field.label }}</div>
              <div class="comparison-columns values" [style.--column-count]="selected.length">
                @for (profile of selected; track profile.slug) { <div>{{ value(profile, field.key) }}</div> }
              </div>
            </div>
          }
        </section>
      }
      <section class="pair-links card"><span class="eyebrow">Detailed pair guides</span><h2>Open a dedicated comparison</h2>
        <div class="pair-grid">@for (pair of selectedPairs; track pair.slug) {
          <a [routerLink]="['/comparisons', pair.slug]">{{ pair.title }} <span>→</span></a>
        }</div>
      </section>
    </div></section>
  `,
  styles: [`
    .compare-hero{padding-bottom:42px}.compare-workspace{padding-top:28px}.wide{max-width:1320px}
    .comparison-columns{display:grid;grid-template-columns:repeat(var(--column-count,3),minmax(0,1fr));gap:20px}
    .selectors{position:sticky;top:78px;z-index:5;background:var(--bg);padding:12px 0;border-bottom:1px solid var(--line-strong)}
    .selector-card span{display:block;margin-bottom:6px;color:var(--muted);font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
    select{width:100%;min-height:46px;border:1px solid var(--line-strong);border-radius:4px;background:var(--surface);color:var(--text);padding:0 12px;font-weight:700}
    .profile-grid{margin:24px 0 32px}.profile-card{display:flex;min-width:0;flex-direction:column;gap:11px;padding-bottom:22px;border-bottom:1px solid var(--line-strong)}
    .profile-card h2,.profile-card p{margin:0}.profile-card p{color:var(--muted);min-height:64px}.profile-card strong{min-height:52px;font-size:.82rem}
    .profile-kind{color:var(--accent);font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
    .model-art{height:150px;display:grid;place-items:center;overflow:hidden;border:1px solid rgba(255,255,255,.15);border-radius:7px;color:white;background:radial-gradient(circle at 25% 20%,#187d74,transparent 42%),linear-gradient(135deg,#081716,#123d39)}
    .model-art[data-provider="OpenAI"]{background:radial-gradient(circle at 75% 20%,#45a79d,transparent 38%),linear-gradient(135deg,#071312,#145b55)}
    .model-art[data-provider="Anthropic"]{background:radial-gradient(circle at 25% 15%,#d18b59,transparent 38%),linear-gradient(135deg,#24150f,#764426)}
    .model-art span{font-family:var(--font-display);font-size:clamp(2rem,5vw,4.5rem);letter-spacing:-.08em}.profile-card .btn{width:100%;text-align:center}
    .spec-section{margin-top:28px}.section-label{padding:10px 0;color:var(--accent);border-bottom:1px solid var(--line-strong);font-size:.72rem;font-weight:900;letter-spacing:.09em;text-transform:uppercase}
    .spec-row{border-bottom:1px solid var(--line)}.field-label{padding-top:12px;color:var(--muted);font-size:.7rem;font-weight:800;text-transform:uppercase}.values>div{padding:10px 0 14px;font-weight:700;overflow-wrap:anywhere}
    .pair-links{margin-top:40px;padding:28px}.pair-links h2{margin-top:8px}.pair-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.pair-grid a{display:flex;justify-content:space-between;gap:12px;border:1px solid var(--line);padding:14px;font-weight:700}
    @media(max-width:780px){.comparison-columns{overflow-x:auto;grid-template-columns:repeat(var(--column-count,3),minmax(245px,1fr))}.selectors{position:static}.profile-grid{overflow-x:auto}.pair-grid{grid-template-columns:1fr}.model-art{height:115px}}
  `],
})
export class CompareBuilderComponent implements OnInit {
  readonly profiles = COMPARISON_PROFILES;
  selections = ["gpt-6-astra", "gpt-5-6-sol", "gpt-5-6-terra"];
  readonly sections = [
    { title: "Capability", fields: [{key:"reasoning",label:"Reasoning"},{key:"speed",label:"Speed"},{key:"input",label:"Input"},{key:"output",label:"Output"},{key:"tools",label:"Tools"}] },
    { title: "Pricing · per 1M tokens where applicable", fields: [{key:"inputPrice",label:"Input"},{key:"cachedInput",label:"Cached input"},{key:"outputPrice",label:"Output"}] },
    { title: "Context", fields: [{key:"context",label:"Window"},{key:"maxOutput",label:"Max output tokens"},{key:"knowledgeCutoff",label:"Knowledge cutoff"}] },
    { title: "Access", fields: [{key:"endpoints",label:"Endpoints / access"},{key:"pricing",label:"Pricing note"}] },
  ] as const;
  constructor(private readonly seo: SeoService) {}
  ngOnInit(): void { this.seo.set({
    title:"Compare AI Models Side by Side: Prices, Context & Features",
    description:"Compare up to three AI models and tools, including GPT-6 Astra, GPT-5.6 Sol, Terra, Luna, GPT-5.5 and Claude Fable, Opus, Sonnet and Haiku.", path:"/compare",
    jsonLd:{"@context":"https://schema.org","@type":"WebApplication",name:"Aivorix AI Comparison Builder",applicationCategory:"BusinessApplication"},
  }); }
  get selected(): ComparisonProfile[] { return this.selections.map(slug=>this.profiles.find(profile=>profile.slug===slug)).filter((profile):profile is ComparisonProfile=>!!profile); }
  get selectedPairs() {
    const slugs=new Set(this.selected.map(profile=>profile.slug));
    return COMPARISONS.filter(item=>slugs.has(item.left)&&slugs.has(item.right)).filter((item,index,items)=>index===items.findIndex(other=>[other.left,other.right].sort().join("|")===[item.left,item.right].sort().join("|")));
  }
  isSelectedElsewhere(slug:string,index:number):boolean{return this.selections.some((selected,selectedIndex)=>selectedIndex!==index&&selected===slug)}
  value(profile:ComparisonProfile,key:keyof ComparisonProfile):string{const current=profile[key];return Array.isArray(current)?current.join("; "):String(current??"Not documented")}
  initials(name:string):string{return name.split(/\s+/).filter(word=>!/^GPT-/i.test(word)).slice(0,2).map(word=>word[0]).join("")||"AI"}
}
