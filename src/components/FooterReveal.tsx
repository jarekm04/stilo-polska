import { useLayoutEffect, useRef, useState } from 'react';
import { Footer } from '@/components/Footer';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';

/**
 * Stopka odsłaniana spod treści.
 *
 * Stopka stoi przyklejona do dołu okna, a treść strony przykrywa ją swoim tłem
 * i wyższą warstwą. Pod koniec przewijania dolna krawędź treści unosi się
 * i stopka wychodzi spod niej – jakby cały czas tam leżała.
 *
 * Dlatego ten komponent musi być RODZEŃSTWEM `<main>`, a nie jego dzieckiem:
 * element pozycjonowany wewnątrz treści rysowałby się nad nią, nie pod.
 *
 * Gdy stopka nie mieści się w oknie (telefon, niskie okno), efekt odpada –
 * przyklejona treść wyższa niż ekran byłaby nie do przewinięcia.
 */
export const FooterReveal = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [{ height, viewport }, setSize] = useState({ height: 0, viewport: 0 });
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useLayoutEffect(() => {
    const measure = () => {
      const element = innerRef.current;

      if (!element) return;

      const next = { height: element.offsetHeight, viewport: window.innerHeight };

      /* bez porównania każde drgnięcie obserwatora wymuszałoby nowy render */
      setSize((previous) => (previous.height === next.height && previous.viewport === next.viewport ? previous : next));
    };

    measure();

    const observer = new ResizeObserver(measure);

    if (innerRef.current) observer.observe(innerRef.current);
    window.addEventListener('resize', measure);
    /* pierwszy pomiar łapie stopkę przed dojściem krojów i logo – stąd dwa domiary */
    window.addEventListener('load', measure);
    document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  const canReveal = isDesktop && height > 0 && height <= viewport;

  return (
    <div className="relative" style={canReveal ? { height } : undefined}>
      <div ref={innerRef} className={cn('w-full', canReveal && 'fixed bottom-0 left-0 z-0')}>
        <Footer />
      </div>
    </div>
  );
};
