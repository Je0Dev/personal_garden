import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const GITHUB_USERNAME = 'Je0Dev';
const GITHUB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const GITHUB_USER_API = `https://api.github.com/users/${GITHUB_USERNAME}`;

export default function GitHubCalendarComponent() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [totals, setTotals] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState<{ public_repos: number; followers: number; following: number } | null>(null);
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

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-earth-muted font-sans text-xs">{error}</p>
      </div>
    );
  }

  if (!years.length) {
    return (
      <div className="text-center py-8">
        <div className="w-6 h-6 border-2 border-olive-light border-t-transparent animate-spin mx-auto mb-2" />
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
          <div key={stat.label} className="border border-moss  p-4 text-center">
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
            className={`px-3 py-1.5 text-xs font-bold  transition-colors ${
              selectedYear === year
                ? 'bg-olive-light text-deep-olive'
                : 'bg-surface border border-moss text-earth-muted hover:border-olive-light hover:text-cream'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      <div className=" bg-surface border border-moss overflow-x-auto p-4">
        <GitHubCalendar
          username={GITHUB_USERNAME}
          year={selectedYear ?? undefined}
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