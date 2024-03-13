import { useEffect, useRef, useState } from 'react';
import { TreePine, Wrench, BatteryCharging } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';

export const Technology = () => {
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
    `transform ${isVisible ? 'translate-x-0' : 'translate-x-[300%]'} transition-transform duration-500 ease-out`;

  return (
    <article ref={articleRef} className="flex justify-center overflow-hidden bg-orange-50">
      <div className="grid max-w-[1400px] gap-4 bg-orange-50 px-8 py-10 lg:grid-cols-3 lg:grid-rows-none lg:px-4 xl:gap-7 xl:px-12">
        <div
          className={`mx-auto flex flex-col gap-4 rounded-lg border border-custom-tertiary bg-white px-5 py-5 lg:max-w-[400px] ${animationSlideInRightToLeft(isVisible)}`}
        >
          <div className="flex items-center gap-6">
            <TreePine className="h-14 w-14 text-custom-tertiary sm:h-20 sm:w-20" />
            <p className="text-xl font-bold sm:text-2xl">MATERIAŁY</p>
          </div>
          <Separator className="h-[1px] bg-custom-tertiary" />
          <p className="text-sm font-light">
            Wszystkie elementy budynku wykonane wg. projektu technologicznego skompletowane na paletach dostarczane są na teren budowy w dowolnym miejscu w
            Polsce jak i za granicą (na obszarze Europy).
          </p>
          <p className="text-sm font-light">
            Elementy drewniane transportowane są dużymi naczepami (TIR) co wymaga od kupującego zagwarantowania dla ciągnika siodłowego z naczepą swobodnego
            dojazdu na teren budowy.
          </p>
          <p className="text-sm font-light">Na podstawie projektu inwestora wykonujemy projekt technologiczny, który jest podstawą ostatecznej wyceny.</p>
        </div>
        <div
          className={`mx-auto flex flex-col gap-4 rounded-lg border border-custom-tertiary bg-white px-5 py-5 lg:max-w-[400px] ${animationSlideInRightToLeft(isVisible)} delay-150`}
        >
          <div className="flex items-center gap-6">
            <Wrench className="h-14 w-14 text-custom-tertiary sm:h-20 sm:w-20" />
            <p className="text-xl font-bold sm:text-2xl">KONSTRUKCJA</p>
          </div>
          <Separator className="h-[1px] bg-custom-tertiary" />
          <p className="text-sm font-light">
            Domy wykonujemy z bali suszonych, klejonych. Najczęściej stosowane grubości to 20 i 24 cm łączone na poczwórny pióro wpust. Węgły uszczelniane są
            dodatkowymi elastycznymi materiałami. W balach przygotowywane są otwry pod instalację elektryczną. Materiał do budowy to wyselekcjonowany świerk
            alpejski, starannie dobierany, ścinany tylko zimą.
          </p>
          <p className="text-sm font-light">
            Na fundamencie przygotowanym przez Klienta, zgodnie z projektem wykonujemy montaż budynku. Stabilność konstrukcji uzyskujemy poprzez zastosowanie
            specjalnych szpilek metalowych, z automatycznym systemem docisku, które przechodzą od pierwszego do ostatniego bala. Takie rozwiązanie zapewnia
            sztywność i stabilność konstrukcji.
          </p>
        </div>
        <div
          className={`mx-auto flex flex-col gap-4 rounded-lg border border-custom-tertiary bg-white px-5 py-5 lg:max-w-[400px] ${animationSlideInRightToLeft(isVisible)} delay-300`}
        >
          <div className="flex items-center gap-6">
            <BatteryCharging className="h-14 w-14 text-custom-tertiary sm:h-20 sm:w-20" />
            <p className="text-xl font-bold sm:text-2xl">EKONOMIA</p>
          </div>
          <Separator className="h-[1px] bg-custom-tertiary" />
          <p className="text-sm font-light">
            W domu z bali nie instaluje się systemów wentylacyjnych (wyjątek stanowi kuchnia i łazienka - tam gdzie powstają duże nagromadzenia pary wodnej). W
            przeciwieństwie do innych materiałów budowlanych - w ścianie zbudowanej tylko z drewna możliwa jest wymiana powietrza w obu kierunkach. Miliardy
            tzw. mikroporów umożliwiają nieustanne przenikanie powietrza, przy utrzymaniu izolacji cieplnej.
          </p>
          <p className="text-sm font-light">
            Tylko w domu drewnianym występuje zjawisko tzw. termosowe tj. zimą ciepło, latem chłodno. Dom z bali funkcjonuje w pełnej zgodzie z naturą, z
            miejscowym mikroklimatem, sam reguluje poziom wilgotności wewnętrznej, co gwarantuje mieszkańcom najbardziej przyjazny klimat. Koszty eksploatacji
            naszych domów są niższe niż domów budowanych w innej technologii o tej samej kubaturze.
          </p>
        </div>
      </div>
    </article>
  );
};
