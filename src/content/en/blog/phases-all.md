---
title: "All Development Phases"
description: "Complete record of all development phases of the Cosmos digital garden"
date: Aug 29, 2026
tags:
  - Testing
  - Dev
illustration: /personal_garden/images/burial-sarah-rawscan.jpg
color: '#6b7b4b'
author:
  name: Geo Mas
  avatar: https://avatars.githubusercontent.com/u/217055154?s=120&v=4
  bio: Electrical and Computer Engineering student. Builder of things.
---

## Phase 1 — Code Block Enhancements

Each block has a copy button, a language badge, and line numbers.

### Line highlight `{1-3}`

```ts {1-3}
const greeting = "hello world";
const count = greeting.length;
const upper = greeting.toUpperCase();
console.log(upper, count);
```

### Word highlight `/const`

```ts /const/
const a = 1;
let b = 2;
const c = a + b;
```

### Combined: highlight lines 2-3 and the word `return`

```python {2-3} /return/
def add(x, y):
    total = x + y
    return total
```

### Plain block (still gets copy + badge + line numbers)

```bash
npm run dev -- --port 3001
astro build
```

### Optional path / title

Add `title="path/to/file"` to the fence to show a file path in the header.
The language label is shown automatically on every block.

```ts title="src/components/Header.astro" {1-3}
const BASE = import.meta.env.BASE_URL;
function updateThemeIcon() {}
export default updateThemeIcon;
```

Inline `code` also keeps its styling.

---

## Phase 2 — Emoji Shortcodes

Type a shortcode like `:rocket:` and it renders as an emoji automatically :rocket:. Try a few below.

### Built-in shortcodes

- Celebrate :tada: ship it :rocket: and review :eyes:
- Plants :seedling: :herb: :sunflower: :evergreen_tree:
- Weather :sunny: :cloud: :rainbow: :zap:
- Writing :memo: :books: :bulb: :star:

Inline sentence with emojis :wave: hope this works :crossed_fingers:!

### Emoticons

Old-school emoticons are also supported — `:)` `:(` `;)` `:P` `:D`
become :smile: :slightly_frowning_face: :wink: :stuck_out_tongue: :grin:.

### Accessibility

With accessible mode on, each emoji is wrapped in
`<span role="img" aria-label="rocket emoji">` so screen readers
announce the name. Inspect the :rocket: above to confirm.

### Custom emoji via directive

The existing `::directive{}` pattern still works alongside shortcodes.
For example a tip directive :tip[hover me]{def="Custom emoji shortcodes render via remark-emoji, while this tooltip is a remark-directive."} stays interactive, while
`:rocket:` stays a plain emoji — no conflict because emoji runs first.

---

## Phase 3 — Enhanced Link Cards

A link placed on its own line should render as a full **rich card** (image + title + description + domain). A link inside a sentence should keep the **hover popup**.

### Bare link → rich card

Put a URL alone in a paragraph like this:

https://github.com/withastro/astro

The above should appear as a styled card after the build fetches its
Open Graph metadata. If the site blocks fetching, it falls back to the
domain name as the title.

### Inline link → hover popup

Here is an inline reference to the [Astro docs](https://docs.astro.build/)
that should still show a small popup on hover, not a full card.

Another inline example with [Expressive Code](https://expressive-code.com/)
to confirm the hover behavior is unchanged for in-sentence links.

### Rich card with markdown detail

Use the `:::linkcard` directive to attach rich markdown content that
opens in a modal when the card is clicked:

:::linkcard{url="https://github.com/withastro/astro"}
This is **markdown detail content** rendered inside the modal window,
just like a normal post. It supports:

- Lists and `inline code`
- Math: $E = mc^2$
- Code blocks and even :rocket: emoji

> Click the card above to open the detailed view.
:::

A bare link (no detail) should still open a modal showing the fetched
OG info plus a *Visit site* button.

---

## Phase 4 — Media Embedding

YouTube/bare-link auto-embed, Bilibili, self-hosted video, ambient player, and subtitle mining with live transcript.

---

## Phase 5 — i18n & Pinyin Ruby

The entire UI now supports three languages:

- **English** (EN) — default locale
- **German** (DE) — full translation
- **Chinese** (ZH) — full translation with pinyin ruby support

### URL Structure

All pages now use locale-prefixed URLs:

- `/personal_garden/en/` — English home
- `/personal_garden/de/` — German home
- `/personal_garden/zh/` — Chinese home

### Pinyin Ruby

The `:zh[...]{pinyin="..."}` syntax renders Chinese characters with pinyin annotations above them using HTML `<ruby>` elements.

### Language Switcher

A language switcher component has been added to the header, allowing users to toggle between EN, DE, and ZH.

### Tag Translations

Tags are automatically translated based on the current locale. For example, "development" becomes "Entwicklung" in German and "开发" in Chinese.


