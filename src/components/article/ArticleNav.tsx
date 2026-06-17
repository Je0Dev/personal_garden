import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Post } from '@/data/posts';

interface ArticleNavProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

export function ArticleNav({ prevPost, nextPost }: ArticleNavProps) {
  return (
    <nav className="mt-16 border-t border-moss pt-8 max-w-wide mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {prevPost ? (
          <Link
            to={`/blog/${prevPost.slug}`}
            className="group flex items-start gap-4 p-4 bg-surface border border-moss rounded-lg hover:border-olive-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-earth-muted group-hover:text-olive-light mt-1 flex-shrink-0 transition-colors" />
            <div>
              <p className="text-xs text-earth-muted font-sans mb-1">Previous</p>
              <p className="font-serif text-cream group-hover:text-olive-light transition-colors">{prevPost.title}</p>
            </div>
          </Link>
        ) : <div />}
        {nextPost ? (
          <Link
            to={`/blog/${nextPost.slug}`}
            className="group flex items-start gap-4 p-4 bg-surface border border-moss rounded-lg hover:border-olive-light transition-colors text-right sm:text-left"
          >
            <div className="flex-1">
              <p className="text-xs text-earth-muted font-sans mb-1">Next</p>
              <p className="font-serif text-cream group-hover:text-olive-light transition-colors">{nextPost.title}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-earth-muted group-hover:text-olive-light mt-1 flex-shrink-0 transition-colors" />
          </Link>
        ) : <div />}
      </div>
    </nav>
  );
}

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="mt-16 border-t border-moss pt-8 max-w-wide mx-auto px-6">
      <h3 className="font-serif text-2xl font-bold text-cream mb-6">
        <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-olive-light">
          Related Reading
        </span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((relatedPost) => (
          <Link
            key={relatedPost.id}
            to={`/blog/${relatedPost.slug}`}
            className="group p-4 bg-surface border border-moss rounded-lg hover:border-olive-light transition-colors"
          >
            <p className="font-serif text-cream group-hover:text-olive-light transition-colors mb-2">{relatedPost.title}</p>
            <p className="text-sm text-earth-muted font-sans">{relatedPost.readTime} · {relatedPost.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
