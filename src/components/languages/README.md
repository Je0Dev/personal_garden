# src/components/languages/ — Language Learning Components

- **`VideoModal.tsx`** — Modal for language video guides with YouTube embed and key takeaways sidebar. Triggered from video guide cards.
- **`ResourceCard.tsx`** — Compact resource card with type icon. Used in the resources grid for each language section.
- **`ResourceDetailModal.tsx`** — Full detail modal for resources showing why/best-for/level/price with pros/cons lists.
- **`AnkiDeckModal.tsx`** — Modal for Anki deck details: card count, difficulty, included features, download button.
- **`PdfModal.tsx`** — In-browser PDF viewer with download fallback. Handles resources/language PDFs.
- **`ScriptModal.tsx`** — Code viewer for downloadable Python scripts with syntax highlighting and download button.
- **`UpcomingModal.tsx`** — Preview modal for upcoming releases (decks, PDFs, scripts) with type-specific content.
- **`CountdownTimer.tsx`** — Reusable countdown component with compact/standard modes. Used in upcoming item cards.

Connects to: `src/pages/Languages.tsx` (parent), `src/data/languageResources.ts` (resource/anki/pdf data), `src/data/languageScripts.ts` (script data).
