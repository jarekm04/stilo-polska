import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Ruler, Trees } from 'lucide-react';
import { HeroCanvas } from '@/components/fx/HeroCanvas';
import { Reveal } from '@/components/Reveal';
import { useActiveIndex } from '@/lib/useActiveIndex';
import { useWebGLSupport } from '@/lib/useWebGLSupport';
import { cn } from '@/lib/utils';
/* wariant bez tła – `logo.png` ma białą podkładkę, która na kremowym tle odcina się jako obcy kafelek */
import logoImage from '@/assets/logo-removedbg.png';
import slider1 from '@/assets/slider1.webp';
import slider3 from '@/assets/slider3.webp';
import slider4 from '@/assets/slider4.webp';
import slider5 from '@/assets/slider5.webp';
import slider1FCP from '@/assets/slider1FCP.webp';
import slider3FCP from '@/assets/slider3FCP.webp';
import slider4FCP from '@/assets/slider4FCP.webp';
import slider5FCP from '@/assets/slider5FCP.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Zdjęcia dobrane tematycznie do atutów i wzięte z hero – na stronie głównej są
 * już pobrane, więc panel obok listy nie kosztuje ani jednego dodatkowego żądania.
 */
const highlights = [
  {
    icon: TrendingUp,
    image: slider3,
    preview: slider3FCP,
    title: 'Ugruntowana pozycja',
    text: 'Firma z nowoczesnymi rozwiązaniami, której konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami.',
  },
  {
    icon: ShieldCheck,
    image: slider1,
    preview: slider1FCP,
    title: 'Lider wśród producentów',
    text: 'Opatentowane, autorskie techniki montażu przy użyciu oryginalnych i selekcjonowanych bali suszonych z wysokich rejonów Alp.',
  },
  {
    icon: Ruler,
    image: slider4,
    preview: slider4FCP,
    title: 'Precyzja CNC',
    text: 'Bale w technologii prostokątnej, obrabiane maszynowo i łączone na poczwórny pióro-wpust. Osiadanie konstrukcji jest znikome.',
  },
  {
    icon: Trees,
    image: slider5,
    preview: slider5FCP,
    title: 'Surowiec z gór',
    text: 'Wyselekcjonowany świerk alpejski ścinany tylko zimą, suszony komorowo do wilgotności 15–16%.',
  },
];

const images = highlights.map(({ image }) => image);
const previews = highlights.map(({ preview }) => preview);

/** Wersja awaryjna panelu: zwykłe przenikanie, gdy nie ma WebGL. */
const FadePanel = ({ current }: { current: number }) => (
  <>
    {highlights.map(({ image, title }, index) => (
      <img
        key={title}
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-smooth', index === current ? 'opacity-100' : 'opacity-0')}
      />
    ))}
  </>
);

/**
 * Atuty: nagłówek i lista po lewej, żywy kadr po prawej.
 *
 * Kafle znikły. Zamiast odwracać kartę na czarno pod kursorem – co było zwykłym
 * błyskiem – kadr w panelu obok **rozpływa się** w kolejny tym samym shaderem,
 * który przenika zdjęcia w hero. Lista zostaje przez cały czas jasna i czytelna,
 * zmienia się tylko numer, tytuł i kreska przy krawędzi.
 *
 * Na desktopie prowadzi kursor, na dotyku – przewijanie, bo tam najechania nie ma.
 */
export const Highlights = () => {
  const { activeIndex, register } = useActiveIndex(highlights.length);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canUseWebGL = useWebGLSupport();

  const current = hoveredIndex ?? activeIndex;
  const { title: currentTitle } = highlights[current];

  return (
    <article className="relative overflow-hidden bg-cream">
      <div className="shell section-pad grid gap-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">
        <div className="flex flex-col items-start gap-5 lg:col-start-1 lg:row-start-1">
          <Reveal>
            <img src={logoImage} alt="Stilo Polska" className="h-14 w-auto md:h-16" />
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow">Kim jesteśmy</span>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="display-lg font-display font-normal">
              Domy z bala, które <em className="not-italic text-brand">przetrwają pokolenia</em>
            </h2>
          </Reveal>
        </div>

        {/* panel z kadrem – na telefonie ląduje między nagłówkiem a listą */}
        <Reveal delay={120} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative h-[16rem] overflow-hidden rounded-2xl bg-ink shadow-lift sm:h-[20rem] lg:h-full lg:min-h-[26rem]">
            {canUseWebGL ? (
              <HeroCanvas images={images} placeholders={previews} index={current} duration={1} zoomDuration={14} className="absolute inset-0" />
            ) : (
              <FadePanel current={current} />
            )}

            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <motion.span
                key={currentTitle}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-display text-xl leading-snug text-white sm:text-2xl"
              >
                {currentTitle}
              </motion.span>
              <span className="font-display text-sm text-white/50">
                0{current + 1} / 0{highlights.length}
              </span>
            </div>
          </div>
        </Reveal>

        <ul className="flex flex-col lg:col-start-1 lg:row-start-2" onMouseLeave={() => setHoveredIndex(null)}>
          {highlights.map(({ icon: Icon, title, text }, index) => {
            const isActive = index === current;

            return (
              <motion.li
                key={title}
                ref={register(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
                className={cn('relative border-t py-5 pl-5 transition-colors duration-500 last:border-b lg:py-6', isActive ? 'border-brand/30' : 'border-ink/[0.08]')}
              >
                {/* kreska przy krawędzi zamiast przewracania całej karty */}
                <span className="absolute left-0 top-0 h-full w-[2px] bg-ink/[0.07]">
                  <motion.span
                    className="block h-full w-full origin-top bg-brand"
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </span>

                <div className="flex items-start gap-4">
                  <span className={cn('mt-1 font-montserrat text-[0.7rem] font-semibold tracking-[0.2em] transition-colors duration-500', isActive ? 'text-brand' : 'text-ink/25')}>
                    0{index + 1}
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <h3 className={cn('flex items-center gap-2.5 text-lg font-medium leading-snug transition-colors duration-500 lg:text-xl', isActive ? 'text-ink' : 'text-ink/55')}>
                      <Icon className={cn('h-[18px] w-[18px] shrink-0 transition-colors duration-500', isActive ? 'text-brand' : 'text-ink/30')} strokeWidth={1.8} />
                      {title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-ink/60">{text}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};
