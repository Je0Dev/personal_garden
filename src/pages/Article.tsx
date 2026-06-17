import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, posts } from '../data/posts';
import Newsletter from '../components/Newsletter';
import ShareButtons from '../components/ShareButtons';
import { renderContent, ArticleMeta } from '../components/article/ArticleContent';
import { ExternalLinks, ProjectLinks } from '../components/article/ArticleLinks';
import { ArticleNav, RelatedPosts } from '../components/article/ArticleNav';
import ArticleGallery from '../components/article/ArticleGallery';

const galleryImages = [
  { src: 'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg', title: 'Perseus & the Gorgons', year: '1892' },
  { src: 'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg', title: 'Knights in Combat', year: '1870' },
  { src: 'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg', title: 'The Faerie Queene', year: '1896' },
  { src: 'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg', title: 'The Arrival', year: '1885' },
];

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    if (!post) return;
    const headings = contentRef.current?.querySelectorAll('h2[id]');
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
  const heroImage = galleryImages[postIndex % galleryImages.length].src;
  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return (
    <div className="pt-20 pb-16">
      <article>
        <header className="max-w-prose mx-auto px-6 mb-12">
          <nav className="flex items-center gap-2 text-sm text-earth-muted mb-6">
            <Link to="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <Link to="/tags" className="hover:text-cream transition-colors">Writing</Link>
            <span>/</span>
            <span className="text-olive-light truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`} className="tag-pill">#{tag}</Link>
            ))}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-cream">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <ArticleMeta post={post} />
            <ShareButtons title={post.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
          </div>
        </header>

        <div className="max-w-prose mx-auto px-6 mb-12">
          <div className="illustration-container">
            <img src={heroImage} alt={post.title} className="w-full rounded-lg shadow-lg" loading="eager" />
            <p className="illustration-caption">Illustration from Old Book Illustrations</p>
          </div>
        </div>

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
                        activeSection === item.id ? 'border-olive-light text-cream' : 'border-moss text-earth-tan hover:text-cream hover:border-earth-tan'
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

              <ExternalLinks links={post.externalLinks} />
              <ProjectLinks links={post.projectLinks} />
              <ArticleGallery images={galleryImages} />

              <div className="mt-12 max-w-prose"><Newsletter /></div>

              <div className="mt-12 pt-8 border-t border-moss max-w-prose">
                <h3 className="font-sans text-sm font-semibold mb-3 text-earth-muted uppercase tracking-wider">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`} className="tag-pill">#{tag}</Link>
                  ))}
                </div>
              </div>
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
