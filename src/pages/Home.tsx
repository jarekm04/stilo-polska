import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselDot, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
const h1s = ['Stilo1', 'Stilo2', 'Stilo3', 'Stilo4', 'Stilo5', 'Stilo6'];
const h2s = ['Dom z Lorem Ipsum', 'Dom z Lorem Ipsum', 'Dom z Lorem Ipsum', 'Dom z Lorem Ipsum', 'Dom z Lorem Ipsum', 'Dom z Lorem Ipsum'];

export const Home = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <Carousel plugins={[plugin.current]} className="h-screen max-h-full" onMouseDown={plugin.current.stop} onMouseLeave={plugin.current.play}>
      <CarouselContent className="m-0">
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index} className="p-0">
            <Card className="border-0">
              <CardContent className="aspect-square p-0 relative">
                <img src={`/src/assets/${images[index]}`} className="animate-kenBurns h-full w-full object-cover object-center" alt="carousel-large-photos" />
                <h1 className="absolute top-1/2 left-1/2 select-none uppercase mt-20">{h1s[index]}</h1>
                {/* <h2 className="select-none uppercase mt-20">{h2s[index]}</h2> */}
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
