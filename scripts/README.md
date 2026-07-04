# scripts/ — Build & Automation Scripts

- **`generate-rss.ts`** — Prebuild script that generates `public/rss.xml` from blog posts in `data/posts.ts`. Runs automatically before `vite build` via the `prebuild` npm script.
- **`convert.mjs`** — Utility script for file format conversions used in content migration or asset processing.
- **`merge-content.ts`** — Content merging utility for combining or restructuring data files during development.

Connects to: `src/data/posts.ts` (RSS source), `public/rss.xml` (output), `package.json` (hooked into build pipeline).
