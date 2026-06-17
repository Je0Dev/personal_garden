import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUp, ExternalLink, X } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';
import ProjectFilter from '../components/projects/ProjectFilter';

const oldBookImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
];

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [columns, setColumns] = useState(4);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter(p => selectedTags.some(tag => p.tags.includes(tag)));
  }, [selectedTags]);

  useEffect(() => {
    if (headerRef.current) headerRef.current.style.opacity = '1';
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 768) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(4);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedProject) {
      if (e.key === 'Escape') setSelectedProject(null);
      return;
    }
    if (selectedIndex === -1) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); setSelectedIndex(prev => Math.min(prev + 1, filteredProjects.length - 1)); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); setSelectedIndex(prev => Math.max(prev - 1, 0)); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(prev => Math.min(prev + columns, filteredProjects.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(prev => Math.max(prev - columns, 0)); }
    else if (e.key === 'Enter' && filteredProjects[selectedIndex]) { e.preventDefault(); setSelectedProject(filteredProjects[selectedIndex]); }
    else if (e.key === 'Escape') setSelectedIndex(-1);
  }, [selectedIndex, columns, selectedProject, filteredProjects]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (selectedIndex !== -1 && cardsRef.current) {
      const card = cardsRef.current.children[selectedIndex] as HTMLElement;
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    setSelectedIndex(-1);
  };

  const clearTags = () => setSelectedTags([]);

  const getTagsTitle = () => {
    if (selectedTags.length === 0) return null;
    return (
      <>
        <span className="text-earth-muted mx-2">/</span>
        {selectedTags.map((t, i) => (
          <span key={t}>{i > 0 && <span className="text-earth-muted"> / </span>}<span className={i === 0 ? 'text-tomato' : 'text-olive-light'}>{t}</span></span>
        ))}
      </>
    );
  };

  return (
    <div className="pt-20 pb-16">
      <header ref={headerRef} className="pb-8 px-6 opacity-0 transition-opacity duration-500">
        <div className="max-w-wide mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-cream">
              Open Source <span className="text-olive-light underline-hover">Projects</span>
              {getTagsTitle()}
            </h1>
            <p className="font-sans text-base text-earth-tan max-w-2xl mx-auto">
              {selectedTags.length > 0
                ? `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} tagged with "${selectedTags.join('" or "')}"`
                : <>A collection of tools built to <strong className="text-cream">learn</strong>, <strong className="text-cream">experiment</strong>, and <strong className="text-cream">solve problems</strong>. Each project is an exercise in <Link to="/tags/craftsmanship" className="text-olive-light hover:text-tomato">craftsmanship</Link>.</>
              }
            </p>
            {selectedTags.length === 0 && (
              <p className="font-sans text-sm text-earth-muted mt-3">
                Find me on <a href="https://github.com/Je0Dev" target="_blank" rel="noopener noreferrer" className="text-olive-light hover:text-tomato">GitHub</a> or browse by <Link to="/tags" className="text-olive-light hover:text-tomato">topic</Link>.
              </p>
            )}
          </div>
          {selectedTags.length === 0 && (
            <div className="illustration-container max-w-xl mx-auto">
              <img src={oldBookImages[0]} alt="Antique illustration" className="w-full rounded-lg shadow-md" loading="eager" />
              <p className="illustration-caption">Forging code, one project at a time</p>
            </div>
          )}
        </div>
      </header>

      <div className="px-6">
        <div className="max-w-wide mx-auto">
          <ProjectFilter tags={allTags} selectedTags={selectedTags} onTagClick={handleTagClick} onClearTags={clearTags} />

          <div className="flex items-center justify-between mb-4">
            <p className="font-sans text-earth-muted text-sm">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {selectedTags.length > 0 && ` matching ${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''}`}
            </p>
            <div className="flex items-center gap-2 text-xs text-earth-muted font-mono">
              <span className="flex items-center gap-1"><ArrowLeft className="w-3 h-3" /><ArrowRight className="w-3 h-3" /> navigate</span>
              <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /> up/down</span>
              <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> select</span>
            </div>
          </div>

          <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedIndex === index}
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseLeave={() => setSelectedIndex(-1)}
                onCardClick={() => setSelectedProject(project)}
                onTagClick={handleTagClick}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-earth-tan mb-4">No projects found with the selected tags.</p>
              <button onClick={clearTags} className="inline-flex items-center gap-2 text-olive-light hover:text-tomato transition-colors">
                <X className="w-4 h-4" />Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default Projects;
