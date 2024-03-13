import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Button } from '@/components/ui/button';
import ImageGallery from 'react-image-gallery';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { images1, images2, images3 } from '@/lib/utils';
import ready1 from '@/assets/ready1.jpg';
import ready2 from '@/assets/ready2.jpg';
import ready3 from '@/assets/ready3.jpg';

const items = [
  {
    title: 'Dom całoroczny bal klejony 279m2',
    src: ready1,
    delay: 'delay-0',
    id: 1,
  },
  {
    title: 'Dom całoroczny 140m2',
    src: ready2,
    delay: 'delay-100',
    id: 2,
  },
  {
    title: 'Dom całoroczny bal klejony 450m2',
    src: ready3,
    delay: 'delay-200',
    id: 3,
  },
];

export const Realizations = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    if (articleRef.current) {
      observer.observe(articleRef.current);
    }

    return () => {
      if (articleRef.current) {
        observer.unobserve(articleRef.current);
      }
    };
  }, []);

  const getSelectedImages = (id: number) => {
    switch (id) {
      case 1:
        return images1;
      case 2:
        return images2;
      case 3:
        return images3;
      default:
        return images1;
    }
  };

  const animationSlideInLeftToRight = (isVisible: boolean) =>
    `transform ${isVisible ? 'translate-x-0' : '-translate-x-[600%]'} transition-transform duration-500 ease-out`;

  return (
    <Dialog>
      <article ref={articleRef} className="">
        <div className="grid grid-cols-1 gap-5 bg-orange-50 p-8 md:grid-cols-2 lg:grid-cols-3 lg:p-10">
          {items.map(({ title, src, delay, id }) => (
            <DialogTrigger asChild key={delay}>
              <div
                className={`group grid max-h-[400px] cursor-pointer grid-rows-[7fr_1fr_1fr] overflow-hidden bg-white ${animationSlideInLeftToRight(isVisible)} ${delay}`}
                onClick={() => setSelectedId(id)}
              >
                <img src={src} className="h-full max-h-[270px] w-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
                <p className="z-10 flex items-center justify-center bg-white p-1 px-2 text-center text-lg font-light uppercase text-custom-secondary">
                  {title}
                </p>
                <Button
                  variant="link"
                  className="text-xs font-semibold transition-all duration-200 ease-in-out group-hover:text-custom-tertiary group-hover:underline"
                >
                  Więcej
                </Button>
              </div>
            </DialogTrigger>
          ))}
          <Button
            className={`block self-center bg-custom-tertiary hover:bg-custom-ninth lg:hidden ${animationSlideInLeftToRight(isVisible)} delay-500`}
            onClick={() => navigate('/realizations')}
          >
            Więcej realizacji
          </Button>
        </div>
        <div className="hidden justify-center bg-orange-200 py-6 lg:flex">
          <Button
            className={`bg-custom-tertiary px-6 hover:bg-custom-tenth ${animationSlideInLeftToRight(isVisible)} delay-500`}
            onClick={() => navigate('/realizations')}
          >
            Więcej realizacji
          </Button>
        </div>
      </article>
      {selectedId && (
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="h-[60vh] w-[100vw] max-w-none grid-rows-[25px_1fr] md:h-[75vh] lg:h-[90vh] lg:w-[80vw]"
        >
          <DialogHeader className="gap-6">
            <DialogTitle className="mr-4 text-sm uppercase sm:text-lg">{items.find((item) => item.id === selectedId)?.title}</DialogTitle>
          </DialogHeader>
          <div className="h-full max-w-full overflow-hidden">
            <ImageGallery
              items={getSelectedImages(selectedId)}
              showPlayButton={false}
              showIndex={true}
              showThumbnails={true}
              showNav={true}
              showFullscreenButton={isMobile ? false : true}
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
