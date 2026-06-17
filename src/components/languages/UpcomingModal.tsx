import { motion, AnimatePresence } from 'motion/react';
import { Clock, Check, X, Code, BookOpen, Globe } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { UpcomingItem } from '../../data/languageResources';
import { CountdownTimer } from './CountdownTimer';

interface UpcomingModalProps {
  item: UpcomingItem;
  defaultTargetDate: string;
  onClose: () => void;
}

const typeIcons: Record<string, string> = {
  'Anki Deck': '🗂️',
  'PDF Guide': '📄',
  'Script': '🐍',
};

export function UpcomingModal({ item, defaultTargetDate, onClose }: UpcomingModalProps) {
  if (!item) return null;

  const targetDate = item.targetDate || defaultTargetDate;

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
          className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-deep-forest border border-moss rounded-lg shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 bg-deep-forest border-b border-moss">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{typeIcons[item.type] || '📦'}</span>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream">{item.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 mt-1 inline-block rounded bg-amber/10 text-amber border border-amber/20">{item.type}</span>
              </div>
            </div>
            <button onClick={onClose} className="flex-shrink-0 p-2 text-earth-muted hover:text-cream hover:bg-deep-olive rounded transition-all" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Coming soon banner */}
            <div className="flex items-center gap-3 p-4 bg-amber/5 border border-amber/20 rounded">
              <Clock className="w-5 h-5 text-amber flex-shrink-0" />
              <div className="flex-1 text-center">
                <CountdownTimer targetDate={targetDate} />
              </div>
            </div>

            <p className="text-sm text-earth-tan leading-relaxed">{item.description}</p>

            {/* Preview content based on type */}
            {item.preview && (
              <>
                {/* Anki Deck Preview */}
                {item.type === 'Anki Deck' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {item.preview.cardCount && (
                        <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                          <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Cards</p>
                          <p className="text-sm font-sans text-cream font-bold">{item.preview.cardCount}</p>
                        </div>
                      )}
                      {item.preview.difficulty && (
                        <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                          <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Difficulty</p>
                          <p className="text-sm font-sans text-cream font-bold">{item.preview.difficulty}</p>
                        </div>
                      )}
                    </div>
                    {item.preview.includes && item.preview.includes.length > 0 && (
                      <div>
                        <h4 className="font-sans text-sm font-bold text-olive-light mb-3 flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          What's Included
                        </h4>
                        <ul className="space-y-2">
                          {item.preview.includes.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-earth-tan">
                              <span className="w-1.5 h-1.5 rounded-full bg-olive/60 mt-1.5 flex-shrink-0" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* PDF Guide Preview */}
                {item.type === 'PDF Guide' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                      <BookOpen className="w-4 h-4 text-tomato mx-auto mb-1" />
                      <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Pages</p>
                      <p className="text-sm font-sans text-cream font-bold">{item.preview.pageCount || '—'}</p>
                    </div>
                    {item.preview.topics && item.preview.topics.length > 0 && (
                      <div>
                        <h4 className="font-sans text-sm font-bold text-olive-light mb-3 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Topics Covered
                        </h4>
                        <div className="space-y-2">
                          {item.preview.topics.map((topic, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-earth-tan">
                              <span className="w-1.5 h-1.5 bg-tomato/60 rounded-sm mt-1.5 flex-shrink-0" />
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Script Preview */}
                {item.type === 'Script' && item.preview.codePreview && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-tomato" />
                      <span className="font-sans text-xs font-bold text-cream">Code Preview</span>
                      {item.preview.language && (
                        <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light">{item.preview.language}</span>
                      )}
                    </div>
                    <div className="rounded-lg overflow-hidden border border-moss text-xs">
                      <SyntaxHighlighter
                        language={item.preview.language || 'python'}
                        style={oneDark}
                        showLineNumbers
                        customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.7rem', lineHeight: '1.5' }}
                      >
                        {item.preview.codePreview}
                      </SyntaxHighlighter>
                    </div>
                    <p className="text-[10px] text-earth-muted font-mono text-center">Preview — full script coming soon</p>
                  </div>
                )}

                {/* Common features preview */}
                {item.preview.features && item.preview.features.length > 0 && (
                  <div>
                    <h4 className="font-sans text-sm font-bold text-amber mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Features
                    </h4>
                    <div className="space-y-2">
                      {item.preview.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-earth-tan">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <button onClick={onClose} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber/20 text-amber font-sans font-bold rounded hover:bg-amber/30 transition-all text-sm">
              <X className="w-4 h-4" />
              Got it
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
