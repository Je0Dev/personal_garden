import type { FilterType } from '../lib/useSearchState';
import { ui, type Locale } from '../i18n/ui';

interface SearchTypeFilterProps {
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  resultCount: number;
  locale?: Locale;
}

function getT(lang: Locale) {
  return (key: string) => (ui[lang] as Record<string, string>)[key] || (ui.en as Record<string, string>)[key] || key;
}

export default function SearchTypeFilter({
  filterType,
  onFilterChange,
  resultCount,
  locale = 'en',
}: SearchTypeFilterProps) {
  const t = getT(locale);
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('search.all') },
    { key: 'posts', label: t('search.posts') },
    { key: 'tags', label: t('search.tags') },
  ];
  return (
    <div className="px-5 py-2 border-b border-moss/50 flex items-center justify-between">
      <div className="flex items-center gap-1">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
              filterType === f.key
                ? 'bg-olive-light/20 text-olive-light border border-olive-light/30'
                : 'text-earth-muted hover:text-earth-tan border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <span className="text-xs font-mono text-earth-muted/60">
        {resultCount} {resultCount === 1 ? t('search.result') : t('search.resultsPlural')}
      </span>
    </div>
  );
}