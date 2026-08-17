import { BASE_URL } from './config';
import buildingThingsThatLast from '../content/building-things-that-last.md?raw';
import whyPersonalWebsite from '../content/why-personal-website.md?raw';
import notesOnLearningRust from '../content/notes-on-learning-rust.md?raw';
import esp32PhysicalComputing from '../content/esp32-physical-computing.md?raw';
import cliRenaissance from '../content/cli-renaissance.md?raw';
import imdbCloneLearning from '../content/imdb-clone-learning.md?raw';
import languageLearningSystem from '../content/language-learning-system.md?raw';

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
}

export interface PostDownload {
  name: string;
  file: string;
  description: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  rawDate?: string;
  tags: string[];
  image: string;
  color: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  relatedPosts: RelatedPost[];
  downloads?: PostDownload[];
  tableOfContents: { id: string; title: string; level: number }[];
}

interface PostFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

function parseFrontMatter(raw: string): PostFrontMatter {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  const fmText = match ? match[1] : '';
  const body = match ? match[2] : raw;
  const fields: Record<string, string> = {};
  const lines = fmText.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const colon = line.indexOf(':');
    if (colon > 0) {
      const key = line.slice(0, colon).trim();
      let value = line.slice(colon + 1).trim();
      if (value === '' && lines[i + 1] && /^\s*-/.test(lines[i + 1])) {
        const list: string[] = [];
        i++;
        while (i < lines.length && /^\s*-\s*/.test(lines[i])) {
          list.push(lines[i].replace(/^\s*-\s*/, '').trim());
          i++;
        }
        fields[key] = list.join(',');
        continue;
      }
      fields[key] = value.replace(/^["']|["']$/g, '');
    }
    i++;
  }

  return {
    title: fields.title ?? '',
    date: fields.date ?? '',
    excerpt: fields.excerpt ?? '',
    tags: (fields.tags ?? '').split(',').filter((t) => t.length > 0),
    content: body.replace(/^\n+/, '').trim(),
  };
}

const author = {
  name: 'Geo Mas',
  avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
  bio: 'Electrical and Computer Engineering student. Builder of things.'
};

export const posts: Post[] = [
  {
    id: '1',
    slug: 'building-things-that-last',
    image: `${BASE_URL}images/perseus-gorgons.jpg`,
    color: '#8b5e3c',
    author,
    relatedPosts: [
      { id: '2', title: 'Why I Keep a Personal Website', slug: 'why-personal-website' },
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
    ],
    tableOfContents: [
      { id: 'the-myth-of-the-quick-fix', title: 'The Myth of the Quick Fix', level: 2 },
      { id: 'craftsmanship-as-resistance', title: 'Craftsmanship as Resistance', level: 2 },
      { id: 'the-long-game', title: 'The Long Game', level: 2 },
      { id: 'what-endures', title: 'What Endures', level: 2 },
      { id: 'further-reading', title: 'Further Reading', level: 2 },
      { id: 'related-projects', title: 'Related Projects', level: 2 },
    ],
    ...parseFrontMatter(buildingThingsThatLast),
  },
  {
    id: '2',
    slug: 'why-personal-website',
    image: `${BASE_URL}images/fights-cymochles.jpg`,
    color: '#6b8b5e',
    author,
    relatedPosts: [
      { id: '1', title: 'The Quiet Art of Building Things That Last', slug: 'building-things-that-last' },
      { id: '4', title: 'ESP32 and the Joy of Physical Computing', slug: 'esp32-physical-computing' },
    ],
    tableOfContents: [
      { id: 'the-problem-with-platforms', title: 'The Problem with Platforms', level: 2 },
      { id: 'what-ive-learned', title: 'What I\'ve Learned', level: 2 },
      { id: 'the-joy-of-small-things', title: 'The Joy of Small Things', level: 2 },
      { id: 'a-digital-garden', title: 'A Digital Garden', level: 2 },
      { id: 'start-small', title: 'Start Small', level: 2 },
      { id: 'the-code-behind-this-site', title: 'The Code Behind This Site', level: 2 },
      { id: 'further-reading', title: 'Further Reading', level: 2 },
      { id: 'related-projects', title: 'Related Projects', level: 2 },
    ],
    ...parseFrontMatter(whyPersonalWebsite),
  },
  {
    id: '3',
    slug: 'notes-on-learning-rust',
    image: `${BASE_URL}images/atin-cymochles.jpg`,
    color: '#dea584',
    author,
    relatedPosts: [
      { id: '1', title: 'The Quiet Art of Building Things That Last', slug: 'building-things-that-last' },
      { id: '4', title: 'ESP32 and the Joy of Physical Computing', slug: 'esp32-physical-computing' },
    ],
    tableOfContents: [
      { id: 'the-first-week', title: 'The First Week', level: 2 },
      { id: 'the-borrow-checker', title: 'The Borrow Checker', level: 2 },
      { id: 'what-javascript-got-wrong', title: 'What JavaScript Got Wrong', level: 2 },
      { id: 'practical-rust', title: 'Practical Rust', level: 2 },
      { id: 'the-verdict', title: 'The Verdict', level: 2 },
      { id: 'further-reading', title: 'Further Reading', level: 2 },
      { id: 'related-projects', title: 'Related Projects', level: 2 },
    ],
    ...parseFrontMatter(notesOnLearningRust),
  },
  {
    id: '4',
    slug: 'esp32-physical-computing',
    image: `${BASE_URL}images/reached-city.jpg`,
    color: '#339933',
    author,
    relatedPosts: [
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
      { id: '5', title: 'The CLI Renaissance', slug: 'cli-renaissance' },
    ],
    downloads: [
      {
        name: 'esp32-timer-sensor.ino',
        file: 'esp32-timer-sensor.ino',
        description: 'Example Arduino sketch — hardware timer sensor with WiFi transmission, ready to flash in the Arduino IDE'
      },
    ],
    tableOfContents: [
      { id: 'the-esp32', title: 'The ESP32', level: 2 },
      { id: 'my-first-project', title: 'My First Project', level: 2 },
      { id: 'what-hardware-teaches-you', title: 'What Hardware Teaches You', level: 2 },
      { id: 'the-sensor-project', title: 'The Sensor Project', level: 2 },
      { id: 'why-it-matters', title: 'Why It Matters', level: 2 },
      { id: 'the-sensor-code', title: 'The Sensor Code', level: 2 },
      { id: 'further-reading', title: 'Further Reading', level: 2 },
      { id: 'related-projects', title: 'Related Projects', level: 2 },
    ],
    ...parseFrontMatter(esp32PhysicalComputing),
  },
  {
    id: '5',
    slug: 'cli-renaissance',
    image: `${BASE_URL}images/rape-lock.jpg`,
    color: '#6b5540',
    author,
    relatedPosts: [
      { id: '4', title: 'ESP32 and the Joy of Physical Computing', slug: 'esp32-physical-computing' },
      { id: '1', title: 'The Quiet Art of Building Things That Last', slug: 'building-things-that-last' },
    ],
    downloads: [
      {
        name: 'install-cli-projects.sh',
        file: 'install-cli-projects.sh',
        description: 'Install script — clones and builds all three CLI projects locally (Linux/macOS)'
      },
    ],
    tableOfContents: [
      { id: 'the-projects', title: 'The Projects', level: 2 },
      { id: 'cli-atm-system', title: 'CLI ATM System', level: 3 },
      { id: 'cli-student-database', title: 'CLI Student Database', level: 3 },
      { id: 'cli-task-manager', title: 'CLI Task Manager', level: 3 },
      { id: 'why-cli-matters', title: 'Why CLI Matters', level: 2 },
      { id: 'the-unix-philosophy', title: 'The Unix Philosophy', level: 2 },
      { id: 'what-i-learned', title: 'What I Learned', level: 2 },
      { id: 'the-future', title: 'The Future', level: 2 },
      { id: 'further-reading', title: 'Further Reading', level: 2 },
      { id: 'related-projects', title: 'Related Projects', level: 2 },
    ],
    ...parseFrontMatter(cliRenaissance),
  },
  {
    id: '6',
    slug: 'imdb-clone-learning',
    image: `${BASE_URL}images/cave-spleen.jpg`,
    color: '#3b82f6',
    author,
    relatedPosts: [
      { id: '5', title: 'The CLI Renaissance', slug: 'cli-renaissance' },
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
    ],
    tableOfContents: [
      { id: 'the-imdb-clone', title: 'The IMDB Clone', level: 2 },
      { id: 'what-i-learned', title: 'What I Learned', level: 2 },
      { id: 'copying-is-learning', title: 'Copying Is Learning', level: 2 },
      { id: 'the-code', title: 'The Code', level: 2 },
      { id: 'whats-next', title: 'What\'s Next', level: 2 },
      { id: 'further-reading', title: 'Further Reading', level: 2 },
      { id: 'related-projects', title: 'Related Projects', level: 2 },
    ],
    ...parseFrontMatter(imdbCloneLearning),
  },
  {
    id: '7',
    slug: 'language-learning-system',
    image: `${BASE_URL}images/dream-lock.jpg`,
    color: '#6b7b4b',
    author,
    relatedPosts: [
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
      { id: '2', title: 'Why I Keep a Personal Website', slug: 'why-personal-website' },
    ],
    tableOfContents: [
      { id: 'the-philosophy', title: 'The Philosophy', level: 2 },
      { id: 'tools-i-use', title: 'Tools I Use', level: 2 },
      { id: 'my-weekly-routine', title: 'My Weekly Routine', level: 2 },
      { id: 'tracking-progress', title: 'Tracking Progress', level: 2 },
      { id: 'what-works-best', title: 'What Works Best', level: 2 },
      { id: 'further-reading', title: 'Further Reading', level: 2 },
      { id: 'related-projects', title: 'Related Projects', level: 2 },
    ],
    ...parseFrontMatter(languageLearningSystem),
  },
];

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): Post[] => {
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getRelatedPosts = (currentSlug: string): Post[] => {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return posts.filter(post => 
    post.slug !== currentSlug &&
    post.tags.some(tag => currentPost.tags.includes(tag))
  ).slice(0, 3);
};