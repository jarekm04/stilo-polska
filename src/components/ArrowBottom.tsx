import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { smoothScrollTo } from '@/lib/smoothScroll';

export const ArrowBottom = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY < 40 && pathname === '/');

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Przewiń w dół"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="group fixed bottom-9 left-8 z-20 hidden flex-col items-center gap-3 md:flex lg:left-12"
          onClick={() => smoothScrollTo(window.innerHeight)}
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors group-hover:text-white [writing-mode:vertical-rl]">
            Przewiń
          </span>
          {/* kreska spływająca w dół – spokojniejsza niż skaczące strzałki */}
          <span className="relative block h-16 w-px overflow-hidden bg-white/20">
            <motion.span
              className="absolute inset-x-0 top-0 block h-1/2 bg-brand"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.9, ease: 'easeInOut', repeat: Infinity }}
            />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
