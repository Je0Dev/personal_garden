import { JOURNAL_ENTRIES } from '../../ece_blog/src/data/entries';
import type { Post } from '../src/data/posts';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isoDate(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().split('T')[0];
}

function slugify(id: string): string {
  return id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractHeadings(content: string): { id: string; title: string; level: number }[] {
  const headings: { id: string; title: string; level: number }[] = [];
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

const tagColorMap: Record<string, string> = {
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'Tailwind CSS': '#38bdf8',
  'Vite': '#646cff',
  'C': '#8b7355',
  'Rust': '#dea584',
  'ESP32': '#339933',
  'Embedded': '#6b5540',
  'Java': '#b07219',
  'IoT': '#0ea5e9',
  'CLI': '#6b5b48',
  'Web Development': '#38bdf8',
  'Software': '#6b7b4b',
  'Mobile Development': '#a855f7',
  'Reflections': '#8b6f5c',
  'Learning': '#c4a06e',
};

function getColor(tags: string[]): string {
  for (const tag of tags) {
    if (tagColorMap[tag]) return tagColorMap[tag];
  }
  return '#8b5e3c';
}

function convertEntry(entry: typeof JOURNAL_ENTRIES[0]): Post {
  const tags = [...entry.tech];
  if (entry.category) tags.push(entry.category);

  const content = entry.content;

  return {
    id: entry.id,
    title: entry.title.replace(/^(Project|Note|Essay):\s*/i, ''),
    slug: entry.id,
    excerpt: entry.excerpt,
    content,
    date: formatDate(entry.date),
    rawDate: isoDate(entry.date),
    readTime: `${entry.readingTime} min`,
    tags,
    image: entry.image,
    color: getColor(entry.tech),
    author: {
      name: 'George',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.',
    },
    relatedPosts: [],
    externalLinks: [],
    projectLinks: [],
    giphyEmbeds: [],
    tableOfContents: extractHeadings(content),
  };
}

const converted = JOURNAL_ENTRIES.map(convertEntry);

console.log(`Converted ${converted.length} entries.`);
console.log('');
console.log('Add these imports:');
console.log("import type { Post } from './posts';");
console.log('');
console.log('Then append these to the posts array:');
console.log(JSON.stringify(converted, null, 2));
