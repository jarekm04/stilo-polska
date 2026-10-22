import { motion } from 'framer-motion';
import { TreePine, Wrench, BatteryCharging, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { useActiveIndex } from '@/lib/useActiveIndex';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    icon: TreePine,
    title: 'Materiały',
    paragraphs: [
      'Wszystkie elementy budynku wykonane wg projektu technologicznego, skompletowane na paletach, dostarczane są na teren budowy w dowolnym miejscu w Polsce jak i za granicą (na obszarze Europy).',
      'Elementy drewniane transportowane są dużymi naczepami (TIR), co wymaga od kupującego zagwarantowania swobodnego dojazdu ciągnika siodłowego z naczepą na teren budowy.',
      'Na podstawie projektu inwestora wykonujemy projekt technologiczny, który jest podstawą ostatecznej wyceny.',
    ],
  },
  {
    icon: Wrench,
    title: 'Konstrukcja',
    paragraphs: [
      'Domy wykonujemy z bali suszonych, klejonych. Najczęściej stosowane grubości to 20 i 24 cm, łączone na poczwórny pióro-wpust. Węgły uszczelniane są dodatkowymi elastycznymi materiałami. W balach przygotowywane są otwory pod instalację elektryczną. Materiał do budowy to wyselekcjonowany świerk alpejski, starannie dobierany, ścinany tylko zimą.',
      'Na fundamencie przygotowanym przez Klienta, zgodnie z projektem, wykonujemy montaż budynku. Stabilność konstrukcji uzyskujemy poprzez zastosowanie specjalnych szpilek metalowych z automatycznym systemem docisku, które przechodzą od pierwszego do ostatniego bala.',
    ],
  },
  {
    icon: BatteryCharging,
    title: 'Ekonomia',
    paragraphs: [
      'W domu z bali nie instaluje się systemów wentylacyjnych (wyjątek stanowi kuchnia i łazienka). W ścianie zbudowanej tylko z drewna możliwa jest wymiana powietrza w obu kierunkach – miliardy mikroporów umożliwiają nieustanne przenikanie powietrza przy utrzymaniu izolacji cieplnej.',
      'Tylko w domu drewnianym występuje zjawisko termosowe: zimą ciepło, latem chłodno. Dom sam reguluje poziom wilgotności wewnętrznej, a koszty eksploatacji są niższe niż domów budowanych w innej technologii o tej samej kubaturze.',
    ],
  },
];

/** Wysokość ścianki bębna w pikselach – od niej zależy promień bryły. */
const FACE_HEIGHT = 150;

/**
 * Numer filaru na obracającym się bębnie.
 *
 * Ścianki stoją na bokach graniastosłupa: każda obrócona o 360°/n i odsunięta
 * od osi o promień. Obrót całej bryły o ten sam kąt w drugą stronę ustawia
 * wybraną ściankę równo na wprost widza – tak jak w liczniku przebiegu.
 */
const Drum = ({ active, count }: { active: number; count: number }) => {
  const step = 360 / count;
  /* promień graniastosłupa o `count` ściankach i zadanej wysokości ścianki */
  const radius = FACE_HEIGHT / 2 / Math.tan(Math.PI / count);

  return (
    <div className="relative w-full" style={{ height: FACE_HEIGHT, perspective: 700 }} aria-hidden>
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: -active * step }}
        transition={{ type: 'spring', stiffness: 90, damping: 17 }}
      >
        {pillars.slice(0, count).map(({ title }, index) => (
          <div
            key={title}
            className="absolute inset-0 flex items-center justify-start [backface-visibility:hidden]"
            style={{ transform: `rotateX(${index * step}deg) translateZ(${radius}px)` }}
          >
            <span className="font-display leading-none text-brand" style={{ fontSize: FACE_HEIGHT }}>
              0{index + 1}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

type PillarProps = {
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
  index: number;
  isActive: boolean;
};

const Pillar = ({ icon: Icon, title, paragraphs, index, isActive }: PillarProps) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: EASE }}
    className={cn('border-t py-12 transition-colors duration-700 lg:py-16', isActive ? 'border-brand/35' : 'border-ink/[0.09]')}
  >
    <div className="flex items-center gap-4">
        <span
          className={cn(
            'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-700',
            isActive ? 'bg-brand text-white' : 'bg-brand-soft text-brand',
          )}
        >
          <Icon className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <h3 className="font-display text-2xl font-normal uppercase tracking-wide text-ink lg:text-3xl">{title}</h3>
        {/* numer dla telefonu – tam bęben się nie pokazuje */}
        <span className="ml-auto font-display text-3xl text-ink/15 lg:hidden">0{index + 1}</span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {paragraphs.map((text, paragraphIndex) => (
          <p key={paragraphIndex} className="text-sm font-light leading-relaxed text-ink/65 sm:text-base">
            {text}
          </p>
        ))}
      </div>
  </motion.div>
);

/**
 * Lewa kolumna ma pełną wysokość okna z treścią wyśrodkowaną w pionie. Przy
 * `self-start` przyklejenie starczało tylko na różnicę wysokości kolumn – bęben
 * odjeżdżał w połowie sekcji. Każdy filar dostaje też swój kawałek ekranu.
 */
export const Technology = () => {
  const { activeIndex, register } = useActiveIndex(pillars.length);

  return (
    <article className="relative overflow-hidden bg-sand">
      <div className="shell section-pad">
        <SectionHeading
          eyebrow="Technologia"
          title="Trzy filary naszej pracy"
          description="Od doboru surowca, przez montaż, po codzienną eksploatację – wszystko przemyślane w najmniejszym detalu."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
            <Reveal>
              <Drum active={activeIndex} count={pillars.length} />
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10 flex flex-col gap-3">
                {pillars.map(({ title }, index) => (
                  <div key={title} className="flex items-center gap-4">
                    <span
                      className={cn(
                        'text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-500',
                        index === activeIndex ? 'text-brand' : 'text-ink/30',
                      )}
                    >
                      {title}
                    </span>
                    <span className="relative block h-px flex-1 bg-ink/[0.09]">
                      <motion.span
                        className="absolute inset-y-0 left-0 block w-full origin-left bg-brand"
                        initial={false}
                        animate={{ scaleX: index === activeIndex ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col">
            {pillars.map(({ icon, title, paragraphs }, index) => (
              <div key={title} ref={register(index)} className="flex flex-col justify-center lg:min-h-[62svh]">
                <Pillar icon={icon} title={title} paragraphs={paragraphs} index={index} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
