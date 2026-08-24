import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RESPONSE_INIT, ResponseInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  jsonLd?: unknown;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly base = 'https://aivorix.com';

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(RESPONSE_INIT) private readonly responseInit: ResponseInit | null
  ) {}

  set(options: SeoOptions): void {
    const fullTitle = options.title.includes('Aivorix')
      ? options.title
      : `${options.title} | Aivorix`;
    const url = this.base + options.path;
    const image = options.image || this.base + '/og-default.png';

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: options.description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:type', content: options.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: options.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;

    this.removeStructuredData();
    if (options.jsonLd) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-aivorix-jsonld', '1');
      script.textContent = JSON.stringify(options.jsonLd);
      this.document.head.appendChild(script);
    }
  }

  noIndex(title = 'Page not found'): void {
    const fullTitle = `${title} | Aivorix`;
    const description = 'The requested Aivorix page could not be found.';

    this.title.setTitle(fullTitle);
    if (this.responseInit) {
      this.responseInit.status = 404;
    }
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'noindex,follow' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.removeTag("property='og:url'");
    this.document.querySelector('link[rel="canonical"]')?.remove();
    this.removeStructuredData();
  }

  private removeStructuredData(): void {
    this.document
      .querySelectorAll('script[data-aivorix-jsonld]')
      .forEach(element => element.remove());
  }
}
