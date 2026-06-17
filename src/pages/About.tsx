import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Twitter, Gitlab, ExternalLink, Globe, Mail, GraduationCap, Cpu, Send, Check } from 'lucide-react';
import { posts } from '../data/posts';
import ContactForm from '../components/ContactForm';

const GITHUB_USERNAME = 'Je0Dev';
const YEARS = [2026, 2025];

const BUTTONDOWN_USERNAME = import.meta.env.VITE_BUTTONDOWN_USERNAME || '';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/Je0Dev', icon: Github },
  { name: 'GitLab', url: 'https://gitlab.com/mag30-admin', icon: Gitlab },
  { name: 'Codeberg', url: 'https://codeberg.org/Je0Dev', icon: Globe },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/geomas', icon: Linkedin },
  { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
  { name: 'Mastodon', url: 'https://mastodon.social/@Je0Dev', icon: Globe },
  { name: 'Personal Site', url: 'https://je0dev.github.io/personal_website/', icon: ExternalLink },
  { name: 'Lang App', url: 'https://je0dev.github.io/lang_website/', icon: Globe },
];

const bannerImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
];

const totalArticles = posts.length;
const totalReadTime = posts.reduce((acc, post) => {
  const minutes = parseInt(post.readTime);
  return acc + (isNaN(minutes) ? 0 : minutes);
}, 0);

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    if (BUTTONDOWN_USERNAME) {
      try {
        const response = await fetch(
          `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ email }),
          }
        );
        if (response.ok) {
          setStatus('success');
          setMessage('Thanks for subscribing!');
          setEmail('');
        } else {
          setStatus('error');
          setMessage('Something went wrong. Try again later.');
        }
      } catch {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    } else {
      setTimeout(() => {
        setStatus('success');
        setMessage(`Thanks for subscribing! We'll send updates to ${email}.`);
        setEmail('');
      }, 800);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 text-olive-light p-4 bg-olive/10 rounded-lg">
        <Check className="w-5 h-5 flex-shrink-0" />
        <span className="font-sans text-sm">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 bg-deep-olive border-b-2 border-moss text-cream focus:outline-none focus:border-olive-light/50 transition-all font-mono text-sm rounded placeholder:text-earth-muted/50"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-gradient-to-r from-olive-light to-olive text-deep-olive font-bold hover:opacity-90 hover:underline hover:decoration-2 hover:decoration-deep-olive hover:underline-offset-4 transition-all shadow-lg shadow-olive/20 rounded disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <span className="w-4 h-4 border-2 border-deep-olive border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Subscribe
          </>
        )}
      </button>
      {status === 'error' && (
        <p className="text-tomato text-sm mt-2">{message}</p>
      )}
    </form>
  );
}

function ContributionGraph() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [Calendar, setCalendar] = useState<any>(null);

  useEffect(() => {
    import('react-github-calendar').then(mod => setCalendar(() => mod.GitHubCalendar));
  }, []);

  if (!Calendar) {
    return (
      <div className="text-center py-8">
        <div className="w-6 h-6 border-2 border-olive-light border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-earth-muted font-sans text-xs">Loading contributions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2">
        {YEARS.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedYear === year
                ? 'bg-olive-light text-deep-olive'
                : 'text-earth-muted hover:text-olive-light hover:bg-olive/10'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-surface border border-moss overflow-x-auto p-4">
        <Calendar
          username={GITHUB_USERNAME}
          year={selectedYear}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          showWeekdayLabels={false}
          showTotalCount={true}
        />
      </div>
    </div>
  );
}

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-wide mx-auto">
        {/* Banner */}
        <div className="relative w-full h-48 md:h-72 overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-deep-olive via-deep-olive/60 to-transparent z-10" />
          <img
            src={bannerImages[0]}
            alt=""
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-cream leading-[1.1] md:leading-none font-serif"
              >
                <span className="relative inline-block">
                  Welcome to my
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-olive-light to-olive rounded-full" />
                </span>
                <br />
                <span className="text-cream">digital garden</span>
              </motion.h1>
            </div>
          </div>
        </div>

        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            {/* University Badges */}
            <section className="max-w-4xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-earth-muted">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-surface border-b-2 border-moss hover:border-olive-light hover:text-olive-light transition-all group">
                  <GraduationCap size={14} className="text-olive-light" />
                  <a href="https://www.uop.gr/" target="_blank" rel="noopener noreferrer" className="hover:text-olive-light transition-colors">
                    University of Peloponnese
                  </a>
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-surface border-b-2 border-moss hover:border-olive-light hover:text-olive-light transition-all group">
                  <Cpu size={14} className="text-earth-brown" />
                  <a href="https://ece.uop.gr/" target="_blank" rel="noopener noreferrer" className="hover:text-olive-light transition-colors">
                    ECE Department
                  </a>
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </section>

            {/* Introduction */}
            <section className="space-y-6 text-lg md:text-xl text-earth-tan leading-relaxed max-w-4xl text-center">
              <p>
                I'm <strong className="text-cream font-serif">George (Je0Dev)</strong>, an Electrical & Computer Engineering student at the{' '}
                <a href="https://www.uop.gr/" target="_blank" rel="noopener noreferrer" className="text-olive-light hover:underline hover:decoration-2 hover:decoration-olive-light hover:underline-offset-4 transition-all">
                  University of Peloponnese
                </a> — obsessed with the intersection of hardware and software.
              </p>

              <p>
                Currently exploring{' '}
                <span className="text-olive-light font-serif underline decoration-earth-brown decoration-2 underline-offset-4 hover:decoration-olive-light cursor-pointer transition-all" onClick={() => navigate('/tags/Embedded Systems')}>
                  embedded systems
                </span>,{' '}
                <span className="text-earth-brown font-serif underline decoration-earth-brown/50 decoration-2 underline-offset-4 hover:decoration-earth-brown cursor-pointer transition-all" onClick={() => navigate('/tags/Web Development')}>
                  web development
                </span>, and{' '}
                <span className="text-tomato font-serif underline decoration-tomato/50 decoration-2 underline-offset-4 hover:decoration-tomato cursor-pointer transition-all" onClick={() => navigate('/tags/Systems Programming')}>
                  systems programming
                </span>.
              </p>

              <p>
                This digital garden is where I document my{' '}
                <span className="text-olive-light font-serif underline decoration-earth-brown decoration-2 underline-offset-4 hover:decoration-olive-light cursor-pointer transition-all" onClick={() => navigate('/tags')}>projects</span>,{' '}
                <span className="text-earth-brown font-serif underline decoration-earth-brown/50 decoration-2 underline-offset-4 hover:decoration-earth-brown cursor-pointer transition-all" onClick={() => navigate('/tags/Learning')}>learning journey</span>, and{' '}
                <span className="text-tomato font-serif underline decoration-tomato/50 decoration-2 underline-offset-4 hover:decoration-tomato cursor-pointer transition-all" onClick={() => navigate('/tags/Software')}>software builds</span>.
              </p>

              <p>
                I believe in{' '}
                <span className="text-olive-light font-serif underline decoration-olive-light/50 decoration-2 underline-offset-4 hover:decoration-olive-light cursor-pointer transition-all" onClick={() => window.open('https://github.com/Je0Dev', '_blank')}>open-source software</span> and{' '}
                <span className="text-earth-brown font-serif underline decoration-earth-brown/50 decoration-2 underline-offset-4 hover:decoration-earth-brown cursor-pointer transition-all" onClick={() => navigate('/tags/Embedded Systems')}>rigorous engineering</span>.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Rust', 'Go', 'Zig', 'C++', 'C#', 'Python', 'TypeScript'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => navigate(`/tags/${lang}`)}
                    className="px-3 py-1 text-xs font-bold border-b-2 border-moss bg-surface text-earth-muted hover:border-olive-light hover:text-olive-light transition-all group"
                  >
                    <span className="text-olive-light">#</span>{lang}
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-olive-light">→</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Stats */}
            <section className="max-w-4xl mx-auto">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors text-center">
                  <div className="font-serif text-3xl font-bold text-tomato mb-2">{totalArticles}</div>
                  <p className="font-sans text-earth-tan text-sm">Articles</p>
                </div>
                <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors text-center">
                  <div className="font-serif text-3xl font-bold text-olive-light mb-2">{totalReadTime}</div>
                  <p className="font-sans text-earth-tan text-sm">Minutes Read</p>
                </div>
                <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors text-center">
                  <div className="font-serif text-3xl font-bold text-cream mb-2">6</div>
                  <p className="font-sans text-earth-tan text-sm">Projects</p>
                </div>
              </div>
            </section>

            {/* GitHub Contributions */}
            <section className="max-w-4xl pt-16 border-t border-moss">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif">GitHub Activity</h2>
              <ContributionGraph />
            </section>

            {/* Latest Posts */}
            <section className="max-w-4xl pt-16 border-t border-moss">
              <div className="relative overflow-hidden mb-6 rounded-lg">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src={bannerImages[3]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface" />
                <h2 className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted font-serif px-4 py-6">Latest from the garden</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {posts.slice(0, 3).map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6 bg-surface border-b-2 border-moss hover:border-olive-light transition-all"
                  >
                    <div className="w-full md:w-32 h-24 md:h-20 overflow-hidden bg-surface-2 flex-shrink-0 rounded-lg">
                      <img src={post.image} alt="" loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-xl font-bold font-serif text-cream group-hover:text-olive-light group-hover:underline group-hover:decoration-2 group-hover:decoration-tomato group-hover:underline-offset-4 transition-all">{post.title}</h3>
                      <p className="text-sm text-earth-muted mt-1">{post.date} · {post.readTime}</p>
                    </div>
                    <ArrowRight className="hidden md:block w-5 h-5 text-earth-muted group-hover:text-cream group-hover:translate-x-2 transition-all" />
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/tags" className="inline-flex items-center gap-3 px-6 py-3 bg-tomato text-white font-black hover:opacity-80 transition-all group rounded-lg">
                  Explore the full garden <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* Design References */}
            <section className="max-w-4xl pt-16 border-t border-moss">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif">
                Design References
                <span className="text-[8px] text-earth-muted normal-case tracking-normal font-medium font-serif ml-4">inspiration for this site</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Manuel Moreale', url: 'https://manuelmoreale.com/' },
                  { name: 'Anthony Nelzin', url: 'https://anthonynelzin.com/' },
                  { name: 'Sébastien Ronsse', url: 'https://ronsse.net/' },
                  { name: 'Josh Comeau', url: 'https://joshcomeau.com/' },
                  { name: 'Lee Robinson', url: 'https://leerob.io/' },
                  { name: 'Rich Harris', url: 'https://rich-harris.com/' },
                ].map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-4 py-2 text-sm font-bold bg-surface border-b-2 border-moss hover:border-olive-light hover:bg-olive/5 transition-all"
                  >
                    <span className="font-serif text-earth-muted group-hover:text-cream group-hover:underline group-hover:decoration-2 group-hover:decoration-olive-light group-hover:underline-offset-4 transition-all">
                      {link.name}
                    </span>
                    <span className="absolute top-1 right-1 text-[8px] text-olive-light opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Social Links */}
            <section className="max-w-4xl pt-16 border-t border-moss">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif">Connect with me</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SOCIAL_LINKS.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-4 py-3 bg-surface border-b-2 border-moss hover:border-olive-light hover:bg-olive/5 transition-all"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <link.icon size={18} className="text-earth-muted group-hover:text-olive-light transition-colors" />
                      <span className="text-sm font-bold text-cream group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 transition-all">
                        {link.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-olive-light/20 transition-all pointer-events-none" />
                  </a>
                ))}
              </div>
            </section>

            {/* Newsletter */}
            <section className="max-w-4xl pt-16 border-t border-moss">
              <div className="p-6 md:p-10 bg-surface border-b-2 border-moss relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src={bannerImages[2]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface" />
                <div className="max-w-xl relative z-10">
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
              </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-4xl pt-8 pb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif">Get in Touch</h2>
              <ContactForm />
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
