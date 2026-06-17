import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onCardClick: () => void;
  onTagClick: (tag: string) => void;
}

const ProjectCard = ({ project, isSelected, onMouseEnter, onMouseLeave, onCardClick, onTagClick }: ProjectCardProps) => {
  return (
    <div
      onClick={onCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group p-5 bg-surface border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-olive-light bg-surface-2 translate-y-[-2px] shadow-lg'
          : 'border-border hover:border-earth-tan hover:bg-surface-2'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-serif font-bold transition-colors ${isSelected ? 'text-olive-light' : 'text-cream group-hover:text-olive-light'}`}>
          {project.title}
        </h3>
        <ExternalLink className={`w-4 h-4 flex-shrink-0 transition-colors ${isSelected ? 'text-olive-light' : 'text-earth-muted'}`} />
      </div>
      <p className="text-sm text-earth-muted font-sans mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
            className="text-xs font-mono px-2 py-0.5 rounded bg-olive/20 text-olive-light/70 hover:bg-olive/30 hover:text-olive-light cursor-pointer transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 text-xs text-earth-muted hover:text-olive-light transition-colors"
      >
        <Github className="w-3.5 h-3.5" />
        View on GitHub
      </a>
    </div>
  );
};

export default ProjectCard;
