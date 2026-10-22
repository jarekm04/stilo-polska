import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { ErrorPage } from '@/pages/ErrorPage';
import { LoadingSpinner, SkeletonRealizations } from '@/components/Skeletons';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Gallery } from '@/components/Gallery';
import { Post } from '@/lib/types';

const intro = 'W latach 2004–2022 budowaliśmy domy z bali okrągłych, natomiast od roku 2022 budujemy z bali prostokątnych – suszonych i klejonych.';

const RealizationImage = ({ id }: { id: number }) => {
  const perPage = 100;

  const { data, isLoading } = useQuery({
    queryKey: ['realizationImage', id, perPage],
    queryFn: () =>
      fetch(`https://stilopolska.pl/wp-json/wp/v2/media?parent=${id}&per_page=${perPage}&_fields=media_details&orderby=title&order=asc
      `).then((res) => res.json()),
  });

  if (isLoading) return <LoadingSpinner className="absolute inset-0" />;

  if (!data || data.length === 0) return <></>;

  return (
    <img
      src={data[0]?.media_details.sizes.medium_large ? data[0]?.media_details.sizes.medium_large.source_url : data[0]?.media_details.sizes.full.source_url}
      className="h-full w-full object-cover transition-transform duration-1000 ease-smooth group-hover:scale-[1.08]"
      alt="Zrealizowany dom z bala"
      loading="lazy"
    />
  );
};

const RealizationsLoader = () => (
  <section className="flex min-h-screen flex-col bg-cream">
    <PageHero eyebrow="Portfolio" title="Nasze realizacje">
      <p className="text-sm font-light leading-relaxed text-ink/65 sm:text-base">{intro}</p>
    </PageHero>
    <div className="shell flex flex-wrap justify-center gap-6 px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonRealizations key={index} />
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
        <PageHero eyebrow="Portfolio" title="Nasze realizacje">
          <p className="text-sm font-light leading-relaxed text-ink/65 sm:text-base">{intro}</p>
        </PageHero>

        <div className="shell grid grid-cols-1 gap-6 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-12 lg:py-16">
          {data?.map(({ id, title }, index) => (
            <Reveal key={id} delay={(index % 3) * 90} className="h-full">
              <DialogTrigger asChild>
                <article
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift"
                  onClick={() => {
                    setSelectedId(id);
                    setSelectedTitle(title.rendered);
                  }}
                >
                  <div className="relative h-[240px] overflow-hidden bg-sand">
                    <RealizationImage id={id} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-3 p-6">
                    <h2 className="text-lg font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-brand">{title.rendered}</h2>
                    <span className="mt-auto inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand">
                      Zobacz galerię
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </article>
              </DialogTrigger>
            </Reveal>
          ))}
        </div>

        <CtaBand />
      </section>
      {selectedId && <Gallery id={selectedId} title={selectedTitle} />}
    </Dialog>
  );
};
