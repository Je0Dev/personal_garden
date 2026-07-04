# src/data/ — Static Typed Content

- **`posts.ts`** — All blog posts as typed `Post` objects with markdown template literal content. Includes `getRelatedPosts()` helper for tag-based article recommendations. Central content source for the Article and Home pages.
- **`projects.ts`** — Portfolio project entries with images, links, tech tags, and code walkthroughs. Used by the Projects page.
- **`games.ts`** — Game + UpcomingGame interfaces and data. 1 published game (Translate Mania), 2 upcoming. Used by Games page.
- **`languageResources.ts`** — Language learning resources organized by language: video guides, resource links, Anki decks, PDF files, upcoming release schedules. Used by Languages page.
- **`languageScripts.ts`** — Downloadable Python scripts with syntax-highlighted code previews. Used by Languages page script modals.
- **`tag-colors.ts`** — Color mapping for tags across the site (each tag gets a consistent accent color). Used by Tags, Projects, and article components.

Connects to: `pages/` (all data consumers), `components/` (modals and cards render this data).
