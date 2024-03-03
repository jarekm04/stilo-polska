import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Description = () => {
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

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

  const animationSlideInRightToLeft = (isVisible: boolean) =>
    `transform ${isVisible ? 'translate-x-0' : 'translate-x-[250%]'} transition-transform duration-500 ease-out`;

  return (
    <article ref={articleRef} className={`flex flex-col gap-5 overflow-hidden bg-white px-7 py-10 text-sm sm:text-base`}>
      <Separator className="w-14 bg-custom-tertiary" />
      <p className={`font-light ${animationSlideInRightToLeft(isVisible)}`}>
        <strong className='font-bold'>STILO POLSKA</strong> funkcjonuje na rynku budowlanym już od 30 lat. Jesteśmy liderem wśród producentów domów z bala. Nasze realizacje cechuje
        najwyższa staranność, użycie oryginalnych bali importowanych z mroźnej Syberii oraz opatentowane, autorskie techniki montażu. STILO to jakość ciesząca
        się najwyższa renomą.
      </p>
      <p className={`font-light ${animationSlideInRightToLeft(isVisible)}`}>
        Nasze konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami - w mroźnych górach Norwegii. Realizujemy domy zarówno na podstawie projektów
        klienta, jak i naszych partnerskich studiów projektowych.
      </p>
      <p className={`font-light ${animationSlideInRightToLeft(isVisible)}`}>
        Przy konstrukcji naszych domów korzystamy z najnowszych technologii, opatentowanych metod montażu oraz najwyższej jakości materiałów. Wykorzystane
        rozwiązania to wymierne korzyści dla klienta - zdrowy i ekonomiczny dom na lata.
      </p>
      <Link to="/contact">
        <Button className={`bg-custom-tertiary hover:bg-custom-ninth ${animationSlideInRightToLeft(isVisible)}`}>Skontaktuj się z nami</Button>
      </Link>
    </article>
  );
};
