import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Offer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2Part, setIsVisible2Part] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const topPos = articleRef.current.getBoundingClientRect().top;
        const scrollPos = window.scrollY + window.innerHeight;
        if (topPos < scrollPos - 800) setIsVisible(true);
        else setIsVisible(false);
      }
    };

    const handleScrollPart2 = () => {
      if (articleRef.current) {
        const topPos = articleRef.current.getBoundingClientRect().top;
        const scrollPos = window.scrollY + window.innerHeight;
        console.log(topPos < scrollPos - 1900);
        if (topPos < scrollPos - 1500) setIsVisible2Part(true);
        else setIsVisible2Part(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    window.addEventListener('scroll', handleScrollPart2);
    handleScrollPart2();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const animationSlideInLeftToRight = (isVisible: boolean) =>
    `transform ${isVisible ? 'translate-x-0' : '-translate-x-[250%]'} transition-transform duration-500 ease-out`;
  const animationSlideInRightToLeft = (isVisiblePart2: boolean) =>
    `transform ${isVisiblePart2 ? 'translate-x-0' : 'translate-x-[250%]'} transition-transform duration-500 ease-out`;

  return (
    <article ref={articleRef} className="overflow-hidden">
      <div className="grid grid-cols-2">
        <div className={`flex flex-col gap-5 px-10 pt-14 ${animationSlideInLeftToRight(isVisible)}`}>
          <Separator className="bg-custom-tertiary w-14" />
          <p className="font-thin">
            <strong>STILO POLSKA</strong> funkcjonuje na rynku budowlanym już od 30 lat. Jesteśmy liderem wśród producentów domów z bala. Nasze realizacje
            cechuje najwyższa staranność, użycie oryginalnych bali importowanych z mroźnej Syberii oraz opatentowane, autorskie techniki montażu. STILO to
            jakość ciesząca się najwyższa renomą.
          </p>
          <p className="font-thin">
            Nasze konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami - w mroźnych górach Norwegii. Realizujemy domy zarówno na podstawie
            projektów klienta, jak i naszych partnerskich studiów projektowych.
          </p>
          <p className="font-thin">
            Przy konstrukcji naszych domów korzystamy z najnowszych technologii, opatentowanych metod montażu oraz najwyższej jakości materiałów. Wykorzystane
            rozwiązania to wymierne korzyści dla klienta - zdrowy i ekonomiczny dom na lata.
          </p>
          <Link to="/contact">
            <Button className="bg-custom-tertiary hover:bg-custom-ninth animate-custom-appear">Skontaktuj się z nami</Button>
          </Link>
        </div>
        <div className="bg-offer h-[500px] rounded-t-lg bg-cover bg-fixed brightness-90 drop-shadow-[2px_4px_50px_rgba(0,0,0,1)]" />
      </div>
      <div className="grid grid-cols-2">
        <div className="bg-offer h-full rounded-b-lg bg-cover bg-fixed brightness-90 drop-shadow-[2px_4px_50px_rgba(0,0,0,1)]" />
        <div className="flex flex-col gap-5 px-10 pt-8">
          <div className={`flex gap-5 p-2 ${animationSlideInRightToLeft(isVisible2Part)}`}>
            <div className="bg-smallImg h-32 w-full rounded-sm bg-cover bg-center" />
            <div className="flex flex-col items-center justify-center gap-3">
              <h3>Domy z bali okrągłych</h3>
              <p className="text-sm font-thin">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel hic voluptatum, illo amet quaerat, accusantium sequi.
              </p>
            </div>
          </div>
          <Separator className="bg-custom-tertiary" />
          <div className={`flex flex-row-reverse gap-5 p-2 ${animationSlideInRightToLeft(isVisible2Part)} delay-150`}>
            <div className="bg-smallImg h-32 w-full rounded-sm bg-cover bg-center" />
            <div className="flex flex-col items-center justify-center gap-3">
              <h3>Domy z bali klejonych</h3>
              <p className="text-sm font-thin">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel hic voluptatum, illo amet quaerat, accusantium sequi.
              </p>
            </div>
          </div>
          <Separator className="bg-custom-tertiary" />
          <div className={`flex gap-5 p-2 ${animationSlideInRightToLeft(isVisible2Part)} delay-300`}>
            <div className="bg-smallImg h-32 w-full rounded-sm bg-cover bg-center" />
            <div className="flex flex-col items-center justify-center gap-3">
              <h3>Projekty domów z bali</h3>
              <p className="text-sm font-thin">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel hic voluptatum, illo amet quaerat, accusantium sequi.
              </p>
            </div>
          </div>
          <Link to="/offer" className="my-4 self-end">
            <Button className="bg-custom-tertiary hover:bg-custom-ninth animate-custom-appear">Przejdź do pełnej oferty</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};
