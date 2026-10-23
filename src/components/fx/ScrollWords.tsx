import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

type WordProps = { children: ReactNode; progress: MotionValue<number>; range: [number, number] };

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
};

type ScrollWordsProps = {
  text: string;
  className?: string;
  /** Ile słów „pali się” jednocześnie – większa wartość = łagodniejsza fala. */
  overlap?: number;
};

/**
 * Akapit, który zapala się słowo po słowie w rytm przewijania.
 *
 * Każde słowo startuje z 16% krycia i dochodzi do pełnego, gdy jego wycinek
 * postępu przewijania zostanie pokonany. Zakresy sąsiednich słów nachodzą na
 * siebie, więc po tekście idzie fala, a nie seria skoków. Nic nie jest ukryte –
 * przy wyłączonych animacjach i w wyszukiwarce tekst pozostaje czytelny.
 */
export const ScrollWords = ({ text, className, overlap = 2.4 }: ScrollWordsProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isStill = useReducedMotion();

  /* start, gdy akapit wjedzie w dolne 15% ekranu; koniec, gdy jego dół minie 45% wysokości */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  const words = text.split(' ');
  const step = 1 / words.length;

  /* bez ruchu akapit jest po prostu czytelny od razu – przygaszone słowa
     czekające na przewinięcie byłyby wtedy przeszkodą, a nie efektem */
  if (isStill) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((word, index) => {
        const start = index * step;

        return (
          <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, Math.min(1, start + step * overlap)]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
