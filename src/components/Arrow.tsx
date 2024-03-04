import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const Arrow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  const onAnimationEnd = () => {
    if (!isVisible) setShouldRender(false);
  };

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    shouldRender && (
      <div
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-custom-secondary transition-all hover:scale-110 ${isVisible ? 'animate-fadeIn opacity-100' : 'animate-fadeOut opacity-0'}`}
        onClick={scrollToTop}
        onAnimationEnd={onAnimationEnd}
      >
        <ArrowUp className="h-2/3 w-2/3 text-white" />
      </div>
    )
  );
};
