import { useState, useEffect } from 'react';
import { Command } from 'lucide-react';

const shortcuts = [
  { key: '⌘K', description: 'Open search' },
  { key: '↑↓', description: 'Navigate search results' },
  { key: '←→', description: 'Switch search tabs' },
  { key: '↵', description: 'Select result' },
  { key: 'ESC', description: 'Close modal' },
  { key: 'g h', description: 'Go to home' },
  { key: 'g t', description: 'Go to tags' },
  { key: 'g p', description: 'Go to projects' },
  { key: 'g a', description: 'Go to about' },
  { key: '?', description: 'Show shortcuts' },
];

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsVisible(prev => !prev);
        }
      }
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[150] bg-deep-olive/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setIsVisible(false)}
    >
      <div
        className="w-full max-w-md bg-deep-forest border border-moss rounded-lg p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6">
          <Command className="w-5 h-5 text-olive-light" />
          <h2 className="font-serif text-xl font-bold text-cream">Keyboard Shortcuts</h2>
        </div>
        
        <div className="space-y-2">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="flex items-center justify-between py-2 border-b border-moss/50 last:border-0">
              <span className="text-earth-tan text-sm">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-deep-olive border border-moss rounded text-xs font-mono text-cream">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        
        <p className="mt-6 text-center text-xs text-earth-muted">
          Press <kbd className="px-1.5 py-0.5 bg-deep-olive border border-moss rounded text-xs font-mono">?</kbd> to toggle this panel
        </p>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
