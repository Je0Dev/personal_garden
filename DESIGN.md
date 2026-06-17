# Design Document — Digital Garden

> Project: Personal Blog / Digital Garden of George Mastrogiannis (Je0Dev)
> Stack: React 19 + TypeScript + Vite 8 + Tailwind CSS 4

---

## 1. Architecture Overview

```
personal_blog/
├── index.html               # SPA entry point
├── vite.config.ts           # Build config
├── tsconfig.json            # TypeScript strict mode
├── package.json             # Dependencies & scripts
├── public/                  # Static assets
│   ├── favicon.svg
│   ├── manifest.json
│   └── rss.xml              # Auto-generated RSS feed
└── src/
    ├── main.tsx             # App bootstrap
    ├── App.tsx              # Router + global providers
    ├── index.css            # Tailwind + design tokens
    ├── pages/               # Route-level page components
    ├── components/          # Reusable UI
    │   ├── games/           # Game-specific components
    │   ├── languages/       # Language-learning components
    │   ├── projects/        # Project components
    │   ├── tags/            # Tag components
    │   └── article/         # Article components
    ├── sections/            # Layout sections (Header, Footer)
    ├── data/                # Static typed data files
    ├── hooks/               # Custom React hooks
    └── services/            # External API integrations
```

### Routing (react-router-dom v7)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing, latest posts, featured |
| `/about` | About | Bio, timeline, skills |
| `/projects` | Projects | Project grid with filters |
| `/games` | Games | Playable + upcoming games |
| `/games/:slug` | GameView | Individual game page |
| `/languages` | Languages | Learning resources, downloads |
| `/tags` | Tags | Tag browser |
| `/tags/:tag` | Tags (filtered) | Posts by tag |
| `/article/:slug` | Article | Full article view |

---

## 2. Design System

### Color Palette (Tailwind v4 custom)

| Token | Usage | Hex |
|-------|-------|-----|
| `deep-olive` | Page background | `#141410` |
| `surface` | Card/section bg | `#1c1c18` |
| `deep-forest` | Modal background | `#1a1f16` |
| `deep-sage` | Hover overlays | `#2a3324` |
| `moss` | Borders, subtle lines | `#2e3a26` |
| `olive` | Secondary accent | `#5a6b3e` |
| `olive-light` | Primary accent, links | `#8b9b6b` |
| `cream` | Primary text | `#e8e0d0` |
| `earth-tan` | Secondary text | `#c4b99a` |
| `earth-muted` | Muted text | `#8a7f6c` |
| `tomato` | Energy, attention | `#c45c3e` |
| `amber` | Highlights, games | `#c4915a` |
| `rust` | Chinese accent | `#b85c38` |

### Typography
- **Fonts:** Cinzel Decorative (serif headings), Inter (sans body)
- **Headings:** `font-serif` in cream, all-caps tracking for subheadings
- **Code:** monospace (`font-mono`) for tags, badges, technical text
- **Scale:** `text-[10px]` for metadata → `text-7xl` for hero titles

### Spacing & Layout
- Max content width: `max-w-6xl` (72rem) or `max-w-wide` (custom)
- Card grids: `grid-cols-1 md:grid-cols-2 gap-6`
- Card style: `bg-surface border border-moss rounded-lg`
- Section spacing: `space-y-16`
- Padding: `px-6`

### Motion (motion/react)
- Page sections: fade-up on mount (`opacity: 0, y: 20` → `1, 0`)
- Modals: scale+fade entrance/exit
- Cards: hover scale on images, color shifts on borders

---

## 3. Data Architecture

All content is **static typed data** in `src/data/` — no CMS, no database.

| File | Interfaces | Purpose |
|------|------------|---------|
| `posts.ts` | `Post` | Blog articles with full TSX content |
| `projects.ts` | `Project` | Portfolio projects |
| `games.ts` | `Game`, `UpcomingGame` | Playable + upcoming games |
| `languageResources.ts` | `Resource`, `AnkiDeck`, `PdfFile`, `UpcomingItem` | Language learning materials |
| `languageScripts.ts` | `LanguageScript` | Downloadable scripts with code previews |
| `tag-colors.ts` | Mapping | Tag → color associations |

---

## 4. Key Features

- **AI Article Recommendations:** `recommendationService.ts` uses Google Gemini API to suggest related posts
- **Syntax Highlighting:** react-syntax-highlighter with Prism + oneDark theme
- **RSS Feed:** Auto-generated at build time via `scripts/generate-rss.ts`
- **Toast Notifications:** Custom toast system with success/info/error types
- **Keyboard Shortcuts:** Navigate pages with `g h`, `g a`, `g p`, etc. + `?` for help
- **Konami Code:** Hidden easter egg
- **Old Book Illustrations:** Vintage artwork used throughout as decorative banners
- **Countdown Timers:** Per-item countdowns for upcoming releases
- **Dark Theme Only:** No light mode — intentional moody aesthetic

---

## 5. Build & Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 3001) |
| `npm run build` | Build for production |
| `npm run lint` | TypeScript type checking |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove `dist/` |

---

## 6. Conventions

- **Imports:** Use `@/` alias for `src/` (configured in vite.config.ts + tsconfig.json)
- **Components:** PascalCase filenames matching export name
- **Data files:** camelCase exports, interfaces defined above their data
- **CSS:** Tailwind utility classes only — no custom CSS files per component
- **Modals:** Follow prop pattern: `{ item, onClose, ... }` with AnimatePresence
- **Banners:** Old book illustrations from `oldbookillustrations.com` used as decorative imagery
- **Badges:** `NEW`, `Coming Soon`, `UPCOMING`, `DEVELOPMENT` badges use absolute positioning with `text-[9px] font-mono uppercase tracking-wider`
