import { visit } from 'unist-util-visit';
import { fetchOg, safeUrl } from './rehype-og-preview.mjs';

function hasClass(node, cls) {
  const c = node.properties?.className;
  return Array.isArray(c) && c.includes(cls);
}

function cardChildren(u, data) {
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
    children: [{ type: 'text', value: data.title || (u ? u.hostname : 'Link') }],
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
    children: [{ type: 'text', value: u ? u.hostname : '' }],
  });
  return kids;
}

function buildCard(u, data, rawUrl) {
  const href = u ? u.href : rawUrl || '#';
  const cls = ['og-card-link'];
  if (!u) cls.push('og-card-link--invalid');
  return {
    type: 'element', tagName: 'a',
    properties: {
      href,
      className: cls,
      'data-og-title': data.title || (u ? u.hostname : 'Link'),
      ...(data.description ? { 'data-og-description': data.description } : {}),
      ...(data.image ? { 'data-og-image': data.image } : {}),
    },
    children: cardChildren(u, data),
  };
}

export function rehypeLinkcard() {
  return async (tree) => {
    const tasks = [];
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'div' || !hasClass(node, 'linkcard')) return;
      const rawUrl = node.properties?.['data-url'];
      const u = typeof rawUrl === 'string' ? safeUrl(rawUrl) : null;
      tasks.push(async () => {
        const data = u
          ? await fetchOg(u)
          : { title: rawUrl || 'Link', description: '', image: '' };
        const card = buildCard(u, data, rawUrl);
        const detail = {
          type: 'element', tagName: 'div',
          properties: { className: ['linkcard-detail'], hidden: true },
          children: node.children || [],
        };
        node.children = [card, detail];
      });
    });
    await Promise.all(tasks.map((t) => t()));
  };
}
