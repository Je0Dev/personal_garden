import { useEffect, useState } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const KonamiEasterEgg = () => {
  const [activated, setActivated] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const handleKey = (e: KeyboardEvent) => {
      const expected = KONAMI_CODE[index];
      if (e.key === expected) {
        index++;
        setProgress(index);
        if (index === KONAMI_CODE.length) {
          setActivated(true);
          index = 0;
          setProgress(0);
          setTimeout(() => setActivated(false), 3000);
        }
      } else {
        index = 0;
        setProgress(0);
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => { index = 0; setProgress(0); }, 1000);
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearTimeout(timeout);
    };
  }, []);

  if (!activated) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none">
      <div className="text-center animate-bounce">
        <div className="font-display text-6xl mb-4" style={{ color: 'var(--color-tomato)' }}>
          🎮
        </div>
        <p className="font-serif text-2xl" style={{ color: 'var(--color-olive-light)' }}>
          Konami Code Activated!
        </p>
        <p className="font-sans text-sm mt-2" style={{ color: 'var(--color-earth-tan)' }}>
          You found the easter egg!
        </p>
      </div>
    </div>
  );
};

export default KonamiEasterEgg;
