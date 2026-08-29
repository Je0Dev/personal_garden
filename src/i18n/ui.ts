import { en } from './en';
import { de } from './de';
import { zh } from './zh';

export const ui = { en, de, zh } as const;

export type Locale = keyof typeof ui;
export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'de', 'zh'];