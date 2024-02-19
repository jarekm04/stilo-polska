import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Offer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2Part, setIsVisible2Part] = useState(false);
  const articleRef = useRef<HTMLDivElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.target === articleRef.current) {
          setIsVisible(entry.isIntersecting);
        } else if (entry.target === divRef.current) {
          setIsVisible2Part(entry.isIntersecting);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (articleRef.current) {
      observer.observe(articleRef.current);
    }

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const animationSlideInLeftToRight = (isVisible: boolean) =>
    `transform ${isVisible ? 'translate-x-0' : '-translate-x-[250%]'} transition-transform duration-500 ease-out`;
  const animationSlideInRightToLeft = (isVisiblePart2: boolean) =>
    `transform ${isVisiblePart2 ? 'translate-x-0' : 'translate-x-[250%]'} transition-transform duration-500 ease-out`;

  return (
    <article ref={articleRef} className="flex flex-col gap-10 overflow-hidden bg-gradient-to-b from-slate-300 to-orange-50">
      {/* <div className={`bg-offer ${isVisible ? 'animate-fadeIn' : 'opacity-0'} h-full rounded-t-lg bg-cover bg-fixed brightness-90 drop-shadow-2xl`} /> */}
      {/* <div ref={divRef} className="grid grid-cols-2 bg-gradient-to-b from-white to-orange-50"> */}
      <div className={`bg-offer ${isVisible2Part ? 'animate-fadeIn' : 'opacity-0'} h-[600px] rounded-b-lg bg-cover bg-fixed brightness-90 drop-shadow-2xl`} />
      <div ref={divRef} className="grid grid-cols-3 place-content-center gap-5 px-10 lg:px-20">
        <div
          className={`-mt-20 grid h-[400px] grid-rows-[2fr_8fr] gap-5 border-4 border-[#F0F0F0] bg-white pt-5 ${animationSlideInRightToLeft(isVisible2Part)}`}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <Separator className="bg-custom-tertiary" />
            <p className="px-1 text-center text-sm">142B Nowoczesny dom z bala nad Solina</p>
            <Separator className="bg-custom-tertiary" />
          </div>
          <div className="h-full w-full rounded-sm bg-smallImg bg-cover bg-center" />
        </div>
        <div
          className={`-mt-20 grid h-[400px] grid-rows-[2fr_8fr] gap-5 border-4 border-[#F0F0F0] bg-white pt-5 ${animationSlideInRightToLeft(isVisible2Part)} delay-150`}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <Separator className="bg-custom-tertiary" />
            <p className="px-1 text-center text-sm">141B Nowoczesny dom z bala pod Gorlicami</p>
            <Separator className="bg-custom-tertiary" />
          </div>
          <div className="h-full w-full rounded-sm bg-smallImg bg-cover bg-center" />
        </div>
        <div
          className={`-mt-20 grid h-[400px] grid-rows-[2fr_8fr] gap-5 border-4 border-[#F0F0F0] bg-white pt-5 ${animationSlideInRightToLeft(isVisible2Part)} delay-300`}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <Separator className="bg-custom-tertiary" />
            <p className="px-1 text-center text-sm">140B Nowoczesny dom z bala o pow. uzytkowej 160,80 m2</p>
            <Separator className="bg-custom-tertiary" />
          </div>
          <div className="h-full w-full rounded-sm bg-smallImg bg-cover bg-center" />
        </div>
      </div>
      <Link to="/offer" className="flex w-full items-center justify-center bg-custom-ninth py-6">
        <Button className="animate-custom-appear bg-custom-tertiary hover:bg-custom-ninth">Przejdź do pełnej oferty</Button>
      </Link>
      <div className={`flex flex-col gap-5 bg-white px-10 pb-10 pt-14 opacity-90 ${animationSlideInLeftToRight(isVisible)}`}>
        <Separator className="w-14 bg-custom-tertiary" />
        <p className="font-extralight">
          <strong>STILO POLSKA</strong> funkcjonuje na rynku budowlanym już od 30 lat. Jesteśmy liderem wśród producentów domów z bala. Nasze realizacje cechuje
          najwyższa staranność, użycie oryginalnych bali importowanych z mroźnej Syberii oraz opatentowane, autorskie techniki montażu. STILO to jakość ciesząca
          się najwyższa renomą.
        </p>
        <p className="font-extralight">
          Nasze konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami - w mroźnych górach Norwegii. Realizujemy domy zarówno na podstawie
          projektów klienta, jak i naszych partnerskich studiów projektowych.
        </p>
        <p className="font-extralight">
          Przy konstrukcji naszych domów korzystamy z najnowszych technologii, opatentowanych metod montażu oraz najwyższej jakości materiałów. Wykorzystane
          rozwiązania to wymierne korzyści dla klienta - zdrowy i ekonomiczny dom na lata.
        </p>
        <Link to="/contact">
          <Button className="animate-custom-appear bg-custom-tertiary hover:bg-custom-ninth">Skontaktuj się z nami</Button>
        </Link>
      </div>
    </article>
  );
};
