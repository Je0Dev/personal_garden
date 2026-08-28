---
title: Phase 1 — Code Block Enhancements (Test)
description: A test post for the new Expressive Code powered code blocks — copy button, language badge, line numbers, line & word highlighting, and a switchable theme picker.
date: Aug 28, 2026
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

This post is for **testing Phase 1**. Use the new **code-theme picker** in the header
(top-right, `<>` icon) to switch between GitHub Light, Vitesse Dark, Dracula, and
Catppuccin. Each block below has a copy button, a language badge, and line numbers.

## Line highlight `{1-3}`

```ts {1-3}
const greeting = "hello world";
const count = greeting.length;
const upper = greeting.toUpperCase();
console.log(upper, count);
```

## Word highlight `/const`

```ts /const/
const a = 1;
let b = 2;
const c = a + b;
```

## Combined: highlight lines 2-3 and the word `return`

```python {2-3} /return/
def add(x, y):
    total = x + y
    return total
```

## Plain block (still gets copy + badge + line numbers)

```bash
npm run dev -- --port 3001
astro build
```

## Optional path / title

Add `title="path/to/file"` to the fence to show a file path in the header.
The language label is shown automatically on every block.

```ts title="src/components/Header.astro" {1-3}
const BASE = import.meta.env.BASE_URL;
function updateThemeIcon() {}
export default updateThemeIcon;
```

Inline `code` also keeps its styling.
