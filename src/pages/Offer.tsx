import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ErrorPage } from '@/pages/ErrorPage';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/Footer';
import { SkeletonOffers } from '@/components/Skeletons';
import { extractHeading, extractImages } from '@/lib/utils';
import { Post } from '@/lib/types';

const OfferLoader = () => {
  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
      <div className="flex flex-col items-center gap-2 py-3 md:gap-7 lg:py-6">
        <OfferTxt />
        <div className="grid grid-cols-1 place-content-center gap-5 px-8 py-8 md:grid-cols-2 lg:grid-cols-3 lg:px-14">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonOffers key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

const OfferTxt = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="mt-2 text-center text-xl font-light md:text-2xl">Oferta</h1>
      <Separator className="h-[2px] w-14 bg-custom-tertiary" />
      <p className="mt-5 w-full px-3 text-sm font-light sm:text-base md:w-[90%] md:px-4">
        Budujemy generalnie z drewna świerkowego, które charakteryzuje się stosunkowo małą ilością słoi oraz naturalnych pęknięć. Drewno jest suszone w
        specjalnych komorach, a następnie klejone do pożądanego wymiaru. Po procesie technologicznym uzyskuje wilgotność na poziomie 15-16 %. Bale wykonywane są
        w technologii prostokątnej, obrabiane na maszynach CNC. Najczęściej stosowane grubości bali to 20 i 24 cm i wysokości 26 cm. Aby jednak sprostać
        oczekiwaniom niektórych klientów jesteśmy w stanie sprowadzić drewno o większych wymiarach. Dzięki zastosowanej technologii osiadanie bali jest znikome
        i po wybudowaniu stanu surowego otwartego można właściwie od razu przytępić do prac wykończeniowych.
      </p>
      <p className="w-full px-3 text-sm font-light sm:text-base md:w-[90%] md:px-4">
        Posiadamy wyspecjalizowane ekipy monterskie, które są w stanie sprostać największym wymaganiom projektowym.
      </p>
      <p className="w-full px-3 text-sm font-light sm:text-base md:w-[90%] md:px-4">
        Na terenie placu budowy operujemy własnymi dźwigami, dzięki czemu nie ogranicza nas czas na solidne i dokładne wykonanie zlecenia. Posiadamy również
        domek socjalny dla pracowników, tak aby nie obciążać inwestora dodatkowymi kosztami. Ekipa monterska przebywa na placu budowy właściwie przez 24 godziny
        na dobę.
      </p>
      <p className="w-full px-3 text-sm font-light sm:text-base md:w-[90%] md:px-4">
        Poza realizacją indywidualnych projektów, oferujemy szeroką gamę propozycji przygotowanych przez współpracujące z nami od wielu lat biuro projektowe -{' '}
        <Link to="https://tinyurl.com/yc3htpw3" target="_blank" className="text-custom-tertiary underline">
          Cdom
        </Link>
        .
      </p>
    </div>
  );
};

const categoryId = 3;
const perPage = 100;

export const Offer = () => {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['offer'],
    queryFn: () => fetch(`https://jmajchrzak.tech/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}`).then((res) => res.json()),
  });
  const navigate = useNavigate();

  if (error) return <ErrorPage />;

  if (isLoading) return <OfferLoader />;

  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
      <div className="flex flex-col items-center gap-2 py-3 md:gap-7 lg:py-6">
        <OfferTxt />
        <div className="grid grid-cols-1 place-content-center gap-5 px-8 py-8 md:grid-cols-2 lg:grid-cols-3 lg:px-14">
          {data?.map(({ id, title, content }) => (
            <article
              key={id}
              className={`shadow-blue-gray-900/50 group relative flex min-h-60 max-w-[450px] cursor-pointer select-none flex-col items-center justify-end gap-2 shadow-xl`}
              onClick={() => navigate(`/offer/${id}`)}
            >
              {extractImages(content.rendered)
                .slice(0, 1)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center brightness-75 transition-all group-hover:brightness-100"
                    alt={`Offer house - ${index}`}
                  />
                ))}
              <p className="capitalize-first mb-6 px-2 text-center text-lg lowercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {title.rendered}
              </p>
              <p className="text-md absolute right-0 top-0 bg-gray-500 px-1 text-center font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {extractHeading(content.rendered)}
              </p>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};
