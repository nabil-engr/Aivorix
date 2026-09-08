import { AI_TOOLS } from "./tools.data";
import { Capability, RANKING_EVIDENCE, RANKING_REVIEWED } from "./ranking-evidence.data";
import type { BenchmarkView } from "./home-benchmarks.data";

export const CAPABILITY_LABELS: Record<Capability, string> = {
  writing: "Writing / text responses", reasoning: "Explicit reasoning / analysis workflow",
  files: "Document or knowledge-source input", vision: "Image input / editing",
  search: "Web search", citations: "Traceable source citations",
  deepResearch: "Dedicated multi-step research", tools: "Tool calls / agent actions",
  connectors: "External app / MCP connections", code: "Code generation / editing",
  execution: "Hosted code or terminal execution", repository: "Repository coding workflow",
  creative: "Image / video creation", audio: "Voice / audio workflow",
};
export interface RankingCriterion { key: Capability; weight: number; }
export interface RankingRubric {
  slug: string; tabLabel: string; title: string; description: string; criteria: readonly RankingCriterion[];
}
const criterion = (key: Capability, weight: number): RankingCriterion => ({ key, weight });
export const RANKING_RUBRICS: readonly RankingRubric[] = [
  { slug: "all-tools", tabLabel: "All AI tools", title: "AI workflow coverage",
    description: "Compare documented workflow breadth across all 28 catalog entries. Specialists can be a better choice within their own field.",
    criteria: [criterion("writing",20),criterion("files",20),criterion("creative",20),criterion("audio",20),criterion("tools",20)] },
  { slug: "intelligence", tabLabel: "Overall capability", title: "General-work task fit",
    description: "Coverage of reasoning, text, source material, images and code. This feature-based score does not measure intelligence or answer accuracy.",
    criteria: [criterion("reasoning",30),criterion("writing",15),criterion("files",20),criterion("vision",15),criterion("code",20)] },
  { slug: "research", tabLabel: "Deep research", title: "Research workflow fit",
    description: "Compare documented search, citation and source-handling features. A high score indicates workflow coverage, not citation accuracy.",
    criteria: [criterion("search",25),criterion("citations",25),criterion("files",20),criterion("deepResearch",20),criterion("writing",10)] },
  { slug: "tools", tabLabel: "Tool use", title: "Tool and integration coverage",
    description: "Compare agent actions, integrations, execution and source access. Availability depends on the product surface and plan named in each row.",
    criteria: [criterion("tools",35),criterion("connectors",25),criterion("execution",20),criterion("search",10),criterion("files",10)] },
  { slug: "coding", tabLabel: "Coding agents", title: "Coding workflow fit",
    description: "Compare documented code generation, repository access, execution and tool workflows. Creative specialists may have little documented coding coverage.",
    criteria: [criterion("code",30),criterion("repository",25),criterion("execution",25),criterion("tools",10),criterion("files",10)] },
];
export function scoreTool(toolSlug: string, rubric: RankingRubric) {
  const evidence = RANKING_EVIDENCE[toolSlug];
  if (!evidence) throw new Error("Missing ranking evidence: " + toolSlug);
  const confirmed = new Set(evidence.sources.flatMap(source => source.capabilities));
  return rubric.criteria.map(item => ({
    label: CAPABILITY_LABELS[item.key], weight: item.weight,
    points: confirmed.has(item.key) ? item.weight : 0,
    sources: evidence.sources.filter(source => source.capabilities.includes(item.key)),
  }));
}
export const TASK_FIT_VIEWS: readonly BenchmarkView[] = RANKING_RUBRICS.map(rubric => {
  const entries = AI_TOOLS.map(tool => {
    const breakdown = scoreTool(tool.slug, rubric);
    const score = breakdown.reduce((total, item) => total + item.points, 0);
    return {
      toolSlug: tool.slug, tool: tool.name, model: RANKING_EVIDENCE[tool.slug].scope,
      score, displayScore: String(score),
      note: score === 0 ? "0 documented criteria; specialist or evidence gap" : "Documented coverage · " + breakdown.filter(item => item.points > 0).length + "/5 criteria",
      breakdown, evidence: RANKING_EVIDENCE[tool.slug].sources,
    };
  }).sort((a,b) => b.score - a.score || a.tool.localeCompare(b.tool, 'en'));
  return {
    slug: rubric.slug, tabLabel: rubric.tabLabel, eyebrow: "Aivorix task-fit score · editorial rubric",
    title: rubric.title, description: rubric.description, max: 100,
    scaleLabel: "Documented feature coverage / 100 · not a test pass rate",
    sourceName: "Linked provider documentation", sourceType: "Aivorix calculation from public feature evidence",
    sourceUrl: "/methodology", verified: RANKING_REVIEWED,
    methodology: "Score = sum of published criterion weights with supporting evidence. Each criterion earns its full weight or zero. Missing evidence earns no points; this is a conservative coverage score, not proof of inability. Equal scores share rank. Expand a row to inspect inputs.",
    entries: entries.map(entry => ({ ...entry, rank: 1 + entries.filter(other => other.score > entry.score).length })),
  };
});
