import { useState, useCallback, useEffect } from 'react';
import {
  getSearchHistory,
  saveSearchQuery,
  removeSearchQuery,
  clearSearchHistory,
} from '../lib/searchHistory';

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(getSearchHistory());
  }, []);

  const addRecent = useCallback((query: string) => {
    saveSearchQuery(query);
    setRecentSearches(getSearchHistory());
  }, []);

  const removeRecent = useCallback((query: string) => {
    removeSearchQuery(query);
    setRecentSearches(getSearchHistory());
  }, []);

  const clearAll = useCallback(() => {
    clearSearchHistory();
    setRecentSearches([]);
  }, []);

  return { recentSearches, addRecent, removeRecent, clearAll };
}
