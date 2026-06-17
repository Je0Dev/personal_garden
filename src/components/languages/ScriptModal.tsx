import { motion, AnimatePresence } from 'motion/react';
import { Code, Download, X } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { LanguageScript } from '../../data/languageScripts';

interface ScriptModalProps {
  script: LanguageScript;
  onClose: () => void;
}

export function ScriptModal({ script, onClose }: ScriptModalProps) {
  if (!script) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-deep-olive/95 backdrop-blur-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] bg-deep-forest border border-moss rounded-lg shadow-2xl flex flex-col overflow-hidden"
        >
          {script.image && (
            <div className="relative w-full h-24 overflow-hidden flex-shrink-0">
              <img src={script.image} alt="" loading="lazy" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-transparent" />
            </div>
          )}
          <div className="flex items-start justify-between gap-4 p-5 pb-4 border-b border-moss bg-deep-olive/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-tomato/20">
                <Code className="w-5 h-5 text-tomato" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-bold text-cream truncate">{script.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light">{script.language}</span>
                  {script.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-earth-muted font-mono">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="flex-shrink-0 p-2 text-earth-muted hover:text-cream hover:bg-deep-olive rounded transition-all" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 border-b border-moss">
            <p className="text-sm text-earth-tan leading-relaxed">{script.description}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 bg-deep-olive/30">
            <div className="rounded-lg overflow-hidden border border-moss text-xs">
              <SyntaxHighlighter
                language={script.language}
                style={oneDark}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  fontSize: '0.75rem',
                  lineHeight: '1.5',
                }}
              >
                {script.codePreview}
              </SyntaxHighlighter>
            </div>
            <p className="text-[10px] text-earth-muted mt-2 font-mono text-center">
              Showing first {script.codePreview.split('\n').length} lines · full file available below
            </p>
          </div>

          <div className="p-4 border-t border-moss bg-deep-olive/50 flex items-center justify-between">
            <span className="text-xs text-earth-muted font-mono">{script.file}</span>
            {script.exists !== false ? (
              <button
                onClick={() => {
                  const BASE = import.meta.env.BASE_URL;
                  const a = document.createElement('a');
                  a.href = `${BASE}${script.file}`;
                  a.download = script.file.split('/').pop() || script.file;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-tomato/20 text-tomato text-sm font-bold rounded hover:bg-tomato/30 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Script
              </button>
            ) : (
              <span className="text-xs text-amber font-mono px-3 py-2 bg-amber/10 border border-amber/20 rounded">Coming Soon</span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
