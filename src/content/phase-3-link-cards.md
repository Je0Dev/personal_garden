---
title: Phase 3 — Enhanced Link Cards (Test)
description: "A test post for rich link cards. Bare links become inline cards; inline links keep the hover popup. Please review before we proceed."
date: Aug 28, 2026
tags:
  - Testing
  - Dev
illustration: /personal_garden/images/burial-sarah-rawscan.jpg
color: '#8a6d3b'
author:
  name: Geo Mas
  avatar: https://avatars.githubusercontent.com/u/217055154?s=120&v=4
  bio: Electrical and Computer Engineering student. Builder of things.
---

This post is for **testing Phase 3**. A link placed on its own line
should render as a full **rich card** (image + title + description +
domain). A link inside a sentence should keep the **hover popup**.

## Bare link → rich card

Put a URL alone in a paragraph like this:

https://github.com/withastro/astro

The above should appear as a styled card after the build fetches its
Open Graph metadata. If the site blocks fetching, it falls back to the
domain name as the title.

## Inline link → hover popup

Here is an inline reference to the [Astro docs](https://docs.astro.build/)
that should still show a small popup on hover, not a full card.

Another inline example with [Expressive Code](https://expressive-code.com/)
to confirm the hover behavior is unchanged for in-sentence links.

## Rich card with markdown detail

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

If both behaviors look right, Phase 3 is good to go.
