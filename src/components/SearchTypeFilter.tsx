import type { FilterType } from '../lib/useSearchState';

interface SearchTypeFilterProps {
  filterType: FilterType;
  onFilterChange: (type: FilterType) => void;
  resultCount: number;
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'posts', label: 'Posts' },
  { key: 'tags', label: 'Tags' },
];

export default function SearchTypeFilter({
  filterType,
  onFilterChange,
  resultCount,
}: SearchTypeFilterProps) {
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
        {resultCount} {resultCount === 1 ? 'result' : 'results'}
      </span>
    </div>
  );
}
