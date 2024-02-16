import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Realizations = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-64px)] flex-col gap-5 bg-orange-50 py-8">
      <h1 className="mb-4 mt-8 text-center text-2xl font-light">Nasze gotowe realizacje</h1>
      <section className="grid grid-cols-1 gap-5 px-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 15 }).map((_, index) => (
          <article className={`group grid cursor-pointer grid-rows-[3fr_1fr_1fr] overflow-hidden bg-white p-4`} key={index}>
            <img src="/src/assets/ready1.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
            <p className="text-custom-secondary flex items-center justify-center p-1 text-center text-lg font-light uppercase">Dom całoroczny 145m2</p>
            <Button
              variant="link"
              className="group-hover:text-custom-tertiary text-xs font-semibold transition-all duration-200 ease-in-out group-hover:underline"
              onClick={() => navigate('/realizations')}
            >
              Więcej
            </Button>
          </article>
        ))}
      </section>
    </section>
  );
};
