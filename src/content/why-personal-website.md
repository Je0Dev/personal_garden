---
title: Why I Keep a Personal Website
date: Mar 8, 2026
excerpt: In an age of social media, owning your own corner of the internet matters more than ever.
tags:
  - Web Development
  - TypeScript
---
I didn't set out to build a personal website. It happened the way most good things happen — gradually, then all at once.

## The Problem with Platforms

Social media platforms are not your home. They are rented rooms where you can hang pictures on the wall, but the landlord can change the locks at any time. Algorithms shift. Accounts get suspended. Platforms die.

Your own website is the one thing on the internet that is truly yours.

## What I've Learned

Keeping a personal website has taught me more about the web than any course or tutorial. Not because the technology is hard, but because it forces you to think about things that platforms abstract away:

- How do I want my words to look?
- How should a reader navigate my thoughts?
- What do I want to be remembered for?

These are design questions, but they're also philosophical ones.

## The Joy of Small Things

My website will never have millions of visitors. It will never trend on any platform. And that is precisely the point.

It exists for the same reason I keep a journal, or take photographs of old buildings, or write code that no one will ever see. Not for the audience. For the practice.

## A Digital Garden

I like the metaphor of a digital garden. Not a blog, not a portfolio — a garden. Some things are fully grown. Others are just seeds. A few are dead and waiting to be composted.

The garden doesn't judge. It just grows.

## Start Small

If you don't have a personal website, start with one page. Write about something you care about. Link to things you find interesting. Let it grow slowly.

The internet needs more small, careful websites. Yours could be one of them.

## The Code Behind This Site

This site is a React + Vite + Tailwind CSS 4 build. A few techniques worth sharing:

- **CSS variable theming** — every color is a CSS custom property, so dark/light mode switches at runtime without recompiling
- **Hash routing** — avoids 404s on static hosting
- **Lazy-loaded routes** — each page is code-split to keep the initial bundle small

The theme toggle is a couple of effects away:

```typescript
const [isDark, setIsDark] = useState(true);

useEffect(() => {
  const stored = localStorage.getItem('theme');
  const dark = stored ? stored === 'dark' : true;
  setIsDark(dark);
  if (!dark) document.documentElement.classList.add('light');
}, []);

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}, [isDark]);
```

Tailwind 4's `@theme` directive wires the tokens through:

```css
@theme {
  --color-deep-olive: var(--clr-deep-olive);
  --color-cream: var(--clr-cream);
  --color-tomato: var(--clr-tomato);
  --color-olive-light: var(--clr-olive-light);
}

:root {
  --clr-deep-olive: #141410;
  --clr-cream: #f0e6d0;
  --clr-tomato: #c45c3e;
  --clr-olive-light: #d4af37;
}

.light {
  --clr-deep-olive: #f5f4ef;
  --clr-cream: #2c2924;
}
```

## Further Reading

- [IndieWeb Carnival](https://indieweb.org/IndieWeb_Carnival) — Monthly blogging event in the IndieWeb community
- [Digital Gardens](https://maggieappleton.com/garden-history) — Maggie Appleton on the history of digital gardens
- [fromjason.xyz](https://www.fromjason.xyz/) — A wonderful digital garden by Jason Velazquez
- [People and Blogs](https://manuelmoreale.com/peopleandblogs) — Interviews with independent bloggers
- [The Forest](https://theforest.link) — A discovery tool for finding interesting blogs

## Related Projects

- [personal_website](https://github.com/Je0Dev/personal_website) — My personal website — TypeScript, minimal and intentional
- [lang_website](https://github.com/Je0Dev/lang_website) — Another iteration on the personal site concept