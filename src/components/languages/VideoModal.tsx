import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Youtube, X } from 'lucide-react';
import type { VideoGuide } from '../../data/languageResources';

interface VideoModalProps {
  video: VideoGuide;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {video && (
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
            className="relative w-full max-w-5xl max-h-[90vh] bg-deep-forest border border-moss rounded-lg md:overflow-hidden overflow-y-auto shadow-2xl flex flex-col md:flex-row"
          >
            <div className="flex flex-col md:w-3/5">
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`${video.videoUrl}?rel=0`}
                  title={video.title}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
                <a
                  href={video.videoUrl.replace('/embed/', '/watch?v=')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-deep-olive/90 text-tomato text-xs font-bold rounded hover:bg-deep-olive transition-all border border-tomato/30"
                >
                  <ExternalLink className="w-3 h-3" />
                  Watch on YouTube
                </a>
              </div>
              <div className="p-5 hidden md:block">
                <h3 className="font-serif text-lg font-bold text-cream">{video.title}</h3>
                <p className="text-sm text-earth-tan mt-1 leading-relaxed">{video.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {video.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-olive/20 text-olive-light">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-2/5 border-t md:border-t-0 md:border-l border-moss flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-moss bg-deep-olive/50">
                <h4 className="font-sans text-sm font-bold text-olive-light flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-tomato" />
                  Key Takeaways
                </h4>
                <button
                  onClick={onClose}
                  className="p-1.5 text-earth-muted hover:text-cream hover:bg-deep-olive rounded transition-all"
                  aria-label="Close video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="md:flex-1 md:overflow-y-auto p-4 space-y-3">
                {video.keyPoints && video.keyPoints.length > 0 ? (
                  video.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-deep-olive/40 border border-moss rounded group hover:border-olive-light/30 transition-all">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-olive/30 text-olive-light text-xs font-bold flex items-center justify-center font-mono">{i + 1}</span>
                      <p className="text-sm text-earth-tan leading-relaxed">{point}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-earth-muted text-center py-8">No key points available for this video.</p>
                )}
              </div>
              <div className="p-3 border-t border-moss text-center md:hidden">
                <p className="text-xs text-earth-tan font-medium font-serif">{video.title}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
