import { ui, defaultLocale, type Locale } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLocale;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof typeof ui[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key];
  };
}

export function useTranslatedPath(lang: Locale) {
  return function path(p: string) {
    return `/${lang}/${p}`;
  };
}