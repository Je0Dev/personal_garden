import { Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Post } from '@/data/posts';

interface ArticleMetaProps {
  post: Post;
}

export function ArticleMeta({ post }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-earth-muted font-sans mb-6">
      <span className="flex items-center gap-1.5">
        <Calendar className="w-4 h-4" />
        {post.date}
      </span>
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function headingId(children: React.ReactNode): string {
  const text = Array.isArray(children)
    ? children.map((child) => (typeof child === 'string' ? child : '')).join('')
    : String(children ?? '');
  return slugify(text);
}

export function renderContent(content: string): React.ReactNode {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          h1({ children }) {
            return <h1 id={headingId(children)} className="scroll-mt-24">{children}</h1>;
          },
          h2({ children }) {
            return <h2 id={headingId(children)} className="scroll-mt-24">{children}</h2>;
          },
          h3({ children }) {
            return <h3 id={headingId(children)} className="scroll-mt-24">{children}</h3>;
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            if (match) {
              return (
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {codeString}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
