import { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LightboxProps {
  src: string;
  alt: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Lightbox = ({ src, alt, caption, isOpen, onClose }: LightboxProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-deep-olive/98 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-earth-tan hover:text-cream transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>
      
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-1 overflow-auto flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            style={{ maxHeight: '80vh' }}
          />
        </div>
        
        {caption && (
          <p className="text-center text-earth-muted font-sans text-sm mt-4 px-4">
            {caption}
          </p>
        )}
        
        <p className="text-center text-earth-muted/50 font-mono text-xs mt-2">
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  );
};

export default Lightbox;

export const LightboxTrigger = ({ 
  children, 
  src, 
  alt, 
  caption 
}: { 
  children: React.ReactNode;
  src: string;
  alt: string;
  caption?: string;
}) => {
  const handleClick = () => {
    const event = new CustomEvent('openLightbox', { 
      detail: { src, alt, caption } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div 
      className="cursor-zoom-in relative group" 
      onClick={handleClick}
    >
      {children}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-deep-olive/30 rounded-lg">
        <ZoomIn className="w-8 h-8 text-cream" />
      </div>
    </div>
  );
};
