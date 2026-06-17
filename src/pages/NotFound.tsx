import { Link } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';
import { LightboxTrigger } from '../components/Lightbox';

const oldBookImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
];

const NotFound = () => {
  return (
    <div className="min-h-screen bg-deep-olive flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-2xl">
        <div className="illustration-container mb-8 max-w-md mx-auto">
          <LightboxTrigger 
            src={oldBookImages[3]}
            alt="Lost wanderer"
            caption="A wanderer searching for their path"
          >
            <img 
              src={oldBookImages[3]}
              alt="Lost wanderer illustration"
              className="w-full rounded-lg shadow-lg opacity-80"
            />
          </LightboxTrigger>
        </div>
        
        <h1 className="font-serif text-8xl sm:text-9xl font-bold text-cream mb-4 opacity-50">
          404
        </h1>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-earth-tan">
          Lost in the Archives
        </h2>
        <p className="text-earth-muted mb-8 font-sans max-w-md mx-auto">
          The page you're looking for seems to have wandered off, much like a tome left open
          on a library table, waiting to be rediscovered.
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
            className="flex items-center gap-2 px-6 py-3 border border-moss text-cream font-sans rounded hover:border-earth-tan transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Browse Tags
          </Link>
        </div>
        
        <div className="divider-center mt-12"></div>
        
        <p className="text-xs text-earth-muted mt-8 italic">
          "Not all those who wander are lost" — but some pages still are.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
