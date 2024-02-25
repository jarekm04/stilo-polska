import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gallery } from '@/components/features/Gallery';
import { SkeletonDetails } from '@/components/features/Skeletons';
import { extractHeading, extractImages } from '@/lib/utils';
import { ImageItem } from '@/lib/types';

export const Details = () => {
  const [id, setId] = useState<string>();
  const [title, setTitle] = useState('');
  const [heading, setHeading] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [mainImage, setMainImage] = useState<string>();
  const [startIndex, setStartIndex] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentId = pathname.split('/').pop();
    setId(currentId);
  }, [pathname]);

  useEffect(() => {
    if (!id) return;

    fetch(`https://admin.jmajchrzak.tech/wp-json/wp/v2/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const heading = extractHeading(data.content.rendered);
        const imagesUrls = extractImages(data.content.rendered);
        const formattedImages = imagesUrls.map((url) => ({ original: url, thumbnail: url }));

        setImages(formattedImages);
        setMainImage(formattedImages[0].original);
        setTitle(data.title.rendered);
        setHeading(heading);
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);

  if (images.length === 0) {
    return <SkeletonDetails />;
  }

  return (
    <Dialog>
      <section className="mt-20">
        <div className={`relative flex h-[300px] w-full flex-col items-center justify-center gap-3`}>
          <img className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover blur-sm brightness-50" src={mainImage} />
          <h1 className="px-1 text-center text-4xl uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{title}</h1>
          <p className="bg-gray-500 px-1 text-center text-xl uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{heading}</p>
          <Button className="absolute bottom-3 left-5 gap-2 bg-gray-500 hover:bg-gray-400" onClick={() => navigate('/offer')}>
            <ArrowLeft /> Powrót
          </Button>
        </div>
        <div className="grid grid-cols-3 place-content-center gap-5 px-14 py-8">
          {images.map((image, index) => (
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
      <Gallery id={Number(id)} startIndex={startIndex} />
    </Dialog>
  );
};
