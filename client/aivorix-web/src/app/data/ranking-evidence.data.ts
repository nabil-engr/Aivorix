// Reviewed primary-source descriptions. Points are awarded only for listed capabilities.
export type Capability = 'writing' | 'reasoning' | 'files' | 'vision' | 'search' | 'citations' | 'deepResearch' | 'tools' | 'connectors' | 'code' | 'execution' | 'repository' | 'creative' | 'audio';
export interface RankingSource { url: string; summary: string; capabilities: readonly Capability[]; }
export interface RankingEvidence { scope: string; sources: readonly RankingSource[]; }
export const RANKING_REVIEWED = '2026-09-07';
export const RANKING_EVIDENCE: Record<string, RankingEvidence> = {
  "gpt-6-astra": {
    "scope": "Astra via Responses API with supported tools enabled",
    "sources": [
      {
        "url": "https://developers.openai.com/api/docs/models/gpt-6-astra",
        "summary": "Reasoning, text/image input, file search, code interpreter, shell, patch and MCP are listed. Image generation is supported as a tool.",
        "capabilities": [
          "writing",
          "reasoning",
          "files",
          "vision",
          "tools",
          "execution",
          "connectors",
          "code",
          "creative"
        ]
      },
      {
        "url": "https://openai.com/index/gpt-6-astra/",
        "summary": "Software engineering, browser research and work across a codebase are described.",
        "capabilities": [
          "repository",
          "search"
        ]
      }
    ]
  },
  "gpt-5-6-sol": {
    "scope": "Sol via Responses API; integrations require implementation",
    "sources": [
      {
        "url": "https://developers.openai.com/api/docs/models/gpt-5.6-sol",
        "summary": "Professional text/image model with reasoning and supported API tools. Image generation is supported as a tool.",
        "capabilities": [
          "writing",
          "reasoning",
          "vision",
          "files",
          "tools",
          "execution",
          "connectors",
          "code",
          "search",
          "creative"
        ]
      }
    ]
  },
  "chatgpt": {
    "scope": "ChatGPT Chat / Work / Codex on eligible plans",
    "sources": [
      {
        "url": "https://help.openai.com/en/articles/10500283-deep-research",
        "summary": "Research uses web sources, uploaded files and connected apps, with citations.",
        "capabilities": [
          "writing",
          "reasoning",
          "files",
          "search",
          "citations",
          "deepResearch",
          "connectors",
          "tools"
        ]
      },
      {
        "url": "https://chatgpt.com/overview/",
        "summary": "Chat, Work and Codex sit together with image creation, visual/voice features and coding.",
        "capabilities": [
          "creative",
          "audio",
          "vision",
          "code"
        ]
      },
      {
        "url": "https://chatgpt.com/codex/",
        "summary": "The coding agent works across codebases and runs software-development tasks.",
        "capabilities": [
          "repository",
          "execution"
        ]
      }
    ]
  },
  "claude": {
    "scope": "Claude app and Claude Code on eligible plans",
    "sources": [
      {
        "url": "https://claude.com/product/overview",
        "summary": "Research, cited reports, integrations, file analysis and coding artifacts are documented.",
        "capabilities": [
          "writing",
          "reasoning",
          "files",
          "search",
          "citations",
          "deepResearch",
          "connectors",
          "tools",
          "code",
          "execution",
          "vision"
        ]
      },
      {
        "url": "https://claude.com/product/claude-code",
        "summary": "Claude Code reads repositories, edits code, runs tests and integrates terminal and MCP tools.",
        "capabilities": [
          "repository",
          "execution"
        ]
      }
    ]
  },
  "gemini": {
    "scope": "Gemini app / Deep Research / Canvas on eligible plans",
    "sources": [
      {
        "url": "https://gemini.google/overview/deep-research/",
        "summary": "Multi-step web research combines uploaded material with source-linked reports.",
        "capabilities": [
          "writing",
          "reasoning",
          "files",
          "search",
          "citations",
          "deepResearch"
        ]
      },
      {
        "url": "https://gemini.google/overview/",
        "summary": "The Gemini app handles multimodal inputs and offers image, video and voice workflows.",
        "capabilities": [
          "creative",
          "audio",
          "vision"
        ]
      },
      {
        "url": "https://gemini.google/overview/canvas/",
        "summary": "Canvas supports drafting, code creation and interactive previews.",
        "capabilities": [
          "code",
          "execution"
        ]
      },
      {
        "url": "https://gemini.google/overview/deep-research/",
        "summary": "Research can use connected Workspace content when enabled.",
        "capabilities": [
          "connectors",
          "tools"
        ]
      }
    ]
  },
  "perplexity": {
    "scope": "Perplexity research and optional desktop file access",
    "sources": [
      {
        "url": "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work",
        "summary": "Search and iterative research produce answers with source citations.",
        "capabilities": [
          "writing",
          "reasoning",
          "search",
          "citations",
          "deepResearch"
        ]
      },
      {
        "url": "https://www.perplexity.ai/help-center/en/articles/19800004-work-with-local-files-and-folders",
        "summary": "Desktop access can read and change selected local files.",
        "capabilities": [
          "files",
          "tools"
        ]
      }
    ]
  },
  "grok": {
    "scope": "Grok API and Grok Build; not every chat plan",
    "sources": [
      {
        "url": "https://docs.x.ai/developers/tools/overview",
        "summary": "Web/X search, code execution, document retrieval and custom functions are documented.",
        "capabilities": [
          "writing",
          "reasoning",
          "search",
          "files",
          "tools",
          "execution",
          "code"
        ]
      },
      {
        "url": "https://x.ai/build",
        "summary": "The coding agent searches repositories, edits files and runs terminal commands.",
        "capabilities": [
          "repository",
          "connectors"
        ]
      }
    ]
  },
  "meta-ai": {
    "scope": "Meta AI app features; no model benchmark inherited",
    "sources": [
      {
        "url": "https://about.fb.com/news/2025/04/introducing-meta-ai-app-new-way-access-ai-assistant/",
        "summary": "Conversational assistance includes web search, voice and image creation/editing.",
        "capabilities": [
          "writing",
          "search",
          "creative",
          "audio",
          "vision"
        ]
      }
    ]
  },
  "microsoft-copilot": {
    "scope": "Microsoft 365 Researcher with eligible license; not free Copilot",
    "sources": [
      {
        "url": "https://learn.microsoft.com/en-us/microsoft-365/copilot/faq-researcher",
        "summary": "Researcher performs multi-step research with citations, Graph sources and Bing search.",
        "capabilities": [
          "writing",
          "reasoning",
          "files",
          "search",
          "citations",
          "deepResearch",
          "connectors",
          "tools"
        ]
      }
    ]
  },
  "notebooklm": {
    "scope": "Gemini Notebook (catalog slug notebooklm)",
    "sources": [
      {
        "url": "https://support.google.com/gemininotebook/answer/16215270",
        "summary": "Source ingestion supports web/Drive discovery and Deep Research inside notebooks.",
        "capabilities": [
          "files",
          "search",
          "deepResearch",
          "connectors"
        ]
      },
      {
        "url": "https://blog.google/innovation-and-ai/products/gemini-notebook/expert-intelligence-leading-sources/",
        "summary": "Source-based conversations include direct citations to relevant passages.",
        "capabilities": [
          "writing",
          "citations"
        ]
      }
    ]
  },
  "github-copilot": {
    "scope": "GitHub Copilot coding tools, subject to plan/model choice",
    "sources": [
      {
        "url": "https://github.com/features/copilot",
        "summary": "Coding agents span IDE, repositories, CLI, project tools and MCP servers.",
        "capabilities": [
          "writing",
          "code",
          "files",
          "tools",
          "execution",
          "repository",
          "connectors"
        ]
      }
    ]
  },
  "cursor": {
    "scope": "Cursor coding environment; underlying model may vary",
    "sources": [
      {
        "url": "https://cursor.com/features",
        "summary": "Agents work on repositories with terminal execution, GitHub, Slack and MCP integrations.",
        "capabilities": [
          "writing",
          "code",
          "files",
          "tools",
          "execution",
          "repository",
          "connectors"
        ]
      }
    ]
  },
  "midjourney": {
    "scope": "Midjourney image workflow; no coding/research claim",
    "sources": [
      {
        "url": "https://docs.midjourney.com/hc/en-us/articles/32631709682573-Discord-Quick-Start",
        "summary": "Discord commands generate images, offer variations and expose a creative workflow.",
        "capabilities": [
          "creative",
          "connectors"
        ]
      }
    ]
  },
  "adobe-firefly": {
    "scope": "Firefly creative workflows",
    "sources": [
      {
        "url": "https://www.adobe.com/products/firefly.html",
        "summary": "Image/video/audio creation and editing include an assistant that selects creative tools.",
        "capabilities": [
          "vision",
          "creative",
          "audio",
          "tools"
        ]
      }
    ]
  },
  "canva-magic-studio": {
    "scope": "Canva AI / Magic Studio suite; Code is not a repository agent",
    "sources": [
      {
        "url": "https://www.canva.com/newsroom/news/canva-ai-launches/",
        "summary": "Canva AI supports writing/design, Sheets and prompted interactive experiences through Canva Code.",
        "capabilities": [
          "writing",
          "creative",
          "vision",
          "code",
          "execution",
          "tools"
        ]
      }
    ]
  },
  "runway": {
    "scope": "Runway media generation",
    "sources": [
      {
        "url": "https://runwayml.com/product",
        "summary": "Generative image/video tools use visual inputs for production and editing.",
        "capabilities": [
          "creative",
          "vision"
        ]
      }
    ]
  },
  "elevenlabs": {
    "scope": "ElevenLabs audio and voice-agent workflows",
    "sources": [
      {
        "url": "https://elevenlabs.io/",
        "summary": "Voice generation, transcription and conversational agents are core offerings.",
        "capabilities": [
          "audio",
          "writing",
          "tools"
        ]
      }
    ]
  },
  "synthesia": {
    "scope": "Synthesia business video tools",
    "sources": [
      {
        "url": "https://www.synthesia.io/features",
        "summary": "Avatar videos combine scripts, generated voices and collaborative video editing.",
        "capabilities": [
          "creative",
          "audio",
          "writing"
        ]
      }
    ]
  },
  "jasper": {
    "scope": "Jasper marketing platform; not a general research benchmark",
    "sources": [
      {
        "url": "https://www.jasper.ai/",
        "summary": "Brand knowledge, text/image generation, research agents, pipelines and MCP are documented.",
        "capabilities": [
          "writing",
          "files",
          "vision",
          "creative",
          "tools",
          "connectors"
        ]
      }
    ]
  },
  "grammarly": {
    "scope": "Grammarly writing assistance",
    "sources": [
      {
        "url": "https://www.grammarly.com/ai",
        "summary": "Writing assistance provides rewriting and communication support across applications.",
        "capabilities": [
          "writing",
          "connectors"
        ]
      }
    ]
  },
  "notion-ai": {
    "scope": "Notion AI on eligible workspace plans",
    "sources": [
      {
        "url": "https://www.notion.com/product/ai",
        "summary": "Research mode, cited workspace search, connected apps and agents create pages and databases.",
        "capabilities": [
          "writing",
          "files",
          "citations",
          "deepResearch",
          "search",
          "tools",
          "connectors"
        ]
      }
    ]
  },
  "poe": {
    "scope": "Poe Canvas/App Creator; capabilities depend on the selected bot",
    "sources": [
      {
        "url": "https://creator.poe.com/docs/canvas-apps/canvas-app-quick-start",
        "summary": "App Creator produces interactive code; Canvas apps run it and call models, including image analysis.",
        "capabilities": [
          "writing",
          "code",
          "execution",
          "tools",
          "vision",
          "creative"
        ]
      }
    ]
  },
  "you-com": {
    "scope": "You.com search and research APIs",
    "sources": [
      {
        "url": "https://you.com/docs/guides/research",
        "summary": "Research performs repeated searches, processes sources and returns cited answers; APIs are available through MCP.",
        "capabilities": [
          "search",
          "files",
          "writing",
          "citations",
          "deepResearch",
          "tools",
          "connectors",
          "reasoning"
        ]
      }
    ]
  },
  "character-ai": {
    "scope": "Character.AI conversational entertainment",
    "sources": [
      {
        "url": "https://blog.character.ai/introducing-character-calls/",
        "summary": "Characters support text conversation and voice calls.",
        "capabilities": [
          "writing",
          "audio"
        ]
      }
    ]
  },
  "deepseek": {
    "scope": "DeepSeek API; client tool execution is not hosted execution",
    "sources": [
      {
        "url": "https://api-docs.deepseek.com/guides/thinking_mode/",
        "summary": "Thinking mode supports reasoning and multi-turn function calls; application code executes tools.",
        "capabilities": [
          "writing",
          "reasoning",
          "tools"
        ]
      }
    ]
  },
  "mistral-le-chat": {
    "scope": "Mistral Vibe, formerly Le Chat; work and code surfaces",
    "sources": [
      {
        "url": "https://mistral.ai/products/le-chat",
        "summary": "Le Chat now redirects to Vibe: sourced research, documents, connectors and coding agents.",
        "capabilities": [
          "writing",
          "reasoning",
          "files",
          "search",
          "citations",
          "deepResearch",
          "tools",
          "connectors",
          "code",
          "execution",
          "repository"
        ]
      }
    ]
  },
  "cohere": {
    "scope": "Cohere North enterprise product scope",
    "sources": [
      {
        "url": "https://cohere.com/north",
        "summary": "North generates documents, retrieves enterprise knowledge and automates agent workflows.",
        "capabilities": [
          "writing",
          "reasoning",
          "files",
          "tools",
          "connectors"
        ]
      }
    ]
  },
  "otter-ai": {
    "scope": "Otter meeting workflows; not open-web deep research",
    "sources": [
      {
        "url": "https://otter.ai/",
        "summary": "Meeting capture, summaries, searchable conversations and meeting integrations are documented.",
        "capabilities": [
          "writing",
          "files",
          "audio",
          "connectors",
          "tools"
        ]
      }
    ]
  }
};
