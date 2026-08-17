import { Link } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';
import PageBanner from '../components/PageBanner';

const BASE = import.meta.env.BASE_URL;

const NotFound = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-wide mx-auto">
        <PageBanner image={`${BASE}images/rosa-pomponia.jpg`} height="h-64 md:h-[28rem]">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-cream leading-[1.1] font-serif">
            404
          </h1>
        </PageBanner>

        <div className="px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-earth-tan">
              Lost in the Archives
            </h2>
            <p className="text-earth-muted mb-8 font-sans max-w-md mx-auto">
              The page you're looking for seems to have wandered off.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-olive-light text-deep-olive font-sans font-medium rounded hover:bg-olive transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
              <Link
                to="/tags"
                className="flex items-center gap-2 px-6 py-3 border border-moss text-cream font-sans rounded hover:border-tomato hover:text-tomato transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Browse Tags
              </Link>
            </div>

            <div className="divider-center mt-12"></div>

            <p className="text-xs text-earth-muted mt-8 italic">
              "Not all those who wander are lost"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;