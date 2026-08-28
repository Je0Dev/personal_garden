interface Props {
  items: string[];
  onRemove: (i: number) => void;
  onClear: () => void;
}

export default function MiningTray({ items, onRemove, onClear }: Props) {
  if (!items.length) return null;
  const copyAll = () => navigator.clipboard.writeText(items.join('\n')).catch(() => {});
  return (
    <div className="mt-2 rounded border border-moss bg-bg/95 p-2 text-sm">
      <div className="mb-1 flex items-center justify-between text-xs text-earth-tan">
        <span>Mined ({items.length})</span>
        <span className="flex gap-2">
          <button onClick={copyAll} className="underline hover:text-olive-light">Copy all</button>
          <button onClick={onClear} className="underline hover:text-tomato">Clear</button>
        </span>
      </div>
      <ul className="max-h-32 space-y-1 overflow-y-auto pr-1">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2 text-cream">
            <span className="flex-1">{t}</span>
            <button onClick={() => onRemove(i)} aria-label="Remove" className="text-text-muted hover:text-tomato">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
