import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Wskazuje, który z obserwowanych elementów jest „tym czytanym”.
 *
 * Wygrywa ten, którego środek leży najbliżej linii odniesienia (domyślnie 45%
 * wysokości okna). To jedna, deterministyczna odpowiedź niezależna od tego, ile
 * elementów akurat widać i jak bardzo się różnią wysokością.
 *
 * Progowy `IntersectionObserver` się tu nie sprawdza: przy różnych wysokościach
 * kilka elementów bywa „w kadrze” naraz, a wygrywa ten, który zgłosił się ostatni –
 * stąd brało się podświetlanie na przeskok.
 */
export const useActiveIndex = (count: number, anchor = 0.45) => {
  const elements = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const line = window.innerHeight * anchor;
      let best = 0;
      let bestDistance = Infinity;

      elements.current.forEach((element, index) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - line);

        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });

      setActiveIndex((previous) => (previous === best ? previous : best));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count, anchor]);

  /** Podpinane jako `ref` kolejnych elementów listy. */
  const register = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      elements.current[index] = element;
    },
    [],
  );

  return { activeIndex, register };
};
