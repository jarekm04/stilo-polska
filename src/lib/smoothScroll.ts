import { useEffect } from 'react';
import Lenis from 'lenis';

/** Jedna instancja na aplikację – komponenty sięgają po nią przez `smoothScrollTo`. */
let lenis: Lenis | null = null;

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Płynne przewijanie z bezwładnością. Uruchamiane raz, w szablonie strony.
 * Przy `prefers-reduced-motion` nie startuje wcale – zostaje natywny scroll.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.15,
      /* wykładnicze wyhamowanie – szybki start, długi, miękki ogon */
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis = instance;

    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
    };
  }, []);
};

type ScrollOptions = { immediate?: boolean; offset?: number };

/** Przewija do pozycji/elementu – przez Lenis, a bez niego natywnie. */
export const smoothScrollTo = (target: number | string | HTMLElement, { immediate = false, offset = 0 }: ScrollOptions = {}) => {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: immediate ? 'auto' : 'smooth' });
    return;
  }

  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (element) {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + offset, behavior: immediate ? 'auto' : 'smooth' });
  }
};

/** Zatrzymuje/wznawia przewijanie – np. przy otwartym menu albo lightboxie. */
export const setScrollLocked = (locked: boolean) => {
  if (!lenis) return;
  locked ? lenis.stop() : lenis.start();
};
