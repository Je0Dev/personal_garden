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
import { unified } from '@astrojs/markdown-remark';
import ecConfig from './ec.config.mjs';

export default defineConfig({
  site: 'https://je0dev.github.io',
  base: '/personal_garden/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [react(), expressiveCode(ecConfig), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkGfm, [remarkEmoji, { accessible: true }], remarkDirective, remarkTooltip, remarkCodeMeta, remarkLinkcard],
      rehypePlugins: [rehypeKatex, rehypeRaw, rehypeLinkcard, rehypeOgPreview],
    }),
  },
});
