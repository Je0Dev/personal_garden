import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { posts } from '../data/posts';
import { useToast } from '../components/Toast';
import NewsletterForm from '../components/NewsletterForm';
import PageBanner from '../components/PageBanner';

const BASE = import.meta.env.BASE_URL;

const Home = () => {
  const { addToast } = useToast();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-12">
        <div className="max-w-wide mx-auto px-6">
          {/* Hero Section */}
          <PageBanner image={`${BASE}images/new-star.jpg`}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-cream">
              Building
              <span className="block">
                <Link to="/tags" onClick={scrollToTop} className="text-olive-light hover:text-tomato transition-colors">
                  thoughtfully
                </Link>
              </span>
            </h1>
            <p className="font-sans text-base text-earth-tan max-w-prose mx-auto mb-6">
              Full-stack developer sharing insights on technology, craftsmanship, 
              and the quiet joy of making things that last.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link 
                to="/tags"
                onClick={scrollToTop}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-olive-light text-deep-olive font-sans font-medium rounded hover:bg-olive transition-colors text-sm"
              >
                Read the Discover
              </Link>
              <button
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = `${import.meta.env.BASE_URL}my_cv_v1.5.pdf`;
                  a.download = 'George_Mastrogiannis_CV.pdf';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  addToast('CV downloaded successfully!', 'success');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-moss text-cream font-sans font-medium rounded hover:border-tomato hover:text-tomato transition-colors text-sm"
              >
                <Download size={16} />
                Download CV
              </button>
            </div>
          </PageBanner>

          {/* Recent Writing Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-cream mb-6 flex items-center gap-4">
              Recent Writing
              <span className="h-px flex-1 bg-gradient-to-r from-moss to-transparent"></span>
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts.slice(0, 8).map((post, index) => (
                <article
                  key={post.id}
                  className="group"
                >
                  <div className="bg-deep-forest border border-moss rounded-lg overflow-hidden hover:border-olive-light transition-colors duration-200 h-full flex flex-col">
                    {/* Image as link */}
                    <div className="overflow-hidden border-b border-moss">
                      <Link to={`/blog/${post.slug}`} className="block aspect-[4/3] overflow-hidden">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Link
                            key={tag}
                            to={`/tags/${encodeURIComponent(tag)}`}
                            className="tag-pill text-[10px] px-1.5 py-0.5"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                      
                      {/* Title with underline effect */}
                      <h3 className="font-serif text-base font-bold mb-2 line-clamp-2 flex-1">
                        <Link 
                          to={`/blog/${post.slug}`} 
                          className="text-earth-tan group-hover:text-olive-light transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs font-sans text-earth-muted mt-auto pt-2 border-t border-moss/50">
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          
          {/* Browse Topics Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-cream mb-6 flex items-center gap-4">
              Browse by Topic
              <span className="h-px flex-1 bg-gradient-to-r from-moss to-transparent"></span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {Array.from(new Set(posts.flatMap(p => p.tags))).map((tag) => {
                const count = posts.filter(p => p.tags.includes(tag)).length;
                return (
                  <Link
                    key={tag}
                    to={`/tags/${encodeURIComponent(tag)}`}
                    className="group flex items-center justify-between p-3 bg-deep-forest border border-moss rounded-lg hover:border-olive-light transition-colors duration-200"
                  >
                    <span className="font-sans text-sm text-cream group-hover:text-olive-light transition-colors truncate mr-2">{tag}</span>
                    <span className="font-mono text-xs text-earth-muted flex-shrink-0">{count}</span>
                  </Link>
                );
              })}
            </div>
          </section>
          
          {/* Newsletter */}
          <section className="max-w-2xl mx-auto mb-16 pt-16 border-t border-moss">
            <div className="p-6 md:p-10 bg-surface border-b-2 border-moss rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-black text-cream mb-4 font-serif">
                Subscribe to the newsletter
              </h2>
              <p className="text-earth-tan mb-6 leading-relaxed">
                Get weekly insights on software development, embedded systems, and systems programming.
                No spam, just quality content.
              </p>
              <NewsletterForm />
              <p className="mt-4 text-xs text-earth-muted font-serif">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </section>

          {/* Ornament */}
          <div className="ornament">George's Garden</div>
        </div>
      </div>
  );
};

export default Home;
