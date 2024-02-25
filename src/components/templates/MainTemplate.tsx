import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/features/Header';
import { Arrow } from '@/components/features/Arrow';

export const MainTemplate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative">
      <Header />
      <main className="animate-custom-appear">
        <Outlet />
      </main>
      <Arrow />
    </div>
  );
};
