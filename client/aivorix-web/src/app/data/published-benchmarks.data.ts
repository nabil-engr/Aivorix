import type { BenchmarkView } from './home-benchmarks.data';

export const PUBLISHED_BENCHMARKS: readonly BenchmarkView[] = [
  {
    "slug": "intelligence",
    "tabLabel": "Overall intelligence",
    "title": "Intelligence Index v4.1.1",
    "description": "AA index values reproduced in OpenAI's Astra comparison table. These are model scores, not ratings of all apps built on those models.",
    "max": 70,
    "eyebrow": "Published benchmark · model-specific",
    "scaleLabel": "AA index points · higher is better",
    "sourceName": "OpenAI Astra evaluation tables",
    "sourceType": "Provider report with named comparison models",
    "sourceUrl": "https://openai.com/index/gpt-6-astra/",
    "verified": "2026-09-07",
    "methodology": "Transcribed from the same provider comparison table; reported maximum at any effort. Research/API settings can differ from production apps. Only reported model results appear here. Task-fit coverage scores use a separate scale.",
    "entries": [
      {
        "toolSlug": "claude",
        "tool": "Claude",
        "model": "Fable 5.1",
        "score": 65.7,
        "displayScore": "65.7",
        "note": "Provider-reported · named model",
        "rank": 1,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published Intelligence Index v4.1.1 result for Fable 5.1; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "gpt-6-astra",
        "tool": "GPT-6 Astra",
        "model": "Astra",
        "score": 61.2,
        "displayScore": "61.2",
        "note": "Provider-reported · named model",
        "rank": 2,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published Intelligence Index v4.1.1 result for Astra; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "gpt-5-6-sol",
        "tool": "GPT-5.6 Sol",
        "model": "Sol",
        "score": 60.9,
        "displayScore": "60.9",
        "note": "Provider-reported · named model",
        "rank": 3,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published Intelligence Index v4.1.1 result for Sol; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "gemini",
        "tool": "Gemini",
        "model": "3.8 Flash",
        "score": 58.7,
        "displayScore": "58.7",
        "note": "Provider-reported · named model",
        "rank": 4,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published Intelligence Index v4.1.1 result for 3.8 Flash; reviewed September 7, 2026."
          }
        ]
      }
    ]
  },
  {
    "slug": "research",
    "tabLabel": "Deep research",
    "title": "BrowseComp research benchmark",
    "description": "Published browsing-task results. BrowseComp is not the older DRACO research-report evaluation.",
    "max": 100,
    "eyebrow": "Published benchmark · model-specific",
    "scaleLabel": "Published score (%) · higher is better",
    "sourceName": "OpenAI Astra evaluation tables",
    "sourceType": "Provider report with named comparison models",
    "sourceUrl": "https://openai.com/index/gpt-6-astra/",
    "verified": "2026-09-07",
    "methodology": "Transcribed from the same provider comparison table; reported maximum at any effort. Research/API settings can differ from production apps. Only reported model results appear here. Task-fit coverage scores use a separate scale.",
    "entries": [
      {
        "toolSlug": "gpt-6-astra",
        "tool": "GPT-6 Astra",
        "model": "Astra",
        "score": 91.5,
        "displayScore": "91.5%",
        "note": "Provider-reported · named model",
        "rank": 1,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published BrowseComp research benchmark result for Astra; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "claude",
        "tool": "Claude",
        "model": "Opus 5",
        "score": 90.8,
        "displayScore": "90.8%",
        "note": "Provider-reported · named model",
        "rank": 2,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published BrowseComp research benchmark result for Opus 5; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "gpt-5-6-sol",
        "tool": "GPT-5.6 Sol",
        "model": "Sol",
        "score": 90.4,
        "displayScore": "90.4%",
        "note": "Provider-reported · named model",
        "rank": 3,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published BrowseComp research benchmark result for Sol; reviewed September 7, 2026."
          }
        ]
      }
    ]
  },
  {
    "slug": "tools",
    "tabLabel": "Tool use",
    "title": "OSWorld 2.0 computer use",
    "description": "Version 2026.08.08, offline set, partial score. This measures computer use, not MCP Atlas.",
    "max": 100,
    "eyebrow": "Published benchmark · model-specific",
    "scaleLabel": "Published score (%) · higher is better",
    "sourceName": "OpenAI Astra evaluation tables",
    "sourceType": "Provider report with named comparison models",
    "sourceUrl": "https://openai.com/index/gpt-6-astra/",
    "verified": "2026-09-07",
    "methodology": "Transcribed from the same provider comparison table; reported maximum at any effort. Research/API settings can differ from production apps. Only reported model results appear here. Task-fit coverage scores use a separate scale.",
    "entries": [
      {
        "toolSlug": "gpt-6-astra",
        "tool": "GPT-6 Astra",
        "model": "Astra",
        "score": 72.6,
        "displayScore": "72.6%",
        "note": "Provider-reported · named model",
        "rank": 1,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published OSWorld 2.0 computer use result for Astra; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "claude",
        "tool": "Claude",
        "model": "Opus 5",
        "score": 70.2,
        "displayScore": "70.2%",
        "note": "Provider-reported · named model",
        "rank": 2,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published OSWorld 2.0 computer use result for Opus 5; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "gpt-5-6-sol",
        "tool": "GPT-5.6 Sol",
        "model": "Sol",
        "score": 65.7,
        "displayScore": "65.7%",
        "note": "Provider-reported · named model",
        "rank": 3,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published OSWorld 2.0 computer use result for Sol; reviewed September 7, 2026."
          }
        ]
      }
    ]
  },
  {
    "slug": "coding",
    "tabLabel": "Coding agents",
    "title": "DeepSWE v1.1 coding benchmark",
    "description": "Published long-horizon coding results. Model and harness settings affect outcomes; product features are scored in the task-fit view.",
    "max": 100,
    "eyebrow": "Published benchmark · model-specific",
    "scaleLabel": "Published score (%) · higher is better",
    "sourceName": "OpenAI Astra evaluation tables",
    "sourceType": "Provider report with named comparison models",
    "sourceUrl": "https://openai.com/index/gpt-6-astra/",
    "verified": "2026-09-07",
    "methodology": "Transcribed from the same provider comparison table; reported maximum at any effort. Research/API settings can differ from production apps. Only reported model results appear here. Task-fit coverage scores use a separate scale.",
    "entries": [
      {
        "toolSlug": "gpt-6-astra",
        "tool": "GPT-6 Astra",
        "model": "Astra",
        "score": 74.1,
        "displayScore": "74.1%",
        "note": "Provider-reported · named model",
        "rank": 1,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published DeepSWE v1.1 coding benchmark result for Astra; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "gemini",
        "tool": "Gemini",
        "model": "3.8 Flash",
        "score": 73.8,
        "displayScore": "73.8%",
        "note": "Provider-reported · named model",
        "rank": 2,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published DeepSWE v1.1 coding benchmark result for 3.8 Flash; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "gpt-5-6-sol",
        "tool": "GPT-5.6 Sol",
        "model": "Sol",
        "score": 72.7,
        "displayScore": "72.7%",
        "note": "Provider-reported · named model",
        "rank": 3,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published DeepSWE v1.1 coding benchmark result for Sol; reviewed September 7, 2026."
          }
        ]
      },
      {
        "toolSlug": "claude",
        "tool": "Claude",
        "model": "Fable 5.1",
        "score": 67.4,
        "displayScore": "67.4%",
        "note": "Provider-reported · named model",
        "rank": 4,
        "evidence": [
          {
            "url": "https://openai.com/index/gpt-6-astra/",
            "summary": "Published DeepSWE v1.1 coding benchmark result for Fable 5.1; reviewed September 7, 2026."
          }
        ]
      }
    ]
  }
];
