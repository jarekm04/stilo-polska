import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ErrorPage } from '@/pages/ErrorPage';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SkeletonRealizations } from '@/components/Skeletons';
import { Footer } from '@/components/Footer';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Gallery } from '@/components/Gallery';
import { Post } from '@/lib/types';

const RealizationsTxt = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="mt-2 text-center text-xl font-light lg:text-2xl">Nasze realizacje</h1>
      <Separator className="h-[2px] w-14 bg-custom-tertiary" />
      <p className="mt-5 w-full px-3 text-sm font-light sm:text-base md:w-[80%] md:px-4">
        W latach 2004 – 2022 budowaliśmy domy z bali okrągłych, natomiast od roku 2022 budujemy z bali prostokątnych – suszonych i klejonych.
      </p>
    </div>
  );
};

const RealizationsLoader = () => {
  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
      <div className="mb-2 flex flex-col items-center gap-7 py-3 md:py-6">
        <RealizationsTxt />
        <section className="flex flex-wrap justify-center gap-5 px-2 sm:px-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonRealizations key={index} />
          ))}
        </section>
      </div>
      <Footer />
    </section>
  );
};

const RealizationImage = ({ id }: { id: number }) => {
  const perPage = 100;

  const { data, isLoading } = useQuery({
    queryKey: ['realizationImage', id, perPage],
    queryFn: () =>
      fetch(`https://jmajchrzak.tech/wp-json/wp/v2/media?parent=${id}&per_page=${perPage}&_fields=media_details&order=asc`).then((res) => res.json()),
  });

  if (!data || data.length === 0 || isLoading) {
    return <></>;
  }

  return (
    <img
      src={data[0]?.media_details.sizes.full.source_url}
      className="h-full max-h-[270px] w-full object-cover transition duration-500 group-hover:scale-110"
      alt="Realization house"
    />
  );
};

export const Realizations = () => {
  const categoryId = 4;
  const perPage = 100;

  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ['realizations', categoryId, perPage],
    queryFn: () => fetch(`https://jmajchrzak.tech/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&_fields=id,title`).then((res) => res.json()),
  });
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedTitle, setSelectedTitle] = useState<string>();

  if (error) return <ErrorPage />;

  if (isLoading) return <RealizationsLoader />;

  return (
    <Dialog>
      <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
        <div className="mb-2 flex flex-col items-center gap-7 py-3 md:py-6">
          <RealizationsTxt />
          <section className="flex flex-wrap justify-center gap-5 px-2 sm:px-4">
            {data?.map(({ id, title }) => (
              <DialogTrigger asChild key={id}>
                <article
                  className={`group grid max-h-[350px] w-[350px] cursor-pointer grid-rows-[7fr_1fr_1fr] overflow-hidden bg-white shadow-xl sm:w-[450px]`}
                  onClick={() => {
                    setSelectedId(id);
                    setSelectedTitle(title.rendered);
                  }}
                >
                  <RealizationImage id={id} />
                  <p className="z-10 flex items-center justify-center bg-white px-2 py-1 text-center text-lg font-light uppercase text-custom-secondary">
                    {title.rendered}
                  </p>
                  <Button
                    variant="link"
                    className="text-xs font-semibold transition-all duration-200 ease-in-out group-hover:text-custom-tertiary group-hover:underline"
                  >
                    Więcej
                  </Button>
                </article>
              </DialogTrigger>
            ))}
          </section>
        </div>
        <Footer />
      </section>
      {selectedId && <Gallery id={selectedId} title={selectedTitle} />}
    </Dialog>
  );
};
