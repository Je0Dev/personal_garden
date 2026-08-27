const STORAGE_KEY = 'search-history';
const MAX_ITEMS = 10;

export function getSearchHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSearchQuery(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;
  const history = getSearchHistory().filter(q => q !== query);
  history.unshift(query.trim());
  if (history.length > MAX_ITEMS) history.pop();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {}
}

export function removeSearchQuery(query: string): void {
  if (typeof window === 'undefined') return;
  const history = getSearchHistory().filter(q => q !== query);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {}
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
