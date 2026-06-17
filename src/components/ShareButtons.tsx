import { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

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
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-surface border border-border rounded hover:border-olive-light hover:text-olive-light transition-colors"
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}
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
