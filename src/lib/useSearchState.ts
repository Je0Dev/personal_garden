import { useState, useEffect, useRef, useMemo } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useRecentSearches } from '../hooks/useRecentSearches';
import { createPostFuse, createTagFuse, type SearchIndexItem } from './fuseConfig';
import { rankResults, rankTags } from './searchRanking';

export type FilterType = 'all' | 'posts' | 'tags';

export interface SearchResult {
  type: 'post' | 'tag';
  title: string;
  path: string;
  snippet?: string;
}

export function useSearchState(baseUrl: string = '/personal_garden/') {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 150);
  const { recentSearches, addRecent, removeRecent, clearAll } = useRecentSearches();

  useEffect(() => { setSelectedIndex(0); }, [debouncedQuery]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[selectedIndex] as HTMLElement;
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (debouncedQuery.trim()) addRecent(debouncedQuery);
  }, [debouncedQuery, addRecent]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q || searchIndex.length === 0) return [];

    const postFuse = createPostFuse(searchIndex);
    const allTags = [...new Set(searchIndex.flatMap(p => p.tags))];
    const tagFuse = createTagFuse(allTags);

    let postMatches: SearchResult[] = [];
    if (filterType === 'all' || filterType === 'posts') {
      let regex: RegExp | null = null;
      try { regex = new RegExp(debouncedQuery, 'i'); } catch { regex = null; }

      const fuseResults = postFuse.search(q);
      const fuseMap = new Map(fuseResults.map(r => [r.item.id, (1 - (r.score ?? 0)) * 50]));

      const ranked = regex
        ? searchIndex.filter(p => regex!.test(`${p.title} ${p.description} ${p.tags.join(' ')} ${p.body || ''}`))
            .map(p => ({ item: p, score: 100, type: 'post' as const }))
        : rankResults(q, searchIndex, fuseMap);

      postMatches = ranked.map(r => ({
        type: 'post' as const,
        title: r.item.title,
        path: `${baseUrl}blog/${r.item.id}/`,
        snippet: r.item.description,
      }));
    }

    let tagMatches: SearchResult[] = [];
    if (filterType === 'all' || filterType === 'tags') {
      const fuseTagResults = tagFuse.search(q);
      const fuseTagSet = new Set(fuseTagResults.map(r => r.item.name));
      const ranked = rankTags(q, allTags, fuseTagSet);
      tagMatches = ranked.map(r => ({
        type: 'tag' as const,
        title: r.matchedTag ?? r.item.title,
        path: `${baseUrl}blog/tag/${encodeURIComponent(r.matchedTag ?? r.item.title)}/`,
      }));
    }

    return [...postMatches, ...tagMatches];
  }, [debouncedQuery, searchIndex, baseUrl, filterType]);

  return {
    query, setQuery,
    selectedIndex, setSelectedIndex,
    searchIndex, setSearchIndex,
    isLoading, setIsLoading,
    inputRef, listRef,
    results,
    recentSearches, removeRecent, clearHistory: clearAll,
    filterType, setFilterType,
    resultCount: results.length,
  };
}
