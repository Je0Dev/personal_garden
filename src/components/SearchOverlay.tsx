import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import SearchFooter from './SearchFooter';
import SearchSuggestions from './SearchSuggestions';
import SearchTypeFilter from './SearchTypeFilter';
import SearchSkeleton from './SearchSkeleton';
import { useSearchState } from '../lib/useSearchState';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
}

const POPULAR_TAGS = ['TypeScript', 'Web Development', 'Language Learning', 'Anki'];

export default function SearchOverlay({ isOpen, onClose, baseUrl }: SearchOverlayProps) {
  const [error, setError] = useState(false);
  const state = useSearchState(baseUrl);
  const {
    query, setQuery, selectedIndex, setSelectedIndex,
    setSearchIndex, setIsLoading, inputRef, listRef,
    results, recentSearches, removeRecent, clearHistory,
    filterType, setFilterType, resultCount, isLoading,
  } = state;

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen, inputRef]);

  useEffect(() => {
    if (isOpen) {
      setError(false);
      setIsLoading(true);
      fetch(`${baseUrl}search-index.json`)
        .then(r => r.json())
        .then(data => { setSearchIndex(data); setIsLoading(false); })
        .catch(() => { setError(true); setIsLoading(false); });
    }
  }, [isOpen, setSearchIndex, setIsLoading, baseUrl]);

  const handleSelect = (url: string) => {
    window.location.href = url;
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-deep-olive/98 backdrop-blur-md flex items-start justify-center pt-[12vh]"
      onClick={() => { onClose(); setQuery(''); }}
    >
      <div
        className="w-full max-w-3xl mx-4 bg-deep-forest border border-moss overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <SearchInput query={query} onQueryChange={setQuery} resultCount={resultCount}
          isLoading={isLoading} inputRef={inputRef}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, results.length - 1)); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
            else if (e.key === 'Enter') { e.preventDefault(); if (results[selectedIndex]) handleSelect(results[selectedIndex].path); }
          }}
        />
        <div ref={listRef} className="max-h-[400px] overflow-y-auto">
          {error ? (
            <div className="px-5 py-12 text-center">
              <p className="text-tomato font-sans text-sm mb-2">Search unavailable — try refreshing.</p>
            </div>
          ) : isLoading ? (
            <SearchSkeleton />
          ) : query.trim() === '' ? (
            <SearchSuggestions
              recentSearches={recentSearches}
              onRecentClick={setQuery}
              onDeleteRecent={removeRecent}
              popularTags={POPULAR_TAGS}
              onTagClick={setQuery}
            />
          ) : results.length > 0 ? (
            <>
              <SearchTypeFilter
                filterType={filterType}
                onFilterChange={setFilterType}
                resultCount={resultCount}
              />
              <SearchResults
                results={results}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
                onHover={setSelectedIndex}
                query={query}
              />
            </>
          ) : (
            <SearchResults
              results={[]}
              selectedIndex={-1}
              onSelect={handleSelect}
              onHover={setSelectedIndex}
              query={query}
            />
          )}
        </div>

        <SearchFooter resultCount={resultCount} />
      </div>
    </div>
  );
}
