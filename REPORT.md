# Project File Report — Cosmos Digital Garden

> Every file in the project, what it does, what it's connected to, and whether to keep or remove it.

---

## Root Config Files

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `astro.config.mjs` | Main Astro configuration — sets base path `/personal_garden/`, i18n (EN/DE/ZH), integrations (React, Tailwind, MDX, sitemap, Expressive Code), markdown pipeline with all remark/rehype plugins, dev-only base redirect | Everything | **KEEP** — core config |
| `ec.config.mjs` | Expressive Code config — themes (github-light, vitesse-dark), line numbers plugin, style overrides | `astro.config.mjs` (imported), `src/styles/code-theme.css` | **KEEP** — code block styling |
| `package.json` | NPM manifest — scripts (dev/build/lint/preview), all dependencies | Everything | **KEEP** |
| `package-lock.json` | Lockfile for reproducible installs | `package.json` | **KEEP** |
| `tsconfig.json` | TypeScript config — strict mode, path aliases, Astro types | All `.ts`/`.tsx` files | **KEEP** |
| `.gitignore` | Ignores `node_modules/`, `dist/`, `.env`, `*.local` | Git | **KEEP** — consider adding `.astro/` |
| `metadata.json` | Site metadata (name, description, author, keywords) | Not imported anywhere in src | **REMOVE** — unused, or wire it into `BaseLayout.astro` |
| `CHANGELOG.md` | Manual changelog of changes | Nothing | **KEEP** — useful history |
| `LICENSE` | CC BY 4.0 license | Nothing | **KEEP** |
| `README.md` | Project overview, quick start, features | Nothing | **KEEP** |

---

## GitHub Workflows (`.github/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `dependabot.yml` | Auto-updates npm dependencies and GitHub Actions weekly | `package.json` | **KEEP** — automated security |
| `workflows/ci.yml` | Runs lint + build on push/PR to main/dev | `package.json` scripts | **KEEP** |
| `workflows/deploy.yml` | Full CI/CD: audit → lint → build → deploy to GitHub Pages | `package.json`, `astro.config.mjs` | **KEEP** |
| `workflows/security.yml` | Runs `npm audit` on push/PR | `package.json` | **KEEP** — but redundant with `deploy.yml` audit job, could merge |
| `workflows/submit-sitemap.yml` | Pings Google & Bing with sitemap URL on deploy | `astro.config.mjs` (sitemap) | **KEEP** — SEO |

---

## Pages (`src/pages/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `index.astro` | Redirects `/` → `/en/` | `BaseLayout` (indirectly) | **KEEP** — needed for root redirect |
| `404.astro` | Custom 404 page with banner and links | `BaseLayout`, `PageBanner` | **KEEP** |
| `drafts/index.astro` | Dev-only draft preview (redirects to blog in prod) | `BaseLayout`, `PostCard` | **KEEP** — useful for reviewing drafts |
| `rss.xml.ts` | Generates RSS feed from blog collection | `@astrojs/rss`, blog content | **KEEP** |
| `search-index.json.ts` | API route — serves search index as JSON | `SearchOverlay.tsx` (fetches it) | **KEEP** |
| `[lang]/index.astro` | Home page — hero, recent posts, tag cloud | `BaseLayout`, `PageBanner`, `PostCard`, `i18n` | **KEEP** |
| `[lang]/about.astro` | About page — content, stats, GitHub activity | `BaseLayout`, `PageBanner`, `GitHubCalendar` | **KEEP** |
| `[lang]/blog/index.astro` | Blog listing — tag filters, post grid | `BaseLayout`, `PostCard`, `tag-filter.js`, `lib/images`, `lib/tag-colors`, `lib/renderMarkdown` | **KEEP** |
| `[lang]/blog/[...slug].astro` | Individual blog post page | `BlogPostLayout`, content collection | **KEEP** |
| `[lang]/blog/tag/[tag].astro` | Tag-filtered blog listing | `BaseLayout`, `PostCard`, `lib/tag-colors` | **KEEP** |

---

## Layouts (`src/layouts/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `BaseLayout.astro` | HTML shell — head, meta, header, footer, mobile menu, keyboard shortcuts, lightbox, toast, reading progress, back-to-top, theme script, GIF hover import | All pages, `HeadScripts`, `Header`, `Footer`, `global.css` | **KEEP** — core layout |
| `BlogPostLayout.astro` | Blog post layout — banner, breadcrumbs, tags, date, share buttons, TOC, content, downloads, related posts, prev/next nav | `[...slug].astro`, `BaseLayout`, `PageBanner`, `TableOfContents`, `ShareButtons`, `RelatedPosts`, `ArticleNav`, `PostDownloads` | **KEEP** |

---

## Components (`src/components/`)

### Core UI

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `Header.astro` | Fixed header — logo, nav links, CV button, search button, theme toggle, language switcher, mobile menu button | `BaseLayout`, `HeaderScripts`, `LanguageSwitcher`, `CommandPalette` | **KEEP** |
| `HeaderScripts.astro` | Header inline scripts — theme toggle, mobile menu, search button event listeners | `Header` | **KEEP** |
| `HeadScripts.astro` | Head inline scripts — service worker registration, code theme setter, code header language labels | `BaseLayout` | **KEEP** |
| `Footer.astro` | Footer — social links (GitHub, LinkedIn), copyright | `BaseLayout` | **KEEP** |
| `MobileMenu.astro` | Full-screen mobile nav overlay | `BaseLayout`, `HeaderScripts` | **KEEP** |
| `LanguageSwitcher.astro` | EN/DE/ZH language toggle in header | `Header`, `i18n/ui` | **KEEP** |
| `PageBanner.astro` | Hero banner with background image and overlay | `[lang]/index`, `[lang]/about`, blog pages, `404`, `lib/images` | **KEEP** |
| `PostCard.astro` | Blog post card — image, tags, title, description, date | `[lang]/index`, `[lang]/blog/index`, `drafts`, `lib/images`, `lib/renderMarkdown` | **KEEP** |

### Blog Features

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `ShareButtons.astro` | Share on X, LinkedIn, copy link | `BlogPostLayout` | **KEEP** |
| `TableOfContents.astro` | Sticky TOC with scroll-spy for blog posts | `BlogPostLayout` | **KEEP** |
| `RelatedPosts.astro` | Related posts section | `BlogPostLayout` | **KEEP** |
| `ArticleNav.astro` | Previous/Next post navigation | `BlogPostLayout` | **KEEP** |
| `PostDownloads.astro` | Download attachments section | `BlogPostLayout` | **KEEP** |
| `ReadingProgress.astro` | Top scroll progress bar | `BaseLayout` | **KEEP** |

### Search System

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `CommandPalette.tsx` | Cmd+K / Ctrl+K to open search | `Header`, `SearchOverlay` | **KEEP** |
| `SearchOverlay.tsx` | Search modal — fetches index, manages state, renders results | `CommandPalette`, all search sub-components, `useSearchState` | **KEEP** |
| `SearchInput.tsx` | Search input with clear button and loading indicator | `SearchOverlay` | **KEEP** |
| `SearchResults.tsx` | Search result list with highlighting | `SearchOverlay` | **KEEP** |
| `SearchFooter.tsx` | Search footer with keyboard hints | `SearchOverlay` | **KEEP** |
| `SearchSuggestions.tsx` | Recent searches + popular tags when query is empty | `SearchOverlay` | **KEEP** |
| `SearchTypeFilter.tsx` | Filter results by All/Posts/Tags | `SearchOverlay` | **KEEP** |
| `SearchSkeleton.tsx` | Loading skeleton for search results | `SearchOverlay` | **KEEP** |

### Media & Interactive

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `SubtitlePlayer.tsx` | YouTube/self-hosted video player with subtitle transcript, pinyin, word-level highlighting, subtitle mining | Blog MDX posts (phase-4, phase-5), `Transcript`, `MiningTray`, `lib/srt-parser` | **KEEP** |
| `Transcript.tsx` | Subtitle transcript display with pinyin ruby, levels, focus mode | `SubtitlePlayer` | **KEEP** |
| `MiningTray.tsx` | "Mined" subtitle phrases tray — copy/remove/clear | `SubtitlePlayer` | **KEEP** |
| `VideoPlayer.astro` | Self-hosted video player wrapper | Blog posts (not used in current content) | **KEEP** — may be used later |
| `PdfEmbed.astro` | PDF embed with iframe + open-in-new-tab link | Blog posts via `:::pdf` directive (not used in current content) | **KEEP** — may be used later |
| `Lightbox.astro` | Image lightbox modal | `BaseLayout`, `blog-post.js` (dispatches `openLightbox`) | **KEEP** |
| `Toast.astro` | Toast notification system | `BaseLayout`, `ShareButtons` | **KEEP** |

### Utility

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `BackToTop.astro` | Scroll-to-top button (appears after 400px) | `BaseLayout` | **KEEP** |
| `KeyboardShortcuts.astro` | `?` key shows keyboard shortcuts panel | `BaseLayout` | **KEEP** |
| `GitHubCalendar.tsx` | GitHub contributions calendar + stats | `[lang]/about` | **KEEP** |

---

## Scripts (`src/scripts/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `blog-post.js` | Blog post enhancements — heading anchors, external link OG previews, markdown image lightbox, tooltip cards | `BlogPostLayout` (imported) | **KEEP** |
| `gif-hover.js` | Floating GIF preview on hover for links (GitHub → gif, CV → gif) | `BaseLayout` (imported) | **KEEP** |
| `linkcard-modal.js` | Opens link cards in a modal with OG data + detail content | `BlogPostLayout` (imported) | **KEEP** |
| `tag-filter.js` | Client-side tag filtering on blog listing | `[lang]/blog/index` | **KEEP** |

---

## Lib (`src/lib/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `fuseConfig.ts` | Fuse.js fuzzy search config for posts and tags | `useSearchState` | **KEEP** |
| `useSearchState.ts` | React hook — search state, debounce, fuse search, ranking, recent searches | `SearchOverlay`, `useDebounce`, `useRecentSearches`, `fuseConfig`, `searchRanking` | **KEEP** |
| `searchRanking.ts` | Search result ranking algorithm (title/tag/desc/body scoring) | `useSearchState` | **KEEP** |
| `searchHistory.ts` | localStorage search history CRUD | `useRecentSearches` | **KEEP** |
| `images.ts` | Resolves image paths to Astro ImageMetadata via glob | `PageBanner`, `PostCard`, `BlogPostLayout` | **KEEP** |
| `tag-colors.ts` | Deterministic tag → color mapping | `[lang]/blog/index`, `[lang]/blog/tag/[tag]` | **KEEP** |
| `renderMarkdown.ts` | Renders inline markdown to HTML (for post descriptions) | `PostCard`, `[lang]/blog/index` | **KEEP** |
| `srt-parser.ts` | Parses SRT/VTT subtitle files into cues | `SubtitlePlayer` | **KEEP** |
| `pinyin-utils.ts` | Pinyin generation for Chinese text | Not imported anywhere (used by `remark-ruby.mjs` directive instead) | **REMOVE** — unused, or integrate into `remark-ruby.mjs` |
| `remark-tooltip.mjs` | Remark plugin — `:::tip[text]{def="..."}` tooltip directive | `astro.config.mjs` | **KEEP** |
| `remark-code-meta.mjs` | Remark plugin — passes code block meta (line highlights, titles) to Expressive Code | `astro.config.mjs` | **KEEP** |
| `remark-linkcard.mjs` | Remark plugin — `:::linkcard{url="..."}` directive → OG card | `astro.config.mjs` | **KEEP** |
| `remark-ruby.mjs` | Remark plugin — `::zh[text]{pinyin="..."}` ruby annotation | `astro.config.mjs` | **KEEP** |
| `rehype-og-preview.mjs` | Rehype plugin — fetches OG metadata for external links, bare links → cards | `astro.config.mjs` | **KEEP** |
| `rehype-linkcard.mjs` | Rehype plugin — builds OG card DOM from `:::linkcard` data | `astro.config.mjs` | **KEEP** |

---

## Hooks (`src/hooks/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `useDebounce.ts` | Generic debounce hook | `useSearchState` | **KEEP** |
| `useRecentSearches.ts` | React hook wrapping `searchHistory.ts` | `useSearchState` | **KEEP** |

---

## i18n (`src/i18n/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `ui.ts` | Exports locale map, type, default locale, locale list | `utils.ts`, all components using i18n | **KEEP** |
| `en.ts` | English translations | `ui.ts` | **KEEP** |
| `de.ts` | German translations | `ui.ts` | **KEEP** |
| `zh.ts` | Chinese translations | `ui.ts` | **KEEP** |
| `tags.ts` | Tag translations (EN/DE/ZH) for 50 tags | `BlogPostLayout`, `[lang]/index`, `[lang]/blog/index` | **KEEP** |
| `utils.ts` | `getLangFromUrl`, `useTranslations`, `useTranslatedPath` | All components, all pages | **KEEP** |

---

## Styles (`src/styles/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `global.css` | Main stylesheet — Tailwind, theme vars, base styles, all CSS imports | `BaseLayout` | **KEEP** |
| `theme-light.css` | Light theme color overrides | `global.css` | **KEEP** |
| `code-theme.css` | Expressive Code CSS variable overrides | `global.css` | **KEEP** |
| `components.css` | Component utility classes (tags, links, headings) | `global.css` | **KEEP** |
| `markdown-base.css` | Markdown prose base styles | `global.css` | **KEEP** |
| `markdown-components.css` | Markdown component styles (callouts, link cards, etc.) | `global.css` | **KEEP** |
| `markdown-extras.css` | Extra markdown styles (gif hover preview, tooltips, etc.) | `global.css` | **KEEP** |
| `gif-hover.css` | GIF hover preview animation styles | `global.css` | **KEEP** |
| `link-card-modal.css` | Link card modal styles | `global.css` | **KEEP** |
| `utilities.css` | Misc utility classes | `global.css` | **KEEP** |

---

## Content (`src/content/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `content.config.ts` | Content collection schema — blog (title, date, tags, author, etc.) and pages (title) | All content files, Astro content layer | **KEEP** |
| `en/blog/phase-*.md` | English blog posts (6 phase test posts + why-personal-website) | Content collection → blog pages | **REMOVE** phase posts (they were test posts), **KEEP** `why-personal-website.md` if it's real content |
| `de/blog/phase-5-i18n.md` | German translation of phase-5 | Content collection | **REMOVE** — test post |
| `zh/blog/phase-5-i18n.md` | Chinese translation of phase-5 | Content collection | **REMOVE** — test post |
| `en/pages/home-page.md` | English home page content | `[lang]/index` | **KEEP** |
| `en/pages/about-page.md` | English about page content | `[lang]/about` | **KEEP** |
| `en/pages/post-page.md` | English blog page intro content | `[lang]/blog/index` | **KEEP** |
| `de/pages/*.md` | German page content | `[lang]/index`, `[lang]/about`, `[lang]/blog/index` | **KEEP** |
| `zh/pages/*.md` | Chinese page content | `[lang]/index`, `[lang]/about`, `[lang]/blog/index` | **KEEP** |

---

## Public Assets (`public/`)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `favicon.ico` | Site favicon | `BaseLayout`, `manifest.json` | **KEEP** |
| `icon-home.png` | Logo (dark theme) | `Header`, `BaseLayout` | **KEEP** |
| `icon-home-alt.png` | Logo (light theme) | `HeaderScripts` (theme switch) | **KEEP** |
| `manifest.json` | PWA manifest | `BaseLayout` (linked) | **KEEP** |
| `og-default.jpg` | Default Open Graph image | `BaseLayout` (fallback OG image) | **KEEP** |
| `sw.js` | Service worker — caches pages offline | `HeadScripts` (registered) | **KEEP** |
| `gifs/gif-test.gif` | Sample GIF for hover preview | `gif-hover.js` | **KEEP** |
| `subtitles/*.srt` | Sample subtitle files for SubtitlePlayer | `phase-4` blog posts | **REMOVE** — test assets |

---

## Generated / Build Artifacts (safe to delete, auto-regenerated)

| File | What It Does | Connected To | Verdict |
|------|-------------|--------------|---------|
| `.astro/` | Astro generated types, content cache, dev state | Astro build | **REMOVE** before git commit (add to `.gitignore`) |
| `dist/` | Production build output | `npm run build` | **REMOVE** before git commit (already in `.gitignore`) |
| `node_modules/` | Dependencies | `npm install` | **REMOVE** before git commit (already in `.gitignore`) |

---

## Summary: What to Remove

### Safe to Delete Now

| File | Reason |
|------|--------|
| `metadata.json` | Not imported anywhere in the codebase |
| `src/lib/pinyin-utils.ts` | Not imported anywhere (remark-ruby directive handles pinyin instead) |
| `src/content/en/blog/phase-*.md` | Test posts from development phases |
| `src/content/de/blog/phase-5-i18n.md` | Test post |
| `src/content/zh/blog/phase-5-i18n.md` | Test post |
| `public/subtitles/*.srt` | Sample test files |
| `public/gifs/gif-test.gif` | Test asset |

### Should Add to `.gitignore`

| Pattern | Reason |
|---------|--------|
| `.astro/` | Astro cache/generated types — should not be committed |

### Consider Merging

| Files | Reason |
|-------|--------|
| `.github/workflows/security.yml` + `deploy.yml` audit job | `deploy.yml` already runs `npm audit` — `security.yml` is redundant |

---

## Dependency Graph (simibold)

```
astro.config.mjs
  ├── ec.config.mjs
  ├── src/lib/remark-tooltip.mjs
  ├── src/lib/remark-code-meta.mjs
  ├── src/lib/remark-linkcard.mjs
  ├── src/lib/remark-ruby.mjs
  ├── src/lib/rehype-og-preview.mjs
  └── src/lib/rehype-linkcard.mjs

src/layouts/BaseLayout.astro
  ├── src/components/Header.astro → HeaderScripts.astro → LanguageSwitcher.astro → CommandPalette.tsx
  │   └── SearchOverlay.tsx → SearchInput / SearchResults / SearchFooter / SearchSuggestions / SearchTypeFilter / SearchSkeleton
  │       └── useSearchState.ts → useDebounce / useRecentSearches / fuseConfig / searchRanking
  ├── src/components/Footer.astro
  ├── src/components/MobileMenu.astro
  ├── src/components/KeyboardShortcuts.astro
  ├── src/components/Lightbox.astro
  ├── src/components/Toast.astro
  ├── src/components/ReadingProgress.astro
  ├── src/components/BackToTop.astro
  ├── src/components/HeadScripts.astro
  ├── src/scripts/gif-hover.js
  └── src/styles/global.css → all CSS files

src/layouts/BlogPostLayout.astro
  ├── src/components/PageBanner.astro
  ├── src/components/ShareButtons.astro
  ├── src/components/TableOfContents.astro
  ├── src/components/PostDownloads.astro
  ├── src/components/RelatedPosts.astro
  ├── src/components/ArticleNav.astro
  ├── src/scripts/blog-post.js
  └── src/scripts/linkcard-modal.js

src/pages/[lang]/blog/[...slug].astro → BlogPostLayout → SubtitlePlayer.tsx → Transcript.tsx + MiningTray.tsx → lib/srt-parser.ts
```
