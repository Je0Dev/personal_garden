import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { LightboxTrigger } from '../components/Lightbox';
import { posts } from '../data/posts';
import { useToast } from '../components/Toast';

const oldBookImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
];

interface IllustrationItem {
  src: string;
  title: string;
  artist: string;
  year: string;
}

const illustrations: IllustrationItem[] = [
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
    title: 'Perseus & the Gorgons',
    artist: 'Walter Crane',
    year: '1892',
  },
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
    title: 'Knights in Combat',
    artist: 'Thomas W. Phelan',
    year: '1870',
  },
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
    title: 'The Faerie Queene',
    artist: 'Arthur Rackham',
    year: '1896',
  },
  {
    src: 'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
    title: 'The Arrival',
    artist: 'Howard Pyle',
    year: '1885',
  },
];

const getPostForImage = (src: string) => {
  const matchingPosts = posts.filter(p => {
    const imgIndex = oldBookImages.indexOf(src);
    const postIndex = posts.indexOf(p);
    return imgIndex !== -1 && Math.floor(imgIndex % oldBookImages.length) === (postIndex % oldBookImages.length);
  });
  return matchingPosts.length === 1 ? matchingPosts[0] : null;
};

const Home = () => {
  const { addToast } = useToast();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIllustrationLink = (src: string) => {
    const post = getPostForImage(src);
    if (post) {
      return { type: 'post' as const, href: `/blog/${post.slug}`, title: post.title };
    }
    return { type: 'tag' as const, href: `/tags/illustration`, title: 'Browse illustrations' };
  };

  return (
    <div className="pt-20 pb-12">
        <div className="max-w-wide mx-auto px-6">
          {/* Hero Section */}
          <section className="mb-16 pt-8">
            <div className="text-center mb-10">
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
                  Read the Writing
                </Link>
                <Link
                  to="/projects"
                  onClick={scrollToTop}
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-moss text-cream font-sans font-medium rounded hover:border-earth-tan transition-colors text-sm"
                >
                  See the Projects
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-moss text-cream font-sans font-medium rounded hover:border-olive-light hover:text-olive-light transition-colors text-sm"
                >
                  <Download size={16} />
                  Download CV
                </button>
              </div>
            </div>
            
            {/* Featured Illustration */}
            <div className="illustration-container max-w-2xl mx-auto">
              <LightboxTrigger 
                src="https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg"
                alt="Perseus & the Gorgons — Walter Crane, 1892"
                caption="Perseus & the Gorgons — Walter Crane, 1892"
              >
                <img 
                  src="https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg"
                  alt="Antique illustration from Old Book Illustrations"
                  className="w-full rounded-lg shadow-lg"
                  loading="eager"
                />
              </LightboxTrigger>
              <p className="illustration-caption">Perseus & the Gorgons — Walter Crane, 1892</p>
            </div>
          </section>

          {/* Illustration Gallery Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-cream mb-6 flex items-center gap-4">
              Illustrations
              <span className="h-px flex-1 bg-gradient-to-r from-moss to-transparent"></span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {illustrations.map((illustration, index) => {
                const link = getIllustrationLink(illustration.src);
                return (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={scrollToTop}
                    className="group relative block overflow-hidden rounded-lg border border-moss hover:border-earth-tan transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={illustration.src}
                        alt={illustration.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-olive via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="font-serif text-xs font-bold text-cream group-hover:text-tomato transition-colors line-clamp-1 underline-hover">
                        {illustration.title}
                      </p>
                      <p className="font-mono text-[10px] text-earth-muted">
                        {illustration.year}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
          
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
                  <div className="bg-deep-forest border border-moss rounded-lg overflow-hidden hover:border-earth-tan hover:shadow-lg hover:shadow-olive/10 transition-all duration-300 h-full flex flex-col">
                    {/* Image as link */}
                    <div className="overflow-hidden border-b border-moss">
                      <Link to={`/blog/${post.slug}`} className="block aspect-[4/3] overflow-hidden">
                        <img 
                          src={oldBookImages[index % oldBookImages.length]}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                          className="text-earth-tan hover:text-cream hover:text-tomato transition-colors underline-hover"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs font-sans text-earth-muted mt-auto pt-2 border-t border-moss/50">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
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
                    className="group flex items-center justify-between p-3 bg-deep-forest border border-moss rounded-lg hover:bg-deep-sage hover:border-earth-tan transition-colors duration-200"
                  >
                    <span className="font-sans text-sm text-cream group-hover:text-tomato transition-colors truncate mr-2 underline-hover">{tag}</span>
                    <span className="font-mono text-xs text-earth-muted flex-shrink-0">{count}</span>
                  </Link>
                );
              })}
            </div>
          </section>
          
          {/* About Section */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-cream mb-6 flex items-center gap-4">
              About This Site
              <span className="h-px flex-1 bg-gradient-to-r from-moss to-transparent"></span>
            </h2>
            
            <p className="font-sans text-earth-tan leading-relaxed mb-4 max-w-prose">
              This is a digital garden of thoughts on technology, craftsmanship, 
              and the practice of building things that last. Inspired by the 
              quiet web and the joy of making things with intention.
            </p>
            <p className="font-sans text-earth-tan">
              <Link 
                to="/about" 
                onClick={scrollToTop}
                className="text-olive-light hover:text-tomato transition-colors font-medium"
              >
                Learn more about George →
              </Link>
            </p>
          </section>
          
          {/* Ornament */}
          <div className="ornament">George</div>
        </div>
      </div>
  );
};

export default Home;
