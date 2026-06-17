import { ExternalLink, Sparkles } from 'lucide-react';
import type { Resource, ResourceType } from '../../data/languageResources';

const typeIcons: Record<ResourceType, string> = {
  Video: '🎬',
  Podcast: '🎙️',
  Reading: '📖',
  App: '📱',
  Tools: '🔧',
  Grammar: '📝',
  AI: '🤖',
  Translation: '🌐',
};

export function ResourceCard({ name, desc, url, type, details, onShowDetail }: Resource & { onShowDetail: (r: Resource) => void }) {
  const hasDetails = details && details.pros && details.pros.length > 0;
  return (
    <button
      onClick={() => hasDetails ? onShowDetail({ name, desc, url, type, details }) : window.open(url, '_blank', 'noopener')}
      className="group flex items-start gap-3 p-3 rounded-lg bg-deep-olive/50 border border-moss hover:border-olive-light hover:bg-deep-sage/50 transition-all text-left w-full"
    >
      <span className="text-lg flex-shrink-0 mt-0.5">{typeIcons[type]}</span>
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-medium text-cream group-hover:text-olive-light transition-colors flex items-center gap-1">
          {name}
          {hasDetails ? (
            <Sparkles className="w-3 h-3 text-amber ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          ) : (
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </p>
        <p className="text-xs text-earth-muted mt-0.5 line-clamp-1">{desc}</p>
      </div>
    </button>
  );
}
