import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { TiltCard } from '@/components/fx/TiltCard';
import { Reveal } from '@/components/Reveal';
import { smoothScrollTo } from '@/lib/smoothScroll';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cn } from '@/lib/utils';
import offer1 from '@/assets/offer1.jpg';
import offer2 from '@/assets/offer2.jpg';
import offer3 from '@/assets/offer3.jpg';
import offer4 from '@/assets/offer4.jpg';

/** Światło między ostatnim kafelkiem a prawą krawędzią ekranu (odpowiednik `lg:px-12`). */
const END_GUTTER = 48;

const items = [
  { title: 'Nowoczesny dom z bala nad Soliną', area: '142', src: offer1, id: 993 },
  { title: 'Nowoczesny dom z bala o pow. użytkowej 160,80 m²', area: '140', src: offer2, id: 927 },
  { title: 'Nowoczesny dom z bala o pow. 148 m²', area: '108', src: offer3, id: 538 },
  { title: 'Nowoczesny dom z bala o pow. użytkowej 110,00 m²', area: '103', src: offer4, id: 331 },
];

type FocusHandler = (element: HTMLElement) => void;

type CardProps = { item: (typeof items)[number]; index: number; isTiltEnabled: boolean; onCardFocus: FocusHandler };

const OfferCard = ({ item: { title, area, src, id }, index, isTiltEnabled, onCardFocus }: CardProps) => (
  <TiltCard
    disabled={!isTiltEnabled}
    className="group h-full w-[82vw] shrink-0 sm:w-[58vw] lg:w-[clamp(20rem,32vw,32rem)]"
    innerClassName="rounded-2xl"
  >
    <Link
      to={`/oferta/${id}`}
      onFocus={(event) => onCardFocus(event.currentTarget)}
      className="relative flex h-full w-full flex-col justify-end rounded-2xl shadow-soft transition-shadow duration-500 ease-smooth hover:shadow-lift"
      aria-label={title}
    >
      {/* zdjęcie leży na dnie karty; przycinanie zamknięte w tej jednej warstwie,
          żeby nie spłaszczyć przestrzeni 3D pozostałym elementom */}
      <span className="absolute inset-0 overflow-hidden rounded-2xl">
        <img
          src={src}
          className="h-full w-full object-cover object-center transition-transform duration-1000 ease-smooth group-hover:scale-[1.07]"
          alt={title}
          loading="lazy"
        />
      </span>

      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

      <span className="absolute left-5 top-5 font-display text-sm tracking-[0.2em] text-white/50" style={{ transform: 'translateZ(30px)' }}>
        0{index + 1}
      </span>

      <span
        className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
        style={{ transform: 'translateZ(55px)' }}
      >
        <Maximize2 className="h-3.5 w-3.5" />
        {area} m²
      </span>

      <span className="relative z-10 block p-6 md:p-7" style={{ transform: 'translateZ(38px)' }}>
        <h3 className="text-xl font-normal leading-snug text-white md:text-2xl">{title}</h3>
        <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
          Zobacz szczegóły
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </span>
    </Link>
  </TiltCard>
);

/** Ostatni kafelek toru – wyjście do pełnej oferty, zamiast przycisku pod sekcją. */
const OfferOutro = ({ onCardFocus }: { onCardFocus: FocusHandler }) => (
  <Link
    to="/oferta"
    onFocus={(event) => onCardFocus(event.currentTarget)}
    className="group flex h-full w-[82vw] shrink-0 flex-col justify-end rounded-2xl border border-ink/10 bg-white p-7 shadow-soft transition-all duration-500 ease-smooth hover:border-brand/30 hover:shadow-lift sm:w-[58vw] lg:w-[clamp(18rem,24vw,24rem)]"
  >
    <span className="eyebrow mb-auto">To nie wszystko</span>
    <h3 className="text-2xl font-normal leading-snug text-ink md:text-3xl">
      Przejdź do <em className="not-italic text-brand">pełnej oferty</em>
    </h3>
    <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream transition-all duration-300 group-hover:bg-brand">
      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </Link>
);

export const Offer = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  /* ile pikseli tor musi przejechać w poziomie – o tyle wydłużamy sekcję w pionie */
  useLayoutEffect(() => {
    if (!isDesktop) {
      setDistance(0);
      return;
    }

    const measure = () => {
      const track = trackRef.current;

      if (!track) return;

      /* `scrollWidth` nie liczy prawego wewnętrznego marginesu, więc światło na końcu
         toru dokładamy tutaj – inaczej ostatni kafelek dotykałby krawędzi ekranu */
      setDistance(Math.max(0, track.scrollWidth + END_GUTTER - window.innerWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);

    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  const isPinned = isDesktop && distance > 0;

  const heading = (
    <div className="flex flex-col gap-4">
      <Reveal>
        <span className="eyebrow">Wybrane projekty</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display-lg max-w-xl font-display font-normal text-ink">Zobacz, co możemy dla Ciebie zbudować</h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="max-w-xl text-sm font-light leading-relaxed text-ink/65 sm:text-base">
          Każdy dom powstaje na podstawie projektu technologicznego, dopasowanego do indywidualnych oczekiwań inwestora.
        </p>
      </Reveal>
    </div>
  );

  /**
   * Tabulatorem da się dojść do kafelka, który stoi poza ekranem – tor jedzie
   * transformacją, więc przeglądarka nie ma czego przewinąć. Przeliczamy więc
   * pozycję kafelka na pozycję pionową strony i dojeżdżamy tam sami.
   */
  const handleCardFocus = (element: HTMLElement) => {
    if (!isPinned || !sectionRef.current) return;

    /* droga pionowa sekcji równa się jej drodze poziomej, więc przesunięcie przenosi się 1:1 */
    const travel = Math.min(distance, Math.max(0, element.offsetLeft - END_GUTTER));

    smoothScrollTo(sectionRef.current.offsetTop + travel);
  };

  const cards = (
    <>
      {items.map((item, index) => (
        <OfferCard key={item.id} item={item} index={index} isTiltEnabled={isPinned} onCardFocus={handleCardFocus} />
      ))}
      <OfferOutro onCardFocus={handleCardFocus} />
    </>
  );

  return (
    <article
      ref={sectionRef}
      className="relative bg-sand"
      style={isPinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
      aria-label="Wybrane projekty domów z bala"
    >
      <div className={cn(isPinned && 'sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden')}>
        <div className={cn('shell w-full px-5 sm:px-8 lg:px-12', isPinned ? 'pb-10' : 'pb-10 pt-16 md:pt-20 lg:pt-24')}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            {heading}

            {/* pasek drogi, którą tor ma jeszcze do przejechania */}
            {isPinned && (
              <div className="hidden w-56 shrink-0 lg:block">
                <span className="block h-px w-full bg-ink/15">
                  <motion.span style={{ scaleX: progressScale }} className="block h-full origin-left bg-brand" />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* tor: na desktopie jedzie poziomo w rytm scrolla, na dotyku przewija się palcem */}
        <motion.div
          ref={trackRef}
          style={isPinned ? { x } : undefined}
          className={cn(
            'flex gap-5 pl-5 sm:pl-8 lg:gap-7 lg:pl-12',
            isPinned
              ? 'h-[clamp(22rem,56svh,34rem)] will-change-transform'
              : 'h-[26rem] snap-x snap-mandatory overflow-x-auto pb-16 pr-5 sm:h-[30rem] sm:pr-8 lg:pr-12 [&>*]:snap-center',
          )}
        >
          {cards}
        </motion.div>
      </div>
    </article>
  );
};
