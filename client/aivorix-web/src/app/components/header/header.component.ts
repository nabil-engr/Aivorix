import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container nav">
        <a
          routerLink="/"
          class="brand"
          aria-label="Aivorix home"
          (click)="closeMenu()"
        >
          <span class="brand-mark">A</span>
          <span>Aivorix</span>
        </a>

        <button
          class="menu-toggle"
          type="button"
          aria-controls="main-navigation"
          [attr.aria-expanded]="menuOpen"
          (click)="menuOpen = !menuOpen"
        >
          <span aria-hidden="true">{{ menuOpen ? "×" : "☰" }}</span>
          <span class="menu-label">Menu</span>
        </button>

        <nav
          id="main-navigation"
          class="nav-links"
          [class.open]="menuOpen"
          aria-label="Main navigation"
        >
          <a routerLink="/news" routerLinkActive="active" (click)="closeMenu()"
            >AI News</a
          >
          <a
            routerLink="/comparisons"
            routerLinkActive="active"
            (click)="closeMenu()"
            >Comparisons</a
          >
          <a routerLink="/tools" routerLinkActive="active" (click)="closeMenu()"
            >AI Tools</a
          >
          <a
            routerLink="/compare"
            routerLinkActive="active"
            class="nav-cta"
            (click)="closeMenu()"
            >Compare AI</a
          >
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .menu-toggle {
        display: none;
        align-items: center;
        gap: 7px;
        border: 1px solid var(--line-strong);
        border-radius: 4px;
        background: var(--surface);
        color: var(--text);
        padding: 8px 11px;
        font: inherit;
        font-weight: 750;
        cursor: pointer;
      }
      .menu-toggle > span:first-child {
        font-size: 1.2rem;
        line-height: 1;
      }
      @media (max-width: 900px) {
        .menu-toggle {
          display: inline-flex;
        }
        .nav-links {
          display: none !important;
        }
        .nav-links.open {
          position: absolute;
          top: calc(100% + 1px);
          left: 0;
          right: 0;
          display: flex !important;
          flex-direction: column;
          align-items: stretch;
          gap: 4px;
          padding: 12px 4%;
          border-bottom: 1px solid var(--line);
          background: rgba(244, 242, 234, 0.98);
          box-shadow: 0 18px 36px rgba(21, 24, 22, 0.1);
        }
        .nav-links.open a {
          display: flex !important;
          padding: 10px 12px;
          border-radius: 4px;
        }
        .nav-links.open a:hover,
        .nav-links.open a.active {
          background: var(--surface-2);
        }
        .nav-links.open .nav-cta {
          margin-top: 3px;
        }
      }
      @media (max-width: 380px) {
        .menu-label {
          display: none;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  menuOpen = false;

  closeMenu(): void {
    this.menuOpen = false;
  }
}
