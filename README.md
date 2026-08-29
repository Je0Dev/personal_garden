# Cosmos

> A personal blog, portfolio, and digital garden built with Astro, React, and Tailwind CSS.

<img src="src/assets/images/shipwrecked-sailor.jpg" alt="Old book illustration" width="100%" />

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 7 + TypeScript |
| Islands | React 19 (search, GitHub calendar) |
| Styling | Tailwind CSS 4 (custom design tokens) |
| Routing | Astro file-based routing + i18n (`/en/`, `/de/`, `/zh/`) |
| Syntax Highlighting | Expressive Code (4 user-selectable themes) |
| Math | KaTeX via rehype-katex |
| Content | Astro content collections (Markdown/MDX) |
| Media | astro-embed, Bilibili, self-hosted video, subtitles |
| Deployment | GitHub Pages (via GitHub Actions) |

## Quick Start

```bash
npm install
npm run dev          # → http://localhost:3001
npm run build        # → dist/
npm run lint         # TypeScript type check
npm run preview      # Preview production build
```

## Features

### Core
- Dark/light theme with persistence across navigations
- Command palette search (⌘K) with regex + fuzzy support
- Multi-select tag filtering
- GitHub contribution calendar
- RSS feed
- View transitions (ClientRouter)
- Responsive design
- Print styles

### Phase 1 — Code Block Enhancements
- Copy button, language badge, line numbers
- Line highlight (`{1-3}`) and word highlight (`/word/`)
- 4 user-selectable themes (GitHub Light, Vitesse Dark, Dracula, Catppuccin Mocha) via header picker
- Powered by `astro-expressive-code`

### Phase 2 — Emoji Shortcodes
- `remark-emoji` (accessible mode) for `:rocket:` style shortcodes
- Custom emoji via `::directive{}` pattern

### Phase 3 — Enhanced Link Cards
- Bare links → rich OG preview cards (image + title + description + domain)
- Inline links keep hover popup
- `data-gif` injection for GIF hover previews on matching links

### Phase 4 — Media Embedding
- `astro-embed` for YouTube / Bilibili / generic URLs
- `VideoPlayer.astro` — self-hosted `.mp4`/`.webm` with poster
- `AmbientPlayer` — floating background audio (volume slider, persistence)
- `SubtitlePlayer.tsx` — import `.srt`/`.vtt`, live transcript, pinyin + word-by-word toggles, mining tray
- `Transcript.tsx` — live subtitle display (language-learning tool)
- `PdfEmbed.astro` — inline PDF viewer

### Phase 6 — Dynamic GIF Hover Previews
- Floating `<img>` preview tracking cursor (`clientX/clientY` + viewport clamping)
- CSS opacity + scale transition (0.25s)
- `data-gif` on links + CV button in `Header.astro`
- URL→GIF map in `rehype-og-preview.mjs`
- Re-binds on `astro:page-load` for View Transitions; preloads on `mouseenter`

### Phase 5 — Internationalization (i18n)
- Full EN/DE/ZH localization of UI, content, search, tags, and player
- `prefixDefaultLocale: true` with `[lang]` dynamic routes
- `getLangFromUrl()` with base-path-aware locale detection
- Language switcher with active locale highlighting
- Locale-filtered blog posts and content collections
- Translated dictionaries (`en.ts`, `de.ts`, `zh.ts`) and tag translations

### Upcoming
- **Phase 7** (planned): TBD

## License

This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Credits

- Vintage illustrations from [Old Book Illustrations](https://www.oldbookillustrations.com)
