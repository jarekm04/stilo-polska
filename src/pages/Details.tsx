import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gallery } from '@/components/features/Gallery';
import { SkeletonDetails } from '@/components/features/Skeletons';

const mockImages = [
  {
    content: '/ready1.jpg',
  },
  {
    content: '/offer2.jpg',
  },
  {
    content: '/offer3.jpg',
  },
  {
    content: '/offer2.jpg',
  },
  {
    content: '/offer1.jpg',
  },
  {
    content: '/offer3.jpg',
  },
  {
    content: '/offer1.jpg',
  },
  {
    content: '/offer2.jpg',
  },
  {
    content: '/offer1.jpg',
  },
  {
    content: '/offer2.jpg',
  },
  {
    content: '/offer3.jpg',
  },
];

export const Details = () => {
  const [id, setId] = useState<string>();
  const [title, setTitle] = useState('nowoczesny dom z bala o pow. uzytkowej 160,80m2');
  const [heading, setHeading] = useState('145');
  const [images, setImages] = useState<{ content: string }[]>(mockImages);
  const [startIndex, setStartIndex] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(images);

  useEffect(() => {
    const currentId = pathname.split('/').pop();
    setId(currentId);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setImages(mockImages);
    }, 2000);
  }, []);

  if (images.length === 0) {
    return <SkeletonDetails />;
  }

  return (
    <Dialog>
      <section className="mt-20">
        <div className={`relative flex h-[300px] w-full flex-col items-center justify-center gap-3`}>
          <img className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover blur-sm brightness-50" src="/offer1.jpg" />
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
                  src={image.content}
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
