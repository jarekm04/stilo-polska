import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ErrorPage } from '@/pages/ErrorPage';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { BlurImage } from '@/components/fx/BlurImage';
import { Reveal } from '@/components/Reveal';
import { LoadingSpinner, SkeletonOffers } from '@/components/Skeletons';
import { Post, MediaDetails } from '@/lib/types';
import heroImage from '@/assets/offer1.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

/* trzy wysokości w kółko – siatka przestaje być tabelą, a zostaje czytelna */
const CARD_HEIGHTS = ['h-[22rem]', 'h-[28rem]', 'h-[25rem]'];

const OfferIntro = () => (
  <div className="shell flex flex-col gap-5 px-5 pt-16 text-sm font-light leading-relaxed text-ink/65 sm:px-8 sm:text-[0.95rem] lg:px-12">
    <Reveal>
      <p>
        Budujemy przede wszystkim z drewna świerkowego, które charakteryzuje się stosunkowo małą ilością słoi oraz naturalnych pęknięć. Drewno jest suszone w
        specjalnych komorach, a następnie klejone do pożądanego wymiaru. Po procesie technologicznym uzyskuje wilgotność na poziomie 15–16%. Bale wykonywane są
        w technologii prostokątnej, obrabiane na maszynach CNC. Najczęściej stosowane grubości bali to 20 i 24 cm przy wysokości 26 cm. Aby sprostać
        oczekiwaniom klientów, jesteśmy w stanie sprowadzić drewno o większych wymiarach. Dzięki zastosowanej technologii osiadanie bali jest znikome i po
        wybudowaniu stanu surowego otwartego można właściwie od razu przystąpić do prac wykończeniowych.
      </p>
    </Reveal>
    <Reveal delay={90}>
      <p>Posiadamy wyspecjalizowane ekipy monterskie, które są w stanie sprostać największym wymaganiom projektowym.</p>
    </Reveal>
    <Reveal delay={140}>
      <p>
        Na terenie placu budowy operujemy własnymi dźwigami, dzięki czemu nie ogranicza nas czas na solidne i dokładne wykonanie zlecenia. Posiadamy również
        domek socjalny dla pracowników, tak aby nie obciążać inwestora dodatkowymi kosztami.
      </p>
    </Reveal>
  </div>
);

const gridClasses = 'shell columns-1 gap-6 px-5 py-14 sm:columns-2 sm:px-8 lg:columns-3 lg:px-12 lg:py-16';

const OfferImage = ({ id, alt }: { id: number; alt: string }) => {
  const perPage = 100;

  const { data, isLoading } = useQuery<MediaDetails>({
    queryKey: ['offerImage', id, perPage],
    queryFn: () =>
      fetch(`https://stilopolska.pl/wp-json/wp/v2/media?parent=${id}&per_page=${perPage}&_fields=media_details&orderby=title&order=asc
    `).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner className="absolute inset-0" />;

  const sizes = data?.[0]?.media_details.sizes;

  if (!sizes) return <></>;

  return (
    <BlurImage
      src={sizes.medium_large ? sizes.medium_large.source_url : sizes.full.source_url}
      placeholder={sizes.thumbnail?.source_url}
      alt={alt}
      className="transition-transform duration-1000 ease-smooth group-hover:scale-[1.07]"
    />
  );
};

const OfferLoader = () => (
  <section className="flex min-h-screen flex-col bg-cream">
    <PageHero eyebrow="Nasza oferta" title="Domy z bala szyte na miarę" image={heroImage} />
    <OfferIntro />
    <div className={gridClasses}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mb-6 break-inside-avoid">
          <SkeletonOffers />
        </div>
      ))}
    </div>
  </section>
);

export const Offer = () => {
  const categoryId = 5;
  const perPage = 100;

  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['offer', categoryId, perPage],
    queryFn: () =>
      fetch(`https://stilopolska.pl/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&_fields=id,title,content`).then((res) => res.json()),
  });
  const navigate = useNavigate();

  const getHeading = (text: string) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(text, 'text/html');
    const headingElement = htmlDoc.querySelector('h2');

    if (headingElement && headingElement.textContent) {
      return headingElement.textContent;
    }
  };

  if (error) return <ErrorPage />;

  if (isLoading) return <OfferLoader />;

  return (
    <section className="flex min-h-screen flex-col bg-cream">
      <PageHero eyebrow="Nasza oferta" title="Domy z bala szyte na miarę" image={heroImage} />
      <OfferIntro />

      <div className={gridClasses}>
        {data?.map(({ id, title, content }, index) => (
          <motion.article
            key={id}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            /* opóźnienie liczone kolumną, nie pozycją na liście – kafle wchodzą falą w bok */
            transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.12 }}
            className={`group relative mb-6 flex w-full cursor-pointer break-inside-avoid flex-col justify-end overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 ease-smooth hover:shadow-lift ${CARD_HEIGHTS[index % CARD_HEIGHTS.length]}`}
            onClick={() => navigate(`/oferta/${id}`)}
          >
            <OfferImage id={id} alt={title.rendered} />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

            {getHeading(content.rendered) && (
              <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                {getHeading(content.rendered)}
              </span>
            )}

            <div className="relative z-10 p-6">
              <h2 className="capitalize-first text-lg font-normal lowercase leading-snug text-white md:text-xl">{title.rendered}</h2>
              <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-light">
                Zobacz szczegóły
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      <CtaBand />
    </section>
  );
};
