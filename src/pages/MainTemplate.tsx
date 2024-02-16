import { Outlet } from 'react-router-dom';
import { Header } from '@/components/features/Header';
import { Arrow } from '@/components/features/Arrow';

export const MainTemplate = () => {
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
