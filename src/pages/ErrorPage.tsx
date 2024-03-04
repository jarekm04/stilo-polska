import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import detective from '@/assets/detective.png';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="grid h-screen grid-rows-2 gap-6 p-10 sm:grid-cols-2 sm:grid-rows-1 md:place-items-center">
      <article className="flex flex-col items-center gap-4 p-7">
        <h1 className="text-center text-4xl font-extrabold">Wystąpił błąd</h1>
        <Separator className="bg-custom-tertiary" />
        <p className="text-center text-lg font-medium">Wygląda na to, że nie mamy tego czego szukasz!</p>
        <Button className="animate-custom-appear bg-custom-tertiary hover:bg-custom-ninth" onClick={() => navigate('/')}>
          Wróć do strony głównej
        </Button>
      </article>
      <aside className="flex items-center justify-center">
        <img src={detective} alt="detective" className="h-auto w-full object-contain" />
      </aside>
    </section>
  );
};
