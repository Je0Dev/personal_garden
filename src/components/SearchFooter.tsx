interface SearchFooterProps {
  resultCount?: number;
}

export default function SearchFooter({ resultCount }: SearchFooterProps) {
  return (
    <div className="px-5 py-3 border-t border-moss bg-deep-olive/50 flex items-center justify-between text-xs text-earth-muted font-mono">
      <span className="flex items-center gap-3">
        <span>↑↓ navigate</span>
        <span>↵ open</span>
        <span>esc close</span>
      </span>
      <span className="flex items-center gap-3">
        {resultCount !== undefined && resultCount > 0 && (
          <span className="text-earth-muted/60">{resultCount} results</span>
        )}
        <span className="text-earth-muted/60">regex + fuzzy</span>
      </span>
    </div>
  );
}
