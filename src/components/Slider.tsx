import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SplitText } from '@/components/fx/SplitText';
import { cn } from '@/lib/utils';
import slider1FCP from '@/assets/slider1FCP.jpg';
import slider2FCP from '@/assets/slider2FCP.jpg';
import slider3FCP from '@/assets/slider3FCP.jpg';
import slider4FCP from '@/assets/slider4FCP.jpg';
import slider5FCP from '@/assets/slider5FCP.jpg';
import slider1 from '@/assets/slider1.jpg';
import slider2 from '@/assets/slider2.jpg';
import slider3 from '@/assets/slider3.jpg';
import slider4 from '@/assets/slider4.jpg';
import slider5 from '@/assets/slider5.jpg';

/** Ile slajd zostaje na ekranie – tyle samo trwa wypełnienie paska postępu. */
const SLIDE_DURATION = 6800;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

const slides = [
  { title: 'Profesjonalizm', caption: 'Opatentowane techniki montażu i ekipy, które nie znają kompromisów.', low: slider1FCP, full: slider1 },
  { title: 'Wszechstronność', caption: 'Od kameralnych domków po rezydencje o powierzchni 450 m².', low: slider2FCP, full: slider2 },
  { title: 'Doświadczenie', caption: 'Na rynku domów z bala nieprzerwanie od 2004 roku.', low: slider3FCP, full: slider3 },
  { title: 'Innowacyjność', caption: 'Bale suszone i klejone, obrabiane na maszynach CNC.', low: slider4FCP, full: slider4 },
  { title: 'Precyzja', caption: 'Selekcjonowany świerk alpejski, ścinany wyłącznie zimą.', low: slider5FCP, full: slider5 },
];

export const Slider = () => {
  const [index, setIndex] = useState(0);
  const [isHighReady, setIsHighReady] = useState<boolean[]>(() => slides.map(() => false));
  const heroRef = useRef<HTMLElement>(null);

  /* postęp liczony od wejścia hero w kadr do jego wyjechania górą */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  /* zdjęcie jedzie wolniej niż strona i powoli się przybliża – kadr nie „odkleja się” od treści */
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.65]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* wersja pełnej rozdzielczości podmienia podgląd dopiero, gdy jest gotowa */
  useEffect(() => {
    const images = slides.map(({ full }, slideIndex) => {
      const image = new Image();

      image.onload = () => setIsHighReady((previous) => previous.map((ready, i) => (i === slideIndex ? true : ready)));
      image.src = full;

      return image;
    });

    return () => images.forEach((image) => (image.onload = null));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIndex((current) => (current + 1) % slides.length), SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [index]);

  const { title, caption, low, full } = slides[index];

  /**
   * Stopień pisma dobierany do długości słowa – tytuł zawsze zostaje w jednym
   * wierszu i zajmuje mniej więcej dwie trzecie kolumny, niezależnie od tego,
   * czy ma 8, czy 15 znaków. 1,05 to średnia szerokość wersalika Playfair (≈0,68 em)
   * powiększona o zapas, 1224 px to szerokość `shell` bez marginesów.
   */
  const titleFontSize = `clamp(1.75rem, calc(min(100vw - 2.5rem, 1224px) / ${(title.length * 1.05).toFixed(2)}), 6.5rem)`;

  return (
    <section ref={heroRef} className="relative h-[100svh] w-full overflow-hidden bg-ink" aria-label="Realizacje Stilo Polska">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 will-change-transform">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            /* poprzedni kadr czeka pod spodem, aż nowy go całkiem zakryje */
            exit={{ opacity: 1, transition: { duration: 1.3 } }}
            transition={{ duration: 1.3, ease: EASE_CURTAIN }}
          >
            <img
              src={isHighReady[index] ? full : low}
              className="h-full w-full animate-kenBurns object-cover"
              alt={`Dom z bala – ${title.toLowerCase()}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* warstwy przyciemnienia – czytelność tekstu bez gubienia detalu zdjęcia */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />
      {/* im dalej przewiniemy, tym ciemniej – hero gaśnie, zamiast po prostu odjechać */}
      <motion.div style={{ opacity: veilOpacity }} className="pointer-events-none absolute inset-0 bg-ink" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative z-10 flex h-full flex-col justify-center px-6 will-change-transform sm:px-10 lg:px-12"
      >
        <div className="w-full">
          <motion.span
            key={`eyebrow-${index}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <span className="h-px w-12 bg-brand" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-brand-light sm:text-xs">Domy z bala od 2004 roku</span>
          </motion.span>

          <h1 key={`title-${index}`} style={{ fontSize: titleFontSize }} className="display-hero font-display font-normal uppercase text-white text-shadow-soft">
            <SplitText text={title} delay={0.22} />
          </h1>

          <p key={`caption-${index}`} className="mt-7 max-w-xl text-base font-light leading-relaxed text-white/80 sm:text-lg">
            <SplitText text={caption} unit="word" delay={0.6} duration={0.85} />
          </p>

          <motion.div
            key={`cta-${index}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.85 }}
            className="mt-11 flex flex-wrap gap-3"
          >
            <Link
              to="/oferta"
              className="group inline-flex h-[3.4rem] items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-brand transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Zobacz ofertę
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/realizacje"
              className="inline-flex h-[3.4rem] items-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
            >
              Nasze realizacje
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* wybór slajdu – kreski przy prawej krawędzi, numer pojawia się przy aktywnej */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
        {slides.map(({ title: slideTitle }, slideIndex) => (
          <button
            key={slideTitle}
            type="button"
            onClick={() => setIndex(slideIndex)}
            aria-label={`Przejdź do slajdu ${slideIndex + 1}: ${slideTitle}`}
            aria-current={slideIndex === index}
            className="group flex items-center justify-end gap-3 py-1"
          >
            <span
              className={cn(
                'text-[0.6rem] font-semibold tracking-[0.22em] transition-all duration-500',
                slideIndex === index ? 'text-white opacity-100' : 'text-white/50 opacity-0 group-hover:opacity-100',
              )}
            >
              {String(slideIndex + 1).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'block h-px transition-all duration-500 ease-smooth',
                slideIndex === index ? 'w-12 bg-brand' : 'w-6 bg-white/35 group-hover:w-9 group-hover:bg-white/70',
              )}
            />
          </button>
        ))}
      </div>

      {/* pasek czasu slajdu – jedyny wskaźnik widoczny też na telefonie */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-white/15">
        <motion.div
          key={index}
          style={{ transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
          className="h-full bg-brand"
        />
      </div>
    </section>
  );
};
