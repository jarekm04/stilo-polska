import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ErrorPage } from '@/pages/ErrorPage';
import { LoadingSpinner, SkeletonRealizations } from '@/components/Skeletons';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { BlurImage } from '@/components/fx/BlurImage';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Gallery } from '@/components/Gallery';
import { Post, MediaDetails } from '@/lib/types';
import heroImage from '@/assets/ready3.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

/* trzy wysokości w kółko – siatka przestaje być tabelą, a zostaje czytelna */
const CARD_HEIGHTS = ['h-[20rem]', 'h-[26rem]', 'h-[23rem]'];

const intro = 'W latach 2004–2022 budowaliśmy domy z bali okrągłych, natomiast od roku 2022 budujemy z bali prostokątnych – suszonych i klejonych.';

const gridClasses = 'shell columns-1 gap-6 px-5 py-14 sm:columns-2 sm:px-8 lg:columns-3 lg:px-12 lg:py-16';

const RealizationImage = ({ id, alt }: { id: number; alt: string }) => {
  const perPage = 100;

  const { data, isLoading } = useQuery<MediaDetails>({
    queryKey: ['realizationImage', id, perPage],
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

const RealizationsLoader = () => (
  <section className="flex min-h-screen flex-col bg-cream">
    <PageHero eyebrow="Portfolio" title="Nasze realizacje" image={heroImage}>
      <p className="text-sm font-light leading-relaxed sm:text-base">{intro}</p>
    </PageHero>
    <div className={gridClasses}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mb-6 break-inside-avoid">
          <SkeletonRealizations />
        </div>
      ))}
    </div>
  </section>
);

export const Realizations = () => {
  const categoryId = 4;
  const perPage = 100;

  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['realizations', categoryId, perPage],
    queryFn: () => fetch(`https://stilopolska.pl/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&_fields=id,title`).then((res) => res.json()),
  });
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedTitle, setSelectedTitle] = useState<string>();

  if (error) return <ErrorPage />;

  if (isLoading) return <RealizationsLoader />;

  return (
    <Dialog>
      <section className="flex min-h-screen flex-col bg-cream">
        <PageHero eyebrow="Portfolio" title="Nasze realizacje" image={heroImage}>
          <p className="text-sm font-light leading-relaxed sm:text-base">{intro}</p>
        </PageHero>

        <div className={gridClasses}>
          {data?.map(({ id, title }, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              /* opóźnienie liczone kolumną, nie pozycją na liście – kafle wchodzą falą w bok */
              transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.12 }}
              className="mb-6 break-inside-avoid"
            >
              <DialogTrigger asChild>
                <article
                  className={`group relative flex w-full cursor-pointer flex-col justify-end overflow-hidden rounded-2xl shadow-soft transition-shadow duration-500 ease-smooth hover:shadow-lift ${CARD_HEIGHTS[index % CARD_HEIGHTS.length]}`}
                  onClick={() => {
                    setSelectedId(id);
                    setSelectedTitle(title.rendered);
                  }}
                >
                  <RealizationImage id={id} alt={title.rendered} />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

                  <div className="relative z-10 p-6">
                    <h2 className="text-lg font-normal leading-snug text-white md:text-xl">{title.rendered}</h2>
                    <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-light">
                      Zobacz galerię
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </article>
              </DialogTrigger>
            </motion.div>
          ))}
        </div>

        <CtaBand />
      </section>
      {selectedId && <Gallery id={selectedId} title={selectedTitle} />}
    </Dialog>
  );
};
