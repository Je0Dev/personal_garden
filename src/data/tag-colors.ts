const tagColorMap: Record<string, string> = {
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'Tailwind CSS': '#38bdf8',
  'Vite': '#646cff',
  'C': '#8b7355',
  'CLI': '#6b5b48',
  'State Management': '#a855f7',
  'Data Structures': '#f59e0b',
  'CRUD': '#10b981',
  'ESP32': '#339933',
  'Embedded': '#6b5540',
  'IoT': '#0ea5e9',
  'Java': '#b07219',
  'API Design': '#f29111',
  'Data Modeling': '#8b5cf6',
  'Rust': '#dea584',
  'Systems Programming': '#ff6b35',
  'Learning': '#c4a06e',
  'Craftsmanship': '#c45c3e',
  'Software Engineering': '#6b7b4b',
  'Philosophy': '#8b6f5c',
  'IndieWeb': '#c4a06e',
  'Personal Website': '#8b9b6b',
  'Digital Garden': '#5d6b4f',
  'Hardware': '#6b5540',
  'Unix': '#4eaa25',
  'Software Design': '#c4915a',
};

const fallbackColors = [
  '#c45c3e', '#8b9b6b', '#c4a06e', '#6b7b4b',
  '#b85c38', '#c4915a', '#5d6b4f', '#8b6f5c',
  '#6b5344', '#d4785f', '#8b7355', '#6b5b48',
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
