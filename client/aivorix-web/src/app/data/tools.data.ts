export const AI_TOOLS = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    category: "General Assistant",
    price: "Free; Go $8/mo; Plus $20/mo; Pro $200/mo (US reference)",
    bestFor:
      "General productivity, coding, research, files, images and long-running work",
    source: "https://openai.com/index/introducing-chatgpt-go/",
    verified: "2026-08-24",
    features: [
      "GPT-5.6 Sol, Terra and Luna tiers",
      "Deep research and file analysis on eligible plans",
      "Programmatic tools and multi-agent workflows",
      "Image, voice and connected-app features",
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    company: "Anthropic",
    category: "General Assistant",
    price: "Free; Pro $20/mo in the US; higher tiers available",
    bestFor: "Writing, coding, reasoning and long-form knowledge work",
    source:
      "https://support.anthropic.com/en/articles/8325610-how-much-does-claude-pro-cost",
    verified: "2026-08-24",
    features: [
      "Claude Sonnet 5 default on Free and Pro",
      "Agentic browser and terminal tool use",
      "Claude Code and Artifacts workflows",
      "Projects, knowledge and enterprise controls",
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    company: "Google",
    category: "General Assistant",
    price: "Free; Google AI Plus/Pro/Ultra pricing varies by market",
    bestFor:
      "Google ecosystem users, multimodal work, Search and Workspace integration",
    source: "https://one.google.com/about/google-ai-plans/",
    verified: "2026-08-24",
    features: [
      "Gemini 3.5 Flash and 3.1 Pro tiers",
      "Integration across Google products",
      "Deep Research, Gemini Live and Canvas",
      "AI Studio, media and developer tooling",
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    company: "Perplexity AI",
    category: "AI Search",
    price: "Free; Pro and Max; Max $200/mo or $2,000/year",
    bestFor: "Source-cited web research, multi-model search and deep research",
    source:
      "https://www.perplexity.ai/help-center/en/articles/11680686-perplexity-max",
    verified: "2026-08-24",
    features: [
      "Web-grounded answers with citations",
      "Multiple frontier models on paid plans",
      "Advanced Deep Research and editable reports",
      "Create, Computer and Comet agent workflows",
    ],
  },
  {
    slug: "grok",
    name: "Grok",
    company: "SpaceXAI",
    category: "General Assistant",
    price:
      "Free and paid access varies by product/plan; API pricing is model-specific",
    bestFor:
      "Coding, agent workflows, real-time web/X context and productivity integrations",
    source: "https://x.ai/news/grok-4-6",
    verified: "2026-08-24",
    features: [
      "Grok 4.6 for long-running agent tasks",
      "Real-time web and X research tools",
      "Grok Build and Agent Tools API",
      "Grok Imagine image and video creation",
    ],
  },
  {
    slug: "meta-ai",
    name: "Meta AI",
    company: "Meta",
    category: "General Assistant",
    price:
      "Consumer access is generally free where available; developer model pricing/licensing varies",
    bestFor:
      "Meta ecosystem users, social discovery, personal planning and creative media",
    source:
      "https://about.fb.com/news/2026/07/meta-ai-muse-spark-doesnt-just-think-it-acts/",
    verified: "2026-08-24",
    features: [
      "Muse Spark 1.1 planning and agent features",
      "Email, calendar and recurring-task connections",
      "Live multimodal help across apps and glasses",
      "Muse Image generation and editing",
    ],
  },
  {
    slug: "microsoft-copilot",
    name: "Microsoft Copilot",
    company: "Microsoft",
    category: "Productivity",
    price:
      "Free options; Microsoft 365 Personal $9.99/mo; Premium $19.99/mo in US reference",
    bestFor: "Word, Excel, PowerPoint, Outlook and Microsoft 365 workflows",
    source:
      "https://www.microsoft.com/microsoft-365-copilot/pricing/individuals",
    verified: "2026-08-24",
    features: [
      "Web-grounded Search and Deep Research",
      "Memory, Actions and Copilot Vision",
      "Word, Excel, PowerPoint, Outlook and Teams workflows",
      "Microsoft Graph and Windows integration",
    ],
  },
  {
    slug: "notebooklm",
    name: "Gemini Notebook",
    company: "Google",
    category: "Research",
    price: "Free and expanded access through Google AI plans",
    bestFor:
      "Working from a controlled set of uploaded sources and study material",
    source:
      "https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/",
    verified: "2026-08-24",
    features: [
      "Source-grounded notebooks",
      "Audio and Video Overviews in 80+ languages",
      "Mind maps, quizzes, reports and slide decks",
      "Secure code execution and Gemini app sync",
    ],
  },
] as const;
