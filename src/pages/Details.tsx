import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gallery } from '@/components/Gallery';
import { SkeletonDetails } from '@/components/Skeletons';
import { Footer } from '@/components/Footer';
import { extractHeading, extractImages } from '@/lib/utils';

export const Details = () => {
  const [startIndex, setStartIndex] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const postId = pathname.split('/').pop();

  const { data, error, isLoading } = useQuery({
    queryKey: ['details', postId],
    queryFn: () => fetch(`https://jmajchrzak.tech/wp-json/wp/v2/posts/${postId}`).then((res) => res.json()),
  });

  const title = data?.title.rendered;
  const heading = extractHeading(data?.content.rendered);
  const imagesUrls = extractImages(data?.content.rendered);
  const formattedImages = imagesUrls.map((url) => ({ original: url, thumbnail: url }));

  if (error) return <ErrorPage />;

  if (isLoading) {
    return <SkeletonDetails />;
  }

  return (
    <Dialog>
      <section className="mt-20">
        <div className={`relative flex w-full flex-col items-center justify-center gap-3 md:h-[300px]`}>
          <img className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover blur-sm brightness-50" src={formattedImages[0].original} />
          <h1 className="px-1 text-center text-xl uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-2xl md:text-4xl">{title}</h1>
          <p className="bg-gray-500 px-1 text-center text-xs uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-base md:text-xl">
            {heading}
          </p>
          <Button className="absolute bottom-3 left-5 gap-2 bg-gray-500 hover:bg-gray-400" onClick={() => navigate('/offer')}>
            <ArrowLeft /> Powrót
          </Button>
        </div>
        <div className="grid grid-cols-1 place-content-center gap-5 px-3 py-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3 md:px-14 md:py-8">
          {formattedImages.map((image, index) => (
            <DialogTrigger asChild key={index}>
              <div className="h-full max-h-[270px] w-full">
                <img
                  src={image.original}
                  className="h-full w-full cursor-pointer object-cover shadow-xl transition duration-500 group-hover:scale-110"
                  alt={`Realization house: ${index}`}
                  onClick={() => setStartIndex(index)}
                />
              </div>
            </DialogTrigger>
          ))}
        </div>
      </section>
      <Gallery id={Number(postId)} startIndex={startIndex} />
      <Footer />
    </Dialog>
  );
};
