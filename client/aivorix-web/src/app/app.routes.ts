import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NewsListComponent } from "./pages/news-list/news-list.component";
import { NewsDetailComponent } from "./pages/news-detail/news-detail.component";
import { CompareListComponent } from "./pages/compare-list/compare-list.component";
import { CompareDetailComponent } from "./pages/compare-detail/compare-detail.component";
import { CompareBuilderComponent } from "./pages/compare-builder/compare-builder.component";
import { ToolsComponent } from "./pages/tools/tools.component";
import { ToolDetailComponent } from "./pages/tool-detail/tool-detail.component";
import { StaticPageComponent } from "./pages/static-page/static-page.component";
export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "news", component: NewsListComponent },
  { path: "news/:slug", component: NewsDetailComponent },
  { path: "compare", component: CompareBuilderComponent },
  { path: "comparisons", component: CompareListComponent },
  { path: "comparisons/:slug", component: CompareDetailComponent },
  { path: "tools", component: ToolsComponent },
  { path: "tools/:slug", component: ToolDetailComponent },
  { path: "about", component: StaticPageComponent, data: { page: "about" } },
  {
    path: "methodology",
    component: StaticPageComponent,
    data: { page: "methodology" },
  },
  {
    path: "editorial-policy",
    component: StaticPageComponent,
    data: { page: "editorial" },
  },
  {
    path: "affiliate-disclosure",
    component: StaticPageComponent,
    data: { page: "affiliate" },
  },
  {
    path: "privacy",
    component: StaticPageComponent,
    data: { page: "privacy" },
  },
  { path: "terms", component: StaticPageComponent, data: { page: "terms" } },
  {
    path: "contact",
    component: StaticPageComponent,
    data: { page: "contact" },
  },
  {
    path: "advertise",
    component: StaticPageComponent,
    data: { page: "advertise" },
  },
  { path: "**", component: StaticPageComponent, data: { page: "404" } },
];
