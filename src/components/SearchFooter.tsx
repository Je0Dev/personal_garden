import { ui, type Locale } from '../i18n/ui';

interface SearchFooterProps {
  resultCount?: number;
  locale?: Locale;
}

function getT(lang: Locale) {
  return (key: string) => (ui[lang] as Record<string, string>)[key] || (ui.en as Record<string, string>)[key] || key;
}

export default function SearchFooter({ resultCount, locale = 'en' }: SearchFooterProps) {
  const t = getT(locale);
  return (
    <div className="px-5 py-3 border-t border-moss bg-deep-olive/50 flex items-center justify-between text-xs text-earth-muted font-mono">
      <span className="flex items-center gap-3">
        <span>{t('search.navigate')}</span>
        <span>{t('search.open')}</span>
        <span>{t('search.close')}</span>
      </span>
      <span className="flex items-center gap-3">
        {resultCount !== undefined && resultCount > 0 && (
          <span className="text-earth-muted/60">{resultCount} {t('search.results')}</span>
        )}
        <span className="text-earth-muted/60">{t('search.regexFuzzy')}</span>
      </span>
    </div>
  );
}