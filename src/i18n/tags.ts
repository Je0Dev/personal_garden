// Tag name translations for multiple locales.
import type { Locale } from './ui';

export const tagTranslations: Record<string, { en: string; de: string; zh: string }> = {
  'programming': { en: 'programming', de: 'Programmierung', zh: '编程' },
  'language-learning': { en: 'language-learning', de: 'Sprachenlernen', zh: '语言学习' },
  'hardware': { en: 'hardware', de: 'Hardware', zh: '硬件' },
  'tips': { en: 'tips', de: 'Tipps', zh: '技巧' },
  'resources': { en: 'resources', de: 'Ressourcen', zh: '资源' },
  'tools': { en: 'tools', de: 'Werkzeuge', zh: '工具' }
};

export function getTranslatedTag(tag: string, lang: Locale): string {
  return tagTranslations[tag]?.[lang] || tag;
}