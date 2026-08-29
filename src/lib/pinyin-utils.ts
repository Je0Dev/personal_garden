import { pinyin } from 'pinyin-pro';

export function generatePinyin(text: string): string {
  return pinyin(text, { toneType: 'symbol', type: 'string' });
}

export function generateRubyHtml(text: string, pinyinText?: string): string {
  const ruby = pinyinText || generatePinyin(text);
  return `<ruby>${text}<rt>${ruby}</rt></ruby>`;
}