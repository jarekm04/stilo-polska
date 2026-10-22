import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SplitTextProps = {
  text: string;
  className?: string;
  /** Opóźnienie startu całej frazy (w sekundach). */
  delay?: number;
  /** Odstęp między kolejnymi elementami (w sekundach). */
  stagger?: number;
  /** `letter` – dla krótkich nagłówków, `word` – dla zdań. */
  unit?: 'letter' | 'word';
  duration?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Tekst wyjeżdżający spod maski – litera po literze albo słowo po słowie.
 *
 * Każdy fragment siedzi w kontenerze z `overflow: hidden`, więc start odbywa
 * się dosłownie zza krawędzi wiersza, a nie przez zwykłe przesunięcie.
 * Dla czytników ekranu całość zostaje jedną frazą (`aria-label`), reszta jest
 * ukryta – inaczej tekst byłby odczytywany sylabami.
 */
export const SplitText = ({ text, className, delay = 0, stagger, unit = 'letter', duration = 0.95 }: SplitTextProps) => {
  const words = text.split(' ');
  const step = stagger ?? (unit === 'letter' ? 0.028 : 0.05);

  /* licznik przesuwa się przez cały tekst, więc kaskada nie restartuje się na każdym słowie */
  let index = 0;

  return (
    <span className={cn('inline', className)} aria-label={text}>
      {words.map((word, wordIndex) => {
        const isLast = wordIndex === words.length - 1;

        if (unit === 'word') {
          const at = index++;

          return (
            <span key={`${word}-${wordIndex}`} aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
              <motion.span
                className="inline-block"
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration, ease: EASE, delay: delay + at * step }}
              >
                {word}
                {!isLast && ' '}
              </motion.span>
            </span>
          );
        }

        return (
          <span key={`${word}-${wordIndex}`} aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
            {[...word].map((char, charIndex) => {
              const at = index++;

              return (
                <motion.span
                  key={`${char}-${charIndex}`}
                  className="inline-block"
                  initial={{ y: '115%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration, ease: EASE, delay: delay + at * step }}
                >
                  {char}
                </motion.span>
              );
            })}
            {!isLast && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
};
