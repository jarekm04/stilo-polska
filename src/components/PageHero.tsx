import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/fx/SplitText';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  /** Kadr w tle. Bez niego nagłówek zostaje na piaskowym tle. */
  image?: string;
  children?: ReactNode;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Nagłówek podstrony w układzie edytorskim: pełnowymiarowy kadr, tytuł przy
 * dolnej krawędzi, zdjęcie jedzie wolniej niż treść. Ten sam język co hero
 * strony głównej, tylko w skróconej wersji.
 */
export const PageHero = ({ eyebrow, title, image, children }: PageHeroProps) => {
  const ref = useRef<HTMLElement>(null);
  /* ruch spięty ze scrollem idzie przez `style`, więc `MotionConfig` go nie wyłącza */
  const isStill = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header ref={ref} className="relative flex h-[62svh] min-h-[24rem] w-full flex-col justify-end overflow-hidden bg-ink">
      {image ? (
        <>
          <motion.div style={isStill ? undefined : { y: imageY, scale: imageScale }} className="absolute inset-0 will-change-transform">
            <img src={image} alt="" aria-hidden className="h-full w-full object-cover" />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/60" />
        </>
      ) : (
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/15 blur-[110px]" />
      )}

      <motion.div
        style={isStill ? undefined : { y: contentY, opacity: contentOpacity }}
        className="shell relative z-10 flex flex-col items-start gap-5 px-6 pb-12 will-change-transform sm:px-10 lg:px-12 lg:pb-16"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="inline-flex items-center gap-3"
        >
          <span className="h-px w-12 bg-brand" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-brand-light sm:text-xs">{eyebrow}</span>
        </motion.span>

        <h1 className="display-xl max-w-4xl font-display font-normal text-white text-shadow-soft">
          <SplitText text={title} delay={0.2} />
        </h1>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="max-w-2xl text-white/75"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </header>
  );
};
