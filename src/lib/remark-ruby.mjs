import { visit } from 'unist-util-visit';

export function remarkRuby() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name !== 'zh') return;
      const text = node.children[0]?.value || '';
      const pinyinAttr = node.attributes?.pinyin || '';
      const rubyHtml = `<ruby>${text}<rt>${pinyinAttr}</rt></ruby>`;
      node.type = 'html';
      node.value = rubyHtml;
    });
  };
}