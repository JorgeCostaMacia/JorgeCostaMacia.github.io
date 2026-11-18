// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// A user site: GitHub Pages serves the repository JorgeCostaMacia.github.io at the root of this address.
export default defineConfig({
  site: 'https://jorgecostamacia.github.io',

  // Every page is route.html, answered at /route: GitHub Pages serves route.html for /route.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // CSS is served as files: cacheable across pages, and the CSP carries no style hashes.
    inlineStylesheets: 'never',
  },

  // A scoped rule adds no specificity: components override each other by selector, never by stylesheet order.
  scopedStyleStrategy: 'where',

  vite: {
    build: {
      // Small images referenced from CSS stay files instead of data: URIs.
      assetsInlineLimit: 0,
    },
  },

  // The site shows no code, and Shiki writes inline styles.
  markdown: {
    syntaxHighlight: false,
  },

  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],

  // Astro writes the <meta> with the hashes of its own scripts and styles. The site loads nothing from another
  // origin, so every directive is 'self'. What a <meta> cannot carry (frame-ancestors) needs a server header, which
  // GitHub Pages does not let a site set.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "font-src 'self'",
        "img-src 'self'",
        'upgrade-insecure-requests',
      ],
    },
  },
});
