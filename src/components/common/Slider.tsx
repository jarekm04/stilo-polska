import { useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselDot, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import slider1FCP from '@/assets/slider1FCP.jpg';
import slider2FCP from '@/assets/slider2FCP.jpg';
import slider3FCP from '@/assets/slider3FCP.jpg';
import slider4FCP from '@/assets/slider4FCP.jpg';
import slider5FCP from '@/assets/slider5FCP.jpg';
import slider1 from '@/assets/slider1.jpg';
import slider2 from '@/assets/slider2.jpg';
import slider3 from '@/assets/slider3.jpg';
import slider4 from '@/assets/slider4.jpg';
import slider5 from '@/assets/slider5.jpg';

const lowQualityImages = [slider1FCP, slider2FCP, slider3FCP, slider4FCP, slider5FCP];
const highQualityImages = [slider1, slider2, slider3, slider4, slider5];
const h1s = ['Lorem ipsum', 'Doler Sit Amet', 'Projekty domów z bali', 'At vero eos et accusamus', 'Nam libero tempore'];

export const Slider = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const preloadImages = highQualityImages.map((image) => {
      const img = new Image();
      img.src = image;
      return img;
    });

    setLoadedImages(preloadImages);
  }, []);

  return (
    <Carousel plugins={[plugin.current]} className="h-screen max-h-full" onMouseDown={plugin.current.stop} onMouseLeave={plugin.current.play}>
      <CarouselContent className="m-0 h-full">
        {Array.from({ length: highQualityImages.length }).map((_, index) => (
          <CarouselItem key={index} className="p-0">
            <Card className="h-full border-0">
              <CardContent className="relative h-full p-0">
                <img
                  src={`${loadedImages[index]?.src || lowQualityImages[index]}`}
                  className="h-full w-full object-cover brightness-75"
                  alt="carousel-large-photos"
                />
                <div className="absolute left-7 top-[50%] flex flex-col gap-3 rounded-md bg-[rgba(0,0,0,0.4)] p-2">
                  <h1 className="select-none rounded-xl bg-transparent p-3 text-xl font-thin uppercase text-primary-foreground sm:text-2xl lg:text-5xl">
                    {h1s[index]}
                  </h1>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 -translate-y-3 gap-10">
        {highQualityImages.map((src, index) => (
          <CarouselDot key={src} index={index} />
        ))}
      </div>
    </Carousel>
  );
};
