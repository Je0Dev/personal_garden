import { motion, AnimatePresence } from 'motion/react';
import { Check, Download, Layers, X } from 'lucide-react';
import type { AnkiDeck } from '../../data/languageResources';

interface AnkiDeckModalProps {
  deck: AnkiDeck;
  onClose: () => void;
  onDownload: (name: string, file: string) => void;
}

export function AnkiDeckModal({ deck, onClose, onDownload }: AnkiDeckModalProps) {
  if (!deck) return null;

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
          className="relative w-full max-w-lg bg-deep-forest border border-moss rounded-lg shadow-2xl overflow-hidden"
        >
          {deck.image && (
            <div className="relative w-full h-24 overflow-hidden">
              <img src={deck.image} alt="" loading="lazy" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-transparent" />
            </div>
          )}
          <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-moss">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${deck.color.replace('border', 'bg')}/20`}>
                <Layers className="w-5 h-5 text-amber" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-cream">{deck.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light">{deck.lang}</span>
                  <span className="text-xs text-earth-muted">{deck.size}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="flex-shrink-0 p-2 text-earth-muted hover:text-cream hover:bg-deep-olive rounded transition-all" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          {deck.exists ? (
            <div className="p-6 space-y-5">
              <p className="text-sm text-earth-tan leading-relaxed">{deck.details.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Cards</p>
                  <p className="text-sm font-sans text-cream font-bold">{deck.details.cardCount}</p>
                </div>
                <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                  <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Difficulty</p>
                  <p className="text-sm font-sans text-cream font-bold">{deck.details.difficulty}</p>
                </div>
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-olive-light mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  What's Included
                </h4>
                <ul className="space-y-2">
                  {deck.details.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-earth-tan">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive/60 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => { onDownload(deck.name, `anki/${deck.file}`); onClose(); }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber/20 text-amber font-sans font-bold rounded hover:bg-amber/30 transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                Download {deck.name}
              </button>
            </div>
          ) : (
            <div className="p-12 flex flex-col items-center justify-center gap-5">
              <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center">
                <Layers className="w-8 h-8 text-amber" />
              </div>
              <div className="text-center max-w-md">
                <h4 className="font-serif text-lg font-bold text-cream mb-2">Not Uploaded Yet</h4>
                <p className="text-sm text-earth-tan leading-relaxed">This Anki deck hasn't been uploaded yet. Check back later — it's being prepared.</p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
