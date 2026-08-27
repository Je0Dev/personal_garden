import { useState, useEffect } from 'react';
import SearchOverlay from './SearchOverlay';

interface CommandPaletteProps {
  baseUrl: string;
}

export default function CommandPalette({ baseUrl }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const handleOpenSearch = () => setIsOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('open-search', handleOpenSearch);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('open-search', handleOpenSearch);
    };
  }, []);

  return (
    <SearchOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} baseUrl={baseUrl} />
  );
}