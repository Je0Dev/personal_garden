import { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate, compact }: { targetDate: string; compact?: boolean }) {
  const target = new Date(targetDate).getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const isPast = diff === 0;

  if (compact) {
    if (isPast) return <span className="text-emerald-400 font-mono">Now available</span>;
    return (
      <span className="font-mono text-earth-muted">
        {days > 0 ? `${days}d ` : ''}
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    );
  }

  return (
    <div className="text-center">
      <p className="text-xs text-earth-muted font-mono uppercase tracking-wider mb-3">
        {isPast ? 'Now available' : 'Next release in'}
      </p>
      {isPast ? (
        <p className="text-xl font-bold text-amber font-serif">Check the new resources above!</p>
      ) : (
        <div className="flex items-center justify-center gap-4">
          {[{ v: days, l: 'Days' }, { v: hours, l: 'Hours' }, { v: minutes, l: 'Minutes' }, { v: seconds, l: 'Seconds' }].map(u => (
            <div key={u.l} className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-deep-olive border border-moss rounded-lg flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold font-mono text-amber">{String(u.v).padStart(2, '0')}</span>
              </div>
              <p className="text-[9px] text-earth-muted font-mono uppercase tracking-wider mt-1">{u.l}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
