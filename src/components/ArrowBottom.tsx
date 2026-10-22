import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronsDown } from 'lucide-react';

export const ArrowBottom = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && pathname === '/') {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const handleChevronsClick = () => {
    window.scrollTo({
      top: window.scrollY + 450,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        type="button"
        aria-label="Przewiń w dół"
        className="group fixed bottom-9 left-8 z-20 hidden flex-col items-center gap-2 md:flex lg:left-12"
        onClick={handleChevronsClick}
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white">Przewiń</span>
        <ChevronsDown className="h-6 w-6 animate-moveChevronsDown text-white/80 transition-colors group-hover:text-brand" strokeWidth={1.5} />
      </button>
    )
  );
};
