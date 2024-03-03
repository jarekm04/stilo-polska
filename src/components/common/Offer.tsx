import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import offer1 from '@/assets/offer1.jpg';
import offer2 from '@/assets/offer2.jpg';
import offer3 from '@/assets/offer3.jpg';
import offer4 from '@/assets/offer4.jpg';

const mockArray = [
  { p1: 'Nowoczesny dom z bala nad Soliną', p2: '142', delay: 'delay-0', src: offer1, id: 642 },
  { p1: 'Nowoczesny dom z bala na wzgórzu', p2: '137', delay: 'delay-200', src: offer3, id: 565 },
  { p1: 'Nowoczesny dom z bala o pow. użytkowej 160,80 m2', p2: '140', delay: 'delay-100', src: offer2, id: 604 },
  { p1: 'Nowoczesny dom z bali parterowy z antresolą', p2: '135', delay: 'delay-200', src: offer4, id: 541 },
];

export const Offer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2Part, setIsVisible2Part] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
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
    <article className="my-2 lg:my-10 flex flex-col overflow-hidden">
      <div ref={divRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-flow-dense md:grid-cols-3 md:place-content-center gap-5 px-6 py-8">
        {mockArray.map((item, index) => (
          <div
            key={item.p2}
            className={`shadow-blue-gray-900/50 group relative flex min-h-60 cursor-pointer select-none flex-col items-center justify-center gap-2 shadow-xl ${animationSlideInRightToLeft(isVisible)} ${item.delay} ${index % 3 === 2 ? 'md:col-span-2' : ''} ${index % 4 === 0 ? 'md:row-span-2' : ''}`}
            onClick={() => navigate(`/offer/${item.id}`)}
          >
            <img
              src={item.src}
              className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover object-center brightness-75 transition-all group-hover:brightness-100"
              alt="offer-house"
            />
            <p className="px-1 text-center text-xl md:text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.p1}</p>
            <p className="absolute right-0 top-0 bg-gray-500 px-1 text-center text-sm md:text-lg font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {item.p2}
            </p>
          </div>
        ))}
      </div>
      <Link ref={anchorRef} to="/offer" className="flex w-full items-center justify-center bg-custom-ninth py-8">
        <Button className={`bg-custom-tertiary hover:bg-custom-tenth ${animationSlideInLeftToRight(isVisible2Part)}`}>Przejdź do pełnej oferty</Button>
      </Link>
    </article>
  );
};
