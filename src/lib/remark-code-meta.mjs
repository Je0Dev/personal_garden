import { visit } from 'unist-util-visit';

export function remarkCodeMeta() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (!node.meta) return;
      node.data = {
        ...(node.data || {}),
        hProperties: {
          ...(node.data?.hProperties || {}),
          metastring: node.meta,
        },
      };
    });
  };
}
