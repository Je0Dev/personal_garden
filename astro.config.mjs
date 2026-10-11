// Astro site configuration: defines base path, integrations (React, MDX, sitemap, expressive-code), i18n locales, markdown plugins, and Vite plugins.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkEmoji from 'remark-emoji';
import { remarkTooltip } from './src/lib/remark-tooltip.mjs';
import { remarkCodeMeta } from './src/lib/remark-code-meta.mjs';
import { remarkLinkcard } from './src/lib/remark-linkcard.mjs';
import { rehypeOgPreview } from './src/lib/rehype-og-preview.mjs';
import { rehypeLinkcard } from './src/lib/rehype-linkcard.mjs';
import { remarkRuby } from './src/lib/remark-ruby.mjs';
import { unified } from '@astrojs/markdown-remark';
import ecConfig from './ec.config.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = '/personal_garden/en/';
const PUBLIC_DIR = fileURLToPath(new URL('./public', import.meta.url));

function devBaseRedirect() {
  return {
    name: 'dev-base-redirect',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.stack.unshift({
          route: '',
          handle: (req, res, next) => {
            if (req.method !== 'GET') return next();
            const raw = req.url || '/';
            const url = decodeURIComponent(raw.split('?')[0]);
            if (url.startsWith(BASE)) return next();

            if (url === '/' || url === '/index.html') {
              res.statusCode = 302;
              res.setHeader('Location', BASE);
              return res.end();
            }

            const filePath = path.resolve(PUBLIC_DIR, '.' + path.posix.normalize(url));
            if (
              filePath.startsWith(PUBLIC_DIR + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const suffix = raw.replace(/^\/+/, '');
              res.statusCode = 302;
              res.setHeader('Location', BASE + suffix);
              return res.end();
            }

            return next();
          },
        });
      };
    },
  };
}

export default defineConfig({
  site: 'https://je0dev.github.io',
  base: BASE,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'zh'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [react(), expressiveCode(ecConfig), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss(), devBaseRedirect()],
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkGfm, [remarkEmoji, { accessible: true }], remarkDirective, remarkTooltip, remarkCodeMeta, remarkLinkcard, remarkRuby],
      rehypePlugins: [rehypeKatex, rehypeRaw, rehypeLinkcard, rehypeOgPreview],
    }),
  },
});
