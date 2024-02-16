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
      }
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
    <article ref={articleRef} className="grid grid-cols-3 gap-7 bg-orange-50 px-8 pt-10 overflow-hidden">
      <div className={`border-custom-tertiary flex flex-col gap-4 rounded-lg border bg-white px-3 py-5 ${animationSlideInRightToLeft(isVisible)}`}>
        <div className="flex items-center gap-6">
          <TreePine className="text-custom-tertiary h-20 w-20" />
          <p className="text-2xl font-bold">MATERIAŁY</p>
        </div>
        <Separator className="bg-custom-tertiary h-[1px]" />
        <p className="text-sm font-thin">
          Wszystkie elementy budynku wykonane wg. projektu technologicznego skompletowane na paletach dostarczane są na teren budowy w dowolnym miejscu w Polsce
          jak i za granicą (na obszarze Europy).
        </p>
        <p className="text-sm font-thin">
          Elementy drewniane transportowane są dużymi naczepami (TIR) co wymaga od kupującego zagwarantowania dla ciągnika siodłowego z naczepą swobodnego
          dojazdu na teren budowy.
        </p>
        <p className="text-sm font-thin">Na podstawie projektu inwestora wykonujemy projekt technologiczny, który jest podstawą ostatecznej wyceny.</p>
      </div>
      <div className={`border-custom-tertiary flex flex-col gap-4 rounded-lg border bg-white px-3 py-5 ${animationSlideInRightToLeft(isVisible)} delay-150`}>
        <div className="flex items-center gap-6">
          <Wrench className="text-custom-tertiary h-20 w-20" />
          <p className="text-2xl font-bold">KONSTRUKCJA</p>
        </div>
        <Separator className="bg-custom-tertiary h-[1px]" />
        <p className="text-sm font-thin">
          Domy wykonujemy z bali "grubych" - pełnych, toczonych (cylindrowanych). Średnice bali stosowane w domach całorocznych to: 20, 22, 24 lub 26 cm. Bale
          pozyskiwane są z drzew sosnowych, świerkowych, jodłowych, oraz na specjalne życzenie z cedru syberyjskiego. Drewno sprowadzane jest przez naszą firmę
          partnerską, z Syberii.
        </p>
        <p className="text-sm font-thin">
          Na podłożu przygotowanym przez Klienta wykonujemy montaż budynku zgodnie z projektem. Stabilność konstrukcji uzyskujemy poprzez zastosowanie
          specjalnych szpilek metalowych, z automatycznym systemem docisku. Podczas układania bali łączenia uszczelnia się wełną owczą z podwójną uszczelką.
        </p>
      </div>
      <div className={`border-custom-tertiary flex flex-col gap-4 rounded-lg border bg-white px-3 py-5 ${animationSlideInRightToLeft(isVisible)} delay-300`}>
        <div className="flex items-center gap-6">
          <BatteryCharging className="text-custom-tertiary h-20 w-20" />
          <p className="text-2xl font-bold">EKONOMIA</p>
        </div>
        <Separator className="bg-custom-tertiary h-[1px]" />
        <p className="text-sm font-thin">
          W domu z bali nie instaluje się systemów wentylacyjnych (wyjątek stanowi kuchnia i łazienka - tam gdzie powstają duże nagromadzenia pary wodnej). W
          przeciwieństwie do innych materiałów budowlanych - w ścianie zbudowanej z litego drewna możliwa jest wymiana powietrza w obu kierunkach. Miliardy tzw.
          mikroporów umożliwiają nieustanne przenikanie powietrza, przy utrzymaniu izolacji cieplnej. W domu z bali nigdy nie wystąpi zjawisko zawilgotnienia
          ścian.
        </p>
        <p className="text-sm font-thin">
          Tylko w domu drewnianym występuje zjawisko „termosowe”: zimą ciepło w domu, latem chłód. Dom z bali pełnych w pełnej zgodzie z naturą, z miejscowym
          mikroklimatem, sam reguluje poziom wilgotności wewnętrznej, co gwarantuje mieszkańcom najbardziej przyjazny klimat.
        </p>
      </div>
    </article>
  );
};
