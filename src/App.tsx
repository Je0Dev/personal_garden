import { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from './sections/Header';
import Footer from './sections/Footer';
import ReadingProgress from './components/ReadingProgress';
import BackToTop from './components/BackToTop';
import MobileMenu from './components/MobileMenu';
import Lightbox from './components/Lightbox';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import { ToastProvider } from './components/Toast';

const Home = lazy(() => import('./pages/Home'));
const Article = lazy(() => import('./pages/Article'));
const Projects = lazy(() => import('./pages/Projects'));
const Tags = lazy(() => import('./pages/Tags'));
const About = lazy(() => import('./pages/About'));
const Languages = lazy(() => import('./pages/Languages'));
const Games = lazy(() => import('./pages/Games'));
const GameView = lazy(() => import('./pages/GameView'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-olive-light border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<Loader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/tags/:tag" element={<Tags />} />
            <Route path="/about" element={<About />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:slug" element={<GameView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '', caption: '' });

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const dark = stored ? stored === 'dark' : true;
    setIsDark(dark);
    if (!dark) document.documentElement.classList.add('light');
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleOpenLightbox = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setLightbox({ isOpen: true, src: detail.src, alt: detail.alt, caption: detail.caption || '' });
    };
    window.addEventListener('openLightbox', handleOpenLightbox);
    return () => window.removeEventListener('openLightbox', handleOpenLightbox);
  }, []);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <Router>
      <ReadingProgress />
      <KonamiEasterEgg />
      <ToastProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-olive-light focus:text-white focus:rounded-lg focus:font-bold"
        >
          Skip to main content
        </a>
        <Header onMenuToggle={() => setIsMobileMenuOpen(true)} isDark={isDark} onThemeToggle={toggleTheme} />
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <BackToTop />
        <KeyboardShortcuts />
        <main id="main-content" className="min-h-screen">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Lightbox
          isOpen={lightbox.isOpen}
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
        />
      </ToastProvider>
    </Router>
  );
}

export default App;
