# src/pages/ — Route-Level Page Components

- **`Home.tsx`** — Landing page with hero section, latest posts grid, featured projects, and CV download button. Uses `getRelatedPosts` from data/posts and newsletter signup.
- **`About.tsx`** — Bio page with timeline, skills grid, GitHub contribution calendar, and contact form. Uses ContactForm component and GitHub calendar library.
- **`Projects.tsx`** — Filterable project grid with ProjectFilter bar and ProjectDetail modals. All data from `data/projects.ts`.
- **`Games.tsx`** — Games listing with published game cards and upcoming "sneak peek" cards with countdowns. Data from `data/games.ts`.
- **`GameView.tsx`** — Individual game page that embeds the standalone Translate Mania game from `public/games/translation/`.
- **`Languages.tsx`** — Language learning hub with video guides, resources by language (German/Spanish/Chinese/English), downloadable materials, and upcoming releases. Data from `data/languageResources.ts` and `data/languageScripts.ts`.
- **`Article.tsx`** — Dynamic article renderer supporting markdown, KaTeX math, custom components. Uses `ArticleContent`, `ArticleLinks`, `ArticleNav`, `ShareButtons`, `ReadingProgress`.
- **`Tags.tsx`** — Tag browser showing all tags with post counts. Filtering via TagFilter, posts displayed as PostCards.
- **`NotFound.tsx`** — 404 page with navigation back to home. Uses a vintage illustration as background.

Connects to: `components/` (all page-specific UI), `data/` (content), `sections/` (Header/Footer layout).

> **Note:** `Languages.tsx.backup` has been removed — it was stale backup content.
