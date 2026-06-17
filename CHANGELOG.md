# Changelog — Session 2026-06-17

> Full chat history summary of all changes, additions, and deletions.

---

## Summary

This session focused on enhancing the **Languages** and **Games** pages of the personal blog. Work included adding upcoming item badges, refactoring large components into modular files, adding old book illustration banners, fixing TypeScript errors, and creating project documentation.

---

## Changes

### Languages Page

#### Added
- **UPCOMING badge** on each item in the "Coming Up Next" section (Languages.tsx:389)
- **German Grammar Reference PDF** added to pdfFiles with `exists: false` — shows "Coming Soon" badge
- **extract_vocab.py** added to languageScripts with `exists: false` — shows "Coming Soon" badge in both scripts list and upcoming section
- **Banner images** added to all 4 Anki decks and all 5 scripts (oldbookillustrations.com)
  - Anki decks: rape-lock, dream-lock, battle-beaux-belles, cave-spleen
  - Scripts: toilet-lock, barge, billet-doux, barons-prayer, rosa-centifolia-caryophyllea
- **`image` field** to `AnkiDeck` interface
- **`image` field** to `LanguageScript` interface
- **Banners in modals:** AnkiDeckModal and ScriptModal now show a decorative banner at the top
- **Script cards** now render banner strip + handle `exists: false` state (Coming Soon badge + dimmed)

#### Removed
- **Language Learning Games PDF** removed from pdfFiles (replaced by German Grammar Reference)

#### Fixed
- **Template literal bug** in `languageScripts.ts:169` — unescaped backtick inside `build_anki_decks.py` codePreview was breaking the JS template literal

### Games Page

#### Added
- **NEW badge** on Translate Mania game card (emerald, top-left)
- **DEVELOPMENT badge** on Translate Mania game card (tomato, top-right)
- **`new` and `status` fields** to the `Game` interface
- **Banner image** behind the Sneak Peek countdown timer (rosa-stylosa-1)

#### Removed
- **Footer** `"✦ Built with React, TypeScript, and a lot of coffee"` deleted from Games page

#### Changed
- **Tags** on game cards now display **without `#` prefix** for better readability

### TypeScript Fixes (36 errors → 0)

#### Root Cause
All extracted components (`src/components/games/*`, `src/components/languages/*`) had **wrong import paths** — used `'../data/...'` but needed `'../../data/...'` (two levels up from component directory to `src/`).

#### Files Fixed (9 files)
| File | Fixed Import |
|------|-------------|
| `GameDetailModal.tsx` | `../../data/games` |
| `GameUpcomingModal.tsx` | `../../data/games` |
| `AnkiDeckModal.tsx` | `../../data/languageResources` |
| `PdfModal.tsx` | `../../data/languageResources` |
| `ResourceCard.tsx` | `../../data/languageResources` |
| `ResourceDetailModal.tsx` | `../../data/languageResources` |
| `ScriptModal.tsx` | `../../data/languageScripts` |
| `UpcomingModal.tsx` | `../../data/languageResources` |
| `VideoModal.tsx` | `../../data/languageResources` |

Fixing these 9 module resolution errors resolved all 27 cascading `implicit 'any'` type errors.

---

## Files Created

| File | Purpose |
|------|---------|
| `REFERENCE.md` | Full file map with line counts and descriptions |
| `DESIGN.md` | Architecture and design system documentation |
| `CHANGELOG.md` | This file — session history |

---

## Files Modified

| File | Changes |
|------|---------|
| `src/data/games.ts` | Added `new`, `status` to Game interface; marked Translate Mania |
| `src/data/languageResources.ts` | Swapped Language Learning Games → German Grammar Reference (PDF); added `image` to AnkiDeck interface + data |
| `src/data/languageScripts.ts` | Added `image` to interface; added extract_vocab.py with `exists: false`; added banner images to all 5 scripts; fixed template literal escape |
| `src/pages/Games.tsx` | Removed footer; removed `#` from tags; added NEW + DEVELOPMENT badges; added Sneak Peek banner |
| `src/pages/Languages.tsx` | Restructured deck/script cards with banner strips; UPCOMING badge on upcoming items; handle `exists: false` for scripts |
| `src/components/games/GameDetailModal.tsx` | Fixed import path |
| `src/components/games/GameUpcomingModal.tsx` | Fixed import path |
| `src/components/languages/AnkiDeckModal.tsx` | Fixed import path; added banner image display |
| `src/components/languages/PdfModal.tsx` | Fixed import path |
| `src/components/languages/ResourceCard.tsx` | Fixed import path |
| `src/components/languages/ResourceDetailModal.tsx` | Fixed import path |
| `src/components/languages/ScriptModal.tsx` | Fixed import path; added banner image; handle `exists: false` (no download button) |
| `src/components/languages/UpcomingModal.tsx` | Fixed import path |
| `src/components/languages/VideoModal.tsx` | Fixed import path |
| `README.md` | Full rewrite with detailed project docs |
