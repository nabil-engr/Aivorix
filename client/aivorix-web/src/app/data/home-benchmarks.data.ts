export interface BenchmarkEntry {
  toolSlug: string;
  tool: string;
  model: string;
  score: number;
  displayScore: string;
  note: string;
}

export interface BenchmarkView {
  slug: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  scaleLabel: string;
  max: number;
  sourceName: string;
  sourceType: string;
  sourceUrl: string;
  verified: string;
  methodology: string;
  entries: readonly BenchmarkEntry[];
}

export interface ProductSignal {
  toolSlug: string;
  tool: string;
  value: string;
  metric: string;
  context: string;
  sourceName: string;
  sourceUrl: string;
}

export const HOME_BENCHMARKS: readonly BenchmarkView[] = [
  {
    slug: "intelligence",
    tabLabel: "Overall intelligence",
    eyebrow: "Independent composite",
    title: "Frontier intelligence",
    description:
      "A multi-benchmark index covering professional work, agent tasks, science, knowledge, reasoning and factuality.",
    scaleLabel: "Artificial Analysis Intelligence Index v4.1.1 · higher is better",
    max: 70,
    sourceName: "Artificial Analysis",
    sourceType: "Independent leaderboard",
    sourceUrl: "https://artificialanalysis.ai/leaderboards/models",
    verified: "August 24, 2026",
    methodology:
      "Same independent index and current high/max reasoning configurations. Product names are mapped to the tested foundation models.",
    entries: [
      { toolSlug: "claude", tool: "Claude", model: "Opus 5 · max", score: 63, displayScore: "63", note: "Current index leader" },
      { toolSlug: "chatgpt", tool: "ChatGPT", model: "GPT-5.6 Sol · max", score: 61, displayScore: "61", note: "Tied frontier score" },
      { toolSlug: "grok", tool: "Grok", model: "Grok 4.6 · high", score: 61, displayScore: "61", note: "Lower tested cost per task" },
      { toolSlug: "gemini", tool: "Gemini", model: "Gemini 3.5 Flash · high", score: 52, displayScore: "52", note: "184.6 output tokens/s" },
      { toolSlug: "meta-ai", tool: "Meta AI", model: "Muse Spark 1.1", score: 51, displayScore: "51", note: "+8 index points vs Muse Spark" },
    ],
  },
  {
    slug: "research",
    tabLabel: "Deep research",
    eyebrow: "100 real-world research tasks",
    title: "Deep research quality",
    description:
      "DRACO scores accuracy, completeness, objectivity, presentation and citation quality across ten research domains.",
    scaleLabel: "DRACO normalized score (%) · higher is better",
    max: 80,
    sourceName: "DRACO research paper",
    sourceType: "Provider-authored, open methodology",
    sourceUrl: "https://r2cdn.perplexity.ai/pplx-draco.pdf",
    verified: "February 12, 2026",
    methodology:
      "Five judge runs per task. This study was authored by Perplexity researchers; judge-model checks preserved the ranking, but the affiliation should be considered.",
    entries: [
      { toolSlug: "perplexity", tool: "Perplexity", model: "Deep Research · Opus 4.6", score: 70.5, displayScore: "70.5%", note: "72.8% unweighted pass rate" },
      { toolSlug: "claude", tool: "Claude", model: "Opus 4.6 + web/code", score: 59.8, displayScore: "59.8%", note: "Standard model with tools" },
      { toolSlug: "gemini", tool: "Gemini", model: "Deep Research preview", score: 59, displayScore: "59.0%", note: "Second on 4 of 10 domains" },
      { toolSlug: "chatgpt", tool: "ChatGPT", model: "OpenAI Deep Research · o3", score: 52.1, displayScore: "52.1%", note: "Second on academic domain" },
    ],
  },
  {
    slug: "tools",
    tabLabel: "Tool use",
    eyebrow: "External agent evaluation",
    title: "MCP tool-use performance",
    description:
      "MCP Atlas measures whether models can select and operate real tools through the Model Context Protocol.",
    scaleLabel: "MCP Atlas score (%) · higher is better",
    max: 100,
    sourceName: "Scale Labs",
    sourceType: "Independent leaderboard",
    sourceUrl: "https://labs.scale.com/leaderboard",
    verified: "August 24, 2026",
    methodology:
      "Only currently published comparable entries are shown. Scores include reported 95% confidence intervals in the notes.",
    entries: [
      { toolSlug: "meta-ai", tool: "Meta AI", model: "Muse Spark 1.1", score: 88.1, displayScore: "88.1%", note: "±1.95 confidence interval" },
      { toolSlug: "claude", tool: "Claude", model: "Opus 5 · xhigh", score: 85.8, displayScore: "85.8%", note: "±2.10 confidence interval" },
      { toolSlug: "gemini", tool: "Gemini", model: "Gemini 3.5 Flash · high", score: 83.6, displayScore: "83.6%", note: "±2.30 confidence interval" },
    ],
  },
  {
    slug: "coding",
    tabLabel: "Coding agents",
    eyebrow: "Repository-scale engineering",
    title: "Long-horizon coding agents",
    description:
      "DeepSWE v1.1 evaluates agents working through extended software-engineering tasks in real codebases.",
    scaleLabel: "DeepSWE v1.1 pass rate (%) · higher is better",
    max: 80,
    sourceName: "SpaceXAI Grok 4.6 evaluation",
    sourceType: "Provider report; competitor scores cited",
    sourceUrl: "https://x.ai/news/grok-4-6",
    verified: "August 12, 2026",
    methodology:
      "Provider-published comparison using named model/harness configurations. Harness choice can materially affect coding-agent results.",
    entries: [
      { toolSlug: "chatgpt", tool: "ChatGPT", model: "GPT-5.6 Sol · max", score: 73, displayScore: "73.0%", note: "Codex configuration" },
      { toolSlug: "claude", tool: "Claude", model: "Fable 5 · max", score: 70, displayScore: "70.0%", note: "Claude Code configuration" },
      { toolSlug: "grok", tool: "Grok", model: "Grok 4.6 · high", score: 65.9, displayScore: "65.9%", note: "+11.9 points vs Grok 4.5" },
    ],
  },
];

export const PRODUCT_SIGNALS: readonly ProductSignal[] = [
  { toolSlug: "chatgpt", tool: "ChatGPT", value: "61", metric: "AA Intelligence Index", context: "GPT-5.6 Sol · max", sourceName: "Artificial Analysis", sourceUrl: "https://artificialanalysis.ai/leaderboards/models" },
  { toolSlug: "claude", tool: "Claude", value: "63", metric: "AA Intelligence Index", context: "Opus 5 · max", sourceName: "Artificial Analysis", sourceUrl: "https://artificialanalysis.ai/leaderboards/models" },
  { toolSlug: "gemini", tool: "Gemini", value: "52", metric: "AA Intelligence Index", context: "Gemini 3.5 Flash · high", sourceName: "Artificial Analysis", sourceUrl: "https://artificialanalysis.ai/models/gemini-3-5-flash" },
  { toolSlug: "perplexity", tool: "Perplexity", value: "70.5%", metric: "DRACO research score", context: "100 cross-domain tasks", sourceName: "DRACO paper", sourceUrl: "https://r2cdn.perplexity.ai/pplx-draco.pdf" },
  { toolSlug: "grok", tool: "Grok", value: "61", metric: "AA Intelligence Index", context: "Grok 4.6 · high", sourceName: "Artificial Analysis", sourceUrl: "https://artificialanalysis.ai/articles/grok-4-6-benchmarks-and-analysis" },
  { toolSlug: "meta-ai", tool: "Meta AI", value: "88.1%", metric: "MCP Atlas tool use", context: "Muse Spark 1.1", sourceName: "Scale Labs", sourceUrl: "https://labs.scale.com/leaderboard" },
  { toolSlug: "microsoft-copilot", tool: "Microsoft Copilot", value: "26 min", metric: "Saved per workday", context: "20,000-user UK trial · self-reported", sourceName: "UK Government Digital Service", sourceUrl: "https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report/microsoft-365-copilot-experiment-cross-government-findings-report-html" },
  { toolSlug: "notebooklm", tool: "Gemini Notebook", value: "85%", metric: "Learning-answer accuracy", context: "Independent study · narrow learning task", sourceName: "Datenbank-Spektrum", sourceUrl: "https://link.springer.com/article/10.1007/s13222-025-00507-7" },
];
