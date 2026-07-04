# public/anki/ — Downloadable Anki Decks

- **`Spanish core 1k vocab deck.apkg`** — 1000 most frequent Spanish words with example sentences, native audio, and images. Available for download from the Languages page.
- **`radicals.apkg`** — All 214 Kangxi radicals with meanings, examples, and stroke order. Chinese character foundation deck.
- **`class_notes.apkg`** — Personal Chinese class notes: vocabulary, grammar points, and example sentences from tutoring sessions. ~150 cards.

Connects to: `src/data/languageResources.ts` (deck metadata and `exists` flags), `src/components/languages/AnkiDeckModal.tsx` (download UI).
