import { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-earth-muted font-sans mr-1">Share</span>
      <button
        onClick={handleCopyLink}
        className="p-2 bg-surface border border-border rounded hover:border-olive-light transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-olive-light" /> : <LinkIcon className="w-4 h-4 text-earth-muted hover:text-olive-light" />}
      </button>
    </div>
  );
};

export default ShareButtons;
