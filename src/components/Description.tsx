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
        <strong className="font-bold">STILO POLSKA</strong> funkcjonuje na rynku budowlanym związanym z budową domów drewnianych od 2004r.
      </p>
      <p className={`font-light ${animationSlideInRightToLeft(isVisible)}`}>
        Jesteśmy jednym z liderów wśród producentów domów z bala, szczególnie przy realizacji technologicznie skomplikowanych projektów . Cechuje nas najwyższa
        staranność i profesjonalne podejście do każdego zlecenia. Do budowy używamy tylko oryginalnych i selekcjonowanych bali suszonych, które importujemy z
        wysokich rejonów Alp.
      </p>
      <p className={`font-light ${animationSlideInRightToLeft(isVisible)}`}>
        Nasze konstrukcje można spotkać w całej Polsce. Do 2022 roku budowaliśmy domy z bali okrągłych pozyskiwanych z mroźnej Syberii. Od momentu wybuchu wojny
        w Ukrainie pozyskujemy surowiec od wysoko wyspecjalizowanych firm z Austrii, które w oparciu o swoje wieloletnie doświadczenie oraz wysokiej jakości
        park maszynowy dostarczają nam bale o bardzo wysokiej jakości spełniające nasze normy technologiczne.
      </p>
      <Link to="/contact">
        <Button className={`bg-custom-tertiary hover:bg-custom-ninth ${animationSlideInRightToLeft(isVisible)}`}>Skontaktuj się z nami</Button>
      </Link>
    </article>
  );
};
