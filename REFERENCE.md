# Project Reference — File Map

> Generated: 2026-06-17
> Total source files: 57 | Total lines: ~7,900

## Root Config

| File | Lines | Description |
|------|-------|-------------|
| `index.html` | 32 | Vite entry point. SEO meta tags, OG/Twitter cards, RSS link |
| `vite.config.ts` | 25 | Vite config. React + Tailwind plugins, `@` path alias |
| `tsconfig.json` | 24 | TS strict mode, ES2022 target, bundler resolution |
| `package.json` | 45 | Dependencies: React 19, Vite 8, Tailwind 4, motion, react-router |
| `metadata.json` | 6 | Site metadata (name, author, keywords) |
| `README.md` | — | Project readme |

## Source Files

### `src/main.tsx` (15 lines)
App entry point. Renders `<App />` inside `<BrowserRouter>`.

### `src/App.tsx` (131 lines)
Root component. Routes all pages (Home, About, Projects, Games, Languages, Tags, Article). Includes Toast provider, KeyboardShortcuts, KonamiEasterEgg, BackToTop, ThemeToggle.

### `src/index.css` (457 lines)
Tailwind v4 CSS with custom design tokens:
- Colors: deep-olive, olive, olive-light, earth-tan, earth-muted, moss, surface, deep-forest, tomato, amber, rust, cream
- Fonts: serif (Cinzel Decorative for headings), sans (Inter for body)
- Global styles: scrollbar theming, selection colors, animations

### `src/vite-env.d.ts` (1 line)
Vite environment type declarations.

---

## Pages

| File | Lines | Description |
|------|-------|-------------|
| `src/pages/Home.tsx` | 280 | Landing page. Hero section, latest posts, featured projects, GitHub calendar |
| `src/pages/About.tsx` | 431 | About page. Bio, timeline, skills, contact form |
| `src/pages/Projects.tsx` | 175 | Project grid with filter by tag, detail modals |
| `src/pages/Games.tsx` | 150 | Available games (Translate Mania) + Sneak Peek upcoming games with countdowns |
| `src/pages/Languages.tsx` | 429 | Video guides, resources by language, downloadable materials (PDFs, Anki decks, scripts), upcoming releases |
| `src/pages/Article.tsx` | 162 | Dynamic article renderer. Supports markdown, components, KaTeX math |
| `src/pages/GameView.tsx` | 62 | Single game view (Translate Mania embedded) |
| `src/pages/Tags.tsx` | 125 | Tag browser with post count per tag |
| `src/pages/NotFound.tsx` | 69 | 404 page |

---

## Sections

| File | Lines | Description |
|------|-------|-------------|
| `src/sections/Header.tsx` | 489 | Responsive nav. Desktop/mobile menus, active route highlighting |
| `src/sections/Footer.tsx` | 44 | Site footer |
| `src/sections/Categories.tsx` | 42 | Category navigation component |
| `src/sections/Newsletter.tsx` | 56 | Newsletter subscribe section |

---

## Data Files

| File | Lines | Description |
|------|-------|-------------|
| `src/data/posts.ts` | 784 | All blog posts as typed objects. Includes markdown content as template literals |
| `src/data/projects.ts` | 425 | Project entries with images, links, tech tags |
| `src/data/games.ts` | 372 | Game + UpcomingGame interfaces and data. 1 published game (Translate Mania), 2 upcoming |
| `src/data/languageResources.ts` | 333 | Language learning resources (videos, links, PDFs, Anki decks). PdfFile, AnkiDeck, UpcomingItem interfaces |
| `src/data/languageScripts.ts` | 227 | Language-related scripts with syntax-highlighted code previews. LanguageScript interface |
| `src/data/tag-colors.ts` | 47 | Color mapping for tags across the site |

---

## Components

### Games
| File | Lines | Description |
|------|-------|-------------|
| `src/components/games/GameDetailModal.tsx` | 149 | Full modal for published games. Features, tech list, syntax-highlighted code walkthrough, play button |
| `src/components/games/GameUpcomingModal.tsx` | 140 | Modal for upcoming game previews. Countdown, features, tech, code snippet |

### Languages
| File | Lines | Description |
|------|-------|-------------|
| `src/components/languages/VideoModal.tsx` | 96 | Video guide modal with YouTube embed + key takeaways sidebar |
| `src/components/languages/ResourceCard.tsx` | 36 | Compact resource card with type icon |
| `src/components/languages/ResourceDetailModal.tsx` | 160 | Full resource detail modal. Why/best-for/level/price, pros/cons |
| `src/components/languages/PdfModal.tsx` | 89 | In-browser PDF viewer with download fallback |
| `src/components/languages/AnkiDeckModal.tsx` | 107 | Anki deck detail modal. Card count, difficulty, what's included, download |
| `src/components/languages/ScriptModal.tsx` | 111 | Script code viewer with syntax highlighting + download |
| `src/components/languages/UpcomingModal.tsx` | 187 | Upcoming item preview modal. Type-specific content (deck stats, PDF topics, script code) |
| `src/components/languages/CountdownTimer.tsx` | 51 | Reusable countdown with compact/standard modes |

### Shared
| File | Lines | Description |
|------|-------|-------------|
| `src/components/Toast.tsx` | 92 | Toast notification system |
| `src/components/Lightbox.tsx` | 109 | Image lightbox overlay |
| `src/components/MobileMenu.tsx` | 97 | Slide-in mobile navigation |
| `src/components/CodeBlock.tsx` | 79 | Syntax-highlighted code block with copy button |
| `src/components/ThemeToggle.tsx` | 20 | Dark/light theme switcher |
| `src/components/BackToTop.tsx` | 33 | Scroll-to-top button |
| `src/components/ReadingProgress.tsx` | 47 | Article reading progress bar |
| `src/components/ShareButtons.tsx` | 59 | Social share buttons for articles |
| `src/components/ViewCount.tsx` | 35 | Article view counter |
| `src/components/Newsletter.tsx` | 77 | Newsletter signup form |
| `src/components/ContactForm.tsx` | 57 | Contact form component |
| `src/components/KeyboardShortcuts.tsx` | 73 | Keyboard shortcut handler |
| `src/components/KonamiEasterEgg.tsx` | 58 | Konami code easter egg |

### Projects
| File | Lines | Description |
|------|-------|-------------|
| `src/components/projects/ProjectCard.tsx` | 57 | Project grid card |
| `src/components/projects/ProjectFilter.tsx` | 43 | Project tag filter |
| `src/components/projects/ProjectModal.tsx` | 209 | Full project detail modal |

### Tags
| File | Lines | Description |
|------|-------|-------------|
| `src/components/tags/PostCard.tsx` | 49 | Tagged post card |
| `src/components/tags/TagFilter.tsx` | 51 | Tag filter bar |

### Article
| File | Lines | Description |
|------|-------|-------------|
| `src/components/article/ArticleContent.tsx` | 131 | Renders article markdown with custom components |
| `src/components/article/ArticleLinks.tsx` | 70 | Related article links |
| `src/components/article/ArticleNav.tsx` | 70 | Article navigation |
| `src/components/article/ArticleGallery.tsx` | 41 | Article image gallery |

---

## Other

| File | Lines | Description |
|------|-------|-------------|
| `src/hooks/use-mobile.ts` | 19 | Mobile detection hook |
| `src/services/recommendationService.ts` | 69 | AI-powered article recommendations via Gemini API |
