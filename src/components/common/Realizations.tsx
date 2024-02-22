import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
    <article ref={articleRef} className="grid grid-cols-4 gap-5 bg-orange-50 p-16">
      <div className={`group grid cursor-pointer grid-rows-[3fr_1fr_1fr] overflow-hidden bg-white ${animationSlideInLeftToRight(isVisible)}`}>
        <img src="/src/assets/ready1.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
        <p className="flex items-center justify-center p-1 text-center uppercase">Dom całoroczny 145m2</p>
        <Button variant="link" className="group-hover:underline" onClick={() => navigate('/realizations')}>
          Więcej
        </Button>
      </div>
      <div className={`group grid cursor-pointer grid-rows-[3fr_1fr_1fr] overflow-hidden bg-white ${animationSlideInLeftToRight(isVisible)} delay-100`}>
        <img src="/src/assets/ready2.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
        <p className="flex items-center justify-center p-1 text-center uppercase">Dom całoroczny 150m2</p>
        <Button variant="link" className="group-hover:underline" onClick={() => navigate('/realizations')}>
          Więcej
        </Button>
      </div>
      <div className={`group grid cursor-pointer grid-rows-[3fr_1fr_1fr] overflow-hidden bg-white ${animationSlideInLeftToRight(isVisible)} delay-200`}>
        <img src="/src/assets/ready3.jpeg" className="h-full object-cover transition duration-500 group-hover:scale-110" alt="ready-house" />
        <p className="flex items-center justify-center p-1 text-center uppercase">Dom całoroczny 190m2</p>
        <Button variant="link" className="group-hover:underline" onClick={() => navigate('/realizations')}>
          Więcej
        </Button>
      </div>
      <Button
        className={`self-center bg-custom-tertiary hover:bg-custom-ninth ${animationSlideInLeftToRight(isVisible)} delay-500`}
        onClick={() => navigate('/realizations')}
      >
        Więcej gotowych realizacji
      </Button>
    </article>
  );
};
