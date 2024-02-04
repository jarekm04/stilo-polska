import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const images = ["karczma", "stilo1", "stilo2", "stilo3"];

export const Home = () => {
  const plugin = useRef(Autoplay({ delay: 7000, stopOnInteraction: true }));

  console.log(plugin.current);

  return (
    // <div className="bg-karczma h-screen bg-cover bg-center">
      <Carousel plugins={[plugin.current]} className="h-[600px] w-[800px] bg-red" onMouseDown={plugin.current.stop} onMouseLeave={plugin.current.play}>
        <CarouselContent>
          {Array.from({ length: images.length }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="aspect-square">
                    <div className={`w-full h-full bg-${images[index]}`} />
                    {/* <div className='w-full h-full bg-karczma'>XD</div> */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    // </div>
  );
};
