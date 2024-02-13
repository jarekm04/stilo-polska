import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselDot, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const images = ['3.jpg', '4.jpg', '6.jpg'];
const h1s = ['Domy z bali klejonych', 'Domy z bali okrągłych', 'Projekty domów z bali'];

export const Slider = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <Carousel plugins={[plugin.current]} className="h-screen max-h-full" onMouseDown={plugin.current.stop} onMouseLeave={plugin.current.play}>
      <CarouselContent className="m-0 h-full">
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index} className="p-0">
            <Card className="h-full border-0">
              <CardContent className="relative h-full p-0">
                <img src={`/src/assets/${images[index]}`} className="h-full w-full object-cover brightness-75" alt="carousel-large-photos" />
                <div className="absolute left-7 top-[50%] flex flex-col gap-3">
                  <h1 className="select-none rounded-xl bg-transparent p-3 text-5xl font-thin uppercase text-primary-foreground backdrop-blur-sm">
                    {h1s[index]}
                  </h1>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 -translate-y-3 gap-10">
        {images.map((src, index) => (
          <CarouselDot key={src} index={index} />
        ))}
      </div>
    </Carousel>
  );
};
