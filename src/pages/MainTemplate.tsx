import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/features/Footer';
import { Header } from '@/components/features/Header';

export const MainTemplate = () => {
  return (
    <div>
      <Header />
      <main className='animate-custom-appear'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
