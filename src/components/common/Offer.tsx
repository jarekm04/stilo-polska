import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const mockArray = [
  { p1: 'Nowoczesny dom z bala nad Solina', p2: '142B', delay: 'delay-0' },
  { p1: 'Nowoczesny dom z bala pod Gorlicami', p2: '141B', delay: 'delay-100' },
  { p1: 'Nowoczesny dom z bala o pow. uzytkowej 160,80 m2', p2: '140B', delay: 'delay-200' },
  { p1: 'Jakiś tam dom z czymś tam', p2: '21:37', delay: 'delay-200' },
];

export const Offer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2Part, setIsVisible2Part] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.target === divRef.current) {
          setIsVisible(entry.isIntersecting);
        } else if (entry.target === anchorRef.current) {
          setIsVisible2Part(entry.isIntersecting);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    if (anchorRef.current) {
      observer.observe(anchorRef.current);
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
    <article className="my-10 flex flex-col overflow-hidden">
      <div ref={divRef} className="grid grid-flow-dense grid-cols-3 place-content-center gap-5 px-6 py-8">
        {mockArray.map((item, index) => (
          <div
            key={item.p2}
            className={`shadow-blue-gray-900/50 group relative flex min-h-60 cursor-pointer select-none flex-col items-center justify-center gap-2 shadow-xl ${animationSlideInRightToLeft(isVisible)} ${item.delay} ${index % 3 === 2 ? 'col-span-2' : ''} ${index % 4 === 0 ? 'row-span-2' : ''}`}
          >
            <img
              src="/src/assets/smallImg.jpg"
              className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover object-center brightness-75 transition-all group-hover:brightness-100"
              alt="offer-house"
            />
            <p className="px-1 text-center text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.p1}</p>
            <p className="px-1 text-center text-lg font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.p2}</p>
          </div>
        ))}
      </div>
      <Link ref={anchorRef} to="/offer" className="flex w-full items-center justify-center bg-custom-ninth py-8">
        <Button className={`bg-custom-tertiary hover:bg-custom-tenth ${animationSlideInLeftToRight(isVisible2Part)}`}>Przejdź do pełnej oferty</Button>
      </Link>
    </article>
  );
};
