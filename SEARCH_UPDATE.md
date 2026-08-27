# Search Overhaul Plan

## Current State

Hand-rolled client-side search with regex-first matching, no highlighting, no history, no ranking, no fuzzy matching. Unused `.search-highlight` CSS classes exist but are not wired up.

---

## Phase 1: New Utility Files

| File | Purpose | Est. Lines |
|------|---------|------------|
| `src/lib/searchHistory.ts` | `localStorage` get/save/clear for recent queries (max 10) | ~30 |
| `src/lib/searchRanking.ts` | Score results: title > tag > description > body with multipliers | ~45 |
| `src/lib/fuseConfig.ts` | Fuse.js instance and configuration | ~25 |
| `src/hooks/useDebounce.ts` | Generic debounce hook (150ms default) | ~15 |
| `src/hooks/useRecentSearches.ts` | Hook wrapping `searchHistory` with React state | ~25 |

## Phase 2: Install Fuse.js

```bash
npm install fuse.js
```

## Phase 3: Refactor Core Search Logic

**`src/lib/useSearchState.ts`** — Rewrite to:
- Use Fuse.js for fuzzy matching with regex passthrough for `/pattern/` queries
- Import `searchRanking` for scored, ordered results
- Import `searchHistory` for recent queries
- Use `useDebounce` on the query (150ms)
- Export `recentSearches`, `clearHistory`, `resultCount`, `isLoading`

Split into max 120 lines. Extract Fuse config to `src/lib/fuseConfig.ts` if needed.

## Phase 4: New Components

| File | Purpose | Est. Lines |
|------|---------|------------|
| `src/components/SearchSuggestions.tsx` | Recent queries + tag suggestions when input is empty or short | ~55 |
| `src/components/SearchTypeFilter.tsx` | Pill buttons: All / Posts / Tags to filter results | ~40 |
| `src/components/SearchSkeleton.tsx` | Loading skeleton shown while index fetches | ~30 |

## Phase 5: Update Existing Components

**`SearchOverlay.tsx`** — Major rewrite:
- Add debounce integration
- Show `SearchSkeleton` while loading
- Show `SearchSuggestions` when query is empty (instead of static text)
- Add `SearchTypeFilter` above results
- Add result count display
- Animate results container with CSS transitions
- Keep under 120 lines

**`SearchInput.tsx`** — Minor update:
- Add result count badge next to the input
- Show "Loading..." state while index fetches

**`SearchResults.tsx`** — Updates:
- Accept and render highlighted matches using `.search-highlight-match` class
- Show result count in the header area

**`SearchFooter.tsx`** — Minor update:
- Show result count
- Update hints if new shortcuts added

## Phase 6: Match Highlighting

- In `SearchResults.tsx`, implement a `highlightMatches(text, query)` helper
- Wrap matched substrings in `<mark className="search-highlight-match">`
- Apply to both title and snippet text

## Phase 7: CSS Polish

**`src/styles/utilities.css`** — Add:
- `.search-skeleton` shimmer/pulse animation
- `.search-fade-in` transition class for results
- Refine existing `.search-highlight-match` if needed

---

## File Change Summary

| Action | Files |
|--------|-------|
| **Create** | `searchHistory.ts`, `searchRanking.ts`, `fuseConfig.ts`, `useDebounce.ts`, `useRecentSearches.ts`, `SearchSuggestions.tsx`, `SearchTypeFilter.tsx`, `SearchSkeleton.tsx` |
| **Modify** | `useSearchState.ts`, `SearchOverlay.tsx`, `SearchInput.tsx`, `SearchResults.tsx`, `SearchFooter.tsx`, `utilities.css` |
| **Install** | `fuse.js` |

All files kept under 100-120 lines per AGENTS.md.
