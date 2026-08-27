import { unified, type Processor } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

let processor: Processor | null = null;

function getProcessor() {
  if (!processor) {
    processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify) as unknown as Processor;
  }
  return processor;
}

export function renderInlineMarkdown(text: string): string {
  try {
    const result = getProcessor().processSync(text);
    const html = String(result);
    return html.replace(/^<p>/, '').replace(/<\/p>$/, '');
  } catch {
    return text;
  }
}
