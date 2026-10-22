import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HeroCanvas } from '@/components/fx/HeroCanvas';
import { SplitText } from '@/components/fx/SplitText';
import { stats } from '@/lib/stats';
import { useWebGLSupport } from '@/lib/useWebGLSupport';
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

/** Ile slajd zostaje na ekranie – tyle samo trwa wypełnienie kreski w belce. */
const SLIDE_DURATION = 6800;
const WIPE_DURATION = 1.4;

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
  /** Slajd schodzący – w wersji awaryjnej leży nieruchomo pod nowym, żeby nie odsłonić tła. */
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isHighReady, setIsHighReady] = useState<boolean[]>(() => slides.map(() => false));
  const heroRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);

  const canUseWebGL = useWebGLSupport();
  const fullImages = useMemo(() => slides.map(({ full }) => full), []);
  const lowImages = useMemo(() => slides.map(({ low }) => low), []);

  /* postęp liczony od wejścia hero w kadr do jego wyjechania górą */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.65]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* wersja pełnej rozdzielczości podmienia podgląd dopiero, gdy jest gotowa */
  useEffect(() => {
    if (canUseWebGL) return;

    const images = slides.map(({ full }, slideIndex) => {
      const image = new Image();

      image.onload = () => setIsHighReady((previous) => previous.map((ready, i) => (i === slideIndex ? true : ready)));
      image.src = full;

      return image;
    });

    return () => images.forEach((image) => (image.onload = null));
  }, [canUseWebGL]);

  const goTo = useCallback((next: number) => {
    if (indexRef.current === next) return;

    setPreviousIndex(indexRef.current);
    indexRef.current = next;
    setIndex(next);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => goTo((index + 1) % slides.length), SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [index, goTo]);

  const { title, caption } = slides[index];

  /**
   * Stopień pisma dobierany do długości słowa – tytuł zawsze zostaje w jednym
   * wierszu i zajmuje mniej więcej dwie trzecie kolumny.
   */
  const titleFontSize = `clamp(1.75rem, calc(min(100vw - 2.5rem, 1224px) / ${(title.length * 1.05).toFixed(2)}), 6.5rem)`;

  const renderImage = (slideIndex: number) => {
    const slide = slides[slideIndex];

    return (
      <img
        src={isHighReady[slideIndex] ? slide.full : slide.low}
        className="h-full w-full animate-kenBurns object-cover"
        alt={`Dom z bala – ${slide.title.toLowerCase()}`}
        loading={slideIndex === 0 ? 'eager' : 'lazy'}
      />
    );
  };

  return (
    <section ref={heroRef} className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-ink" aria-label="Realizacje Stilo Polska">
      {/* Kadr: płótno WebGL, a gdy go nie ma – dwie warstwy zdjęć z przycinaniem.
          Skalowania przy przewijaniu nie nakładamy na płótno, bo rozmywałoby render. */}
      <motion.div style={canUseWebGL ? { y: imageY } : { y: imageY, scale: imageScale }} className="absolute inset-0 will-change-transform">
        {canUseWebGL ? (
          <HeroCanvas images={fullImages} placeholders={lowImages} index={index} duration={WIPE_DURATION} className="block h-full w-full" />
        ) : (
          <>
            {previousIndex !== null && <div className="absolute inset-0">{renderImage(previousIndex)}</div>}
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: WIPE_DURATION, ease: EASE_CURTAIN }}
              onAnimationComplete={() => setPreviousIndex(null)}
            >
              {renderImage(index)}
            </motion.div>
          </>
        )}
      </motion.div>

      {/* warstwy przyciemnienia – czytelność tekstu bez gubienia detalu zdjęcia */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/45" />
      {/* im dalej przewiniemy, tym ciemniej – hero gaśnie, zamiast po prostu odjechać */}
      <motion.div style={{ opacity: veilOpacity }} className="pointer-events-none absolute inset-0 bg-ink" />

      {/* treść siada przy dolnej krawędzi kadru – układ edytorski, nie wyśrodkowany */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative z-10 flex flex-1 flex-col justify-end px-6 pb-12 will-change-transform sm:px-10 lg:px-12 lg:pb-16"
      >
        <div className="w-full">
          <motion.span
            key={`eyebrow-${index}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="h-px w-12 bg-brand" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-brand-light sm:text-xs">Domy z bala od 2004 roku</span>
          </motion.span>

          <h1 key={`title-${index}`} style={{ fontSize: titleFontSize }} className="display-hero font-display font-normal uppercase text-white text-shadow-soft">
            <SplitText text={title} delay={0.22} />
          </h1>

          <p key={`caption-${index}`} className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/80 sm:text-lg">
            <SplitText text={caption} unit="word" delay={0.6} duration={0.85} />
          </p>

          <motion.div
            key={`cta-${index}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.85 }}
            className="mt-9 flex flex-wrap gap-3"
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

      {/* Szklana belka domykająca kadr: liczby firmy po lewej, wybór slajdu po prawej.
          Pierwszy ekran mówi więc od razu, z kim rozmawiasz – bez osobnej sekcji niżej. */}
      <div className="relative z-10 border-t border-white/15 bg-white/[0.07] backdrop-blur-md backdrop-saturate-150">
        <div className="shell flex items-center justify-end gap-8 px-6 py-4 sm:px-10 lg:justify-between lg:px-12">
          <dl className="hidden items-center gap-10 lg:flex xl:gap-14">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="font-display text-2xl leading-none text-white xl:text-[1.75rem]">{value}</dt>
                <dd className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/55">{label}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-4">
            <span className="font-display text-lg leading-none text-white">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-4 bg-white/30" />

            <div className="flex items-center gap-2">
              {slides.map(({ title: slideTitle }, slideIndex) => (
                <button
                  key={slideTitle}
                  type="button"
                  onClick={() => goTo(slideIndex)}
                  aria-label={`Przejdź do slajdu ${slideIndex + 1}: ${slideTitle}`}
                  aria-current={slideIndex === index}
                  className="group flex h-6 items-center"
                >
                  <span
                    className={cn(
                      'relative block h-[2px] overflow-hidden rounded-full transition-all duration-500 ease-smooth',
                      slideIndex === index ? 'w-10 bg-white/25' : 'w-4 bg-white/40 group-hover:w-6 group-hover:bg-white/70',
                    )}
                  >
                    {slideIndex === index && (
                      <motion.span
                        key={index}
                        className="absolute inset-y-0 left-0 block w-full origin-left bg-brand"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
