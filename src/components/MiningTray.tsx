import { ui, type Locale } from '../i18n/ui';

interface Props {
  items: string[];
  onRemove: (i: number) => void;
  onClear: () => void;
  locale?: Locale;
}

function getT(lang: Locale) {
  return (key: string) => (ui[lang] as Record<string, string>)[key] || (ui.en as Record<string, string>)[key] || key;
}

export default function MiningTray({ items, onRemove, onClear, locale = 'en' }: Props) {
  const t = getT(locale);
  if (!items.length) return null;
  const copyAll = () => navigator.clipboard.writeText(items.join('\n')).catch(() => {});
  return (
    <div className="mt-2 rounded border border-moss bg-bg/95 p-2 text-sm">
      <div className="mb-1 flex items-center justify-between text-xs text-earth-tan">
        <span>{t('player.mined')} ({items.length})</span>
        <span className="flex gap-2">
          <button onClick={copyAll} className="underline hover:text-olive-light">{t('player.copyAll')}</button>
          <button onClick={onClear} className="underline hover:text-tomato">{t('player.clear')}</button>
        </span>
      </div>
      <ul className="max-h-32 space-y-1 overflow-y-auto pr-1">
        {items.map((t2, i) => (
          <li key={i} className="flex items-start gap-2 text-cream">
            <span className="flex-1">{t2}</span>
            <button onClick={() => onRemove(i)} aria-label={t('player.remove')} className="text-text-muted hover:text-tomato">×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}