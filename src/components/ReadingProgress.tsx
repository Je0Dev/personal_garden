import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollProgress, 100));
      setShowIndicator(scrollTop > 200);
      
      const estimatedMinutes = Math.ceil((scrollProgress / 100) * 10);
      setReadingTime(Math.max(1, estimatedMinutes));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-deep-forest">
        <div
          className="h-full bg-gradient-to-r from-olive-light via-tomato to-olive-light transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {showIndicator && (
        <div className="fixed top-12 right-6 z-[55] flex items-center gap-2 px-3 py-1.5 bg-deep-forest/90 border border-moss rounded-full text-xs text-earth-muted backdrop-blur-sm">
          <BookOpen className="w-3 h-3 text-olive-light" />
          <span>{Math.round(progress)}%</span>
          <span className="text-moss">·</span>
          <span>~{readingTime}m left</span>
        </div>
      )}
    </>
  );
};

export default ReadingProgress;
