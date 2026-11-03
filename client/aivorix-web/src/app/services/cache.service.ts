import { Injectable } from "@angular/core";

/**
 * High-performance in-memory LRU cache service.
 * Caches filtered queries, model computations, and paginated slices
 * to eliminate duplicate calculations and keep UI rendering instantaneous.
 */
@Injectable({ providedIn: "root" })
export class CacheService {
  private cache = new Map<string, unknown>();
  private readonly maxEntries = 300;

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  set<T>(key: string, value: T): T {
    if (this.cache.size >= this.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
    return value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

