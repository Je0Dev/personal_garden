---
title: Phase 2 — Emoji Shortcodes (Test)
description: "A test post for emoji shortcodes via remark-emoji — type :rocket: and get 🚀, with accessible markup for screen readers."
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

This post is for **testing Phase 2**. Type a shortcode like `:rocket:`
and it renders as an emoji automatically :rocket:. Try a few below.

## Built-in shortcodes

- Celebrate :tada: ship it :rocket: and review :eyes:
- Plants :seedling: :herb: :sunflower: :evergreen_tree:
- Weather :sunny: :cloud: :rainbow: :zap:
- Writing :memo: :books: :bulb: :star:

Inline sentence with emojis :wave: hope this works :crossed_fingers:!

## Emoticons

Old-school emoticons are also supported — `:)` `:(` `;)` `:P` `:D`
become :smile: :slightly_frowning_face: :wink: :stuck_out_tongue: :grin:.

## Accessibility

With accessible mode on, each emoji is wrapped in
`<span role="img" aria-label="rocket emoji">` so screen readers
announce the name. Inspect the :rocket: above to confirm.

## Custom emoji via directive

The existing `::directive{}` pattern still works alongside shortcodes.
For example a tip directive :tip[hover me]{def="Custom emoji shortcodes render via remark-emoji, while this tooltip is a remark-directive."} stays interactive, while
`:rocket:` stays a plain emoji — no conflict because emoji runs first.

If you see emojis rendering and the tip tooltip still works, Phase 2
is good to go. Then we can proceed to Phase 3.
