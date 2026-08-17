import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = () => {
    scrollToTop();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-deep-olive">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-moss">
          <Link 
            to="/" 
            className="font-serif text-xl font-semibold text-cream"
            onClick={handleNavClick}
          >
            George
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-earth-tan hover:text-tomato transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-6 py-8">
          <ul className="space-y-6">
            {[
              { name: 'Home', path: '/' },
              { name: 'Discover', path: '/tags' },
              { name: 'About', path: '/about' },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block font-serif text-3xl transition-colors ${location.pathname === item.path ? 'text-olive-light underline underline-offset-8' : 'text-cream hover:text-tomato'}`}
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="px-6 py-8 border-t border-moss">
          <p className="text-xs text-earth-muted text-center">
            A digital garden by George
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
