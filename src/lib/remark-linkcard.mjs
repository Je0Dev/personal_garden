import { visit } from 'unist-util-visit';

function isDirective(node) {
  return (
    node.type === 'textDirective' ||
    node.type === 'leafDirective' ||
    node.type === 'containerDirective'
  );
}

export function remarkLinkcard() {
  return (tree) => {
    visit(tree, (node) => {
      if (!isDirective(node) || node.name !== 'linkcard') return;
      if (node.type !== 'containerDirective') return;
      const attrs = node.attributes || {};
      const url = attrs.url || attrs.href || '';
      node.data = {
        hName: 'div',
        hProperties: {
          className: ['og-card-wrap', 'linkcard'],
          'data-url': url,
        },
      };
    });
  };
}
