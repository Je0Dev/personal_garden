import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, ArrowRight, X, Check, Cpu, Sparkles, Terminal, Code, Image as ImageIcon } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Game } from '../../data/games';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
}

export function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!game) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [game, onClose]);

  return (
    <AnimatePresence>
      {game && (
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
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-deep-forest border border-moss rounded-lg shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 bg-deep-forest border-b border-moss">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber/20 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-amber" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-cream">{game.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {game.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="flex-shrink-0 p-2 text-earth-muted hover:text-cream hover:bg-deep-olive rounded transition-all" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-earth-tan leading-relaxed">{game.description}</p>

              <div>
                <h4 className="font-sans text-sm font-bold text-amber mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {game.details.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 bg-deep-olive/40 border border-moss rounded">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-earth-tan leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-sans text-sm font-bold text-olive-light mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Technical Details
                </h4>

                {game.image && (
                  <div className="mb-4">
                    <div className="relative aspect-video bg-deep-olive overflow-hidden rounded border border-moss">
                      <img src={game.image} alt="Game illustration" loading="lazy" className="w-full h-full object-cover opacity-75" />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-deep-olive/80 rounded text-[10px] font-mono text-earth-muted">
                        <ImageIcon className="w-3 h-3" />
                        Old book illustration
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {game.details.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 text-[11px] font-mono bg-deep-olive border border-moss rounded text-earth-tan">{t}</span>
                  ))}
                </div>
              </div>

              {game.codeSnippets && game.codeSnippets.length > 0 && (
                <div>
                  <h4 className="font-sans text-sm font-bold text-tomato mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Code Walkthrough
                  </h4>
                  <div className="space-y-4">
                    {game.codeSnippets.map((snippet, i) => (
                      <div key={i} className="bg-deep-olive/60 border border-moss rounded overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-deep-olive/80 border-b border-moss">
                          <Terminal className="w-3.5 h-3.5 text-tomato" />
                          <span className="font-sans text-xs font-bold text-cream">{snippet.title}</span>
                          <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light">{snippet.language}</span>
                        </div>
                        <div className="px-4 py-2 border-b border-moss/50">
                          <p className="text-[11px] text-earth-tan leading-relaxed">{snippet.description}</p>
                        </div>
                        <div className="text-xs">
                          <SyntaxHighlighter language={snippet.language} style={oneDark} showLineNumbers customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.7rem', lineHeight: '1.5', padding: '1rem' }}>
                            {snippet.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => { onClose(); navigate(`/games/${game.slug}`); }}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber to-amber/80 text-deep-olive font-bold rounded hover:opacity-90 transition-all text-base"
              >
                <Gamepad2 className="w-5 h-5" />
                Play {game.title}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
