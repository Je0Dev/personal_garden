import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface ViewCountProps {
  slug: string;
}

const ViewCount = ({ slug }: ViewCountProps) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const storageKey = `views_${slug}`;
    const storedViews = localStorage.getItem(storageKey);
    
    if (storedViews) {
      const parsedViews = parseInt(storedViews, 10);
      setViews(parsedViews);
      localStorage.setItem(storageKey, String(parsedViews + 1));
    } else {
      const baseViews = Math.floor(Math.random() * 50) + 10;
      setViews(baseViews);
      localStorage.setItem(storageKey, String(baseViews + 1));
    }
  }, [slug]);

  return (
    <div className="flex items-center gap-1.5 text-earth-muted text-sm">
      <Eye className="w-4 h-4" />
      <span className="font-mono">{views}</span>
      <span className="hidden sm:inline">views</span>
    </div>
  );
};

export default ViewCount;
