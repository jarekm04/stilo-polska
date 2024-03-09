import { useEffect, useState, useRef } from 'react';
import { ShieldCheck, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import logoImage from '@/assets/logo.png';

export const About = () => {
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

  const animationSlideInLeftToRight = (isVisible: boolean) =>
    `transform ${isVisible ? 'translate-x-0' : '-translate-x-[250%]'} transition-transform duration-500 ease-out`;

  return (
    <article ref={articleRef} className="my-2 flex flex-col items-center gap-10 overflow-hidden">
      <div className="flex flex-col gap-4 p-3">
        <div className={`flex flex-col items-center ${animationSlideInLeftToRight(isVisible)}`}>
          <img src={logoImage} alt="Logo" className="h-20 md:h-28 lg:h-40" />
          <Separator className="bg-custom-tertiary" />
        </div>
        <div className="grid grid-cols-1 gap-4 px-1 sm:grid-cols-2">
          <div className={`grid grid-cols-[1fr_3fr] place-items-center gap-5 bg-white ${animationSlideInLeftToRight(isVisible)} delay-100`}>
            <TrendingUp className="h-10 w-10 text-custom-tertiary md:h-14 md:w-14 lg:h-20 lg:w-20" />
            <div>
              <p className="text-sm font-bold text-custom-tertiary md:text-base">30 lat na rynku</p>
              <p className="text-sm font-light md:text-base">
                Firma o ugruntowanej pozycji z nowoczesnymi rozwiązaniami, której konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami
              </p>
            </div>
          </div>
          <div className={`grid grid-cols-[1fr_3fr] place-items-center gap-5 bg-white ${animationSlideInLeftToRight(isVisible)} delay-100`}>
            <ShieldCheck className="h-10 w-10 text-custom-tertiary md:h-14 md:w-14 lg:h-20 lg:w-20" />
            <div>
              <p className="text-sm font-bold text-custom-tertiary md:text-base">Lider wśród producentów domów z bala</p>
              <p className="text-sm font-light md:text-base">
                Opatentowane, autorskie techniki montażu przy użyciu oryginalnych i selekcjonowanych bali suszonych, które importujemy z wysokich rejonów Alp
              </p>
            </div>
          </div>
        </div>
        <Separator className="bg-custom-tertiary" />
      </div>
    </article>
  );
};
