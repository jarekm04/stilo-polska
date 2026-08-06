import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ArrowTop } from '@/components/ArrowTop';
import { ArrowBottom } from '@/components/ArrowBottom';

export const MainTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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
      <main className="animate-custom-appear">
        <Outlet />
      </main>
      <ArrowTop />
      <ArrowBottom />
    </div>
  );
};
