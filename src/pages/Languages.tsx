import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Download, BookOpen, Youtube, Globe, ChevronDown, ChevronUp, Play, Eye, FileText, Layers, Code, Clock } from 'lucide-react';
import { videoGuides, languageResources, ankiDecks, pdfFiles, upcomingRelease, type VideoGuide, type Resource, type AnkiDeck, type PdfFile, type UpcomingItem } from '../data/languageResources';
import { languageScripts, type LanguageScript } from '../data/languageScripts';
import { useToast } from '../components/Toast';
import { CountdownTimer } from '../components/languages/CountdownTimer';
import { ResourceCard } from '../components/languages/ResourceCard';
import { VideoModal } from '../components/languages/VideoModal';
import { ResourceDetailModal } from '../components/languages/ResourceDetailModal';
import { PdfModal } from '../components/languages/PdfModal';
import { AnkiDeckModal } from '../components/languages/AnkiDeckModal';
import { ScriptModal } from '../components/languages/ScriptModal';
import { UpcomingModal } from '../components/languages/UpcomingModal';

const bannerImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
];

const BASE = import.meta.env.BASE_URL;

const getYoutubeId = (url: string) => {
  const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

function Languages() {
  const [expandedLang, setExpandedLang] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoGuide | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<PdfFile | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<AnkiDeck | null>(null);
  const [selectedScript, setSelectedScript] = useState<LanguageScript | null>(null);
  const [selectedUpcoming, setSelectedUpcoming] = useState<UpcomingItem | null>(null);
  const [activeMaterialFilter, setActiveMaterialFilter] = useState<string>('All');
  const { addToast } = useToast();
  const langRefs = useRef<Record<string, HTMLDivElement | null>>({} as Record<string, HTMLDivElement | null>);

  const materialLanguages = ['General', ...new Set(ankiDecks.map(d => d.lang))];

  const filteredPdfs = activeMaterialFilter === 'All'
    ? pdfFiles
    : pdfFiles.filter(p => p.tags.some(t => t.toLowerCase().includes(activeMaterialFilter.toLowerCase())));

  const filteredDecks = activeMaterialFilter === 'All'
    ? ankiDecks
    : ankiDecks.filter(d => d.lang === activeMaterialFilter || d.tags.some(t => t.toLowerCase().includes(activeMaterialFilter.toLowerCase())));

  const handleDownload = (name: string, file: string) => {
    const a = document.createElement('a');
    a.href = `${BASE}${file}`;
    a.download = file.split('/').pop() || file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast(`Downloading ${name}...`, 'success');
  };

  const closeModal = useCallback(() => setSelectedVideo(null), []);
  const closeResourceModal = useCallback(() => setSelectedResource(null), []);
  const closePdfModal = useCallback(() => setSelectedPdf(null), []);
  const closeDeckModal = useCallback(() => setSelectedDeck(null), []);
  const closeScriptModal = useCallback(() => setSelectedScript(null), []);
  const closeUpcomingModal = useCallback(() => setSelectedUpcoming(null), []);

  useEffect(() => {
    if (!selectedVideo) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedVideo, closeModal]);

  useEffect(() => {
    if (!selectedResource) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeResourceModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedResource, closeResourceModal]);

  useEffect(() => {
    if (!selectedPdf) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePdfModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedPdf, closePdfModal]);

  useEffect(() => {
    if (!selectedDeck) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDeckModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedDeck, closeDeckModal]);

  useEffect(() => {
    if (!selectedScript) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeScriptModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedScript, closeScriptModal]);

  useEffect(() => {
    if (!selectedUpcoming) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeUpcomingModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedUpcoming, closeUpcomingModal]);

  const handleLangToggle = (title: string) => {
    const next = expandedLang === title ? null : title;
    setExpandedLang(next);
    setTimeout(() => {
      if (next && langRefs.current[next]) {
        langRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-wide mx-auto">
        {/* Banner */}
        <div className="relative w-full h-48 md:h-72 overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-deep-olive via-deep-olive/60 to-transparent z-10" />
          <img src={bannerImages[0]} alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-cream leading-[1.1] md:leading-none font-serif"
              >
                <span className="relative inline-block">
                  Languages
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-olive-light to-olive rounded-full" />
                </span>
                <br />
                <span className="text-cream text-3xl md:text-4xl lg:text-5xl font-serif">Tools & resources for learners</span>
              </motion.h1>
            </div>
          </div>
        </div>

        <div className="px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
            {/* Intro */}
            <section className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-earth-tan leading-relaxed">
                A curated collection of language learning resources, video guides, and downloadable materials 
                I've gathered on my journey learning <strong className="text-cream font-serif">German</strong>,{' '}
                <strong className="text-cream font-serif">Spanish</strong>,{' '}
                <strong className="text-cream font-serif">Chinese</strong>, and{' '}
                <strong className="text-cream font-serif">English</strong>.
              </p>
            </section>

            {/* Video Guides */}
            <section className="max-w-6xl mx-auto">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif flex items-center gap-3">
                <Youtube className="w-4 h-4 text-tomato" />
                Video Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoGuides.map((video, i) => {
                  const vidId = getYoutubeId(video.videoUrl);
                  const thumbnail = vidId ? `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg` : '';
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedVideo(video)}
                      className="group bg-surface border border-moss rounded-lg overflow-hidden hover:border-olive-light hover:bg-deep-sage/30 transition-all text-left w-full"
                    >
                      <div className="relative aspect-video bg-deep-olive overflow-hidden">
                        {thumbnail && (
                          <img src={thumbnail} alt="" loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-tomato/90 rounded-full flex items-center justify-center group-hover:bg-tomato group-hover:scale-110 transition-all shadow-xl">
                            <Play className="w-6 h-6 md:w-7 md:h-7 text-cream ml-0.5" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg font-bold text-cream group-hover:text-olive-light transition-colors">{video.title}</h3>
                        <p className="text-sm text-earth-muted mt-1 leading-relaxed line-clamp-2">{video.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {video.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-olive/20 text-olive-light">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Resources by Language */}
            <section className="max-w-6xl mx-auto">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-olive-light" />
                Resources by Language
              </h2>
              <div className="space-y-4">
                {languageResources.map(lang => (
                  <div key={lang.title} ref={el => { langRefs.current[lang.title] = el; }} className="bg-surface border border-moss rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleLangToggle(lang.title)}
                      className={`w-full flex items-center justify-between p-4 border-l-4 ${lang.color} hover:bg-deep-sage/50 transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <h3 className="font-serif text-lg font-bold text-cream">{lang.title}</h3>
                        <span className="text-xs text-earth-muted font-mono">{lang.resources.length} resources</span>
                      </div>
                      {expandedLang === lang.title ? <ChevronUp className="w-5 h-5 text-earth-muted" /> : <ChevronDown className="w-5 h-5 text-earth-muted" />}
                    </button>
                    {expandedLang === lang.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-moss"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                          {lang.resources.map(r => (
                            <ResourceCard key={r.name} {...r} onShowDetail={setSelectedResource} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Downloadable Materials */}
            <section className="max-w-6xl mx-auto">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif flex items-center gap-3">
                <Download className="w-4 h-4 text-amber" />
                Downloadable Materials
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {['All', ...materialLanguages].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveMaterialFilter(cat)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                      activeMaterialFilter === cat ? 'border-amber text-amber bg-amber/10' : 'border-moss text-earth-muted hover:border-amber hover:text-amber'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* PDFs */}
              <div className="mb-8">
                <h3 className="font-serif text-base font-bold text-cream mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-olive-light" />
                  PDF Guides
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredPdfs.map(pdf => (
                    <button
                      key={pdf.name}
                      onClick={() => pdf.exists ? setSelectedPdf(pdf) : null}
                      className={`group flex items-center gap-4 p-4 bg-surface border border-moss rounded-lg transition-all text-left relative ${
                        pdf.exists ? 'hover:border-olive-light hover:bg-deep-sage/30 cursor-pointer' : 'opacity-60 cursor-default'
                      }`}
                    >
                      {!pdf.exists ? (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber/20 text-amber text-[9px] font-mono uppercase tracking-wider border border-amber/30 rounded">Coming Soon</span>
                      ) : pdf.new ? (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono uppercase tracking-wider border border-emerald-500/30 rounded">NEW</span>
                      ) : null}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${pdf.exists ? 'bg-tomato/20' : 'bg-earth-muted/20'}`}>
                        <Eye className={`w-5 h-5 ${pdf.exists ? 'text-tomato' : 'text-earth-muted'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-sm font-medium text-cream group-hover:text-olive-light transition-colors">{pdf.name}</p>
                        <p className="text-xs text-earth-muted">{pdf.size}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Anki Decks */}
              <div>
                <h3 className="font-serif text-base font-bold text-cream mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber" />
                  Anki Decks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredDecks.map(deck => (
                    <button
                      key={deck.name}
                      onClick={() => deck.exists ? setSelectedDeck(deck) : null}
                      className={`group bg-surface border border-moss rounded-lg overflow-hidden transition-all text-left relative ${
                        deck.exists ? 'hover:border-olive-light hover:bg-deep-sage/30 cursor-pointer' : 'opacity-60 cursor-default'
                      }`}
                    >
                      <div className="relative w-full h-14 overflow-hidden">
                        <img src={deck.image || bannerImages[0]} alt="" loading="lazy" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-deep-olive/80 via-transparent to-deep-olive/80" />
                      </div>
                      {!deck.exists ? (
                        <span className="absolute top-1 right-2 px-2 py-0.5 bg-amber/20 text-amber text-[9px] font-mono uppercase tracking-wider border border-amber/30 rounded z-10">Coming Soon</span>
                      ) : deck.new ? (
                        <span className="absolute top-1 right-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono uppercase tracking-wider border border-emerald-500/30 rounded z-10">NEW</span>
                      ) : null}
                      <div className="flex items-center gap-4 p-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${deck.exists ? `${deck.color.replace('border', 'bg')}/20` : 'bg-earth-muted/20'}`}>
                          <Layers className={`w-5 h-5 ${deck.exists ? 'text-amber' : 'text-earth-muted'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-sans text-sm font-medium text-cream group-hover:text-olive-light transition-colors">{deck.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light">{deck.lang}</span>
                            <span className="text-xs text-earth-muted">{deck.exists ? deck.size : '—'}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scripts */}
              <div className="mt-8">
                <h3 className="font-serif text-base font-bold text-cream mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-tomato" />
                  Scripts & Tooling
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {languageScripts.map(script => (
                    <button
                      key={script.name}
                      onClick={() => script.exists !== false ? setSelectedScript(script) : null}
                      className={`group bg-surface border border-moss rounded-lg overflow-hidden transition-all text-left relative ${
                        script.exists !== false ? 'hover:border-olive-light hover:bg-deep-sage/30 cursor-pointer' : 'opacity-60 cursor-default'
                      }`}
                    >
                      <div className="relative w-full h-14 overflow-hidden">
                        <img src={script.image || bannerImages[0]} alt="" loading="lazy" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-deep-olive/80 via-transparent to-deep-olive/80" />
                      </div>
                      {script.exists === false && (
                        <span className="absolute top-1 right-2 px-2 py-0.5 bg-amber/20 text-amber text-[9px] font-mono uppercase tracking-wider border border-amber/30 rounded z-10">Coming Soon</span>
                      )}
                      <div className="flex items-center gap-4 p-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${script.exists !== false ? 'bg-tomato/20' : 'bg-earth-muted/20'}`}>
                          <Code className={`w-5 h-5 ${script.exists !== false ? 'text-tomato' : 'text-earth-muted'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-cream group-hover:text-olive-light transition-colors truncate">{script.name}</p>
                          <p className="text-xs text-earth-muted mt-0.5 line-clamp-1">{script.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light">{script.language}</span>
                            {script.tags.map(tag => (
                              <span key={tag} className="text-[10px] text-earth-muted font-mono">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Upcoming Releases */}
            <section className="max-w-4xl mx-auto pb-8">
              <div className="border-t border-moss pt-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber" />
                  Coming Up Next
                </h2>
                <div className="bg-surface border border-moss rounded-lg p-6 mb-6">
                  <CountdownTimer targetDate={upcomingRelease.targetDate} />
                </div>
                <div className="space-y-3">
                  {upcomingRelease.items.map((item, i) => {
                    const typeIcon = item.type === 'Anki Deck' ? '🗂️' : item.type === 'PDF Guide' ? '📄' : '🐍';
                    const itemDate = item.targetDate || upcomingRelease.targetDate;
                    return (
                    <button
                      key={i}
                      onClick={() => setSelectedUpcoming(item)}
                      className="w-full flex items-center gap-4 p-4 bg-surface border border-moss rounded-lg hover:border-amber/30 hover:bg-deep-sage/20 transition-all text-left group relative"
                    >
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber/20 text-amber text-[9px] font-mono uppercase tracking-wider border border-amber/30 rounded">UPCOMING</span>
                      <span className="text-lg flex-shrink-0">{typeIcon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-cream group-hover:text-amber transition-colors">{item.name}</p>
                          <p className="text-xs text-earth-muted">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-[10px] font-mono text-earth-muted whitespace-nowrap">
                            <CountdownTimer targetDate={itemDate} compact />
                          </span>
                          <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber/10 text-amber border border-amber/20">{item.type}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>

      <VideoModal video={selectedVideo!} onClose={closeModal} />
      <ResourceDetailModal resource={selectedResource!} onClose={closeResourceModal} />
      <PdfModal pdf={selectedPdf!} onClose={closePdfModal} onDownload={handleDownload} />
      <AnkiDeckModal deck={selectedDeck!} onClose={closeDeckModal} onDownload={handleDownload} />
      <ScriptModal script={selectedScript!} onClose={closeScriptModal} />
      <UpcomingModal item={selectedUpcoming!} defaultTargetDate={upcomingRelease.targetDate} onClose={closeUpcomingModal} />
    </div>
  );
}

export default Languages;
