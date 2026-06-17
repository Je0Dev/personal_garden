import { ExternalLink, Github } from 'lucide-react';
import type { ExternalLink as ExternalLinkType, ProjectLink } from '@/data/posts';

interface ExternalLinksProps {
  links: ExternalLinkType[];
}

export function ExternalLinks({ links }: ExternalLinksProps) {
  if (!links || links.length === 0) return null;
  return (
    <div className="mt-12 max-w-prose">
      <h3 className="font-serif text-xl font-bold text-cream mb-4">
        <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-olive-light">
          Further Reading
        </span>
      </h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-start gap-3"
          >
            <ExternalLink className="w-4 h-4 text-olive-light mt-1 flex-shrink-0" />
            <div>
              <p className="link-card-title">{link.title}</p>
              <p className="link-card-desc">{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

interface ProjectLinksProps {
  links: ProjectLink[];
}

export function ProjectLinks({ links }: ProjectLinksProps) {
  if (!links || links.length === 0) return null;
  return (
    <div className="mt-8 max-w-prose">
      <h3 className="font-serif text-xl font-bold text-cream mb-4">
        <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-tomato">
          Related Projects
        </span>
      </h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-start gap-3"
          >
            <Github className="w-4 h-4 text-tomato mt-1 flex-shrink-0" />
            <div>
              <p className="link-card-title">{link.name}</p>
              <p className="link-card-desc">{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
