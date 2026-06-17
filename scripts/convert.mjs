import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function extractHeadings(content) {
  const headings = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ id, title, level });
  }
  return headings;
}

const tagColorMap = {
  'React': '#61dafb', 'TypeScript': '#3178c6', 'Tailwind CSS': '#38bdf8',
  'Vite': '#646cff', 'C': '#8b7355', 'Rust': '#dea584',
  'ESP32': '#339933', 'Embedded': '#6b5540', 'Java': '#b07219',
  'IoT': '#0ea5e9', 'CLI': '#6b5b48', 'Web Development': '#38bdf8',
  'Software': '#6b7b4b', 'Mobile Development': '#a855f7',
  'Reflections': '#8b6f5c', 'Learning': '#c4a06e',
};

function getColor(tags) {
  for (const tag of tags) {
    if (tagColorMap[tag]) return tagColorMap[tag];
  }
  return '#8b5e3c';
}

const entriesPath = join(__dirname, '..', '..', 'ece_blog', 'src', 'data', 'entries.ts');
const entriesContent = readFileSync(entriesPath, 'utf-8');
const entriesMatch = entriesContent.match(/export const JOURNAL_ENTRIES\s*=\s*(\[[\s\S]*?\]);/);
if (!entriesMatch) {
  console.error('Could not parse JOURNAL_ENTRIES');
  process.exit(1);
}

const entries = eval(entriesMatch[1]);
const converted = entries.map(e => ({
  id: e.id,
  title: e.title.replace(/^(Project|Note|Essay):\s*/i, ''),
  slug: e.id,
  excerpt: e.excerpt,
  content: e.content,
  date: formatDate(e.date),
  readTime: `${e.readingTime} min`,
  tags: [...e.tech, e.category].filter(Boolean),
  image: e.image,
  color: getColor(e.tech),
  author: { name: 'George', avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4', bio: 'Electrical and Computer Engineering student. Builder of things.' },
  relatedPosts: [],
  externalLinks: [],
  projectLinks: [],
  giphyEmbeds: [],
  tableOfContents: extractHeadings(e.content),
}));

console.log(JSON.stringify(converted, null, 2));
