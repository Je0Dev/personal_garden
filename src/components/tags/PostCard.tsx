import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import type { Post } from '@/data/posts';

interface PostCardProps {
  post: Post;
  imageSrc: string;
}

const PostCard = ({ post, imageSrc }: PostCardProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-surface border border-border rounded-lg overflow-hidden hover:border-olive-light transition-all duration-200"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={imageSrc}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs font-mono px-1.5 py-0.5 rounded bg-olive/20 text-olive-light/70">
              #{tag}
            </span>
          ))}
        </div>
        <h3 className="font-serif font-bold text-cream group-hover:text-olive-light transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-earth-muted font-sans line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-earth-muted">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
