export default function SearchSkeleton() {
  return (
    <div className="py-2 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="px-5 py-3 flex items-center gap-4">
          <div className="w-4 h-4 bg-moss/50 rounded flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-moss/40 rounded w-3/4" />
            <div className="h-3 bg-moss/30 rounded w-1/2" />
          </div>
          <div className="w-24 h-3 bg-moss/30 rounded flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
