import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ready1 from '@/assets/ready1.jpg';
import ready2 from '@/assets/ready2.jpg';
import ready3 from '@/assets/ready3.jpeg';

const mockArray = [
  {
    title: 'Dom całoroczny 241m2',
    src: ready1,
    delay: 'delay-0',
  },
  {
    title: 'Dom całoroczny 134m2',
    src: ready2,
    delay: 'delay-100',
  },
  {
    title: 'Dom całoroczny 190m2',
    src: ready3,
    delay: 'delay-200',
  },
];

export const Realizations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

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
    `transform ${isVisible ? 'translate-x-0' : '-translate-x-[600%]'} transition-transform duration-500 ease-out`;

  return (
    <article ref={articleRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 bg-orange-50 p-8 lg:p-16">
      {mockArray.map(({ title, src, delay }) => (
        <div
          key={src}
          className={`group grid max-h-[350px] cursor-pointer grid-rows-[7fr_1fr_1fr] overflow-hidden bg-white ${animationSlideInLeftToRight(isVisible)} ${delay}`}
          onClick={() => navigate('/realizations')}
        >
          <img src={src} className="h-full max-h-[270px] w-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
          <p className="z-10 flex items-center justify-center bg-white p-1 px-2 text-center text-lg font-light uppercase text-custom-secondary">{title}</p>
          <Button
            variant="link"
            className="text-xs font-semibold transition-all duration-200 ease-in-out group-hover:text-custom-tertiary group-hover:underline"
          >
            Więcej
          </Button>
        </div>
      ))}
      <Button
        className={`self-center bg-custom-tertiary hover:bg-custom-ninth ${animationSlideInLeftToRight(isVisible)} delay-500`}
        onClick={() => navigate('/realizations')}
      >
        Więcej realizacji
      </Button>
    </article>
  );
};
