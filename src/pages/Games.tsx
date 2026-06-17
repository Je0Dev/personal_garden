import { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, ArrowRight, Clock } from 'lucide-react';
import { games, upcomingGames, type Game, type UpcomingGame } from '../data/games';
import { GameDetailModal } from '../components/games/GameDetailModal';
import { GameUpcomingModal } from '../components/games/GameUpcomingModal';
import { CountdownTimer } from '../components/languages/CountdownTimer';

const bannerImages = [
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
];

const sneakBanner = 'https://www.oldbookillustrations.com/site/assets/files/14466/rosa-stylosa-1.jpg';

const GAMES_TARGET_DATE = upcomingGames[0]?.targetDate || '2026-09-01T00:00:00';

const typeIcons: Record<string, string> = {
  Game: '🎮',
  'Mini Game': '🕹️',
  Experiment: '🧪',
};

function Games() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedUpcoming, setSelectedUpcoming] = useState<UpcomingGame | null>(null);

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-wide mx-auto">
        <div className="relative w-full h-48 md:h-72 overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-deep-olive via-deep-olive/60 to-transparent z-10" />
          <img src={bannerImages[0]} alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-cream leading-[1.1] md:leading-none font-serif"
              >
                <span className="relative inline-block">
                  Games
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-olive-light to-olive rounded-full" />
                </span>
                <br />
                <span className="text-cream text-3xl md:text-4xl lg:text-5xl font-serif">Playful projects I built</span>
              </motion.h1>
            </div>
          </div>
        </div>

        <div className="px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
            <section className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-earth-tan leading-relaxed">
                Small interactive games I've built to explore ideas, learn new tools, and have fun.
              </p>
            </section>

            <section className="max-w-6xl mx-auto">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif flex items-center gap-3">
                <Gamepad2 className="w-4 h-4 text-amber" />
                Available Games
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map(game => (
                  <button
                    key={game.slug}
                    onClick={() => setSelectedGame(game)}
                    className="group bg-surface border border-moss rounded-lg overflow-hidden hover:border-olive-light hover:bg-deep-sage/30 transition-all text-left w-full relative"
                  >
                    <div className="relative aspect-video bg-deep-olive overflow-hidden">
                      <img src={bannerImages[0]} alt="" loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-olive/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-amber/90 rounded-full flex items-center justify-center group-hover:bg-amber group-hover:scale-110 transition-all shadow-xl">
                          <Gamepad2 className="w-8 h-8 text-deep-olive" />
                        </div>
                      </div>
                      {game.new && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono uppercase tracking-wider border border-emerald-500/30 rounded z-10">NEW</span>
                      )}
                      {game.status && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-tomato/20 text-tomato text-[9px] font-mono uppercase tracking-wider border border-tomato/30 rounded z-10">{game.status}</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold text-cream group-hover:text-olive-light transition-colors">{game.title}</h3>
                      <p className="text-sm text-earth-muted mt-2 leading-relaxed">{game.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {game.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-olive/20 text-olive-light">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber group-hover:text-olive-light transition-colors">
                        View details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Sneak Peek: Upcoming Games */}
            <section className="max-w-4xl mx-auto pb-8">
              <div className="border-t border-moss pt-8">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-muted mb-6 font-serif flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber" />
                  Sneak Peek
                </h2>
                <div className="bg-surface border border-moss rounded-lg p-6 mb-6 relative overflow-hidden">
                  <img src={sneakBanner} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-15" />
                  <div className="absolute inset-0 bg-gradient-to-r from-deep-olive/90 via-deep-olive/70 to-deep-olive/90" />
                  <div className="relative z-10">
                    <CountdownTimer targetDate={GAMES_TARGET_DATE} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {upcomingGames.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedUpcoming(item)}
                      className="flex items-center gap-4 p-4 bg-surface border border-moss rounded-lg hover:border-amber/30 hover:bg-deep-sage/20 transition-all text-left group w-full"
                    >
                      <span className="text-xl flex-shrink-0">{typeIcons[item.type] || '🎮'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium text-cream group-hover:text-amber transition-colors flex items-center gap-2">
                          {item.name}
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Planned</span>
                        </p>
                        <p className="text-xs text-earth-muted mt-0.5">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px] font-mono text-earth-muted whitespace-nowrap">
                          <CountdownTimer targetDate={item.targetDate} compact />
                        </span>
                        <ArrowRight className="w-4 h-4 text-earth-muted group-hover:text-amber transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>

      <GameDetailModal game={selectedGame!} onClose={() => setSelectedGame(null)} />
      <GameUpcomingModal game={selectedUpcoming!} onClose={() => setSelectedUpcoming(null)} />
    </div>
  );
}

export default Games;
