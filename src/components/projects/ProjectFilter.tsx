import { X } from 'lucide-react';
import { getTagColor } from '@/data/tag-colors';

interface ProjectFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  onClearTags: () => void;
}

const ProjectFilter = ({ tags, selectedTags, onTagClick, onClearTags }: ProjectFilterProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-sans text-xs text-earth-muted uppercase tracking-wider mr-2">Filter:</span>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`text-xs font-mono px-3 py-1 rounded-full border transition-all ${
              selectedTags.includes(tag)
                ? 'bg-olive/30 border-olive-light text-olive-light'
                : 'bg-surface border-border text-earth-muted hover:border-earth-tan hover:text-cream'
            }`}
            style={selectedTags.includes(tag) ? { borderColor: getTagColor(tag), color: getTagColor(tag) } : {}}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="flex items-center gap-1 text-xs text-tomato hover:text-tomato-light transition-colors font-sans ml-2"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilter;
