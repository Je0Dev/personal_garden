import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Menu, ArrowRight, FileText, Hash, Sun, Moon } from 'lucide-react';
import { posts, getPostsByTag } from '../data/posts';

interface HeaderProps {
  onMenuToggle: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

const Header = ({ onMenuToggle, isDark, onThemeToggle }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  interface SearchResult {
    type: 'post' | 'tag';
    title: string;
    path: string;
    snippet?: string;
    count?: number;
  }

  const regexError = useMemo(() => {
    const q = query.trim();
    if (!q) return false;
    try {
      new RegExp(q, 'i');
      return false;
    } catch {
      return true;
    }
  }, [query]);

  const stripMarkdown = (md: string): string =>
    md
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^>\s?/gm, '')
      .replace(/\*\*|__|~~/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim();
    if (!q) return [];
    let re: RegExp | null = null;
    try {
      re = new RegExp(q, 'i');
    } catch {
      re = null;
    }
    const test = (s: string): boolean =>
      re ? re.test(s) : s.toLowerCase().includes(q.toLowerCase());
    const findMatch = (s: string): number => {
      if (re) {
        const m = re.exec(s);
        return m ? m.index : -1;
      }
      return s.toLowerCase().indexOf(q.toLowerCase());
    };

    const postResults: SearchResult[] = posts
      .map((p): SearchResult | null => {
        const plain = stripMarkdown(p.content);
        const haystack = `${p.title}\n${p.excerpt}\n${p.slug}\n${p.tags.join(' ')}\n${plain}`;
        if (!test(haystack)) return null;
        const idx = findMatch(plain);
        let snippet = p.excerpt;
        if (idx >= 0) {
          const start = Math.max(0, idx - 45);
          snippet =
            (start > 0 ? '…' : '') +
            plain.slice(start, idx + 80) +
            (idx + 80 < plain.length ? '…' : '');
        }
        return { type: 'post' as const, title: p.title, path: `/blog/${p.slug}`, snippet };
      })
      .filter((r): r is SearchResult => r !== null);

    const tagResults: SearchResult[] = allTags
      .filter(tag => test(tag))
      .map(tag => ({
        type: 'tag',
        title: tag,
        path: `/tags/${encodeURIComponent(tag)}`,
        count: getPostsByTag(tag).length,
      }));

    return [...postResults, ...tagResults];
  }, [query]);

  const isSelected = (index: number) => selectedIndex === index;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (url: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(url);
    setIsSearchOpen(false);
    setQuery('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deep-olive/95 backdrop-blur-sm border-b border-moss' : 'bg-transparent'}`}>
        <div className="max-w-wide mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" onClick={scrollToTop} className={`font-serif text-xl font-semibold transition-colors ${isActive('/') ? 'text-tomato underline underline-offset-4' : 'text-cream hover:text-tomato'}`}>
            George's Garden
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/tags" onClick={scrollToTop} className={`font-sans text-sm transition-colors hidden sm:block ${isActive('/tags') ? 'text-cream underline underline-offset-4' : 'text-earth-tan hover:text-tomato'}`}>
              Discover
            </Link>
            <Link to="/about" onClick={scrollToTop} className={`font-sans text-sm transition-colors hidden sm:block ${isActive('/about') ? 'text-cream underline underline-offset-4' : 'text-earth-tan hover:text-tomato'}`}>
              About
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-deep-forest border border-moss rounded hover:border-tomato transition-colors text-sm text-earth-muted hover:text-tomato"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-xs">⌘K</span>
            </button>
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className="p-2 text-earth-muted hover:text-tomato transition-colors hidden sm:block"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={onMenuToggle}
              className="p-2 text-earth-tan hover:text-tomato transition-colors sm:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-deep-olive/98 backdrop-blur-md flex items-start justify-center pt-[12vh]"
            onClick={() => { setIsSearchOpen(false); setQuery(''); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full max-w-3xl mx-4 bg-deep-forest border border-moss rounded-lg overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-moss">
                <Search className="w-5 h-5 text-olive-light flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setSelectedIndex(i => Math.max(i - 1, 0));
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      if (results[selectedIndex]) handleSelect(results[selectedIndex].path);
                    }
                  }}
                  placeholder="Search posts and tags…"
                  className="flex-1 bg-transparent text-cream placeholder:text-earth-muted font-serif text-lg focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-earth-muted hover:text-tomato transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="px-2 py-1 bg-deep-olive border border-moss rounded text-xs text-earth-muted font-mono">ESC</kbd>
              </div>

              <div ref={listRef} className="max-h-[400px] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="px-5 py-12 text-center">
                    <p className="text-earth-muted font-sans text-sm mb-2">Search posts, tags, and full article text</p>
                    <p className="text-earth-muted/60 font-sans text-xs font-mono">
                      Regex supported — try <span className="text-olive-light">cli.*</span> or <span className="text-olive-light">^rust</span>
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <p className="text-earth-muted font-sans text-sm">No results for "{query}"</p>
                    {regexError && (
                      <p className="text-tomato font-sans text-xs mt-1">Invalid regex — falling back to plain text search</p>
                    )}
                  </div>
                ) : (
                  <div className="py-1">
                    {results.map((result, index) => (
                      <div
                        key={`${result.type}-${result.title}`}
                        onClick={() => handleSelect(result.path)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`px-5 py-3 cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                          isSelected(index) ? 'bg-deep-sage translate-x-2' : ''
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {result.type === 'post' ? (
                            <FileText className={`w-4 h-4 transition-colors ${isSelected(index) ? 'text-tomato' : 'text-earth-muted'}`} />
                          ) : (
                            <Hash className={`w-4 h-4 transition-colors ${isSelected(index) ? 'text-olive-light' : 'text-earth-muted'}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-serif text-base truncate transition-colors ${isSelected(index) ? 'text-cream' : 'text-earth-tan'}`}>
                            {result.title}
                          </p>
                          {result.type === 'post' && result.snippet && (
                            <p className="text-earth-muted font-sans text-xs mt-0.5 truncate">{result.snippet}</p>
                          )}
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-3 min-w-0">
                          <span className={`font-mono text-xs truncate max-w-[180px] ${isSelected(index) ? 'text-earth-tan' : 'text-earth-muted/70'}`}>
                            {result.path}
                          </span>
                          {result.type === 'tag' && (
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-olive/20 text-olive-light">{result.count}</span>
                          )}
                          {isSelected(index) && (
                            <ArrowRight className="w-4 h-4 text-olive-light flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-5 py-3 border-t border-moss bg-deep-olive/50 flex items-center justify-between text-xs text-earth-muted font-mono">
                <span className="flex items-center gap-3">
                  <span>↑↓ navigate</span>
                  <span>↵ open</span>
                  <span>esc close</span>
                </span>
                <span className={regexError ? 'text-tomato' : 'text-earth-muted/60'}>
                  {regexError ? 'invalid regex — text fallback' : 'regex supported'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
