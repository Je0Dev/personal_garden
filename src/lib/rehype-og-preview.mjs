import { visit } from 'unist-util-visit';

const cache = new Map();
const PRIVATE = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.|::1)/;
const OG_PROPS = {
  title: ['og:title', 'twitter:title'],
  description: ['og:description', 'twitter:description', 'description'],
  image: ['og:image', 'og:image:url', 'twitter:image', 'twitter:image:src'],
};

function pickMeta(html, names) {
  for (const name of names) {
    const patterns = [
      new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${name}["']`, 'i'),
      new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'),
    ];
    for (const re of patterns) {
      const m = html.match(re);
      if (m && m[1]) return decodeEntities(m[1].trim());
    }
  }
  return '';
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export function safeUrl(raw) {
  try {
    const u = new URL(raw);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    if (PRIVATE.test(u.hostname)) return null;
    return u;
  } catch {
    return null;
  }
}

export async function fetchOg(u) {
  if (cache.has(u.href)) return cache.get(u.href);
  const result = { title: u.hostname, description: '', image: '' };
  try {
    const res = await fetch(u.href, {
      headers: { 'user-agent': 'CosmosLinkPreview/1.0' },
      signal: AbortSignal.timeout(5000),
    });
    const html = await res.text();
    result.title = pickMeta(html, OG_PROPS.title) || u.hostname;
    result.description = pickMeta(html, OG_PROPS.description);
    const img = pickMeta(html, OG_PROPS.image);
    result.image = img ? new URL(img, u.href).href : '';
  } catch {
    /* keep hostname fallback */
  }
  cache.set(u.href, result);
  return result;
}

function isBareLink(node, parent) {
  if (!parent || parent.type !== 'element' || parent.tagName !== 'p') return false;
  const meaningful = parent.children.filter(
    (c) => !(c.type === 'text' && !c.value.trim())
  );
  return meaningful.length === 1 && meaningful[0] === node;
}

function renderBareCard(node, parent, u, data) {
  const cls = Array.isArray(node.properties.className) ? node.properties.className : [];
  node.properties.className = [...cls, 'og-card-link'];
  const kids = [];
  if (data.image) {
    kids.push({
      type: 'element', tagName: 'img',
      properties: { src: data.image, alt: '', loading: 'lazy', className: ['og-card-img'] },
    });
  }
  kids.push({
    type: 'element', tagName: 'span',
    properties: { className: ['og-card-title'] },
    children: [{ type: 'text', value: data.title || u.hostname }],
  });
  if (data.description) {
    kids.push({
      type: 'element', tagName: 'span',
      properties: { className: ['og-card-desc'] },
      children: [{ type: 'text', value: data.description }],
    });
  }
  kids.push({
    type: 'element', tagName: 'span',
    properties: { className: ['og-card-domain'] },
    children: [{ type: 'text', value: u.hostname }],
  });
  node.children = kids;
  parent.tagName = 'div';
  parent.properties = parent.properties || {};
  const pcls = Array.isArray(parent.properties.className) ? parent.properties.className : [];
  parent.properties.className = [...pcls, 'og-card-wrap'];
}

export function rehypeOgPreview() {
  return async (tree) => {
    const tasks = [];
    visit(tree, 'element', (node, _i, parent) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string' || !/^https?:\/\//.test(href)) return;
      if (node.properties['data-og-title']) return;
      const u = safeUrl(href);
      if (!u) return;
      const bare = isBareLink(node, parent);
      tasks.push(async () => {
        const data = await fetchOg(u);
        node.properties = node.properties || {};
        node.properties['data-og-title'] = data.title;
        if (data.description) node.properties['data-og-description'] = data.description;
        if (data.image) node.properties['data-og-image'] = data.image;
        if (bare) renderBareCard(node, parent, u, data);
      });
    });
    await Promise.all(tasks.map((t) => t()));
  };
}
