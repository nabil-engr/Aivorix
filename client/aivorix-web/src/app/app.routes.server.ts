import { RenderMode, ServerRoute } from "@angular/ssr";
import { NEWS } from "./data/news.data";
import { COMPARISONS } from "./data/comparisons.data";
import { AI_TOOLS } from "./data/tools.data";
const staticPaths = [
  "",
  "news",
  "comparisons",
  "compare",
  "tools",
  "about",
  "methodology",
  "editorial-policy",
  "affiliate-disclosure",
  "privacy",
  "terms",
  "contact",
  "advertise",
];
export const serverRoutes: ServerRoute[] = [
  ...staticPaths.map(
    (path) => ({ path, renderMode: RenderMode.Prerender }) as ServerRoute,
  ),
  {
    path: "news/:slug",
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return NEWS.map((x) => ({ slug: x.slug }));
    },
  },
  {
    path: "comparisons/:slug",
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return COMPARISONS.map((x) => ({ slug: x.slug }));
    },
  },
  {
    path: "tools/:slug",
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return AI_TOOLS.map((x) => ({ slug: x.slug }));
    },
  },
  { path: "**", renderMode: RenderMode.Server },
];
