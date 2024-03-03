import { useEffect, useState, useRef } from 'react';
import { Award, Brush, Globe, Lightbulb, ShieldCheck, TreePine, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import logoImage from '@/assets/logo.png';

const items = [
  {
    icon: <Brush className="animate-bounce text-custom-tertiary" />,
    text: 'Atrakcyjne projekty',
  },
  {
    icon: <TreePine className="animate-bounce text-custom-tertiary" />,
    text: 'Drewno z Syberii',
  },
  {
    icon: <Lightbulb className="animate-bounce text-custom-tertiary" />,
    text: 'Energooszczędność',
  },
  {
    icon: <Award className="animate-bounce text-custom-tertiary" />,
    text: 'Najwyższe standardy',
  },
  {
    icon: <Globe className="animate-bounce text-custom-tertiary" />,
    text: 'Projekty w całym kraju',
  },
];

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
    <article ref={articleRef} className="my-2 flex flex-col items-center gap-10 overflow-hidden lg:py-10">
      <div className="flex flex-col gap-16 p-3">
        <div className={`flex flex-col items-center ${animationSlideInLeftToRight(isVisible)}`}>
          <img src={logoImage} alt="Logo" className="h-20 md:h-28 lg:h-40" />
          <Separator className="bg-custom-tertiary" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                Opatentowane, autorskie techniki montażu przy użyciu oryginalnych bali importowanych z mroźnej Syberii
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`transform space-y-4 ${isVisible ? 'translate-x-0' : 'translate-x-[250%]'} transition-transform duration-500 ease-out`}>
        <div className="flex flex-wrap justify-center gap-6 bg-transparent px-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex max-w-xs items-center gap-3 rounded-lg border bg-white p-3 text-center shadow-lg ${animationSlideInRightToLeft(isVisible)}`}
            >
              {item.icon}
              <p className="text-sm md:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
