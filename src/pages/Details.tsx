import { useEffect, useState } from 'react';
import { ArrowLeft, Expand } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Gallery } from '@/components/Gallery';
import { SkeletonDetails } from '@/components/Skeletons';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import { MediaDetails } from '@/lib/types';

const DetailsImages = ({
  postId,
  setStartIndex,
  setMainImage,
}: {
  postId?: string;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  setMainImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const perPage = 100;

  const { data, error, isLoading } = useQuery<MediaDetails>({
    queryKey: ['detailsImages', postId, perPage],
    queryFn: () =>
      fetch(`https://stilopolska.pl/wp-json/wp/v2/media?parent=${postId}&per_page=${perPage}&_fields=media_details&orderby=title&order=asc
    `).then((res) => res.json()),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setMainImage(data[0].media_details.sizes.full.source_url);
    }
  }, [data, setMainImage]);

  if (error) return <ErrorPage />;

  if (isLoading) return <></>;

  return (
    <div className="shell grid grid-cols-1 gap-5 px-5 py-14 sm:grid-cols-2 sm:px-8 md:grid-cols-3 lg:px-12 lg:py-16">
      {data?.map((item, index) => (
        <Reveal key={index} delay={(index % 3) * 80}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative block h-[240px] w-full overflow-hidden rounded-2xl shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift"
              onClick={() => setStartIndex(index)}
              aria-label={`Otwórz zdjęcie ${index + 1} w galerii`}
            >
              <img
                src={item.media_details.sizes.medium_large ? item.media_details.sizes.medium_large.source_url : item.media_details.sizes.full.source_url}
                className="h-full w-full object-cover transition-transform duration-1000 ease-smooth group-hover:scale-[1.08]"
                alt={`Zdjęcie realizacji ${index + 1}`}
                loading="lazy"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <Expand className="h-5 w-5 text-white" />
                </span>
              </span>
            </button>
          </DialogTrigger>
        </Reveal>
      ))}
    </div>
  );
};

export const Details = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [mainImage, setMainImage] = useState<string>();
  const [heading, setHeading] = useState<string>('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const postId = pathname.split('/').pop();

  const { data, error, isLoading } = useQuery({
    queryKey: ['details', postId],
    queryFn: () =>
      fetch(`https://stilopolska.pl/wp-json/wp/v2/posts/${postId}?_fields=id,content,title`).then((res) =>
        res.json().then((data) => {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(data.content.rendered, 'text/html');
          const headingElement = htmlDoc.querySelector('h2');

          if (headingElement && headingElement.textContent) {
            setHeading(headingElement.textContent);
          }
          return data;
        }),
      ),
  });

  if (error) return <ErrorPage />;

  if (isLoading) return <SkeletonDetails />;

  return (
    <Dialog>
      <section className="mt-20 flex min-h-screen flex-col bg-cream">
        <div className="relative flex h-[340px] w-full items-end overflow-hidden md:h-[440px]">
          {mainImage && <img className="absolute inset-0 h-full w-full object-cover" src={mainImage} alt="" aria-hidden />}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/40" />

          <div className="shell relative w-full px-5 pb-10 sm:px-8 lg:px-12">
            <button
              type="button"
              onClick={() => navigate('/oferta')}
              className="group mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Powrót do oferty
            </button>

            {heading && <span className="eyebrow mb-3 text-brand-light before:bg-brand-light/60">{heading}</span>}

            <h1 className="max-w-3xl text-3xl font-normal uppercase leading-[1.1] text-white text-shadow-soft sm:text-4xl md:text-5xl">{data?.title.rendered}</h1>
          </div>
        </div>

        <DetailsImages postId={postId} setStartIndex={setStartIndex} setMainImage={setMainImage} />

        <CtaBand />
      </section>

      <Gallery id={Number(postId)} title={data?.title.rendered} startIndex={startIndex} />
    </Dialog>
  );
};
