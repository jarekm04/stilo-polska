import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Realizations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jmajchrzak.tech/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col items-center gap-7 bg-gradient-to-b from-white to-orange-50 py-8">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="mt-2 text-center text-2xl font-light">Nasze realizacje</h1>
        <Separator className="h-[2px] w-60 bg-custom-tertiary" />
      </div>
      <section className="grid grid-cols-1 gap-5 px-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 15 }).map((_, index) => (
          <article className={`group grid cursor-pointer grid-rows-[5fr_1fr_1fr] overflow-hidden bg-white shadow-xl`} key={index}>
            <img src="/src/assets/ready1.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
            <p className="flex items-center justify-center p-1 text-center text-lg font-light uppercase text-custom-secondary">Dom całoroczny 145m2</p>
            <Button
              variant="link"
              className="text-xs font-semibold transition-all duration-200 ease-in-out group-hover:text-custom-tertiary group-hover:underline"
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
