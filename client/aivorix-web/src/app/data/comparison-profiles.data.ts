import { AI_TOOLS } from "./tools.data";

export interface ComparisonProfile {
  slug: string;
  name: string;
  provider: string;
  kind: "Product" | "Model";
  category: string;
  description: string;
  bestFor: string;
  pricing: string;
  inputPrice: string;
  cachedInput: string;
  outputPrice: string;
  context: string;
  maxOutput: string;
  knowledgeCutoff: string;
  reasoning: string;
  speed: string;
  input: string;
  output: string;
  tools: string;
  endpoints: string;
  features: readonly string[];
  source: string;
  verified: string;
  toolSlug?: string;
}

const productProfiles: ComparisonProfile[] = AI_TOOLS.map(tool => ({
  slug: tool.slug,
  name: tool.name,
  provider: tool.company,
  kind: "Product",
  category: tool.category,
  description: tool.bestFor,
  bestFor: tool.bestFor,
  pricing: tool.price,
  inputPrice: "Product or plan pricing",
  cachedInput: "Not directly comparable",
  outputPrice: "Product or plan pricing",
  context: "Varies by included model and plan",
  maxOutput: "Varies by included model and surface",
  knowledgeCutoff: "Model-dependent; web access may add current information",
  reasoning: "Varies by selected model or mode",
  speed: "Varies by model, plan and workload",
  input: "See documented product features",
  output: "See documented product features",
  tools: tool.features.join("; "),
  endpoints: "Product surface; see official source for API availability",
  features: tool.features,
  source: tool.source,
  verified: tool.verified,
  toolSlug: tool.slug,
}));

const sharedOpenAi = {
  provider: "OpenAI", kind: "Model" as const, category: "Reasoning model",
  input: "Text and image", output: "Text", maxOutput: "128K tokens",
  context: "1.05M tokens", tools: "Functions, web search, file search, computer use and supported Responses API tools",
  endpoints: "v1/responses, v1/chat/completions and v1/batch",
  verified: "2026-09-08",
};

const additionalModels: ComparisonProfile[] = [
  {
    ...sharedOpenAi, slug: "gpt-5-6-terra", name: "GPT-5.6 Terra",
    description: "GPT-5.6 model designed to balance intelligence and cost.",
    bestFor: "Balanced professional, coding and agent workloads",
    pricing: "$2 input, $0.20 cached input and $12 output per 1M tokens",
    inputPrice: "$2 / 1M tokens", cachedInput: "$0.20 / 1M tokens", outputPrice: "$12 / 1M tokens",
    knowledgeCutoff: "February 16, 2026", reasoning: "none, low, medium, high, xhigh, max", speed: "Balanced",
    features: ["1.05M context", "128K maximum output", "Vision input", "Responses API tools"],
    source: "https://developers.openai.com/api/docs/models/gpt-5.6-terra",
  },
  {
    ...sharedOpenAi, slug: "gpt-5-6-luna", name: "GPT-5.6 Luna",
    description: "GPT-5.6 model optimized for cost-sensitive, high-volume workloads.",
    bestFor: "High-volume extraction, classification and routine agent tasks",
    pricing: "$0.20 input, $0.02 cached input and $1.20 output per 1M tokens",
    inputPrice: "$0.20 / 1M tokens", cachedInput: "$0.02 / 1M tokens", outputPrice: "$1.20 / 1M tokens",
    knowledgeCutoff: "February 16, 2026", reasoning: "none, low, medium, high, xhigh, max", speed: "Fast / cost optimized",
    features: ["1.05M context", "128K maximum output", "Vision input", "Responses API tools"],
    source: "https://developers.openai.com/api/docs/models/gpt-5.6-luna",
  },
  {
    ...sharedOpenAi, slug: "gpt-5-5", name: "GPT-5.5",
    description: "Earlier flagship model for coding and complex professional work.",
    bestFor: "Existing GPT-5.5 production workflows and migration baselines",
    pricing: "$5 input, $0.50 cached input and $30 output per 1M tokens",
    inputPrice: "$5 / 1M tokens", cachedInput: "$0.50 / 1M tokens", outputPrice: "$30 / 1M tokens",
    knowledgeCutoff: "December 1, 2025", reasoning: "none, low, medium, high, xhigh", speed: "Moderate",
    features: ["1.05M context", "128K maximum output", "Vision input", "Responses API tools"],
    source: "https://developers.openai.com/api/docs/models/gpt-5.5",
  },
  {
    slug: "claude-fable-5-1", name: "Claude Fable 5.1", provider: "Anthropic", kind: "Model", category: "Frontier reasoning model",
    description: "Anthropic's frontier model for demanding reasoning and long-horizon agentic work.",
    bestFor: "Ambitious coding, research and long-running asynchronous projects",
    pricing: "$10 input, $0.25 cache read and $50 output per 1M tokens",
    inputPrice: "$10 / 1M tokens", cachedInput: "$0.25 / 1M tokens", outputPrice: "$50 / 1M tokens",
    context: "1M tokens", maxOutput: "128K tokens", knowledgeCutoff: "June 2026",
    reasoning: "Adaptive, always on; high default effort", speed: "Slower", input: "Text and image", output: "Text",
    tools: "Claude API tool use, computer use and agent workflows", endpoints: "Claude Messages API",
    features: ["Long-horizon agents", "Repository-scale coding", "Multistep research", "Vision and document work"],
    source: "https://platform.claude.com/docs/en/models/fable-5-1/overview", verified: "2026-09-08",
  },
  {
    slug: "claude-opus-5", name: "Claude Opus 5", provider: "Anthropic", kind: "Model", category: "Reasoning model",
    description: "Anthropic model for complex agentic coding and professional work.", bestFor: "High-quality agents with a lower token price than Fable",
    pricing: "$5 input, $0.50 cache read and $25 output per 1M tokens",
    inputPrice: "$5 / 1M tokens", cachedInput: "$0.50 / 1M tokens", outputPrice: "$25 / 1M tokens",
    context: "1M tokens", maxOutput: "128K tokens", knowledgeCutoff: "May 2026", reasoning: "Adaptive; high default effort",
    speed: "Moderate; optional Fast mode at higher price", input: "Text and image", output: "Text",
    tools: "Claude API tool use, computer use and agent workflows", endpoints: "Claude Messages API",
    features: ["Complex agent work", "Coding", "Adaptive thinking", "Optional Fast mode"],
    source: "https://www.anthropic.com/news/claude-opus-5", verified: "2026-09-08",
  },
  {
    slug: "claude-sonnet-5", name: "Claude Sonnet 5", provider: "Anthropic", kind: "Model", category: "Balanced reasoning model",
    description: "Anthropic's fast workhorse model balancing intelligence, speed and price.", bestFor: "Production coding and agents where speed and quality both matter",
    pricing: "$2 input, $0.20 cache read and $10 output per 1M tokens",
    inputPrice: "$2 / 1M tokens", cachedInput: "$0.20 / 1M tokens", outputPrice: "$10 / 1M tokens",
    context: "1M tokens", maxOutput: "128K tokens", knowledgeCutoff: "January 2026", reasoning: "Adaptive; high default effort",
    speed: "Fast", input: "Text and image", output: "Text", tools: "Claude API tool use, computer use and agent workflows",
    endpoints: "Claude Messages API", features: ["Agentic coding", "Adaptive thinking", "1M context", "Fast production work"],
    source: "https://platform.claude.com/docs/en/models/sonnet-5/overview", verified: "2026-09-08",
  },
  {
    slug: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "Anthropic", kind: "Model", category: "Fast model",
    description: "Anthropic's fastest current model for responsive and high-volume work.", bestFor: "Low-latency assistants, classification and high-volume tasks",
    pricing: "$1 input, $0.10 cache read and $5 output per 1M tokens",
    inputPrice: "$1 / 1M tokens", cachedInput: "$0.10 / 1M tokens", outputPrice: "$5 / 1M tokens",
    context: "200K tokens", maxOutput: "64K tokens", knowledgeCutoff: "February 2025", reasoning: "Extended thinking supported",
    speed: "Fastest Claude tier", input: "Text and image", output: "Text", tools: "Claude API tool use",
    endpoints: "Claude Messages API", features: ["Low latency", "High-volume use", "Vision input", "Extended thinking"],
    source: "https://platform.claude.com/docs/en/about-claude/models/overview", verified: "2026-09-08",
  },
];

export const COMPARISON_PROFILES: readonly ComparisonProfile[] = [...productProfiles, ...additionalModels];
export const COMPARISON_PROFILE_MAP = new Map(COMPARISON_PROFILES.map(profile => [profile.slug, profile]));
