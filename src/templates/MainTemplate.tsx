import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ArrowTop } from '@/components/ArrowTop';
import { FooterReveal } from '@/components/FooterReveal';
import { GrainOverlay } from '@/components/fx/GrainOverlay';
import { ScrollProgress } from '@/components/fx/ScrollProgress';
import { smoothScrollTo, useSmoothScroll } from '@/lib/smoothScroll';

export const MainTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useSmoothScroll();

  useEffect(() => {
    /* bez `immediate` Lenis dojeżdżałby na górę już po odsłonięciu kurtyny */
    smoothScrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const path = queryParams.get('path');

    if (path) {
      navigate(path);
    }
  }, [location.search, navigate]);

  return (
    <div className="relative">
      <a href="#tresc" className="skip-link">
        Przejdź do treści
      </a>
      <Header />
      <ScrollProgress />

      {/* Własna warstwa i nieprzezroczyste tło – treść ma przykrywać stopkę,
          która leży przyklejona pod nią (patrz FooterReveal).
          Bez animacji krycia: półprzezroczysta treść przepuszczałaby tę stopkę
          na wierzch przy każdym wejściu na stronę. Wejście grają sekcje. */}
      <main id="tresc" className="relative z-10 bg-cream">
        <Outlet />
      </main>

      <FooterReveal />

      <ArrowTop />
      <GrainOverlay />
    </div>
  );
};
