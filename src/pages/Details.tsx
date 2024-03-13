import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gallery } from '@/components/Gallery';
import { LoadingSpinner, SkeletonDetails } from '@/components/Skeletons';
import { Footer } from '@/components/Footer';
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
      fetch(`https://jmajchrzak.tech/wp-json/wp/v2/media?parent=${postId}&per_page=${perPage}&_fields=media_details&orderby=title&order=asc
    `).then((res) => res.json()),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setMainImage(data[0].media_details.sizes.full.source_url);
    }
  }, [data, setMainImage]);

  if (error) return <ErrorPage />;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 place-content-center gap-5 px-3 py-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 md:px-14 md:py-8">
      {data?.map((item, index) => (
        <DialogTrigger asChild key={index}>
          <div className="h-full max-h-[270px] w-full">
            <img
              src={item.media_details.sizes.medium_large ? item.media_details.sizes.medium_large.source_url : item.media_details.sizes.full.source_url}
              className="h-full w-full cursor-pointer object-cover shadow-xl transition duration-500 group-hover:scale-110"
              alt={`Realization house: ${index}`}
              onClick={() => setStartIndex(index)}
            />
          </div>
        </DialogTrigger>
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
      fetch(`https://jmajchrzak.tech/wp-json/wp/v2/posts/${postId}?_fields=id,content,title`).then((res) =>
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

  if (isLoading) {
    return <SkeletonDetails />;
  }

  return (
    <Dialog>
      <section className="mt-20">
        <div className={`relative flex h-[200px] w-full flex-col items-center justify-center gap-3 md:h-[300px]`}>
          <img className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover blur-sm brightness-50" src={mainImage} />
          <h1 className="px-1 text-center text-xl uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-2xl md:text-4xl">
            {data?.title.rendered}
          </h1>
          <p className="bg-gray-500 px-1 text-center text-xs uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-base md:text-xl">
            {heading}
          </p>
          <Button className="absolute bottom-3 left-5 gap-2 bg-gray-500 hover:bg-gray-400" onClick={() => navigate('/offer')}>
            <ArrowLeft /> Powrót
          </Button>
        </div>
        <DetailsImages postId={postId} setStartIndex={setStartIndex} setMainImage={setMainImage} />
      </section>
      <Gallery id={Number(postId)} title={data?.title.rendered} startIndex={startIndex} />
      <Footer />
    </Dialog>
  );
};
