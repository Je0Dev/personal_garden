---
title: "Phase 6 — Dynamic GIF Hover Previews"
description: "Hover any GitHub link or the CV button to see a floating GIF preview that follows your cursor."
date: 2026-08-28
tags: ["Testing", "Media", "Web Development"]
illustration: "/personal_garden/images/burial-sarah-rawscan.jpg"
author:
  name: Geo Mas
  avatar: https://avatars.githubusercontent.com/u/217055154?s=120&v=4
  bio: Electrical and Computer Engineering student. Builder of things.
relatedPosts: []
downloads: []
---

## What this phase adds

When you hover certain links, a small GIF preview floats near your cursor,
fading in with a smooth scale transition and clamping to the viewport edges.

### Try it

- Hover the **CV button** in the header (top-right) — it carries a `data-gif`.
- Hover this inline link to GitHub: [Astro repo](https://github.com/withastro/astro).
  GitHub links are mapped to a demo GIF on the client.
- Hover this raw-HTML link with an explicit preview:
  <a href="https://expressive-code.com/" data-gif="/personal_garden/gifs/demo.gif">Expressive Code</a>.
- Hover this **transparent** GIF link (no dark box behind it):
  <a href="https://github.com/withastro/astro" data-gif="/personal_garden/gifs/transparent-demo.gif" data-gif-transparent="true">Astro (transparent)</a>.

Toggle transparency per link with `data-gif-transparent="true"`, or per host in
`GIF_MAP` (`{ src, transparent: true }`).

The preview re-binds automatically after every View Transition
(`astro:page-load`), and the GIF is preloaded on `mouseenter` so it appears
instantly.

### How it works

- `src/scripts/gif-hover.js` — floating `<img>`, cursor tracking, viewport
  clamping, and a `hostname → GIF` map for markdown links.
- `src/styles/gif-hover.css` — opacity + scale transition (0.25s), with a
  `prefers-reduced-motion` fallback.
- `public/gifs/` — the sample GIFs (`cv.gif`, `demo.gif`).

To map more domains, edit `GIF_MAP` at the top of `gif-hover.js`.
