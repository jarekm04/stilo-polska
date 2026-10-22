import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselDot, CarouselItem } from '@/components/ui/carousel';
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

const slides = [
  { title: 'Profesjonalizm', caption: 'Opatentowane techniki montażu i ekipy, które nie znają kompromisów.' },
  { title: 'Wszechstronność', caption: 'Od kameralnych domków po rezydencje o powierzchni 450 m².' },
  { title: 'Doświadczenie', caption: 'Na rynku domów z bala nieprzerwanie od 2004 roku.' },
  { title: 'Innowacyjność', caption: 'Bale suszone i klejone, obrabiane na maszynach CNC.' },
  { title: 'Precyzja', caption: 'Selekcjonowany świerk alpejski, ścinany wyłącznie zimą.' },
];

export const Slider = () => {
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));
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
    <Carousel
      plugins={[plugin.current]}
      className="relative h-[100svh] max-h-full"
      onMouseDown={plugin.current.stop}
      onMouseLeave={plugin.current.play}
      aria-label="Realizacje Stilo Polska"
    >
      <CarouselContent className="m-0 h-full">
        {slides.map(({ title, caption }, index) => (
          <CarouselItem key={title} className="p-0">
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={loadedImages[index]?.src || lowQualityImages[index]}
                className="h-full w-full animate-kenBurns object-cover"
                alt={`Dom z bala – ${title.toLowerCase()}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* warstwy przyciemnienia – czytelność tekstu bez gubienia detalu zdjęcia */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />

              <div className="shell absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-12">
                <div className="max-w-2xl">
                  <span key={`eyebrow-${index}`} className="mb-5 inline-flex animate-fadeUp items-center gap-3 opacity-0 [animation-delay:200ms]">
                    <span className="h-px w-10 bg-brand" />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand-light sm:text-xs">Domy z bala od 2004 roku</span>
                  </span>

                  <h1
                    key={`title-${index}`}
                    className="animate-fadeUp font-display text-[2.6rem] font-normal uppercase leading-[1.05] tracking-[0.04em] text-white opacity-0 text-shadow-soft [animation-delay:340ms] sm:text-6xl lg:text-[5rem]"
                  >
                    {title}
                  </h1>

                  <p
                    key={`caption-${index}`}
                    className="mt-5 max-w-lg animate-fadeUp text-sm font-light leading-relaxed text-white/80 opacity-0 [animation-delay:480ms] sm:text-lg"
                  >
                    {caption}
                  </p>

                  <div key={`cta-${index}`} className="mt-9 flex animate-fadeUp flex-wrap gap-3 opacity-0 [animation-delay:620ms]">
                    <Link
                      to="/oferta"
                      className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-brand transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-dark"
                    >
                      Zobacz ofertę
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/realizacje"
                      className="inline-flex h-12 items-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
                    >
                      Nasze realizacje
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* numeracja slajdów */}
      <div className="pointer-events-none absolute bottom-12 right-6 hidden items-center gap-3 text-white/60 sm:right-10 lg:flex">
        <span className="h-px w-14 bg-white/30" />
        <span className="text-xs font-medium tracking-[0.3em]">{String(slides.length).padStart(2, '0')}</span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent" />

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
        {slides.map(({ title }, index) => (
          <CarouselDot key={title} index={index} aria-label={`Przejdź do slajdu ${index + 1}`} />
        ))}
      </div>
    </Carousel>
  );
};
