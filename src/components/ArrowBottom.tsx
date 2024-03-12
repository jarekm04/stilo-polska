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
      <div className="fixed bottom-10 right-10 animate-moveChevronsDown cursor-pointer" onClick={handleChevronsClick}>
        <ChevronsDown className="h-10 w-10 text-white" />
      </div>
    )
  );
};
