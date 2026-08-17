import fs from 'fs';
import path from 'path';

interface RssPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

function parseFrontMatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  const fmText = match ? match[1] : '';
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

  return fields;
}

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDateToUTC(dateStr: string): Date {
  const match = dateStr.match(/(\w{3}) (\d{1,2}), (\d{4})/);
  if (match) {
    return new Date(Date.UTC(Number(match[3]), MONTHS[match[1]], Number(match[2])));
  }
  return new Date(dateStr);
}

const generateRSS = () => {
  const siteUrl = 'https://je0dev.github.io/personal_garden';
  const contentDir = path.join(process.cwd(), 'src', 'content');

  const posts: RssPost[] = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const fields = parseFrontMatter(raw);
      return {
        slug: path.basename(file, '.md'),
        title: fields.title ?? '',
        date: fields.date ?? '',
        excerpt: fields.excerpt ?? '',
        tags: (fields.tags ?? '').split(',').filter((t) => t.length > 0),
      };
    })
    .sort((a, b) => parseDateToUTC(b.date).getTime() - parseDateToUTC(a.date).getTime());

  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${parseDateToUTC(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      ${post.tags ? post.tags.map(t => `<category><![CDATA[${t}]]></category>`).join('') : ''}
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>George's Garden</title>
    <link>${siteUrl}</link>
    <description>A personal blog about engineering, technology, and learning.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssFeed);
  console.log('RSS feed generated successfully at public/rss.xml');
};

generateRSS();