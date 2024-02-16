import { useEffect, useState, useRef } from 'react';
import { Award, Brush, Globe, Lightbulb, ShieldCheck, TreePine, TrendingUp } from 'lucide-react';
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
  const animationSlideInRightToLeft = (isVisible: boolean) =>
    `transform ${isVisible ? 'translate-x-0' : 'translate-x-[250%]'} transition-transform duration-500 ease-out`;

  return (
    <article ref={articleRef} className="flex flex-col items-center gap-10 overflow-hidden pb-14 pt-10">
      <div className="flex flex-col gap-16 p-3">
        <div className={`flex flex-col items-center ${animationSlideInLeftToRight(isVisible)}`}>
          <img src={logoImage} alt="Logo" className="h-40" />
          <Separator className="bg-custom-tertiary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className={`grid grid-cols-[1fr_3fr] place-items-center gap-5 bg-white ${animationSlideInLeftToRight(isVisible)} delay-100`}>
            <TrendingUp className="text-custom-tertiary h-20 w-20" />
            <div>
              <p className="text-custom-tertiary font-bold">30 lat na rynku</p>
              <p className="font-thin">
                Firma o ugruntowanej pozycji z nowoczesnymi rozwiązaniami, której konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami
              </p>
            </div>
          </div>
          <div className={`grid grid-cols-[1fr_3fr] place-items-center gap-5 bg-white ${animationSlideInLeftToRight(isVisible)} delay-100`}>
            <ShieldCheck className="text-custom-tertiary h-20 w-20" />
            <div>
              <p className="text-custom-tertiary font-bold">Lider wśród producentów domów z bala</p>
              <p className="font-thin">Opatentowane, autorskie techniki montażu przy użyciu oryginalnych bali importowanych z mroźnej Syberii</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`transform space-y-4 ${isVisible ? 'translate-x-0' : 'translate-x-[250%]'} transition-transform duration-500 ease-out`}>
        <div className="flex transform gap-6 bg-transparent px-4">
          <div className={`flex max-w-xs items-center gap-3 rounded-lg border bg-white p-3 text-center shadow-lg ${animationSlideInRightToLeft(isVisible)}`}>
            <Brush className="text-custom-tertiary animate-bounce" />
            <p>Atrakcyjne projekty</p>
          </div>
          <div
            className={`flex max-w-xs items-center gap-3 rounded-lg border bg-white p-3 text-center shadow-lg ${animationSlideInRightToLeft(isVisible)} delay-100`}
          >
            <TreePine className="text-custom-tertiary animate-bounce" />
            <p>Drewno z Syberii</p>
          </div>
          <div
            className={`flex max-w-xs items-center gap-3 rounded-lg border bg-white p-3 text-center shadow-lg ${animationSlideInRightToLeft(isVisible)} delay-200`}
          >
            <Lightbulb className="text-custom-tertiary animate-bounce" />
            <p>Energooszczędność</p>
          </div>
          <div
            className={`flex max-w-xs items-center gap-3 rounded-lg border bg-white p-3 text-center shadow-lg ${animationSlideInRightToLeft(isVisible)} delay-300`}
          >
            <Award className="text-custom-tertiary animate-bounce" />
            <p>Najwyższe standardy</p>
          </div>
          <div
            className={`flex max-w-xs items-center gap-3 rounded-lg border bg-white p-3 text-center shadow-lg ${animationSlideInRightToLeft(isVisible)} delay-500`}
          >
            <Globe className="text-custom-tertiary animate-bounce" />
            <p>Projekty w całym kraju</p>
          </div>
        </div>
      </div>
    </article>
  );
};
