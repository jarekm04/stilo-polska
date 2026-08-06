import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Ile procent elementu musi być widoczne, aby uruchomić animację. */
  threshold?: number;
  /** Margines wokół viewportu – ujemny dół opóźnia start do momentu realnego wejścia w kadr. */
  rootMargin?: string;
  /** Czy animacja ma się powtarzać przy każdym wejściu w kadr. */
  once?: boolean;
};

/**
 * Odsłania element po wejściu w kadr. Zwraca ref oraz flagę widoczności,
 * używaną razem z klasami `reveal` / `reveal-in` z index.css.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true }: Options = {}) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    /* Bez IntersectionObserver pokazujemy treść od razu – nigdy nie zostawiamy jej ukrytej. */
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
};
