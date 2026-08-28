import { segment, convert } from 'pinyin-pro';

export type Lang = 'zh' | 'eu';

export interface Token {
  word: string;
  py: string;
  level: 1 | 2 | 3;
}

export function detectLang(text: string): Lang {
  return /[一-龥]/.test(text) ? 'zh' : 'eu';
}

export function toTraditional(text: string): string {
  return convert(text, { to: 'trad' });
}

export function tokenize(text: string): Token[] {
  if (detectLang(text) === 'zh') {
    const segs = segment(text, { json: true }) as { origin: string; result: string }[];
    return segs
      .map((s) => {
        const word = s.origin.trim();
        if (!word) return null;
        const level = (word.length >= 3 ? 3 : word.length === 2 ? 2 : 1) as 1 | 2 | 3;
        return { word, py: s.result, level };
      })
      .filter((t): t is Token => t !== null);
  }
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((chunk) => {
      const letters = chunk.replace(/[^\p{L}\p{N}]/gu, '').length;
      const level = (letters >= 7 ? 3 : letters >= 4 ? 2 : 1) as 1 | 2 | 3;
      return { word: chunk, py: '', level };
    });
}
