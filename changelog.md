# Changelog

All notable changes to **George's Garden** (the Digital Garden personal blog), documented per git push from the beginning of the project.

> Chronological history, newest first. Commit hashes reference the project's git history. The site does not use semantic versioning.

## dev — 2026-08-18

Pushed to the `dev` branch as 10 folder-grouped commits. This branch contains the full site rework and is ahead of `main`.

### scripts/
- Rewrote the RSS generator to read posts from the markdown files in `src/content/` instead of the compiled data module
- Fixed `pubDate` so post dates no longer shift a day (parsed as UTC, e.g. `Mar 15, 2026` stays `Sun, 15 Mar 2026 00:00:00 GMT`)
- Removed legacy scripts (`convert.mjs`, `merge-content.ts`, `scripts/README.md`)

### src/content/
- Added all seven posts as standalone markdown files with front matter (`title`, `date`, `excerpt`, `tags`) and full markdown bodies
- Each post ends with `## Further Reading` and `## Related Projects` sections

### src/data/
- Refactored `posts.ts` to import the markdown files via Vite `?raw` and parse front matter into the `Post` type
- Added `src/data/config.ts`
- Dropped the legacy `games.ts`, `languageResources.ts`, `languageScripts.ts`, and `projects.ts` datasets

### src/pages/
- Reworked pages around the new `PageBanner` hero (Home, About, Tags, Article, NotFound); the 404 page now uses the banner background
- Article page: post title rendered in the banner, working "Contents" TOC anchors with smooth scrolling, bottom tags/newsletter/gallery removed, downloads section added
- Home and About pages polished (mood/stat boxes, unified hover styles)
- Removed the legacy Games, Languages, and Projects pages

### src/components/
- Added `PageBanner`, `article/PostDownloads`, and `NewsletterForm`
- Unified all hover animations across the project (tomato text hovers, gold `olive-light` card borders, `scale-105` image zooms, consistent pill/filter hovers)
- Removed legacy feature components: `Newsletter`, `ArticleGallery`, `ArticleLinks`, `ContactForm`, `KonamiEasterEgg`, and the whole `games/`, `languages/`, `projects/` subfolders

### src/sections/
- Rewrote the header's global search into a clean command palette:
  - Unified single result list (posts + tags), no more tabs
  - Real regex matching with safe fallback to plain-text search for invalid patterns
  - Searches full article markdown bodies (markdown stripped first) and shows context snippets around the match
  - Path results in mono (`/blog/{slug}`, `/tags/{tag}`), tag counts, `↑↓`/`↵`/`esc` keyboard navigation, smooth fade/slide animation
- Renamed the brand in the header and unified footer/social hover styles

### public/
- Added the Old Book Illustrations favicon set (Cabbage Rose engraving): `favicon.ico`, `favicon-16/32/512.png`, `apple-touch-icon.png`, `icon-192.png`; removed the old `favicon.svg`
- Added downloadable post files in `public/files/` (`esp32-timer-sensor.ino`, `install-cli-projects.sh`)
- Refreshed `manifest.json` and `rss.xml`
- Removed legacy public assets: Anki decks, translation game, language resources, scripts, and the CV PDF

### .github/workflows/
- Removed the stale workflow README

### Root project files
- Renamed the site to **George's Garden**: browser `<title>`, `og:title`, `twitter:title`, RSS channel/link titles, manifest name, header logo, Home ornament
- Updated `README.md`, `package.json`, `package-lock.json`, `tsconfig.json`

### src/ root
- Removed the legacy routes (Games, Languages, Projects, Konami easter egg) from the app shell
- Added smooth scrolling and refined global styles (`scroll-behavior`, calendar tooltips import, underline token, unified tag-pill hovers)

## 2026-07-04 — cb1d9af

- Added the CC BY-NC-SA 4.0 `LICENSE` file

## 2026-07-04 — c72e00c

- Cleaned up Gemini/dead code: removed `CodeBlock`, `ThemeToggle`, `ViewCount`, `Categories`, `Newsletter`, `recommendationService`, `use-mobile`, and a 1,133-line `Languages.tsx.backup`
- Removed design docs (`DESIGN.md`, `REFERENCE.md`, `CHANGELOG.md`, `.env.example`) and consolidated READMEs per folder
- Localized the illustration images into `public/images/` (30+ files)
- Expanded the video guides / language resources data
- Optimized `package.json` / lockfile; added `scripts/download-images.sh`

## 2026-06-17 — eba9654

- Fixed image centering: `illustration-container` margins no longer override `mx-auto`
- Added the `max-w-wide` theme value

## 2026-06-17 — 0d602bb

- Centered images on the Home and Projects pages

## 2026-06-17 — 9308f93

- Added the "Download CV" button with a toast on the home page
- Centered the About page text
- Renamed "Open Source" to "Personal Projects"
- Added the CV PDF to `public/` and refreshed `rss.xml`

## 2026-06-17 — e7e1a83

- Triggered a redeploy (README update)

## 2026-06-17 — ed878cd

- Updated the README with the proper email address

## 2026-06-17 — cc3815f

- Optimized the build: code splitting and chunk separation for `syntax-highlighter` and vendor code in `vite.config.ts`

## 2026-06-17 — fd2b784 (Initial commit)

- Initial "Digital Garden" personal blog scaffold:
  - React + TypeScript + Vite (Tailwind CSS, React Router, motion/framer-motion animations)
  - Pages: Home, Article, Tags, About, Games, Languages, Projects; components for lightbox, mobile menu, back-to-top, reading progress, keyboard shortcuts, share buttons, newsletter, toast system, and a Konami easter egg
  - Content datasets for posts, games, languages/resources/scripts, and projects
  - RSS feed generator and a GitHub Actions deploy workflow for GitHub Pages
  - Vintage illustrations and an SVG favicon
  - Supporting files: README, DESIGN, REFERENCE, metadata, Anki decks, language resources, scripts, and a translation game