import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-pagination",
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination-wrap" *ngIf="totalPages > 1" aria-label="Pagination">
      <div class="pagination-info">
        Showing <strong>{{ startItem }}</strong>–<strong>{{ endItem }}</strong> of
        <strong>{{ totalItems }}</strong> {{ itemName }}
      </div>
      <div class="pagination-controls">
        <button
          type="button"
          class="pagination-btn nav-btn"
          [disabled]="currentPage === 1"
          (click)="prev()"
          aria-label="Previous page"
        >
          ← Prev
        </button>

        <div class="pagination-pages">
          @for (p of pages; track $index) {
            @if (p === "...") {
              <span class="pagination-ellipsis" aria-hidden="true">…</span>
            } @else {
              <button
                type="button"
                class="pagination-btn page-btn"
                [class.active]="p === currentPage"
                [attr.aria-current]="p === currentPage ? 'page' : null"
                (click)="goToPage(p)"
              >
                {{ p }}
              </button>
            }
          }
        </div>

        <button
          type="button"
          class="pagination-btn nav-btn"
          [disabled]="currentPage === totalPages"
          (click)="next()"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </nav>
  `,
  styles: [
    `
      .pagination-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin-top: 36px;
        padding: 20px 0 10px;
      }
      .pagination-info {
        font-size: 0.9rem;
        color: var(--muted);
      }
      .pagination-info strong {
        color: var(--text);
      }
      .pagination-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 6px;
      }
      .pagination-pages {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-wrap: wrap;
      }
      .pagination-btn {
        min-height: 40px;
        min-width: 40px;
        padding: 6px 12px;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: var(--surface);
        color: var(--text);
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition:
          background-color 0.15s ease,
          border-color 0.15s ease,
          color 0.15s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .pagination-btn:hover:not(:disabled):not(.active) {
        background: var(--surface-2);
        border-color: var(--line-strong);
      }
      .pagination-btn.active {
        background: var(--accent);
        color: #ffffff;
        border-color: var(--accent);
        font-weight: 700;
        cursor: default;
      }
      .pagination-btn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        border-color: var(--line);
        background: var(--surface);
      }
      .pagination-ellipsis {
        padding: 0 4px;
        color: var(--muted);
        font-weight: 700;
        user-select: none;
      }
      @media (max-width: 600px) {
        .pagination-controls {
          gap: 4px;
        }
        .pagination-btn {
          min-height: 36px;
          min-width: 36px;
          padding: 4px 8px;
          font-size: 0.82rem;
        }
      }
    `,
  ],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() itemName: string = "items";

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  get startItem(): number {
    if (this.totalItems === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get pages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const result: (number | string)[] = [];

    if (current <= 4) {
      result.push(1, 2, 3, 4, 5, "...", total);
    } else if (current >= total - 3) {
      result.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
    } else {
      result.push(1, "...", current - 1, current, current + 1, "...", total);
    }

    return result;
  }

  goToPage(p: number | string): void {
    if (
      typeof p === "number" &&
      p >= 1 &&
      p <= this.totalPages &&
      p !== this.currentPage
    ) {
      this.pageChange.emit(p);
    }
  }

  prev(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  next(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}

