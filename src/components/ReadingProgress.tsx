import { useState, useEffect } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollProgress, 100));
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
    </>
  );
};

export default ReadingProgress;
