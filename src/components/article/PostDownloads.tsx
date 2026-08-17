import { Download } from 'lucide-react';
import type { PostDownload } from '@/data/posts';

interface PostDownloadsProps {
  downloads?: PostDownload[];
}

const BASE = import.meta.env.BASE_URL;

const PostDownloads = ({ downloads }: PostDownloadsProps) => {
  if (!downloads || downloads.length === 0) return null;
  return (
    <div className="mt-10 max-w-prose">
      <h3 className="font-serif text-xl font-bold text-cream mb-4">
        <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-olive-light">
          Downloads
        </span>
      </h3>
      <div className="space-y-3">
        {downloads.map((item, index) => (
          <a
            key={index}
            href={`${BASE}files/${item.file}`}
            download
            className="link-card flex items-start gap-3"
          >
            <Download className="w-4 h-4 text-tomato mt-1 flex-shrink-0" />
            <div>
              <p className="link-card-title">{item.name}</p>
              <p className="link-card-desc">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PostDownloads;