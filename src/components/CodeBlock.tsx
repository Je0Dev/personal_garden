import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = ({ code, language = 'text', filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const languageColors: Record<string, string> = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    react: '#61dafb',
    python: '#3776ab',
    rust: '#dea584',
    go: '#00add8',
    c: '#8b7355',
    java: '#b07219',
    html: '#e34c26',
    css: '#264de4',
    sql: '#f29111',
    bash: '#4eaa25',
  };

  const dotColor = languageColors[language.toLowerCase()] || '#c4a06e';

  return (
    <div className="relative group my-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-deep-olive border border-moss border-b-0 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dotColor }} />
          </div>
          <span className="text-xs font-mono text-earth-muted uppercase">{language}</span>
          {filename && (
            <span className="text-xs text-earth-muted font-mono ml-2">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-2 py-1 text-xs text-earth-muted hover:text-cream hover:bg-deep-forest rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-olive-light" />
              <span className="text-olive-light">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="bg-deep-forest border border-moss rounded-b-lg p-4 overflow-x-auto">
        <code className="text-sm text-earth-tan font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
