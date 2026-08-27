const tagColorMap: Record<string, string> = {
  'TypeScript': '#3178c6',
  'Anki': '#4eaa25',
  'Web Development': '#61dafb',
  'Language Learning': '#a855f7',
};

const fallbackColors = [
  '#d4af37', '#c45c3e', '#e0c878', '#c9786a',
  '#8a7f68', '#a8861f', '#d4785f', '#b8912c',
];

const colorIndex = new Map<string, string>();
let nextFallback = 0;

export function getTagColor(tag: string): string {
  if (tagColorMap[tag]) return tagColorMap[tag];
  if (colorIndex.has(tag)) return colorIndex.get(tag)!;
  const color = fallbackColors[nextFallback % fallbackColors.length];
  nextFallback++;
  colorIndex.set(tag, color);
  return color;
}

export const tagColors = { getTagColor, tagColorMap, fallbackColors };