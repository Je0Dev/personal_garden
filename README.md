# Digital Garden

> A personal blog, portfolio, and digital garden built with React, TypeScript, and Vite.

<img src="https://www.oldbookillustrations.com/site/assets/files/14486/rape-lock.jpg" alt="Old book illustration" width="100%" />

---

## Features

- **Blog** — Articles with code blocks, math (KaTeX), galleries, and custom components
- **Projects** — Filterable portfolio with rich detail modals
- **Games** — Translate Mania (language learning game) + upcoming projects
- **Languages** — Curated learning resources, downloadable Anki decks, PDF guides, Python scripts
- **AI Recommendations** — Gemini-powered related article suggestions
- **RSS Feed** — Auto-generated at build time
- **Dark Theme** — Moody aesthetic with vintage old book illustrations

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 + rolldown |
| Styling | Tailwind CSS 4 (custom design tokens) |
| Animation | motion (framer-motion v12) |
| Routing | react-router-dom v7 |
| Syntax Highlighting | react-syntax-highlighter (Prism + oneDark) |
| AI | Google Gemini API |
| Math | KaTeX via rehype-katex |
| Deployment | GitHub Pages (via GitHub Actions) |

## Quick Start

```bash
npm install
npm run dev          # → http://localhost:3001
npm run build        # → dist/
npm run lint         # TypeScript type check
npm run preview      # Preview production build
```

## Project Structure

```
src/
├── pages/           # Route-level page components
├── components/      # Reusable UI (games/, languages/, projects/, etc.)
├── sections/        # Layout (Header, Footer)
├── data/            # Static typed content (posts, projects, games, resources)
├── hooks/           # Custom React hooks
├── services/        # External API integrations (Gemini)
├── App.tsx          # Router + global providers
├── main.tsx         # Entry point
└── index.css        # Tailwind design tokens
```

## Documentation

- [`REFERENCE.md`](./REFERENCE.md) — Complete file map with line counts
- [`DESIGN.md`](./DESIGN.md) — Architecture and design system
- [`CHANGELOG.md`](./CHANGELOG.md) — Session change log

## Suggestions & Issues

Found a bug? Have an idea? Open an [issue](https://github.com/Je0Dev/personal_garden/issues) — feedback is always welcome.

## License

This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

**You are free to:**
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose, even commercially

**Under the following terms:**
- **Attribution** — You must give appropriate credit, provide a link to the original repository, and indicate if changes were made.
- **Credit must include:**
  - A reference link to: `https://github.com/Je0Dev/personal_garden`
  - Credit to the original author (contact: `giorgos_M000@hotmail.com`)
  - Credit to [Old Book Illustrations](https://www.oldbookillustrations.com) for the vintage artwork used throughout the site.

## Credits

- Vintage illustrations from [Old Book Illustrations](https://www.oldbookillustrations.com)
- Built with [React](https://react.dev), [Vite](https://vite.dev), [Tailwind CSS](https://tailwindcss.com), and many other open-source tools
