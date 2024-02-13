import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/features/Footer';
import { Header } from '@/components/features/Header';
import { Arrow } from '@/components/common/Arrow';

export const MainTemplate = () => {
  return (
    <div className="relative">
      <Header />
      <main className="animate-custom-appear">
        <Outlet />
      </main>
      <Footer />
      <Arrow />
    </div>
  );
};
