import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Check, AlertTriangle, Sparkles, Target, BookOpen, Download } from 'lucide-react';
import type { Resource, ResourceType } from '../../data/languageResources';

const typeIcons: Record<ResourceType, string> = {
  Video: '🎬', Podcast: '🎙️', Reading: '📖', App: '📱',
  Tools: '🔧', Grammar: '📝', AI: '🤖', Translation: '🌐',
};

const getYoutubeEmbedUrl = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0`;
  }
  return null;
};

interface ResourceDetailModalProps {
  resource: Resource;
  onClose: () => void;
}

export function ResourceDetailModal({ resource, onClose }: ResourceDetailModalProps) {
  if (!resource || !resource.details) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-deep-olive/95 backdrop-blur-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-deep-forest border border-moss rounded-lg shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 bg-deep-forest border-b border-moss">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{typeIcons[resource.type]}</span>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream">{resource.name}</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light mt-1 inline-block">{resource.type}</span>
              </div>
            </div>
            <button onClick={onClose} className="flex-shrink-0 p-2 text-earth-muted hover:text-cream hover:bg-deep-olive rounded transition-all" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-sm text-earth-tan leading-relaxed">{resource.desc}</p>

            {resource.type === "Video" && getYoutubeEmbedUrl(resource.url) && (
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-moss">
                <iframe
                  src={getYoutubeEmbedUrl(resource.url)!}
                  title={resource.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}

            {resource.details.why && (
              <div className="p-4 bg-olive/10 border-l-4 border-olive-light rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-olive-light" />
                  <span className="font-sans text-sm font-bold text-olive-light">Why this resource?</span>
                </div>
                <p className="text-sm text-earth-tan leading-relaxed">{resource.details.why}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {resource.details.bestFor && (
                <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                  <Target className="w-4 h-4 text-amber mx-auto mb-1" />
                  <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Best For</p>
                  <p className="text-xs font-sans text-cream">{resource.details.bestFor}</p>
                </div>
              )}
              {resource.details.level && (
                <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                  <BookOpen className="w-4 h-4 text-tomato mx-auto mb-1" />
                  <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Level</p>
                  <p className="text-xs font-sans text-cream">{resource.details.level}</p>
                </div>
              )}
              {resource.details.price && (
                <div className="p-3 bg-deep-olive/50 border border-moss rounded text-center">
                  <Download className="w-4 h-4 text-amber mx-auto mb-1" />
                  <p className="text-[9px] font-mono uppercase tracking-wider text-earth-muted mb-0.5">Price</p>
                  <p className="text-xs font-sans text-cream">{resource.details.price}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resource.details.pros && resource.details.pros.length > 0 && (
                <div>
                  <h4 className="font-sans text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {resource.details.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-earth-tan">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {resource.details.cons && resource.details.cons.length > 0 && (
                <div>
                  <h4 className="font-sans text-sm font-bold text-tomato mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {resource.details.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-earth-tan">
                        <span className="w-1.5 h-1.5 bg-tomato/60 rounded-sm mt-1.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-olive-light text-deep-olive font-sans font-bold rounded hover:bg-olive transition-colors text-sm"
            >
              Visit {resource.name}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
