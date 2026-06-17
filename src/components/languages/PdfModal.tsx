import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, X } from 'lucide-react';
import type { PdfFile } from '../../data/languageResources';

const BASE = import.meta.env.BASE_URL;

interface PdfModalProps {
  pdf: PdfFile;
  onClose: () => void;
  onDownload: (name: string, file: string) => void;
}

export function PdfModal({ pdf, onClose, onDownload }: PdfModalProps) {
  if (!pdf) return null;

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
          className="relative w-full max-w-4xl max-h-[90vh] bg-deep-forest border border-moss rounded-lg shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-moss bg-deep-olive/50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-tomato" />
              <h3 className="font-serif text-lg font-bold text-cream">{pdf.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDownload(pdf.name, pdf.file)}
                className="flex items-center gap-2 px-4 py-2 bg-tomato/20 text-tomato text-sm font-bold rounded hover:bg-tomato/30 transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button onClick={onClose} className="p-2 text-earth-muted hover:text-cream hover:bg-deep-olive rounded transition-all" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {pdf.exists ? (
            <div className="flex-1 overflow-y-auto bg-white/5 p-4 min-h-0">
              <object
                data={`${BASE}${pdf.file}`}
                type="application/pdf"
                className="w-full h-full min-h-[70vh] rounded"
                aria-label="PDF preview"
              >
                <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
                  <FileText className="w-16 h-16 text-earth-muted" />
                  <p className="text-earth-tan text-sm">
                    PDF preview not available in your browser.{' '}
                    <button onClick={() => onDownload(pdf.name, pdf.file)} className="text-olive-light hover:underline font-bold">
                      Download instead
                    </button>
                  </p>
                </div>
              </object>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 p-12">
              <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center">
                <FileText className="w-8 h-8 text-amber" />
              </div>
              <div className="text-center max-w-md">
                <h4 className="font-serif text-lg font-bold text-cream mb-2">Not Uploaded Yet</h4>
                <p className="text-sm text-earth-tan leading-relaxed">
                  This PDF hasn't been uploaded yet. Check back later — it's being prepared.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
