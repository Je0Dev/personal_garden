import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Gamepad2, ExternalLink } from 'lucide-react';
import { games } from '../data/games';

const BASE = import.meta.env.BASE_URL;

function GameView() {
  const { slug } = useParams<{ slug: string }>();
  const game = games.find(g => g.slug === slug);

  if (!game) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-wide mx-auto px-6 text-center py-24">
          <h1 className="text-4xl font-black font-serif text-cream mb-4">Game Not Found</h1>
          <p className="text-earth-muted mb-8">The game you're looking for doesn't exist.</p>
          <Link
            to="/games"
            className="inline-flex items-center gap-2 px-5 py-3 bg-tomato text-white font-bold rounded hover:opacity-80 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 min-h-screen flex flex-col bg-deep-olive">
      <div className="max-w-wide mx-auto w-full px-6">
        <div className="flex items-center justify-between py-4 border-b border-moss mb-0">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm font-bold text-earth-muted hover:text-cream transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-amber" />
            <span className="text-sm font-medium text-cream">{game.title}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-black mt-0">
        <iframe
          src={`${BASE}games/${game.slug}/index.html`}
          title={game.title}
          className="w-full flex-1 border-0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default GameView;
