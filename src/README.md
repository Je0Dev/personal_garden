# src/ — Source Code Root

- **`main.tsx`** — App entry point. Renders `<App />` inside `<BrowserRouter>` with base path `/personal_garden/`.
- **`App.tsx`** — Root component defining all routes (Home, About, Projects, Games, Languages, Tags, Article, GameView). Wraps pages in layout with Header/Footer and includes global features: Toast provider, KeyboardShortcuts, KonamiEasterEgg, BackToTop.
- **`index.css`** — Tailwind v4 CSS with custom design tokens (colors, fonts, scrollbar theming, animations). Sets the dark theme foundation for the entire site.
- **`vite-env.d.ts`** — Vite client type declarations so TypeScript recognizes `import.meta.env` and other Vite-specific APIs.

Connects to: `pages/` (routes), `components/` (reusable UI), `sections/` (layout), `data/` (content).
