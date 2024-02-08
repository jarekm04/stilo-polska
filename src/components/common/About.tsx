import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Award, Brush, Check, Globe, Lightbulb, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import logoImage from '@/assets/logo.png';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        console.log(articleRef.current);
        const topPos = articleRef.current.getBoundingClientRect().top;
        const scrollPos = window.scrollY + window.innerHeight;
        console.log(topPos);
        if (topPos < scrollPos - 250) setIsVisible(true);
        else setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article ref={articleRef} className="flex flex-col items-center gap-3 px-20 py-10 overflow-hidden">
      <section className="flex justify-center space-x-20">
        <div className={`transform space-y-4 ${isVisible ? 'translate-x-0' : '-translate-x-[250%]'} transition-transform duration-500 ease-out`}>
          <div className="flex transform flex-col gap-4 bg-transparent">
            <div className="flex flex-col items-center">
              <img src={logoImage} alt="Logo" className="h-24" />
              <Separator className="bg-custom-tertiary" />
            </div>
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <Check />
              <p>Ponad 30 lat na rynku</p>
            </div>
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <Check />
              <p>Lider wśród producentów domów z bala</p>
            </div>
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <Check />
              <p>Opatentowane, autorskie techniki montażu</p>
            </div>
          </div>
        </div>
        <div className={`transform space-y-4 ${isVisible ? 'translate-x-0' : 'translate-x-[250%]'} transition-transform duration-500 ease-out`}>
          <div className="flex transform flex-col gap-4 bg-transparent">
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <Brush className="animate-bounce" />
              <p>Atrakcyjne projekty</p>
            </div>
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <TreePine className="animate-bounce" />
              <p>Drewno z Syberii</p>
            </div>
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <Lightbulb className="animate-bounce" />
              <p>Energooszczędność</p>
            </div>
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <Award className="animate-bounce" />
              <p>Najwyższe standardy</p>
            </div>
            <div className="flex gap-1 border bg-white p-3 shadow-lg">
              <Globe className="animate-bounce" />
              <p>Projekty w całym kraju</p>
            </div>
          </div>
        </div>
      </section>
      <Link to="/about">
        <Button className="bg-custom-secondary hover:bg-custom-seventh animate-custom-appear">Więcej o nas</Button>
      </Link>
    </article>
  );
};
