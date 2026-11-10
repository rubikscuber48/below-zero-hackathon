import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { EVENT } from './src/data/event';

/** Fills the __PLACEHOLDERS__ in index.html, so search and sharing tags come from data/event.ts. */
const eventFacts = (): Plugin => {
  const values: Record<string, string> = {
    SITE_URL: EVENT.siteUrl,
    DATE_LONG: EVENT.dateLong,
    LOCATION: EVENT.location,
    START: EVENT.confirmedStart ?? '',
    END: EVENT.confirmedEnd ?? '',
    EMAIL: EVENT.email,
    FORM_URL: EVENT.registrationUrl,
    DESCRIPTION: `BELOW ZERO is a free, in-person 24-hour hackathon for students in Classes 8–12. ${EVENT.dateLong}, ${EVENT.location}. Organized by Lost in Stars.`,
  };
  return {
    name: 'event-facts',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace(/__([A-Z_]+)__/g, (match, key: string) => values[key] ?? match),
    },
  };
};

/** Starts downloading the headline font straight away, so the opening screen draws in it. */
const preloadHeadlineFont = (): Plugin => ({
  name: 'preload-headline-font',
  transformIndexHtml: {
    order: 'post',
    handler: (_html, ctx) => {
      const file = Object.keys(ctx.bundle ?? {}).find((name) => /anton-latin-400-normal.*\.woff2$/.test(name));
      if (!file) return [];
      return [
        {
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `./${file}`, crossorigin: '' },
          injectTo: 'head-prepend',
        },
      ];
    },
  },
});

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), eventFacts(), preloadHeadlineFont()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
