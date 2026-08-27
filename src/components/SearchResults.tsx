import { FileText, Hash, ArrowRight } from 'lucide-react';

interface SearchResult {
  type: 'post' | 'tag';
  title: string;
  path: string;
  snippet?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  onSelect: (path: string) => void;
  onHover: (index: number) => void;
  query: string;
}

function highlightMatches(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  try {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="search-highlight-match">{part}</mark>
      ) : (
        part
      )
    );
  } catch {
    return text;
  }
}

function formatPath(path: string): string {
  const clean = path.replace(/^\/personal_garden\/?/, '/');
  if (clean.startsWith('/blog/')) return clean.replace('/blog/', '').replace(/\/$/, '') || '/';
  if (clean.startsWith('/tags/')) return '#' + decodeURIComponent(clean.replace('/tags/', ''));
  return clean;
}

export default function SearchResults({
  results,
  selectedIndex,
  onSelect,
  onHover,
  query,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="px-5 py-12 text-center">
        <p className="text-earth-muted font-sans text-sm">No results found</p>
      </div>
    );
  }

  return (
    <div className="py-1">
      {results.map((result, index) => (
        <div
          key={`${result.type}-${result.title}`}
          onClick={() => onSelect(result.path)}
          onMouseEnter={() => onHover(index)}
          className={`px-5 py-3 cursor-pointer transition-all duration-200 flex items-center gap-4 ${
            selectedIndex === index ? 'bg-deep-sage translate-x-2' : ''
          }`}
        >
          <div className="flex-shrink-0">
            {result.type === 'post' ? (
              <FileText className={`w-4 h-4 transition-colors ${selectedIndex === index ? 'text-tomato' : 'text-earth-muted'}`} />
            ) : (
              <Hash className={`w-4 h-4 transition-colors ${selectedIndex === index ? 'text-olive-light' : 'text-earth-muted'}`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-serif text-base truncate transition-colors ${selectedIndex === index ? 'text-cream' : 'text-earth-tan'}`}>
              {highlightMatches(result.title, query)}
            </p>
            {result.type === 'post' && result.snippet && (
              <p className="text-earth-muted font-sans text-xs mt-0.5 truncate">
                {highlightMatches(result.snippet, query)}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 min-w-0">
            <span className={`font-mono text-xs ${selectedIndex === index ? 'text-earth-tan' : 'text-earth-muted/60'}`}>
              {formatPath(result.path)}
            </span>
            {selectedIndex === index && (
              <ArrowRight className="w-4 h-4 text-olive-light flex-shrink-0" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
