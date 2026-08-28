import { visit } from 'unist-util-visit';

function resolveDefinition(attrs) {
  if (!attrs) return '';
  const explicit = attrs.def || attrs.definition || attrs.term;
  if (explicit) return String(explicit);

  const valued = Object.values(attrs).filter((v) => typeof v === 'string' && v);
  if (valued.length) return valued.join(' ');

  const keys = Object.keys(attrs).filter((k) => k !== 'class');
  return keys.join(' ');
}

function isDirective(node) {
  return (
    node.type === 'textDirective' ||
    node.type === 'leafDirective' ||
    node.type === 'containerDirective'
  );
}

export function remarkTooltip() {
  return (tree) => {
    visit(tree, (node) => {
      if (!isDirective(node) || node.name !== 'tip') return;
      const attrs = node.attributes || {};
      node.data = node.data || {};
      node.data.hName = 'span';
      node.data.hProperties = {
        className: ['glossary-tip'],
        'data-tooltip': resolveDefinition(attrs),
        tabIndex: 0,
      };
    });

    visit(tree, (node) => {
      if (node.name !== 'pdf') return;
      if (node.type !== 'leafDirective' && node.type !== 'containerDirective') return;
      const attrs = node.attributes || {};
      const src = (node.children?.[0]?.value || node.children?.[0]?.children?.[0]?.value || attrs.src || '').trim();
      const height = attrs.height || '500px';
      node.data = {
        hName: 'div',
        hProperties: { className: ['pdf-embed'] },
        hChildren: [
          {
            type: 'element',
            tagName: 'iframe',
            properties: {
              src,
              className: ['pdf-embed-frame'],
              style: `height:${height}`,
              loading: 'lazy',
              title: attrs.title || 'PDF preview',
            },
            children: [],
          },
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['pdf-embed-actions'] },
            children: [
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: src,
                  target: '_blank',
                  rel: 'noopener',
                  className: ['pdf-embed-link'],
                },
                children: [{ type: 'text', value: 'Open in new tab ↗' }],
              },
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: src,
                  download: true,
                  rel: 'noopener',
                  className: ['pdf-embed-download'],
                },
                children: [{ type: 'text', value: 'Download ↧' }],
              },
            ],
          },
        ],
      };
    });
  };
}
