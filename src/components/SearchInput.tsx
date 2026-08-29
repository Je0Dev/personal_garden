import { Search, X } from 'lucide-react';
import { ui, type Locale } from '../i18n/ui';

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  resultCount?: number;
  isLoading?: boolean;
  locale?: Locale;
}

function getT(lang: Locale) {
  return (key: string) => (ui[lang] as Record<string, string>)[key] || (ui.en as Record<string, string>)[key] || key;
}

export default function SearchInput({
  query,
  onQueryChange,
  onKeyDown,
  inputRef,
  resultCount,
  isLoading,
  locale = 'en',
}: SearchInputProps) {
  const t = getT(locale);
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-moss">
      <Search className="w-5 h-5 text-olive-light flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={t('search.placeholder')}
        className="flex-1 bg-transparent text-cream placeholder:text-earth-muted font-serif text-lg focus:outline-none"
      />
      {isLoading && (
        <span className="text-xs font-mono text-earth-muted/60 animate-pulse">{t('search.loading')}</span>
      )}
      {!isLoading && query && resultCount !== undefined && (
        <span className="text-xs font-mono text-earth-muted/60">
          {resultCount}
        </span>
      )}
      {query && (
        <button
          onClick={() => onQueryChange('')}
          className="p-1 text-earth-muted hover:text-tomato transition-colors"
          aria-label={t('search.clear')}
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <kbd className="px-2 py-1 bg-deep-olive border border-moss text-xs text-earth-muted font-mono">ESC</kbd>
    </div>
  );
}