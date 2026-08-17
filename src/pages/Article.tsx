import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, posts } from '../data/posts';
import PageBanner from '../components/PageBanner';
import ShareButtons from '../components/ShareButtons';
import { renderContent, ArticleMeta } from '../components/article/ArticleContent';
import { ArticleNav, RelatedPosts } from '../components/article/ArticleNav';
import PostDownloads from '../components/article/PostDownloads';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    if (!post) return;
    const headings = contentRef.current?.querySelectorAll('h2[id], h3[id]');
    if (headings) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { rootMargin: '-20% 0% -80% 0%' }
      );
      headings.forEach((heading) => observer.observe(heading));
      return () => observer.disconnect();
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4 text-cream">Article Not Found</h1>
          <p className="text-earth-tan mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-olive-light hover:text-tomato transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  const postIndex = posts.findIndex(p => p.slug === slug);
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <div className="pt-20 pb-16">
      <article>
        <PageBanner image={post.image} height="h-64 md:h-[28rem]">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-cream leading-tight font-serif">
            {post.title}
          </h1>
        </PageBanner>

        <header className="max-w-prose mx-auto px-6 mb-12">
          <nav className="flex items-center gap-2 text-sm text-earth-muted mb-6">
            <Link to="/" className="hover:text-tomato transition-colors">Home</Link>
            <span>/</span>
            <Link to="/tags" className="hover:text-tomato transition-colors">Discover</Link>
            <span>/</span>
            <span className="text-olive-light truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`} className="tag-pill">#{tag}</Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <ArticleMeta post={post} />
            <ShareButtons title={post.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
          </div>
        </header>

        <div className="max-w-wide mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-sans text-sm font-semibold mb-4 text-earth-muted uppercase tracking-wider">Contents</h3>
                <nav className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1 border-l-2 pl-3 transition-colors ${
                        activeSection === item.id ? 'border-olive-light text-cream' : 'border-moss text-earth-tan hover:text-cream hover:border-olive-light'
                      }`}
                      style={{ paddingLeft: `${item.level * 8 + 12}px` }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div ref={contentRef} className="prose max-w-prose">
                {renderContent(post.content)}
              </div>

              <PostDownloads downloads={post.downloads} />
            </div>
          </div>
        </div>
      </article>

      <RelatedPosts posts={relatedPosts} />
      <ArticleNav prevPost={prevPost} nextPost={nextPost} />
    </div>
  );
};

export default Article;
