# src/components/article/ — Article Components

- **`ArticleContent.tsx`** — Renders article markdown body using `react-markdown` with KaTeX math, syntax highlighting, custom components (gallery, lightbox). Central to the Article page.
- **`ArticleLinks.tsx`** — Displays related article recommendations at the bottom of articles. Uses tag-based matching from `data/posts.ts`.
- **`ArticleNav.tsx`** — Previous/next article navigation at article page bottom. Helps readers discover adjacent content.
- **`ArticleGallery.tsx`** — Image gallery renderer for articles that include multiple images. Integrates with Lightbox for full-screen viewing.

Connects to: `src/pages/Article.tsx` (parent), `src/data/posts.ts` (article content), `src/components/Lightbox.tsx`.
