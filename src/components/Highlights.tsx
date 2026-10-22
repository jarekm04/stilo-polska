import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Ruler, Trees } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useActiveIndex } from '@/lib/useActiveIndex';
import { cn } from '@/lib/utils';
/* wariant bez tła – `logo.png` ma białą podkładkę, która na kremowym tle odcina się jako obcy kafelek */
import logoImage from '@/assets/logo-removedbg.png';

const EASE = [0.16, 1, 0.3, 1] as const;

const highlights = [
  {
    icon: TrendingUp,
    title: 'Ugruntowana pozycja',
    text: 'Firma z nowoczesnymi rozwiązaniami, której konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami.',
  },
  {
    icon: ShieldCheck,
    title: 'Lider wśród producentów',
    text: 'Opatentowane, autorskie techniki montażu przy użyciu oryginalnych i selekcjonowanych bali suszonych z wysokich rejonów Alp.',
  },
  {
    icon: Ruler,
    title: 'Precyzja CNC',
    text: 'Bale w technologii prostokątnej, obrabiane maszynowo i łączone na poczwórny pióro-wpust. Osiadanie konstrukcji jest znikome.',
  },
  {
    icon: Trees,
    title: 'Surowiec z gór',
    text: 'Wyselekcjonowany świerk alpejski ścinany tylko zimą, suszony komorowo do wilgotności 15–16%.',
  },
];

/**
 * Atuty na przyklejonej kolumnie: nagłówek stoi w miejscu, treść przesuwa się obok,
 * a szyna `01–04` pokazuje, przy którym atucie właśnie jesteśmy.
 *
 * Lewa kolumna ma pełną wysokość okna z treścią wyśrodkowaną w pionie – inaczej
 * przyklejenie starcza tylko na różnicę wysokości kolumn i nagłówek ucieka w połowie
 * sekcji. Każdy atut dostaje też swój kawałek ekranu, żeby było co przewijać.
 */
export const Highlights = () => {
  const { activeIndex, register } = useActiveIndex(highlights.length);

  return (
    <article className="relative overflow-hidden bg-cream">
      <div className="shell section-pad grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <img src={logoImage} alt="Stilo Polska" className="h-16 w-auto md:h-20" />
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow">Kim jesteśmy</span>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="display-lg font-display font-normal">
                Domy z bala, które <em className="not-italic text-brand">przetrwają pokolenia</em>
              </h2>
            </Reveal>

            {/* szyna postępu – widoczna tylko tam, gdzie kolumna jest przyklejona */}
            <Reveal delay={200} className="hidden w-full lg:block">
              <div className="mt-6 flex flex-col gap-3">
                {highlights.map(({ title }, index) => (
                  <div key={title} className="flex items-center gap-4">
                    <span
                      className={cn(
                        'font-montserrat text-[0.7rem] font-semibold tracking-[0.2em] transition-colors duration-500',
                        index === activeIndex ? 'text-brand' : 'text-ink/25',
                      )}
                    >
                      0{index + 1}
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
        </div>

        <div className="flex flex-col">
          {highlights.map(({ icon: Icon, title, text }, index) => {
            const isActive = index === activeIndex;

            return (
              <div key={title} ref={register(index)} className="flex flex-col justify-center lg:min-h-[46svh]">
                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className={cn('relative border-t py-10 pl-6 transition-colors duration-700 lg:pl-10', isActive ? 'border-brand/35' : 'border-ink/[0.09]')}
                >
                  {/* pionowa kreska zapala się na całej wysokości aktywnego atutu */}
                  <span className="absolute left-0 top-0 h-full w-px bg-ink/[0.07]">
                    <motion.span
                      className="block h-full w-full origin-top bg-brand"
                      initial={false}
                      animate={{ scaleY: isActive ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  </span>

                  <div className="flex items-start gap-5">
                    <span
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-700',
                        isActive ? 'bg-brand text-white' : 'bg-brand-soft text-brand',
                      )}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>

                    <div className="flex flex-col gap-2.5">
                      <h3 className={cn('text-2xl font-normal transition-colors duration-700 lg:text-[1.75rem]', isActive ? 'text-ink' : 'text-ink/55')}>
                        {title}
                      </h3>
                      <p className="max-w-xl text-sm font-light leading-relaxed text-ink/60 sm:text-base">{text}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};
