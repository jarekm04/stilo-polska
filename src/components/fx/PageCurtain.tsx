import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import logoImage from '@/assets/logo-removedbg.png';

/**
 * Kurtyna przejścia między podstronami.
 *
 * Nowa trasa i kurtyna montują się w tej samej klatce, więc panel zdąży zakryć
 * ekran, zanim cokolwiek zdąży mignąć – a potem zjeżdża w górę, odsłaniając
 * stronę od góry do dołu. Pierwsze wejście na stronę pomijamy: wtedy
 * pierwszeństwo ma animacja hero.
 */
export const PageCurtain = () => {
  const { pathname } = useLocation();
  /* porównanie z poprzednią ścieżką, a nie „czy to pierwszy render” –
     w trybie StrictMode efekt uruchamia się dwa razy i flaga odpalałaby kurtynę od razu */
  const previousPath = useRef(pathname);
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    previousPath.current = pathname;
    setKey(pathname);
  }, [pathname]);

  if (!key) return null;

  return (
    <motion.div
      key={key}
      aria-hidden
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center bg-ink"
    >
      <motion.img
        src={logoImage}
        alt=""
        initial={{ opacity: 0.9, scale: 1 }}
        animate={{ opacity: 0, scale: 1.08 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="h-16 w-auto brightness-0 invert"
      />
    </motion.div>
  );
};
