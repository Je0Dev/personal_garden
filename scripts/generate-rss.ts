import fs from 'fs';
import path from 'path';
import { posts } from '../src/data/posts';

const generateRSS = () => {
  const siteUrl = 'https://je0dev.github.io/personal_garden';
  
  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      ${post.tags ? post.tags.map(t => `<category><![CDATA[${t}]]></category>`).join('') : ''}
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>George's Blog</title>
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
