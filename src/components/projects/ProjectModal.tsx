import { useEffect, useState } from 'react';
import { X, Github, ExternalLink, CheckCircle2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function linkify(text: string): React.ReactNode {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-tomato hover:underline underline-offset-2">{part}</a>;
    }
    return part;
  });
}

function CodeBlock({ code, language, title }: { code: string; language: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-4 py-2 bg-deep-forest border-t border-x border-moss rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-tomato" />
          <span className="w-3 h-3 rounded-full bg-amber" />
          <span className="w-3 h-3 rounded-full bg-olive-light" />
          <span className="ml-3 text-xs text-earth-muted font-mono">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-earth-muted truncate max-w-[200px]">{title}</span>
          <button onClick={handleCopy} className="p-1 text-earth-muted hover:text-cream transition-colors">
            {copied ? <Check className="w-4 h-4 text-olive-light" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="bg-deep-olive border border-moss rounded-b-lg overflow-x-auto">
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          PreTag="div"
          customStyle={{ margin: 0, borderRadius: 0, background: 'transparent', padding: '1rem' }}
          codeTagProps={{ style: { fontFamily: 'inherit', fontSize: '0.85rem' } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function RichContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="font-serif text-xl font-bold text-cream mt-8 mb-4">{line.slice(3)}</h2>);
      i++;
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="font-sans text-lg font-semibold text-cream mt-6 mb-3">{line.slice(4)}</h3>);
      i++;
    } else if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
      if (match) {
        elements.push(
          <p key={i} className="text-earth-tan font-sans text-sm mb-2 ml-4">
            <span className="text-cream font-semibold">{match[1]}</span>: {linkify(match[2])}
          </p>
        );
      }
      i++;
    } else if (line.startsWith('- ') && !line.startsWith('- **')) {
      elements.push(<li key={i} className="text-earth-tan font-sans text-sm mb-1 ml-4">{linkify(line.slice(2))}</li>);
      i++;
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
      i++;
    } else {
      elements.push(<p key={i} className="text-earth-tan font-sans text-sm leading-relaxed mb-3">{linkify(line)}</p>);
      i++;
    }
  }

  return <>{elements}</>;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-bg/98 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-3xl bg-surface border border-border rounded-lg shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream mb-2">{project.title}</h2>
                  <p className="text-earth-muted font-sans text-sm md:text-base">{project.description}</p>
                </div>
                <button onClick={onClose} className="p-2 text-earth-muted hover:text-cream transition-colors rounded hover:bg-surface-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">#{tag}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-surface-2 border border-border rounded text-sm text-earth-tan font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-olive/20 border border-olive-light/30 rounded-lg text-olive-light hover:bg-olive/30 transition-colors font-sans text-sm"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-6 md:p-8">
              {project.content && (
                <div className="prose max-w-none mb-8">
                  <RichContent content={project.content} />
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-8 p-4 bg-surface-2 border border-border rounded-lg">
                  <h3 className="font-sans text-sm font-semibold text-earth-muted uppercase tracking-wider mb-3">Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-earth-tan font-sans text-sm">
                        <CheckCircle2 className="w-4 h-4 text-olive-light mt-0.5 flex-shrink-0" />
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.codeSnippets && project.codeSnippets.length > 0 && (
                <div>
                  <h3 className="font-sans text-sm font-semibold text-earth-muted uppercase tracking-wider mb-4">Code Examples</h3>
                  {project.codeSnippets.map((snippet, i) => (
                    <CodeBlock key={i} code={snippet.code} language={snippet.language} title={snippet.title} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
