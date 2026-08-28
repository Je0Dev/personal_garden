# Improvements Plan — Personal Garden

## Phase 5 — i18n + Pinyin Ruby
- `astro.config.mjs`: `i18n` (locales `en`/`de`/`zh`, `prefixDefaultLocale: false`, fallback `en`).
- `src/i18n/ui.ts` (EN/DE/ZH strings), `src/i18n/utils.ts` (`getLangFromUrl`, `useTranslations`, `useTranslatedPath`).
- `content.config.ts`: glob `*/*.md`, add `lang` field; split `src/content/blog/{en,de,zh}/`.
- Routes: `src/pages/[lang]/index.astro`, `about.astro`, `blog/[...slug].astro`.
- `pinyin-pro` + `src/lib/pinyin-utils.ts` for build-time `<ruby>` generation.
- `src/lib/remark-ruby.mjs`: `:zh[你好]{pinyin="nǐ hǎo"}` → `<ruby>`.
- `src/components/PinyinToggle.tsx`: React island toggling `rt` visibility (localStorage).
- `BlogPostLayout.astro`: locale-aware `Intl.DateTimeFormat`.

---

## Note
All source files must stay 100–120 lines
per `AGENTS.md` — split large modules.
