import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { ArrowTop } from '@/components/ArrowTop';
import { ArrowBottom } from '@/components/ArrowBottom';
import { GrainOverlay } from '@/components/fx/GrainOverlay';
import { PageCurtain } from '@/components/fx/PageCurtain';
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
      <Header />
      <ScrollProgress />

      <motion.main key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
        <Outlet />
      </motion.main>

      <ArrowTop />
      <ArrowBottom />
      <PageCurtain />
      <GrainOverlay />
    </div>
  );
};
