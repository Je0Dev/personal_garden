const tagColorMap: Record<string, string> = {
  'TypeScript': '#3178c6',
  'Rust': '#dea584',
  'C': '#8b7355',
  'ESP32': '#339933',
  'Java': '#b07219',
  'Anki': '#4eaa25',
  'API Design': '#f29111',
  'CLI': '#d4af37',
  'Embedded': '#c45c3e',
  'Systems Programming': '#ff6b35',
  'Web Development': '#61dafb',
  'Craftsmanship': '#c45c3e',
  'Software Engineering': '#d4af37',
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