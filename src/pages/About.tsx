import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MoveRight } from 'lucide-react';
import { posts } from '../data/posts';
import PageBanner from '../components/PageBanner';

const GITHUB_USERNAME = 'Je0Dev';
const GITHUB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const GITHUB_USER_API = `https://api.github.com/users/${GITHUB_USERNAME}`;

const BASE = import.meta.env.BASE_URL;
const bannerImages = [
  `${BASE}images/new-star.jpg`,
  `${BASE}images/kamchatka-rose.jpg`,
  `${BASE}images/shipwrecked-sailor.jpg`,
  `${BASE}images/tavern-old-knew.jpg`,
  `${BASE}images/new-star.jpg`,
  `${BASE}images/kamchatka-rose.jpg`,
];

const totalArticles = posts.length;

function ContributionGraph() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [totals, setTotals] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<{ public_repos: number; followers: number; following: number } | null>(null);
  const [Calendar, setCalendar] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(GITHUB_API).then(r => r.json()),
      fetch(GITHUB_USER_API).then(r => r.json()),
    ])
      .then(([data, profileData]) => {
        if (cancelled) return;
        const totalsRaw: Record<string, number> = data?.total || {};
        const yearKeys = Object.keys(totalsRaw)
          .filter(y => /^\d{4}$/.test(y))
          .sort((a, b) => Number(b) - Number(a))
          .map(Number);
        setYears(yearKeys);
        setTotals(totalsRaw);
        setSelectedYear(prev => prev ?? yearKeys[0] ?? new Date().getFullYear());
        if (profileData && typeof profileData.public_repos === 'number') {
          setProfile(profileData);
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not load GitHub contribution data.');
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    import('react-github-calendar').then(mod => setCalendar(() => mod.GitHubCalendar));
  }, []);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-earth-muted font-sans text-xs">{error}</p>
      </div>
    );
  }

  if (!Calendar || !years.length) {
    return (
      <div className="text-center py-8">
        <div className="w-6 h-6 border-2 border-olive-light border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-earth-muted font-sans text-xs">Loading contributions...</p>
      </div>
    );
  }

  const stats = [
    { label: 'Contributions', value: selectedYear !== null ? (totals[selectedYear] ?? 0) : 0 },
    { label: 'Public Repos', value: profile?.public_repos ?? '—' },
    { label: 'Followers', value: profile?.followers ?? '—' },
    { label: 'Following', value: profile?.following ?? '—' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(stat => (
          <div key={stat.label} className="border border-moss rounded-lg p-4 text-center">
            <div className="font-serif text-2xl font-bold text-cream">{stat.value}</div>
            <p className="font-sans text-xs font-bold text-earth-muted mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              selectedYear === year
                ? 'bg-olive-light text-deep-olive'
                : 'bg-surface border border-moss text-earth-muted hover:border-olive-light hover:text-cream'
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
          showWeekdayLabels={['mon', 'wed', 'fri']}
          showMonthLabels={true}
          showTotalCount={true}
          labels={{ totalCount: '{{count}} contributions in {{year}}' }}
          tooltips={{
            activity: {
              text: (activity: { date: string; count: number }) => {
                const date = new Date(`${activity.date}T00:00:00`);
                const label = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                return `${activity.count} ${activity.count === 1 ? 'contribution' : 'contributions'} on ${label}`;
              },
            },
          }}
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
        <PageBanner image={bannerImages[0]} height="h-64 md:h-[28rem]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-cream leading-[1.1] md:leading-none font-serif"
          >
            <span className="relative inline-block">
              About <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-tomato"></span>
            </span>
            <br />
          </motion.h1>
        </PageBanner>

        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            {/* Introduction */}
            <section className="space-y-6 text-lg md:text-xl text-earth-tan leading-relaxed max-w-4xl mx-auto text-center">
              <p>
                I'm <strong className="text-cream font-serif">George Mastrogiannis</strong>, an Electrical & Computer Engineering student at the University of Peloponnese — trying to appreciate more and more the importance
                of hardware and software.
              </p>

              <p>
                Currently exploring a lot of things, some of those being {' '}
                <span className="text-olive-light font-serif underline decoration-[var(--clr-underline)] decoration-2 underline-offset-4 cursor-pointer transition-all" onClick={() => navigate('/tags/Embedded')}>
                  embedded systems
                </span> and{' '}
                <span className="text-tomato font-serif underline decoration-[var(--clr-underline)] decoration-2 underline-offset-4 cursor-pointer transition-all" onClick={() => navigate('/tags/Systems Programming')}>
                  systems programming
                </span> and a lot more as well.
              </p>

              <p>
                This digital garden is where I document my{' '}
                <span className="text-olive-light font-serif underline decoration-[var(--clr-underline)] decoration-2 underline-offset-4 cursor-pointer transition-all" onClick={() => navigate('/tags')}>projects</span>,{' '}
                <span className="text-earth-brown font-serif underline decoration-[var(--clr-underline)] decoration-2 underline-offset-4 cursor-pointer transition-all" onClick={() => navigate('/tags/Language Learning')}>learning journey</span>, and{' '}
                <span className="text-tomato font-serif underline decoration-[var(--clr-underline)] decoration-2 underline-offset-4 cursor-pointer transition-all" onClick={() => navigate('/tags/Craftsmanship')}>software builds</span>.
              </p>

              <p>
                I believe in{' '}
                <span className="text-olive-light font-serif underline decoration-[var(--clr-underline)] decoration-2 underline-offset-4 cursor-pointer transition-all" onClick={() => window.open('https://github.com/Je0Dev', '_blank')}>open-source software</span> and{' '}
                <span className="text-earth-brown font-serif underline decoration-[var(--clr-underline)] decoration-2 underline-offset-4 cursor-pointer transition-all" onClick={() => navigate('/tags/Embedded')}>rigorous engineering</span>.
              </p>
            </section>

            {/* Stats */}
            <section className="max-w-4xl mx-auto">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors text-center">
                  <div className="font-serif text-3xl font-bold text-tomato mb-2">{totalArticles}</div>
                  <p className="font-sans text-earth-tan text-sm font-bold">Articles</p>
                </div>
                <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors text-center">
                  <div className="font-serif text-3xl font-bold text-olive-light mb-2">4</div>
                  <p className="font-sans text-earth-tan text-sm font-bold">Languages Absorbed</p>
                </div>
                <div className="border border-moss rounded-lg p-6 hover:border-olive-light transition-colors text-center">
                  <div className="font-serif text-3xl font-bold text-green-500 mb-2">Happy</div>
                  <p className="font-sans text-earth-tan text-sm font-bold mb-5">Mood</p>
                  <div className="relative">
                    <div className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />
                    <MoveRight
                      className="w-4 h-4 text-green-500 absolute -top-1"
                      style={{ left: '88%', transform: 'translateX(-50%)' }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* GitHub Contributions */}
            <section className="max-w-4xl mx-auto pt-16 border-t border-moss">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif text-center">GitHub Activity</h2>
              <ContributionGraph />
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
