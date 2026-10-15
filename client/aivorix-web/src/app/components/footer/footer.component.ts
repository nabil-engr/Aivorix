import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
@Component({
  selector: "app-footer",
  standalone: true,
  imports: [RouterLink],
  template: `<footer>
    <div class="container footer-grid">
      <div>
        <a routerLink="/" class="brand"
          ><span class="brand-mark">A</span><span>Aivorix</span></a
        >
        <p>
          Source-backed AI news, comparisons and practical model guides. Facts
          first, hype second.
        </p>
      </div>
      <div>
        <h4>Explore</h4>
        <a routerLink="/news">AI News</a
        ><a routerLink="/comparisons">Comparisons</a
        ><a routerLink="/tools">AI Tools</a
        ><a routerLink="/methodology">Methodology</a>
      </div>
      <div>
        <h4>Company</h4>
        <a routerLink="/about">About</a
        ><a routerLink="/editorial-policy">Editorial policy</a
        ><a routerLink="/advertise">Advertise</a
        ><a routerLink="/contact">Contact</a>
      </div>
      <div>
        <h4>Legal</h4>
        <a routerLink="/privacy">Privacy</a><a routerLink="/terms">Terms</a
        ><a routerLink="/affiliate-disclosure">Affiliate disclosure</a>
      </div>
    </div>
    <div class="container footer-bottom">
      © 2026 Aivorix. AI products change quickly; verify critical pricing and
      limits on the provider’s official site.
    </div>
  </footer>`,
})
export class FooterComponent {}
