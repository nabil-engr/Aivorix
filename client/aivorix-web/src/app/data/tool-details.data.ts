export type ReleaseStatus = "Current" | "Milestone" | "Preview" | "Announced";

export interface ToolTimelineItem {
  date: string;
  title: string;
  status: ReleaseStatus;
  summary: string;
  changes: readonly string[];
  sourceUrl: string;
}

export interface ToolComparisonRow {
  dimension: string;
  previous: string;
  current: string;
  difference: string;
}

export interface ToolMetric {
  value: string;
  label: string;
  detail: string;
  sourceUrl?: string;
}

export interface ToolFeatureDetail {
  name: string;
  availability: string;
  howItWorks: string;
  usefulFor: string;
  caution?: string;
}

export interface ToolRoadmapItem {
  title: string;
  status: "Rolling out" | "Announced" | "No public date";
  detail: string;
  sourceUrl?: string;
}

export interface ToolSource {
  title: string;
  publisher: string;
  date: string;
  url: string;
}

export interface ToolDossier {
  launched: string;
  currentRelease: string;
  releaseStatus: string;
  positioning: string;
  modelNote: string;
  overview: readonly string[];
  timeline: readonly ToolTimelineItem[];
  comparisonLabel: string;
  comparison: readonly ToolComparisonRow[];
  powerHeadline: string;
  powerNote: string;
  metrics: readonly ToolMetric[];
  features: readonly ToolFeatureDetail[];
  limitations: readonly string[];
  roadmap: readonly ToolRoadmapItem[];
  sources: readonly ToolSource[];
}

export const AI_TOOL_DETAILS: Record<string, ToolDossier> = {
  chatgpt: {
    launched: "November 30, 2022",
    currentRelease: "GPT-5.6 family",
    releaseStatus: "Generally available since July 9, 2026",
    positioning:
      "A general-purpose assistant for chat, research, coding, files, images, voice and end-to-end knowledge work.",
    modelNote:
      "ChatGPT is the product; GPT-5.6 Sol, Terra and Luna are current underlying model tiers. Which tier and reasoning effort you can use depends on the plan and surface.",
    overview: [
      "ChatGPT began as a free research preview built on GPT-3.5 and has grown into a multi-tool workspace rather than a text-only chatbot.",
      "The current GPT-5.6 family separates flagship quality (Sol), balanced everyday work (Terra) and fast low-cost work (Luna). ChatGPT can automatically combine reasoning with web, file, image, code and connected-app tools.",
    ],
    timeline: [
      {
        date: "Nov 2022",
        title: "ChatGPT research preview",
        status: "Milestone",
        summary:
          "OpenAI released the conversational GPT-3.5 experience to collect feedback.",
        changes: [
          "Follow-up conversation",
          "Mistake acknowledgement",
          "Instruction following and refusal behavior",
        ],
        sourceUrl: "https://openai.com/index/chatgpt/",
      },
      {
        date: "Mar 2023 - May 2024",
        title: "GPT-4 to GPT-4o",
        status: "Milestone",
        summary:
          "ChatGPT added stronger reasoning, then moved toward a natively multimodal, faster experience across text, vision and voice.",
        changes: [
          "Stronger complex reasoning",
          "Image understanding",
          "Faster multimodal interaction",
          "Broader free access",
        ],
        sourceUrl: "https://openai.com/index/hello-gpt-4o/",
      },
      {
        date: "Aug 2025",
        title: "GPT-5 generation",
        status: "Milestone",
        summary:
          "A unified system combined fast responses with deeper reasoning and improved instruction following, coding and factual reliability.",
        changes: [
          "Automatic routing between fast and thinking modes",
          "Lower factual-error rates",
          "Improved coding and health responses",
        ],
        sourceUrl: "https://openai.com/index/introducing-gpt-5/",
      },
      {
        date: "Jul-Aug 2026",
        title: "GPT-5.6 Sol, Terra and Luna",
        status: "Current",
        summary:
          "The family added durable capability tiers, configurable effort, stronger agent work and improved price-performance.",
        changes: [
          "Programmatic tool calling",
          "Multi-agent beta and ultra mode",
          "Stronger computer use and design judgment",
          "Lower Terra/Luna API pricing",
        ],
        sourceUrl: "https://openai.com/index/gpt-5-6/",
      },
    ],
    comparisonLabel: "GPT-5.5 vs GPT-5.6 Sol",
    comparison: [
      {
        dimension: "Professional agent tasks",
        previous: "46.9% on Agents' Last Exam",
        current: "52.7%",
        difference: "+5.8 percentage points (about 12.4% relative)",
      },
      {
        dimension: "Research workflow capability",
        previous: "GPT-5.5 baseline",
        current: "GPT-5.6 Sol",
        difference:
          "+16.2 points on OpenAI's internal aggregate RSI evaluation",
      },
      {
        dimension: "Tool orchestration",
        previous: "Tool calls handled mainly through the host loop",
        current:
          "Can write small in-memory programs and coordinate parallel agents",
        difference: "Fewer round trips for multi-step workflows",
      },
      {
        dimension: "Product structure",
        previous: "Single generation with model variants",
        current: "Sol / Terra / Luna capability tiers plus effort controls",
        difference: "More explicit quality, speed and cost choice",
      },
    ],
    powerHeadline: "No honest single 'times more powerful' number exists.",
    powerNote:
      "Capability changes by task. The fairest published comparison is benchmark-by-benchmark; adoption or token volume is not treated as intelligence.",
    metrics: [
      {
        value: "+12.4%",
        label: "Relative ALE gain",
        detail:
          "52.7% versus 46.9% for GPT-5.5 on long-running professional workflows.",
        sourceUrl: "https://openai.com/index/gpt-5-6/",
      },
      {
        value: "< 1/2",
        label: "Coding time and tokens",
        detail:
          "Sol used less than half the time and output tokens of Claude Fable 5 on OpenAI's cited Coding Agent Index comparison.",
        sourceUrl: "https://openai.com/index/gpt-5-6/",
      },
      {
        value: "61% less",
        label: "Completion time",
        detail:
          "Sol Max came within one point of Fable 5 on the AA Intelligence Index while finishing in 61% less time.",
        sourceUrl: "https://openai.com/index/gpt-5-6/",
      },
    ],
    features: [
      {
        name: "Deep research",
        availability: "Plan and region dependent",
        howItWorks:
          "Plans a research path, searches multiple sources, reads them and produces a cited synthesis instead of relying only on model memory.",
        usefulFor:
          "Market scans, literature reviews and evidence-heavy questions",
        caution:
          "Always open the cited sources; a citation can still be incomplete or misinterpreted.",
      },
      {
        name: "Data and file analysis",
        availability: "Upload limits vary by plan",
        howItWorks:
          "Parses documents or tables and can use a code-execution environment to calculate, transform and visualize data.",
        usefulFor: "PDF review, spreadsheets, charts and structured extraction",
        caution:
          "Check formulas, units and sampled rows before using results operationally.",
      },
      {
        name: "GPT-5.6 effort controls",
        availability: "Controls vary across Chat, Work, Codex and API",
        howItWorks:
          "Higher effort allocates more reasoning and, at the top end, can coordinate multiple workstreams; lower effort prioritizes speed.",
        usefulFor: "Matching response cost and latency to task difficulty",
      },
      {
        name: "Voice and vision",
        availability: "Plan, platform and usage limits vary",
        howItWorks:
          "Accepts speech and images as context and returns conversational or visual assistance through supported clients.",
        usefulFor: "Hands-free help, visual inspection and accessibility",
        caution:
          "Do not treat visual or voice output as a substitute for expert inspection in high-stakes cases.",
      },
    ],
    limitations: [
      "Model, tool and usage availability differs between ChatGPT, ChatGPT Work, Codex and the API.",
      "Even cited or tool-assisted answers can contain errors; high-stakes claims need source-level verification.",
      "A higher reasoning setting usually increases latency and resource use; it is unnecessary for simple tasks.",
    ],
    roadmap: [
      {
        title: "GPT-5.6 multi-agent",
        status: "Rolling out",
        detail:
          "Multi-agent support launched in beta for supported workflows; availability and behavior may change during rollout.",
        sourceUrl: "https://openai.com/index/gpt-5-6/",
      },
      {
        title: "Product-specific model tuning",
        status: "Rolling out",
        detail:
          "OpenAI is separately tuning GPT-5.6 for everyday ChatGPT conversations while broadening Luna access for Free users.",
        sourceUrl: "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/",
      },
      {
        title: "Next named generation",
        status: "No public date",
        detail:
          "OpenAI has not published a release date or guaranteed feature list for a successor to GPT-5.6.",
      },
    ],
    sources: [
      {
        title: "Introducing ChatGPT",
        publisher: "OpenAI",
        date: "Nov 30, 2022",
        url: "https://openai.com/index/chatgpt/",
      },
      {
        title: "GPT-5.6: Frontier intelligence that scales with your ambition",
        publisher: "OpenAI",
        date: "Jul 9, 2026",
        url: "https://openai.com/index/gpt-5-6/",
      },
      {
        title: "Improving GPT-5.6 Sol in ChatGPT",
        publisher: "OpenAI",
        date: "Aug 6, 2026",
        url: "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/",
      },
    ],
  },

  claude: {
    launched: "March 14, 2023",
    currentRelease: "Claude Sonnet 5",
    releaseStatus: "Available across Claude plans since June 30, 2026",
    positioning:
      "A writing, coding and agentic-work assistant with a strong emphasis on long-form reasoning, controllability and safety.",
    modelNote:
      "Claude is the product family. Sonnet 5 is the current default for Free and Pro; higher-capability Opus models and specialized Claude Code/Cowork surfaces have separate access and pricing.",
    overview: [
      "Anthropic evolved Claude from a general conversational model into a family of fast Haiku, balanced Sonnet and frontier Opus models.",
      "Sonnet 5 focuses on planning, browser/terminal tool use and autonomous work at Sonnet pricing, narrowing the gap with the larger Opus class.",
    ],
    timeline: [
      {
        date: "Mar 2023",
        title: "Claude public launch",
        status: "Milestone",
        summary:
          "Anthropic made its assistant available after an earlier closed alpha and safety testing period.",
        changes: [
          "Conversational assistance",
          "Constitutional AI-based training approach",
          "Early business integrations",
        ],
        sourceUrl: "https://www.anthropic.com/news/introducing-claude",
      },
      {
        date: "Mar-Jun 2024",
        title: "Claude 3 and 3.5 Sonnet",
        status: "Milestone",
        summary:
          "The Opus/Sonnet/Haiku family added vision; 3.5 Sonnet then raised coding and reasoning quality while introducing Artifacts.",
        changes: [
          "Vision input",
          "200K context",
          "Artifacts workspace",
          "3.5 Sonnet delivered frontier quality at Sonnet speed/cost",
        ],
        sourceUrl: "https://www.anthropic.com/news/claude-3-5-sonnet",
      },
      {
        date: "Feb-May 2025",
        title: "Claude 3.7 and Claude 4",
        status: "Milestone",
        summary:
          "Claude gained hybrid reasoning and Claude Code, followed by stronger long-running agent and coding behavior in the Claude 4 family.",
        changes: [
          "Visible extended thinking",
          "Fine-grained thinking budgets in API",
          "Claude Code",
          "More sustained tool workflows",
        ],
        sourceUrl: "https://www.anthropic.com/news/claude-3-7-sonnet",
      },
      {
        date: "Jun 2026",
        title: "Claude Sonnet 5",
        status: "Current",
        summary:
          "The latest Sonnet focuses on autonomous plans, tool use, coding and professional work at scale.",
        changes: [
          "More agentic than Sonnet 4.6",
          "Close to Opus 4.8 on several tasks",
          "Effort controls",
          "Lower undesirable-behavior rate in Anthropic evaluations",
        ],
        sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5",
      },
    ],
    comparisonLabel: "Sonnet 4.6 vs Sonnet 5",
    comparison: [
      {
        dimension: "Agent behavior",
        previous: "Strong coding and tool use",
        current: "Plans and runs browser/terminal workflows more autonomously",
        difference:
          "Sonnet class moves closer to recent Opus-class agent ability",
      },
      {
        dimension: "Reasoning control",
        previous: "Extended thinking with supported effort controls",
        current: "Effort levels tuned for longer agentic work",
        difference: "More flexible speed-versus-depth selection",
      },
      {
        dimension: "Safety behavior",
        previous: "Sonnet 4.6 baseline",
        current: "Lower overall undesirable-behavior rate in Anthropic tests",
        difference:
          "Provider reports safer agentic use; not a guarantee for every prompt",
      },
      {
        dimension: "Tokenization",
        previous: "Earlier tokenizer",
        current: "Updated tokenizer",
        difference:
          "The same input may use roughly 1.0-1.35x tokens depending on content",
      },
    ],
    powerHeadline:
      "Anthropic reports a substantial agentic gain, not a universal multiplier.",
    powerNote:
      "Sonnet 5's official post compares multiple task-specific evaluations. Because scores and effort settings differ, describing the whole model as '2x stronger' would be misleading.",
    metrics: [
      {
        value: "Near Opus 4.8",
        label: "Agentic performance",
        detail:
          "Anthropic says Sonnet 5 approaches the larger Opus 4.8 on important agentic evaluations at lower price.",
        sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5",
      },
      {
        value: "1.0-1.35x",
        label: "Tokens for same input",
        detail:
          "The updated tokenizer can map identical content to more tokens; this is a cost consideration, not a capability gain.",
        sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5",
      },
      {
        value: "200K",
        label: "Long-context class",
        detail:
          "Claude's established long-context capacity supports large documents and codebases; effective recall still depends on task design.",
        sourceUrl: "https://www.anthropic.com/news/claude-3-family",
      },
    ],
    features: [
      {
        name: "Artifacts",
        availability: "Claude web and supported apps",
        howItWorks:
          "Places generated documents, code or interactive content in a separate working canvas so the output can be iterated alongside chat.",
        usefulFor: "Drafting, prototyping and reviewing deliverables",
      },
      {
        name: "Claude Code",
        availability: "Plan and API usage rules vary",
        howItWorks:
          "An agentic coding surface reads a repository, edits files, runs commands and tests, and reports the resulting changes.",
        usefulFor: "Repository-scale implementation, debugging and review",
        caution:
          "Review diffs and command permissions before accepting agent changes.",
      },
      {
        name: "Projects and knowledge",
        availability: "Limits vary by plan",
        howItWorks:
          "Groups chats, instructions and reference files; retrieval can fetch relevant passages when the knowledge set grows beyond the active context.",
        usefulFor:
          "Reusable team context, research libraries and consistent writing",
      },
      {
        name: "Extended thinking and effort",
        availability: "Model and surface dependent",
        howItWorks:
          "Allocates additional inference time before the final answer; API controls can balance latency, cost and depth.",
        usefulFor: "Complex analysis, coding and planning",
      },
    ],
    limitations: [
      "Claude can still hallucinate facts, citations and code behavior; outputs need verification.",
      "Long context is not the same as perfect recall, and large inputs can increase token cost.",
      "Model availability differs by plan, cloud provider, geography and safety program eligibility.",
    ],
    roadmap: [
      {
        title: "Wider Sonnet 5 cloud availability",
        status: "Rolling out",
        detail:
          "Anthropic announced additional cloud-provider availability for supported programs after native-platform launch.",
        sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5",
      },
      {
        title: "Agent and Claude Code improvements",
        status: "Rolling out",
        detail:
          "The Sonnet 5 launch centers on longer tool workflows and higher effort levels; these product surfaces continue to receive updates.",
        sourceUrl: "https://www.anthropic.com/news/claude-sonnet-5",
      },
      {
        title: "Next Sonnet generation",
        status: "No public date",
        detail:
          "Anthropic has not published a release date or fixed specification for Sonnet 6.",
      },
    ],
    sources: [
      {
        title: "Claude 3 model family",
        publisher: "Anthropic",
        date: "Mar 4, 2024",
        url: "https://www.anthropic.com/news/claude-3-family",
      },
      {
        title: "Claude 3.7 Sonnet and Claude Code",
        publisher: "Anthropic",
        date: "Feb 24, 2025",
        url: "https://www.anthropic.com/news/claude-3-7-sonnet",
      },
      {
        title: "Introducing Claude Sonnet 5",
        publisher: "Anthropic",
        date: "Jun 30, 2026",
        url: "https://www.anthropic.com/news/claude-sonnet-5",
      },
    ],
  },

  gemini: {
    launched: "February 8, 2024 (Gemini brand; Bard launched in 2023)",
    currentRelease: "Gemini 3.5 Flash / 3.1 Pro",
    releaseStatus:
      "3.5 Flash announced May 19, 2026; 3.1 Pro remains the complex-reasoning tier",
    positioning:
      "Google's multimodal assistant across the Gemini app, Search, Workspace, Android and developer platforms.",
    modelNote:
      "Gemini is both a consumer product and a model family. The fastest current model and the deepest reasoning option may be different, and access varies across Gemini app, AI Studio, Vertex AI and Workspace.",
    overview: [
      "Google renamed Bard to Gemini in February 2024 and paired the app with its Gemini model family, mobile access and an Advanced subscription.",
      "The product now combines chat with Google Search grounding, connected apps, long context, live multimodal interaction, Deep Research and creation tools.",
    ],
    timeline: [
      {
        date: "Feb 2024",
        title: "Bard becomes Gemini",
        status: "Milestone",
        summary:
          "Google introduced the Gemini name, Gemini Advanced with Ultra 1.0 and dedicated mobile access.",
        changes: [
          "Ultra 1.0 access",
          "Android app and iOS entry point",
          "Text, voice and image prompts",
          "Expanded Workspace integration roadmap",
        ],
        sourceUrl:
          "https://blog.google/products-and-platforms/products/gemini/bard-gemini-advanced-app/",
      },
      {
        date: "Dec 2024",
        title: "Gemini 2.0",
        status: "Milestone",
        summary:
          "The family moved toward agentic systems with native tool use and multimodal output prototypes.",
        changes: [
          "Native Search and Maps tool use",
          "Image and audio output research",
          "Project Astra, Mariner and Jules prototypes",
          "2.0 Flash preview",
        ],
        sourceUrl:
          "https://blog.google/products-and-platforms/products/gemini/google-gemini-ai-collection-2024/",
      },
      {
        date: "Mar-May 2025",
        title: "Gemini 2.5",
        status: "Milestone",
        summary:
          "Thinking models, 1M-token context, stronger coding and Deep Think expanded complex work.",
        changes: [
          "Thinking models",
          "1M-token context",
          "Deep Research upgrades",
          "Native audio and computer-use previews",
        ],
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/google-gemini-updates-io-2025/",
      },
      {
        date: "Feb-May 2026",
        title: "Gemini 3.1 Pro and 3.5 Flash",
        status: "Current",
        summary:
          "3.1 Pro more than doubled 3 Pro's ARC-AGI-2 result; 3.5 Flash then targeted frontier quality at much higher speed.",
        changes: [
          "77.1% ARC-AGI-2 for 3.1 Pro",
          "Stronger visual and interactive coding",
          "3.5 Flash outperforms 3.1 Pro across almost all cited benchmarks",
          "Four-times-faster provider claim for agent workflows",
        ],
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
      },
    ],
    comparisonLabel: "Gemini 3 Pro vs 3.1 Pro, then 3.5 Flash",
    comparison: [
      {
        dimension: "Novel reasoning",
        previous: "Gemini 3 Pro baseline",
        current: "3.1 Pro: 77.1% ARC-AGI-2",
        difference: "More than 2x the 3 Pro score, according to Google",
      },
      {
        dimension: "Speed",
        previous: "3.1 Pro optimized for difficult reasoning",
        current: "3.5 Flash optimized for frontier speed",
        difference:
          "Google says 3.5 Flash runs 4x faster than other frontier models",
      },
      {
        dimension: "Product workflow",
        previous: "Chat plus connected Google apps",
        current:
          "More agentic coding, Deep Research and live multimodal workflows",
        difference:
          "Moves from answer generation toward planning and execution",
      },
      {
        dimension: "Model choice",
        previous: "Pro/Flash split",
        current: "3.1 Pro depth plus 3.5 Flash speed",
        difference:
          "Best model depends on reasoning depth, latency and product surface",
      },
    ],
    powerHeadline:
      "One official result is genuinely above 2x - but only on a specific reasoning benchmark.",
    powerNote:
      "Google reports 3.1 Pro scored more than twice Gemini 3 Pro on ARC-AGI-2. That does not mean every response or feature is twice as capable. Separately, Google describes 3.5 Flash as four times faster than other frontier models, which is a speed claim, not 4x intelligence.",
    metrics: [
      {
        value: ">2x",
        label: "ARC-AGI-2 score",
        detail:
          "Gemini 3.1 Pro reached a verified 77.1%, more than double Gemini 3 Pro's result.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/",
      },
      {
        value: "4x",
        label: "Claimed model speed",
        detail:
          "Google says Gemini 3.5 Flash runs four times faster than other frontier models while beating 3.1 Pro on almost all cited benchmarks.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
      },
      {
        value: "1M",
        label: "2.5 Pro context",
        detail:
          "The 2.5 generation established million-token long-context workflows in supported products.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/google-gemini-updates-io-2025/",
      },
    ],
    features: [
      {
        name: "Deep Research",
        availability: "Limits and model vary by plan",
        howItWorks:
          "Builds a research plan, searches the web and connected sources, then synthesizes a linked report.",
        usefulFor:
          "Complex comparisons, background research and decision briefs",
        caution:
          "Inspect citations and dates; synthesis can omit conflicting evidence.",
      },
      {
        name: "Gemini Live",
        availability: "Device, language and plan dependent",
        howItWorks:
          "Streams audio and, on supported devices, camera or screen context for a continuous spoken conversation.",
        usefulFor: "Hands-free tutoring, visual assistance and brainstorming",
      },
      {
        name: "Connected Google apps",
        availability: "Account and Workspace controls apply",
        howItWorks:
          "Extensions retrieve permitted context from services such as Gmail, Drive, Maps or YouTube and pass relevant information into the response.",
        usefulFor: "Email summaries, travel planning and document workflows",
        caution:
          "Review which services are connected and what organizational policies allow.",
      },
      {
        name: "Canvas and creation tools",
        availability: "Feature availability varies",
        howItWorks:
          "Creates editable documents, code, quizzes and media-oriented outputs in a side-by-side workspace.",
        usefulFor: "Drafting, learning materials and rapid prototypes",
      },
    ],
    limitations: [
      "The Gemini app, Gemini models, Workspace features and API do not share identical model access or limits.",
      "Live web grounding improves freshness but does not guarantee correct source selection or interpretation.",
      "Preview model names, pricing and limits can change before general availability.",
    ],
    roadmap: [
      {
        title: "Gemini 3.5 Flash expansion",
        status: "Rolling out",
        detail:
          "Google announced broader agentic development use following the I/O 2026 release.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
      },
      {
        title: "3.1 Pro general availability",
        status: "Announced",
        detail:
          "Google said the preview would advance agentic workflows before general availability, but the launch post did not give a fixed date.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/",
      },
      {
        title: "Next numbered generation",
        status: "No public date",
        detail:
          "No official release date or complete specification for Gemini 4 has been published.",
      },
    ],
    sources: [
      {
        title: "Bard becomes Gemini",
        publisher: "Google",
        date: "Feb 8, 2024",
        url: "https://blog.google/products-and-platforms/products/gemini/bard-gemini-advanced-app/",
      },
      {
        title: "Gemini 3.1 Pro",
        publisher: "Google",
        date: "Feb 19, 2026",
        url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/",
      },
      {
        title: "Gemini 3.5: frontier intelligence with action",
        publisher: "Google",
        date: "May 19, 2026",
        url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
      },
    ],
  },

  perplexity: {
    launched: "2022",
    currentRelease: "Search, Advanced Deep Research, Create and Computer",
    releaseStatus: "Current product stack verified August 2026",
    positioning:
      "An answer engine and agent platform built around live retrieval, citations, multi-model reasoning and finished work products.",
    modelNote:
      "Perplexity is a retrieval-and-agent product, not one fixed foundation model. It routes or lets paid users choose models, then adds search, citations, code execution and product-specific orchestration.",
    overview: [
      "Perplexity's core workflow interprets a question, searches the live web, synthesizes an answer and attaches citations that users can inspect.",
      "The platform has expanded from search into Research, editable asset creation, the Comet browser and Computer agents that can work across files, apps and the web.",
    ],
    timeline: [
      {
        date: "2022-2024",
        title: "Answer engine and Pro Search",
        status: "Milestone",
        summary:
          "Perplexity established conversational web answers, citations, follow-up context and model choice for paid users.",
        changes: [
          "Real-time web retrieval",
          "Inline citations",
          "Conversational follow-ups",
          "Pro model selector",
        ],
        sourceUrl:
          "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work",
      },
      {
        date: "Feb-May 2025",
        title: "Deep Research and Labs",
        status: "Milestone",
        summary:
          "Research automated many searches and source reads; Labs added code, charts and richer project outputs.",
        changes: [
          "Multi-step research",
          "Hundreds of source reads",
          "Code execution",
          "Reports, dashboards and simple apps",
        ],
        sourceUrl:
          "https://www.perplexity.ai/help-center/en/articles/10738684-what-is-research-mode",
      },
      {
        date: "Jul 2025",
        title: "Comet AI browser",
        status: "Milestone",
        summary:
          "Perplexity brought an assistant into the browsing layer for page-aware research and actions.",
        changes: [
          "Browser-context assistance",
          "Tab and page workflows",
          "Assistant-led browsing",
          "Later desktop and mobile expansion",
        ],
        sourceUrl: "https://www.perplexity.ai/hub/blog/introducing-comet",
      },
      {
        date: "Feb-Jul 2026",
        title: "Computer and Advanced Deep Research",
        status: "Current",
        summary:
          "Perplexity expanded into longer autonomous work and upgraded Research with documents, calculation, broader browsing and a live progress interface.",
        changes: [
          "Work across web, apps and files",
          "Improved code sandbox",
          "Clarifying and mid-run follow-up questions",
          "Editable, shareable research reports",
        ],
        sourceUrl:
          "https://www.perplexity.ai/help-center/en/articles/13600190-what-s-new-in-advanced-deep-research",
      },
    ],
    comparisonLabel: "Earlier Deep Research vs Advanced Deep Research",
    comparison: [
      {
        dimension: "Research loop",
        previous: "Autonomous searches and a final report",
        current: "More sources, cross-checking and harder-to-reach web content",
        difference: "More depth and professional due-diligence focus",
      },
      {
        dimension: "User control",
        previous: "Submit and wait for the report",
        current:
          "Clarifying questions and follow-ups while research is running",
        difference: "The user can steer scope before and during execution",
      },
      {
        dimension: "Tools",
        previous: "Primarily web research",
        current: "Uploaded documents plus improved calculation/code sandbox",
        difference: "Can mix source review with quantitative work",
      },
      {
        dimension: "Output",
        previous: "Generated report",
        current: "Streaming, editable and shareable file",
        difference: "Research moves directly into a working deliverable",
      },
    ],
    powerHeadline: "No version-wide multiplier is published for Perplexity.",
    powerNote:
      "Perplexity combines changing third-party models with its own retrieval and agent layers. A single 'x more powerful' number would mix model quality, search coverage, latency and tools; the company describes quality improvements but does not publish a universal previous-versus-current multiplier.",
    metrics: [
      {
        value: "2-4 min",
        label: "Typical Research report",
        detail:
          "Perplexity's help center says Research can perform dozens of searches and read hundreds of sources in a few minutes.",
        sourceUrl:
          "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work",
      },
      {
        value: "100 tasks",
        label: "DRACO benchmark",
        detail:
          "Perplexity's 2026 research benchmark covers complex deep-research tasks across 10 domains and 40 countries.",
        sourceUrl: "https://r2cdn.perplexity.ai/pplx-draco.pdf",
      },
      {
        value: "No fixed x",
        label: "Overall improvement",
        detail:
          "No official cross-version score supports a defensible universal multiplier.",
      },
    ],
    features: [
      {
        name: "Search and citations",
        availability: "Core free and paid experience",
        howItWorks:
          "Retrieves live pages, ranks relevant passages, uses a language model to synthesize them and links claims back to sources.",
        usefulFor: "Current facts, discovery and quick source trails",
        caution:
          "Citation presence does not prove that every claim is supported; open the underlying page.",
      },
      {
        name: "Advanced Deep Research",
        availability: "Compute and model limits vary by subscription",
        howItWorks:
          "Repeatedly plans, searches, reads, cross-checks and can calculate or analyze uploads before writing an editable report.",
        usefulFor: "Due diligence, academic exploration and large comparisons",
      },
      {
        name: "Create files and apps",
        availability: "Eligible Pro, Education, Max and Enterprise plans",
        howItWorks:
          "Combines research, code execution, visual generation and iterative prompts to create documents, spreadsheets, slides and HTML apps.",
        usefulFor: "Turning research into a deliverable",
        caution:
          "Documents can include citations, but generated apps and calculations still require functional review.",
      },
      {
        name: "Computer and Comet",
        availability: "Platform and plan rollout varies",
        howItWorks:
          "Uses browser/app context and agent tools to carry work across pages, local or connected files and supported services.",
        usefulFor: "Longer multi-app workflows",
        caution:
          "Review action scope, credentials and any irreversible step before authorizing it.",
      },
    ],
    limitations: [
      "Search quality depends on index coverage, source accessibility and ranking; paywalls or blocked pages can leave gaps.",
      "The selected foundation model may change, so identical prompts can behave differently over time.",
      "Agent actions and generated assets require human review, especially when financial, legal or account changes are involved.",
    ],
    roadmap: [
      {
        title: "Computer platform expansion",
        status: "Rolling out",
        detail:
          "Perplexity is extending Computer across desktop, teams, professional verticals and builder APIs.",
        sourceUrl: "https://www.perplexity.ai/hub/blog",
      },
      {
        title: "Agent API and managed runtimes",
        status: "Rolling out",
        detail:
          "The August 2026 Agent API release continues Perplexity's move from consumer search to developer-controlled agents.",
        sourceUrl: "https://www.perplexity.ai/hub/blog",
      },
      {
        title: "Next named search generation",
        status: "No public date",
        detail:
          "Perplexity has not announced a single numbered successor because the product evolves continuously across models and modes.",
      },
    ],
    sources: [
      {
        title: "How does Perplexity work?",
        publisher: "Perplexity",
        date: "Updated 2026",
        url: "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work",
      },
      {
        title: "What's New in Advanced Deep Research",
        publisher: "Perplexity",
        date: "Jul 16, 2026",
        url: "https://www.perplexity.ai/help-center/en/articles/13600190-what-s-new-in-advanced-deep-research",
      },
      {
        title: "Creating assets with Perplexity",
        publisher: "Perplexity",
        date: "Jul 16, 2026",
        url: "https://www.perplexity.ai/help-center/en/articles/12528830-creating-assets-with-perplexity-overview",
      },
    ],
  },

  grok: {
    launched: "November 4, 2023",
    currentRelease: "Grok 4.6",
    releaseStatus: "Released August 12, 2026",
    positioning:
      "A general and developer assistant focused on real-time web/X context, agentic coding, long-running work and visual creation.",
    modelNote:
      "Grok is the consumer product and model brand. Grok 4.6 is available through developer/partner surfaces and the API; consumer access, tools and model selection vary across grok.com, X and apps.",
    overview: [
      "Grok began as an assistant integrated with X and quickly expanded from conversational access into multimodal models, APIs, search tools and coding agents.",
      "Grok 4.6 emphasizes sustained, multi-step agent work and stronger first-pass visual or interactive projects rather than only benchmark question answering.",
    ],
    timeline: [
      {
        date: "Nov 2023",
        title: "Grok beta",
        status: "Milestone",
        summary:
          "xAI introduced Grok as a conversational assistant with access to current information through X.",
        changes: [
          "Conversational assistant",
          "Real-time X context",
          "Early beta access",
        ],
        sourceUrl: "https://x.ai/news/grok",
      },
      {
        date: "Mar 2024",
        title: "Grok-1.5",
        status: "Milestone",
        summary:
          "Reasoning and coding improved while context expanded to 128K tokens.",
        changes: [
          "MATH rose from 23.9% to 50.6%",
          "HumanEval rose from 63.2% to 74.1%",
          "16x previous context length",
          "Long-context retrieval evaluation",
        ],
        sourceUrl: "https://x.ai/news/grok-1.5",
      },
      {
        date: "Jul-Nov 2025",
        title: "Grok 4 and 4.1 Fast",
        status: "Milestone",
        summary:
          "Grok moved into deeper reasoning, agent tool use and a 2M-context fast tool-calling variant.",
        changes: [
          "Web and X search tools",
          "Code execution",
          "File retrieval",
          "MCP and long-horizon tool calling",
        ],
        sourceUrl: "https://x.ai/news/grok-4-1-fast",
      },
      {
        date: "Aug 2026",
        title: "Grok 4.6",
        status: "Current",
        summary:
          "The current flagship improves longer agent trajectories, coding and ambitious visual or interactive work.",
        changes: [
          "More self-testing on long tasks",
          "Improved visual first passes",
          "500K context on Vertex AI",
          "Configurable low-to-xhigh reasoning",
        ],
        sourceUrl: "https://x.ai/news/grok-4-6",
      },
    ],
    comparisonLabel: "Grok 4.5 High vs Grok 4.6 High",
    comparison: [
      {
        dimension: "CursorBench 3.2",
        previous: "66.7%",
        current: "69.9%",
        difference: "+3.2 points (about 4.8% relative)",
      },
      {
        dimension: "DeepSWE 1.1",
        previous: "54.0%",
        current: "65.9%",
        difference: "+11.9 points (about 22% relative)",
      },
      {
        dimension: "Terminal-Bench 3.0",
        previous: "15.7%",
        current: "26.0%",
        difference: "+10.3 points (about 65.6% relative)",
      },
      {
        dimension: "Long-running behavior",
        previous: "Strong agent and coding baseline",
        current: "More persistence, self-testing and refinement",
        difference:
          "Better fit for multi-step projects according to xAI testing",
      },
    ],
    powerHeadline:
      "The gain ranges from about 1.05x to 1.66x on selected agent benchmarks.",
    powerNote:
      "Those ratios are calculated from xAI's published Grok 4.5 and 4.6 scores. They are benchmark-specific and should not be generalized to every task.",
    metrics: [
      {
        value: "1.22x",
        label: "DeepSWE relative score",
        detail: "65.9% versus 54.0% for Grok 4.5 High.",
        sourceUrl: "https://x.ai/news/grok-4-6",
      },
      {
        value: "1.66x",
        label: "Terminal-Bench relative score",
        detail:
          "26.0% versus 15.7%; this is the largest relative gain among the selected published comparisons.",
        sourceUrl: "https://x.ai/news/grok-4-6",
      },
      {
        value: "500K",
        label: "4.6 context window",
        detail:
          "The Vertex AI release lists a 500,000-token context window and configurable reasoning effort.",
        sourceUrl: "https://x.ai/news/grok-4-6-vertex-ai",
      },
    ],
    features: [
      {
        name: "Real-time web and X search",
        availability: "Product and API tool access varies",
        howItWorks:
          "The agent can issue web or X searches, inspect results and incorporate recent information into a response.",
        usefulFor: "Breaking news, public sentiment and current research",
        caution:
          "Fast-moving social posts can be wrong or manipulated; verify primary evidence.",
      },
      {
        name: "Agent Tools API",
        availability: "API pricing and tool-call charges apply",
        howItWorks:
          "Server-managed web search, X search, code execution, file retrieval and MCP tools can be selected and called over multiple turns.",
        usefulFor: "Support agents, finance workflows and research automation",
      },
      {
        name: "Grok Build",
        availability: "Availability and included usage vary",
        howItWorks:
          "Uses the model as a coding agent to research, structure, implement and iterate on software projects.",
        usefulFor: "Prototypes, codebase work and interactive applications",
        caution:
          "Run tests and review security-sensitive changes before deployment.",
      },
      {
        name: "Grok Imagine",
        availability: "Web, mobile and API availability varies",
        howItWorks:
          "Generates or transforms images and video; current video models can create synchronized motion, sound and speech from prompts or starting images.",
        usefulFor: "Creative ideation and short-form media",
      },
    ],
    limitations: [
      "xAI's reported benchmarks use specific reasoning settings and harnesses; results may not match consumer chat behavior.",
      "Real-time X access increases freshness but also exposes the system to low-quality or adversarial content.",
      "High-effort agent tasks can be slower and need careful supervision when tools can take actions.",
    ],
    roadmap: [
      {
        title: "Broader Grok 4.6 distribution",
        status: "Rolling out",
        detail:
          "xAI launched 4.6 across its API and partners, including Vertex AI shortly after the initial release.",
        sourceUrl: "https://x.ai/news/grok-4-6-vertex-ai",
      },
      {
        title: "Longer, self-verifying agents",
        status: "Announced",
        detail:
          "xAI identifies sustained work, self-testing and ambitious interactive projects as the focus of the 4.6 line.",
        sourceUrl: "https://x.ai/news/grok-4-6",
      },
      {
        title: "Next numbered Grok",
        status: "No public date",
        detail:
          "No verified launch date or feature specification for a Grok 5 generation is public.",
      },
    ],
    sources: [
      {
        title: "Announcing Grok-1.5",
        publisher: "SpaceXAI",
        date: "Mar 28, 2024",
        url: "https://x.ai/news/grok-1.5",
      },
      {
        title: "Grok 4.1 Fast and Agent Tools API",
        publisher: "SpaceXAI",
        date: "Nov 19, 2025",
        url: "https://x.ai/news/grok-4-1-fast",
      },
      {
        title: "Introducing Grok 4.6",
        publisher: "SpaceXAI",
        date: "Aug 12, 2026",
        url: "https://x.ai/news/grok-4-6",
      },
    ],
  },

  "meta-ai": {
    launched: "September 27, 2023",
    currentRelease: "Muse Spark 1.1",
    releaseStatus: "Announced July 2026; rolling out across Meta AI surfaces",
    positioning:
      "A personal assistant embedded across Meta apps, the standalone app, web and AI glasses, with social context and creative media tools.",
    modelNote:
      "Meta AI is the consumer assistant. Muse Spark 1.1 powers current reasoning and agent features; Muse Image handles generation/editing, while future media and open-model releases follow separate tracks.",
    overview: [
      "Meta AI launched inside WhatsApp, Messenger and Instagram, then expanded to Facebook, the web, a standalone app and Ray-Ban/Oakley devices.",
      "The current Muse stack shifts the assistant from answering and generating images toward planning, app connections, recurring tasks, research and deliverable creation.",
    ],
    timeline: [
      {
        date: "Sep 2023",
        title: "Meta AI announced",
        status: "Milestone",
        summary:
          "Meta introduced an assistant across its messaging and social apps, initially powered by Llama-family technology.",
        changes: [
          "Group-chat access",
          "Web information",
          "Image creation",
          "Multiple Meta app surfaces",
        ],
        sourceUrl:
          "https://about.fb.com/news/2023/09/introducing-ai-powered-assistants-characters-and-creative-tools/",
      },
      {
        date: "Apr 2024",
        title: "Meta AI with Llama 3",
        status: "Milestone",
        summary:
          "Meta expanded country availability, added meta.ai and made search/feed access and image generation faster.",
        changes: [
          "Llama 3 reasoning",
          "Real-time web information",
          "Image generation while typing",
          "Web conversation history",
        ],
        sourceUrl:
          "https://about.fb.com/news/2024/04/meta-ai-assistant-built-with-llama-3/",
      },
      {
        date: "Apr-May 2026",
        title: "Muse Spark",
        status: "Milestone",
        summary:
          "A rebuilt multimodal model added tool use, visual reasoning, parallel subagents and faster live multimodal interaction.",
        changes: [
          "Instant and Thinking modes",
          "Parallel subagents",
          "Live camera understanding",
          "Shopping and social-content context",
        ],
        sourceUrl:
          "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
      },
      {
        date: "Jul 2026",
        title: "Muse Spark 1.1 and Muse Image",
        status: "Current",
        summary:
          "Meta AI added planning, connected apps, recurring work, deep research, slide creation and an agentic image model.",
        changes: [
          "Email and calendar connections",
          "Daily briefings and recurring tasks",
          "Steerable research and slide creation",
          "Multi-reference image generation and editing",
        ],
        sourceUrl:
          "https://about.fb.com/news/2026/07/meta-ai-muse-spark-doesnt-just-think-it-acts/",
      },
    ],
    comparisonLabel: "Llama 3-era Meta AI vs Muse Spark 1.1",
    comparison: [
      {
        dimension: "Primary behavior",
        previous: "Answers, web results and creative generation",
        current: "Plans, connects to apps and follows through on tasks",
        difference: "Assistant becomes more agentic",
      },
      {
        dimension: "Reasoning",
        previous: "Single-assistant Llama 3 workflow",
        current: "Instant/Thinking modes with parallel subagents",
        difference:
          "Complex prompts can be divided into concurrent workstreams",
      },
      {
        dimension: "Multimodality",
        previous: "Image prompts and generation",
        current:
          "Live camera understanding plus Muse Image editing and composition",
        difference:
          "From static generation to perception and iterative creation",
      },
      {
        dimension: "Deliverables",
        previous: "Chat answers and images",
        current: "Research reports, slides, plans and mood boards",
        difference: "More work products persist in one place",
      },
    ],
    powerHeadline:
      "Meta has not published a universal Muse-vs-Llama multiplier.",
    powerNote:
      "Official launch material describes capability and product changes but does not provide enough directly comparable scores to claim that Muse Spark 1.1 is a specific number of times stronger than the prior Meta AI.",
    metrics: [
      {
        value: "Parallel",
        label: "Subagent orchestration",
        detail:
          "Muse Spark can launch multiple subagents for different parts of a request and combine the result.",
        sourceUrl:
          "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
      },
      {
        value: "Billions",
        label: "Meta surface reach",
        detail:
          "Meta says the assistant is being distributed across apps used by billions; reach is not a capability benchmark.",
        sourceUrl:
          "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
      },
      {
        value: "No fixed x",
        label: "Model improvement",
        detail:
          "No official apples-to-apples product score supports a single multiplier.",
      },
    ],
    features: [
      {
        name: "Planning and recurring tasks",
        availability: "Rolling out in selected markets",
        howItWorks:
          "The assistant creates a plan, uses connected context, continues steps and can deliver recurring briefings or updates on a schedule.",
        usefulFor: "Training plans, event planning and daily briefings",
        caution:
          "Review connected-account permissions and any suggested action.",
      },
      {
        name: "Social and shopping context",
        availability: "Surface and country dependent",
        howItWorks:
          "Retrieves public posts, Reels, creator content, maps, Marketplace and web options to enrich recommendations.",
        usefulFor: "Local discovery, trends, styling and product research",
        caution:
          "Recommendations may reflect popularity or available public data rather than objective quality.",
      },
      {
        name: "Live AI and glasses",
        availability: "Supported devices and markets",
        howItWorks:
          "Processes live camera and voice context so the assistant can respond to what the user is seeing and hearing.",
        usefulFor: "Hands-free assistance and visual questions",
      },
      {
        name: "Muse Image",
        availability: "Meta AI and selected app surfaces",
        howItWorks:
          "Plans a generation, can invoke search or code, blends references and supports conversational or drawn-on-image edits.",
        usefulFor: "Visual concepts, edits, infographics and social media",
        caution:
          "Generated text, objects and public-context references should be checked before publication.",
      },
    ],
    limitations: [
      "Features and privacy controls differ among the Meta AI app, web, social apps and glasses.",
      "Personalization and connected services create additional privacy and permission considerations.",
      "Meta's product announcements provide limited direct benchmark continuity across Llama-era and Muse-era assistants.",
    ],
    roadmap: [
      {
        title: "Muse Spark 1.1 expansion",
        status: "Rolling out",
        detail:
          "Planning, connected-app and action features are moving to more countries and surfaces, including WhatsApp.",
        sourceUrl:
          "https://about.fb.com/news/2026/07/meta-ai-muse-spark-doesnt-just-think-it-acts/",
      },
      {
        title: "Muse Video",
        status: "Announced",
        detail:
          "Meta says Muse Video is in development and coming to creators and Meta AI; no fixed public release date was given.",
        sourceUrl:
          "https://ai.meta.com/blog/introducing-muse-image-muse-video-msl/",
      },
      {
        title: "Future Muse models",
        status: "Announced",
        detail:
          "Meta says larger models are in development and hopes to open-source future versions, without a guaranteed schedule.",
        sourceUrl:
          "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
      },
    ],
    sources: [
      {
        title: "Meta AI built with Llama 3",
        publisher: "Meta",
        date: "Apr 18, 2024",
        url: "https://about.fb.com/news/2024/04/meta-ai-assistant-built-with-llama-3/",
      },
      {
        title: "Introducing Muse Spark",
        publisher: "Meta",
        date: "Apr 8, 2026",
        url: "https://about.fb.com/news/2026/04/introducing-muse-spark-meta-superintelligence-labs/",
      },
      {
        title: "Meta AI doesn't just think, it acts",
        publisher: "Meta",
        date: "Jul 24, 2026",
        url: "https://about.fb.com/news/2026/07/meta-ai-muse-spark-doesnt-just-think-it-acts/",
      },
    ],
  },

  "microsoft-copilot": {
    launched:
      "February 7, 2023 as the new Bing; unified as Microsoft Copilot in late 2023",
    currentRelease: "Microsoft Copilot companion experience",
    releaseStatus:
      "Continuously updated across web, Windows, mobile and Microsoft 365",
    positioning:
      "A family of consumer and work assistants grounded in the web, Windows context or Microsoft 365 data.",
    modelNote:
      "Copilot is not one versioned model. Consumer Copilot, Microsoft 365 Copilot, GitHub Copilot and security/business copilots have different models, data boundaries and feature cycles.",
    overview: [
      "Microsoft's modern Copilot line began with AI-powered Bing and Edge, then unified its consumer experiences under the Copilot name while developing a distinct Microsoft 365 work assistant.",
      "The current experience adds memory, actions, screen/camera vision, research, pages, podcasts and deeper work agents, depending on product and subscription.",
    ],
    timeline: [
      {
        date: "Feb 2023",
        title: "AI-powered Bing and Edge",
        status: "Milestone",
        summary:
          "Microsoft launched web-grounded search, cited answers, chat and content generation with its Prometheus orchestration layer.",
        changes: [
          "Conversational search",
          "Cited web answers",
          "Creative generation",
          "Edge sidebar",
        ],
        sourceUrl:
          "https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/",
      },
      {
        date: "Mar-Nov 2023",
        title: "Microsoft 365 Copilot and unified brand",
        status: "Milestone",
        summary:
          "Workplace Copilot connected LLMs to Microsoft Graph and Office apps; Bing Chat was renamed Microsoft Copilot.",
        changes: [
          "Word, Excel, PowerPoint, Outlook and Teams assistance",
          "Work-data grounding",
          "Commercial data protection",
          "Unified Copilot identity",
        ],
        sourceUrl:
          "https://blogs.microsoft.com/blog/2023/09/21/announcing-microsoft-copilot-your-everyday-ai-companion/",
      },
      {
        date: "2024",
        title: "New consumer Copilot",
        status: "Milestone",
        summary:
          "Microsoft rebuilt the consumer interface around voice, vision and a more personal companion direction.",
        changes: [
          "Copilot Voice",
          "Early Copilot Vision",
          "Daily and Discover experiences",
          "New native apps",
        ],
        sourceUrl:
          "https://blogs.microsoft.com/blog/2024/10/01/an-ai-companion-for-everyone/",
      },
      {
        date: "Apr 2025 onward",
        title: "Memory, Actions, Vision and Research",
        status: "Current",
        summary:
          "Copilot added personalization, browser/task actions, camera and screen understanding, Pages, Podcasts and multi-step research.",
        changes: [
          "Controllable memory",
          "Copilot Actions",
          "Vision on mobile and Windows",
          "Deep Research and Copilot Search",
        ],
        sourceUrl:
          "https://blogs.microsoft.com/blog/2025/04/04/your-ai-companion/",
      },
    ],
    comparisonLabel: "Original Bing Chat vs current Copilot",
    comparison: [
      {
        dimension: "Scope",
        previous: "Web search, chat and generation",
        current: "Web, device context, memory, actions and work data",
        difference: "From search companion to multi-surface assistant",
      },
      {
        dimension: "Input context",
        previous: "Prompt plus web results",
        current:
          "Voice, camera, screen, files and permitted Microsoft Graph data",
        difference: "Much broader situational context",
      },
      {
        dimension: "Output",
        previous: "Answers, links and generated text/images",
        current:
          "Pages, podcasts, research reports, work documents and agent actions",
        difference: "More editable deliverables and task completion",
      },
      {
        dimension: "Product identity",
        previous: "Bing Chat / Bing Chat Enterprise",
        current:
          "Consumer Copilot and distinct Microsoft 365 Copilot experiences",
        difference:
          "Clearer separation by personal and organizational data boundary",
      },
    ],
    powerHeadline: "There is no meaningful single Copilot multiplier.",
    powerNote:
      "Copilot is a changing orchestration product that can use different foundation models and data sources. Microsoft publishes feature and productivity evidence, but not one controlled score comparing the entire 2023 and 2026 products.",
    metrics: [
      {
        value: "150+",
        label: "Initial Windows features",
        detail:
          "The September 2023 Windows update bundled more than 150 features, only some of which were Copilot-related.",
        sourceUrl:
          "https://blogs.microsoft.com/blog/2023/09/21/announcing-microsoft-copilot-your-everyday-ai-companion/",
      },
      {
        value: "Multi-step",
        label: "Deep Research",
        detail:
          "Current Research can analyze online sources plus large collections of documents and images.",
        sourceUrl:
          "https://blogs.microsoft.com/blog/2025/04/04/your-ai-companion/",
      },
      {
        value: "No fixed x",
        label: "Overall capability",
        detail:
          "Different Copilot products and underlying models prevent an apples-to-apples universal number.",
      },
    ],
    features: [
      {
        name: "Copilot Search and Deep Research",
        availability: "Experience and limits vary",
        howItWorks:
          "Search cross-checks multiple sites for cited answers; Deep Research performs a longer multi-step synthesis across web pages, documents and images.",
        usefulFor: "Current questions, comparisons and background reports",
        caution: "Open citations and verify high-stakes conclusions.",
      },
      {
        name: "Copilot Vision",
        availability: "Platform, region and rollout dependent",
        howItWorks:
          "With permission, interprets a camera feed, screen or supported app context and discusses what is visible.",
        usefulFor: "On-screen help, visual guidance and accessibility",
        caution:
          "Be careful with confidential screens and sensitive surroundings.",
      },
      {
        name: "Memory and personalization",
        availability: "User-controlled and market dependent",
        howItWorks:
          "Stores selected preferences and details to tailor later suggestions; users can inspect, manage or opt out.",
        usefulFor: "Recurring preferences, reminders and personal planning",
      },
      {
        name: "Microsoft 365 grounding",
        availability: "Requires eligible work or personal subscription",
        howItWorks:
          "Uses permitted Microsoft Graph context and Office app content to draft, summarize, analyze and create inside work flows.",
        usefulFor: "Meetings, mail, documents, spreadsheets and presentations",
        caution:
          "Data access follows account permissions; generated work still needs owner review.",
      },
    ],
    limitations: [
      "Consumer Copilot and Microsoft 365 Copilot are related but not interchangeable products.",
      "Feature rollout varies substantially by account type, platform, market, language and administrator policy.",
      "Actions, research and document generation can make mistakes; users remain responsible for review and authorization.",
    ],
    roadmap: [
      {
        title: "Broader companion features",
        status: "Rolling out",
        detail:
          "Microsoft continues expanding Vision, Actions, Memory and research across Windows, web and mobile, with varying market availability.",
        sourceUrl:
          "https://blogs.microsoft.com/blog/2025/04/04/your-ai-companion/",
      },
      {
        title: "Human-agent work",
        status: "Rolling out",
        detail:
          "Microsoft 365 Copilot is expanding Researcher, Analyst, Agent Store and notebook-based work experiences.",
        sourceUrl:
          "https://blogs.microsoft.com/blog/2025/04/23/the-2025-annual-work-trend-index-the-frontier-firm-is-born/",
      },
      {
        title: "Next unified version",
        status: "No public date",
        detail:
          "Microsoft ships Copilot continuously and has not announced one numbered successor with a fixed date.",
      },
    ],
    sources: [
      {
        title: "AI-powered Microsoft Bing and Edge",
        publisher: "Microsoft",
        date: "Feb 7, 2023",
        url: "https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/",
      },
      {
        title: "Announcing Microsoft Copilot",
        publisher: "Microsoft",
        date: "Sep 21, 2023",
        url: "https://blogs.microsoft.com/blog/2023/09/21/announcing-microsoft-copilot-your-everyday-ai-companion/",
      },
      {
        title: "Your AI Companion",
        publisher: "Microsoft",
        date: "Apr 4, 2025",
        url: "https://blogs.microsoft.com/blog/2025/04/04/your-ai-companion/",
      },
    ],
  },

  notebooklm: {
    launched: "July 12, 2023 as NotebookLM",
    currentRelease: "Gemini Notebook (formerly NotebookLM)",
    releaseStatus:
      "Renamed July 16, 2026; secure cloud-computer features rolling out",
    positioning:
      "A source-grounded research and learning workspace that turns a controlled evidence set into answers, notes and multiple study or presentation formats.",
    modelNote:
      "The standalone product is now called Gemini Notebook. Unlike general Gemini chat, its answers are grounded exclusively in notebook sources; Studio artifacts remain specific to the notebook product.",
    overview: [
      "Google introduced NotebookLM from Project Tailwind as an AI-first notebook grounded in a user's own documents rather than the open web by default.",
      "It has since added multimodal sources, citations, Audio and Video Overviews, mind maps, quizzes, slide decks and, in 2026, secure code execution and sync with the Gemini app.",
    ],
    timeline: [
      {
        date: "Jul 2023",
        title: "NotebookLM experiment",
        status: "Milestone",
        summary:
          "Project Tailwind became NotebookLM, initially for a small US user group and focused on source-grounded synthesis.",
        changes: [
          "Upload source documents",
          "Grounded summaries",
          "Questions with relevant source passages",
          "AI-assisted note making",
        ],
        sourceUrl:
          "https://blog.google/innovation-and-ai/technology/ai/notebooklm-google-ai/",
      },
      {
        date: "Jun-Sep 2024",
        title: "Global expansion and Audio Overviews",
        status: "Milestone",
        summary:
          "Gemini 1.5 added multimodal sources and Google launched podcast-style discussions generated from notebook material.",
        changes: [
          "Slides and web URLs",
          "Improved fact-checking links",
          "Study guides and briefing documents",
          "Downloadable two-host Audio Overviews",
        ],
        sourceUrl:
          "https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/",
      },
      {
        date: "Apr-Aug 2025",
        title: "Multilingual and visual Studio",
        status: "Milestone",
        summary:
          "Audio expanded beyond 50 then 80 languages; Video Overviews, multiple Studio outputs and multitasking arrived.",
        changes: [
          "80-language audio/video support",
          "Narrated-slide Video Overviews",
          "Multiple artifacts per notebook",
          "Mind maps and mobile access",
        ],
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/",
      },
      {
        date: "Jul 2026",
        title: "Gemini Notebook",
        status: "Current",
        summary:
          "Google renamed the product, added secure code execution and began integrating notebooks with the Gemini app and Search.",
        changes: [
          "Secure cloud computer per notebook",
          "Native code execution for deeper analysis",
          "Gemini app sync",
          "Planned AI Mode in Search access",
        ],
        sourceUrl:
          "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
      },
    ],
    comparisonLabel: "Original NotebookLM vs Gemini Notebook",
    comparison: [
      {
        dimension: "Sources",
        previous: "Primarily uploaded Google Docs",
        current: "Documents, slides, URLs, media and connected Gemini chats",
        difference: "Far broader multimodal knowledge base",
      },
      {
        dimension: "Outputs",
        previous: "Answers, summaries and notes",
        current:
          "Audio, video, mind maps, reports, quizzes, infographics and slide decks",
        difference: "One source set can become many learning formats",
      },
      {
        dimension: "Analysis",
        previous: "Model synthesis over sources",
        current:
          "Grounded synthesis plus secure code execution on eligible tiers",
        difference:
          "Can calculate and analyze data rather than only summarize it",
      },
      {
        dimension: "Ecosystem",
        previous: "Standalone notebook",
        current: "Synced with Gemini app; Search integration announced",
        difference: "Notebook context can travel into more Google surfaces",
      },
    ],
    powerHeadline:
      "Google does not publish a single original-vs-current capability multiplier.",
    powerNote:
      "The clearest improvement is functional breadth, not one benchmark score. A doubling in Audio Overview usage after language expansion is an adoption metric and is not presented here as model intelligence.",
    metrics: [
      {
        value: "80+",
        label: "Audio/video languages",
        detail:
          "Google expanded Audio and Video Overviews globally to more than 80 languages in 2025.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/google-labs/notebook-lm-audio-video-overviews-more-languages-longer-content/",
      },
      {
        value: "30M+",
        label: "Users at rename",
        detail:
          "Google reported more than 30 million users and 600,000 organizations when announcing Gemini Notebook.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
      },
      {
        value: "No fixed x",
        label: "Capability gain",
        detail:
          "No controlled benchmark spans the 2023 product and current full workspace.",
      },
    ],
    features: [
      {
        name: "Source-grounded chat",
        availability: "Core experience",
        howItWorks:
          "Retrieves relevant passages only from notebook sources, generates an answer and attaches citations to the supporting locations.",
        usefulFor: "Research packets, course material and policy libraries",
        caution:
          "The answer reflects the provided sources; incomplete or biased inputs produce incomplete or biased coverage.",
      },
      {
        name: "Audio and Video Overviews",
        availability: "Language and quota limits vary",
        howItWorks:
          "Synthesizes the source set into a scripted discussion or narrated visual presentation, with customization for audience, focus and length.",
        usefulFor: "Reviewing material, accessibility and teaching",
        caution:
          "Google states that overviews are not comprehensive or objective and may contain inaccuracies.",
      },
      {
        name: "Studio learning artifacts",
        availability: "Artifact types vary by account",
        howItWorks:
          "Transforms the same evidence set into mind maps, reports, flashcards, quizzes, infographics or slide decks; multiple outputs can be stored together.",
        usefulFor: "Exam preparation and multi-format communication",
      },
      {
        name: "Secure cloud computer",
        availability: "Ultra/business first; Pro rollout announced",
        howItWorks:
          "Writes and executes code inside an isolated notebook environment to analyze data while grounding the workflow in notebook sources.",
        usefulFor: "Calculations, data analysis and new structured outputs",
        caution:
          "Validate code, assumptions and numeric results before relying on them.",
      },
    ],
    limitations: [
      "Notebook chat intentionally stays inside the selected sources, so it may not know newer or outside information.",
      "Generated overviews and artifacts can simplify, omit or distort material despite source grounding.",
      "Gemini app notebook chat may also use web tools, while the standalone notebook is exclusively source-grounded; users should notice which surface they are in.",
    ],
    roadmap: [
      {
        title: "Secure computer for Pro",
        status: "Rolling out",
        detail:
          "Google announced web rollout to Pro users after initial Ultra and eligible Workspace availability.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
      },
      {
        title: "Notebooks in AI Mode",
        status: "Announced",
        detail:
          "Google says notebooks are coming directly to AI Mode in Search; no exact public launch date was provided.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
      },
      {
        title: "Additional Video Overview formats",
        status: "Announced",
        detail:
          "Google said more formats would be added as Video Overviews develop, without a fixed schedule.",
        sourceUrl:
          "https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-video-overviews-studio-upgrades/",
      },
    ],
    sources: [
      {
        title: "Introducing NotebookLM",
        publisher: "Google",
        date: "Jul 12, 2023",
        url: "https://blog.google/innovation-and-ai/technology/ai/notebooklm-google-ai/",
      },
      {
        title: "NotebookLM Audio Overviews",
        publisher: "Google",
        date: "Sep 11, 2024",
        url: "https://blog.google/innovation-and-ai/products/notebooklm-audio-overviews/",
      },
      {
        title: "NotebookLM is now Gemini Notebook",
        publisher: "Google",
        date: "Jul 16, 2026",
        url: "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
      },
    ],
  },
};
