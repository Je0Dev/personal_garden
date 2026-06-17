import { X } from 'lucide-react';
import { getTagColor } from '@/data/tag-colors';

interface TagCount {
  name: string;
  count: number;
  color: string;
}

interface TagFilterProps {
  tags: TagCount[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
}

const TagFilter = ({ tags, selectedTags, onToggleTag, onClearTags }: TagFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => onToggleTag(tag.name)}
            className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-sans transition-all ${
              selectedTags.includes(tag.name)
                ? 'bg-olive/20 border-olive-light text-olive-light'
                : 'bg-surface border-border text-earth-muted hover:border-earth-tan hover:text-cream'
            }`}
            style={selectedTags.includes(tag.name) ? { borderColor: tag.color, color: tag.color } : {}}
          >
            <span>{tag.name}</span>
            <span className={`text-xs opacity-60 ${selectedTags.includes(tag.name) ? '' : 'group-hover:opacity-100'}`}>
              ({tag.count})
            </span>
          </button>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <button
          onClick={onClearTags}
          className="mt-3 flex items-center gap-1 text-sm text-tomato hover:text-tomato-light transition-colors font-sans"
        >
          <X className="w-4 h-4" /> Clear all filters
        </button>
      )}
    </div>
  );
};

export default TagFilter;
