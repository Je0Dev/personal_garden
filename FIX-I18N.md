# FIX-I18N: Internationalization Routing & Translation Fixes

## Date: 2026-08-29

## Symptoms

1. `/en/` always returns 404, root `/` redirects to `/en/` then 404s
2. `/de/` and `/zh/` load (200) but show English UI text, English posts, English home content
3. Language switcher (EN/DE/ZH buttons) doesn't change any visible text or content
4. Blog post pages for non-English locales show English chrome (header, footer, etc.)

---

## Root Cause 1: `prefixDefaultLocale: false` conflicts with `[lang]` dynamic route

### File: `astro.config.mjs` (line 30)

### Current Configuration

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'de', 'zh'],
  prefixDefaultLocale: false,  // <-- BUG
},
```

### What Happens

With `prefixDefaultLocale: false`, Astro's built-in i18n middleware treats the default locale (`en`) as the "no prefix" locale. When a request hits `/en/`, the middleware intercepts it and attempts to strip the locale prefix, effectively redirecting to `/`.

The redirect chain becomes:

```
GET /personal_garden/
  → index.astro redirects to /personal_garden/en/  (302)
  → i18n middleware strips /en/ prefix, redirects to /personal_garden/  (302)
  → index.astro redirects to /personal_garden/en/  (302)
  → ... (or browser/astro gives up and returns 404)
```

Evidence from dev server logs:

```
23:28:21 [302] / 5ms
23:28:21 [404] /en/ 11ms
```

Non-default locales (`/de/`, `/zh/`) are unaffected because the middleware only strips the prefix for the default locale.

### Fix

Change `prefixDefaultLocale` to `true`:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'de', 'zh'],
  prefixDefaultLocale: true,  // <-- FIX
},
```

This makes `/en/` a valid, non-redirected route. All three locales (`/en/`, `/de/`, `/zh/`) are now consistent with the `[lang]` dynamic route which generates paths for all locales via `getStaticPaths()`.

### Why This Is Safe

- `src/pages/index.astro` already redirects to `${import.meta.env.BASE_URL}en/` which will now resolve correctly
- The `[lang]` dynamic route already generates all three locale paths
- No hardcoded `/en/` paths exist in navigation or routing logic

---

## Root Cause 2: `getLangFromUrl()` ignores the `base` path

### File: `src/i18n/utils.ts` (lines 3-7)

### Current Implementation

```ts
export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLocale;
}
```

### What Happens

The function splits `url.pathname` by `/` and takes the second element (index 1) as the locale. With `base: '/personal_garden/'`, the URL pathname is `/personal_garden/de/`. The split produces:

```
['', 'personal_garden', 'de', '']
 0       1                2    3
         ^--- extracted as lang
```

`'personal_garden'` is not a valid locale key (not in `ui`), so the function falls back to `defaultLocale` (`'en'`). This happens for **every locale**, on **every page** that calls `getLangFromUrl()`.

### Affected Components (Pattern A: Direct `getLangFromUrl()` callers)

| File | Line | Impact |
|------|------|--------|
| `src/layouts/BaseLayout.astro` | 22 | `<html lang>` set to `en`, skip-to-content text English |
| `src/components/Header.astro` | 8 | Nav links point to `/en/`, button labels English |
| `src/components/Footer.astro` | 4 | Copyright text English |
| `src/components/MobileMenu.astro` | 4 | Nav links point to `/en/`, labels English |
| `src/components/LanguageSwitcher.astro` | 10 | `lang` always `en`, active highlight wrong, path replacement fails |
| `src/pages/[lang]/index.astro` | 14 | All `t()` calls return English, posts filtered by `en/`, home content English |
| `src/pages/[lang]/about.astro` | 13 | All `t()` calls return English, article count filtered by `en/`, about content English |
| `src/pages/[lang]/blog/index.astro` | 14 | All `t()` calls return English, posts filtered by `en/`, blog intro English |
| `src/pages/[lang]/blog/tag/[tag].astro` | 25 | All `t()` calls return English, posts filtered by `en/` |
| `src/pages/[lang]/blog/[...slug].astro` | 4 | Imports `getLangFromUrl` but **never calls it** (unused import) |

### Affected Components (Pattern B: Receive `locale` as prop from Pattern A parents)

These components don't call `getLangFromUrl` themselves but receive `locale` from a parent that does:

| File | Receives locale from | Impact |
|------|---------------------|--------|
| `src/components/BackToTop.astro` | `BaseLayout.astro` | Button label English |
| `src/components/KeyboardShortcuts.astro` | `BaseLayout.astro` | Title English |
| `src/components/Lightbox.astro` | `BaseLayout.astro` | Hint text English |
| `src/components/CommandPalette.tsx` | `Header.astro` | Passes wrong locale to SearchOverlay |
| `src/components/SearchOverlay.tsx` | `CommandPalette.tsx` | Search UI text English |
| `src/layouts/BlogPostLayout.astro` | `[...slug].astro` (from props) | Breadcrumb, share buttons, nav all English |
| `src/components/ShareButtons.astro` | `BlogPostLayout.astro` | Button labels English |
| `src/components/ArticleNav.astro` | `BlogPostLayout.astro` | Previous/Next labels English |
| `src/components/TableOfContents.astro` | `BlogPostLayout.astro` | Title English |
| `src/components/RelatedPosts.astro` | `BlogPostLayout.astro` | Title English |
| `src/components/PostDownloads.astro` | `BlogPostLayout.astro` | Title English |
| `src/components/PostCard.astro` | Various pages | Date formatted correctly (uses locale prop directly), but link points to correct locale |

### Specific Breakdown of LanguageSwitcher Failure

`src/components/LanguageSwitcher.astro` (line 26):

```ts
const currentPath = Astro.url.pathname;
// On German page: currentPath = '/personal_garden/de/'
// lang = 'en' (always, due to getLangFromUrl bug)

const path = currentPath.replace(`/${lang}/`, `/${locale}/`);
// For EN: currentPath.replace('/en/', '/en/') → '/personal_garden/de/' (no match, no change)
// For DE: currentPath.replace('/en/', '/de/') → '/personal_garden/de/' (no match, no change)
// For ZH: currentPath.replace('/en/', '/zh/') → '/personal_garden/de/' (no match, no change)
```

The replacement never matches because `lang` is always `'en'` but the actual URL contains `/de/` or `/zh/`. Clicking any language button navigates to the same URL.

### Fix

Replace the function body to iterate all path segments:

```ts
export function getLangFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  for (const segment of segments) {
    if (segment in ui) return segment as Locale;
  }
  return defaultLocale;
}
```

For URL `/personal_garden/de/`:
- `split('/').filter(Boolean)` → `['personal_garden', 'de']`
- `'personal_garden' in ui` → `false`, continue
- `'de' in ui` → `true`, return `'de'`

For URL `/personal_garden/en/`:
- `split('/').filter(Boolean)` → `['personal_garden', 'en']`
- `'personal_garden' in ui` → `false`, continue
- `'en' in ui` → `true`, return `'en'`

### After Fix: LanguageSwitcher Path Replacement

With `lang` correctly set to `'de'` on German pages:

```ts
const currentPath = Astro.url.pathname;
// On German page: currentPath = '/personal_garden/de/'
// lang = 'de' (correct)

const path = currentPath.replace(`/${lang}/`, `/${locale}/`);
// For EN: '/personal_garden/de/'.replace('/de/', '/en/') → '/personal_garden/en/' ✓
// For DE: '/personal_garden/de/'.replace('/de/', '/de/') → '/personal_garden/de/' ✓
// For ZH: '/personal_garden/de/'.replace('/de/', '/zh/') → '/personal_garden/zh/' ✓
```

---

## Content Filtering Impact

All `[lang]` pages filter content using the locale from `getLangFromUrl()`:

### Home page (`src/pages/[lang]/index.astro:17-19`)

```ts
const posts = (await getCollection('blog'))
  .filter(p => !p.data.draft && p.id.startsWith(`${lang}/`))
```

When `lang` is always `'en'`, visiting `/de/` shows English posts because `p.id.startsWith('en/')` matches only English content.

### Home page content (`src/pages/[lang]/index.astro:31`)

```ts
const homeEntry = (await getCollection('pages'))
  .find(e => e.id === `${lang}/pages/home-page`);
```

When `lang` is always `'en'`, visiting `/de/` loads `en/pages/home-page.md` (English) instead of `de/pages/home-page.md` (German).

### About page (`src/pages/[lang]/about.astro:17`)

```ts
const totalArticles = allPosts
  .filter(p => p.id.startsWith(`${lang}/`)).length;
```

When `lang` is always `'en'`, the article count shows the total English articles regardless of which locale page is being viewed.

### Blog listing (`src/pages/[lang]/blog/index.astro:18`)

```ts
const posts = allPosts
  .filter(p => !p.data.draft && p.id.startsWith(`${lang}/`))
```

Same issue — shows English posts on all locale pages.

---

## Blog Post Route 404s (Expected Behavior)

Posts like `/de/blog/phase-6-gif-hover/` returning 404 are **not bugs**. The `[...slug].astro` `getStaticPaths()` generates routes from all blog posts:

```ts
return posts.map(post => {
  const [lang, , ...slugParts] = post.id.split('/');
  return { params: { lang, slug: slugParts.join('/') } };
});
```

A post only gets a route for the locales it exists in. `phase-6-gif-hover.md` only exists in `en/blog/`, so only `/en/blog/phase-6-gif-hover/` has a route. The 404 for `/de/blog/phase-6-gif-hover/` is correct.

Available translated posts:
- `en/blog/` — 8 posts
- `de/blog/` — 1 post (`phase-5-i18n.md`)
- `zh/blog/` — 1 post (`phase-5-i18n.md`)

---

## Files Changed

### 1. `astro.config.mjs` (line 30)

```diff
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'zh'],
-   prefixDefaultLocale: false,
+   prefixDefaultLocale: true,
  },
```

### 2. `src/i18n/utils.ts` (lines 3-7)

```diff
  export function getLangFromUrl(url: URL): Locale {
-   const [, lang] = url.pathname.split('/');
-   if (lang in ui) return lang as Locale;
+   const segments = url.pathname.split('/').filter(Boolean);
+   for (const segment of segments) {
+     if (segment in ui) return segment as Locale;
+   }
    return defaultLocale;
  }
```

---

## Files NOT Changed (and Why)

| File | Reason |
|------|--------|
| `src/pages/index.astro` | Redirect to `${import.meta.env.BASE_URL}en/` is already correct |
| `src/components/LanguageSwitcher.astro` | Path replacement logic is correct once `lang` is fixed |
| `src/components/MobileMenu.astro` | Uses `${lang}` in nav links — correct once `getLangFromUrl` is fixed |
| `src/components/Header.astro` | Uses `${lang}` in nav links — correct once `getLangFromUrl` is fixed |
| All Pattern B components | Receive `locale` as prop from Pattern A parents — automatically fixed |
| `[...slug].astro` | Gets `lang` from `getStaticPaths` props, not `getLangFromUrl` — was never broken |
| `src/i18n/en.ts`, `de.ts`, `zh.ts` | Translation dictionaries are complete |
| `src/i18n/tags.ts` | Tag translations are complete |
| `src/content.config.ts` | Content collection config is correct |

---

## Verification Checklist

After applying fixes, verify:

- [ ] `/personal_garden/` redirects to `/personal_garden/en/` (302 → 200)
- [ ] `/personal_garden/en/` loads with English UI and English posts
- [ ] `/personal_garden/de/` loads with German UI text and German-filtered posts
- [ ] `/personal_garden/zh/` loads with Chinese UI text and Chinese-filtered posts
- [ ] Language switcher highlights the active locale correctly
- [ ] Clicking DE on `/en/` navigates to `/de/` with German content
- [ ] Clicking ZH on `/de/` navigates to `/zh/` with Chinese content
- [ ] Clicking EN on `/zh/` navigates to `/en/` with English content
- [ ] Mobile menu nav links point to correct locale
- [ ] Blog listing shows only posts for current locale
- [ ] Blog post pages load for translated posts (`de/blog/phase-5-i18n/`, `zh/blog/phase-5-i18n/`)
- [ ] Blog post pages 404 for untranslated posts (`de/blog/phase-6-gif-hover/` → 404, expected)
- [ ] About page shows correct article count for current locale
- [ ] Header, footer, search, keyboard shortcuts show translated text
