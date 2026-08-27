import { Clock, Hash, X } from 'lucide-react';

interface SearchSuggestionsProps {
  recentSearches: string[];
  onRecentClick: (query: string) => void;
  onDeleteRecent: (query: string) => void;
  popularTags: string[];
  onTagClick: (tag: string) => void;
}

export default function SearchSuggestions({
  recentSearches,
  onRecentClick,
  onDeleteRecent,
  popularTags,
  onTagClick,
}: SearchSuggestionsProps) {
  return (
    <div className="px-5 py-6 space-y-6">
      {recentSearches.length > 0 && (
        <div>
          <h3 className="text-xs font-mono text-earth-muted/60 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="w-3 h-3" /> Recent
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map(q => (
              <span
                key={q}
                className="group flex items-center gap-1.5 px-3 py-1.5 bg-deep-sage border border-moss text-earth-tan text-sm font-sans
                  rounded hover:bg-moss hover:text-cream transition-colors"
              >
                <button onClick={() => onRecentClick(q)}>{q}</button>
                <button
                  onClick={e => { e.stopPropagation(); onDeleteRecent(q); }}
                  className="ml-0.5 text-earth-muted/50 hover:text-tomato transition-colors"
                  aria-label={`Remove ${q}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {popularTags.length > 0 && (
        <div>
          <h3 className="text-xs font-mono text-earth-muted/60 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Hash className="w-3 h-3" /> Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="px-3 py-1.5 bg-transparent border border-moss/50 text-earth-muted text-sm font-mono
                  rounded hover:border-olive-light hover:text-olive-light transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-earth-muted/50 font-mono text-xs">
        Regex supported — try <span className="text-olive-light">cli.*</span> or <span className="text-olive-light">^rust</span>
      </p>
    </div>
  );
}
