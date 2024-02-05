import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselDot, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const images = ['karczma.jpg', 'stilo1.jpg', 'stilo2.jpg', 'stilo3.jpg'];

export const Home = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel plugins={[plugin.current]} className="max-h-full h-screen" onMouseDown={plugin.current.stop} onMouseLeave={plugin.current.play}>
      <CarouselContent className="m-0">
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index} className="p-0">
            <Card className="border-0">
              <CardContent className="aspect-square p-0">
                <img src={`/src/assets/${images[index]}`} className="h-full w-full object-cover object-center" alt="carousel-large-photos" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1/3 top-1/2" />
      <CarouselNext className="left-1/2 top-1/2" />
      <div className="absolute left-1/2 top-1/3 ">
        {images.map((src, index) => (
          <CarouselDot key={src} index={index}  />
        ))}
      </div>
    </Carousel>
  );
};
