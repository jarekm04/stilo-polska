import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Lightbox } from '@/components/Gallery';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { useActiveIndex } from '@/lib/useActiveIndex';
import { images1, images2, images3, cn } from '@/lib/utils';
import ready1 from '@/assets/ready1.webp';
import ready2 from '@/assets/ready2.webp';
import ready3 from '@/assets/ready3.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

/** O ile razy szerszy jest panel otwarty od zwiniętego. */
const OPEN_RATIO = 2.6;

const items = [
  { title: 'Dom całoroczny bal klejony 279 m²', src: ready1, id: 1, images: images1 },
  { title: 'Dom całoroczny 140 m²', src: ready2, id: 2, images: images2 },
  { title: 'Dom całoroczny bal klejony 450 m²', src: ready3, id: 3, images: images3 },
];

/**
 * Realizacje jako rozsuwane panele.
 *
 * Trzy kadry stoją obok siebie na pełną wysokość sekcji; ten wskazany rozpycha
 * się kosztem pozostałych, które zwijają się do pionowych pasków z tytułem.
 * Efekt nie powtarza niczego na stronie — hero i atuty mają shader, oferta jazdę
 * poziomą, technologia przyklejoną kolumnę.
 *
 * Na desktopie prowadzi kursor, na telefonie panele układają się jeden pod drugim
 * i pokazują pełne podpisy, bo rozpychanie w pionie zjadłoby czytelność.
 */
export const Realizations = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { activeIndex, register } = useActiveIndex(items.length);
  const navigate = useNavigate();

  const current = hoveredIndex ?? activeIndex;
  const selected = selectedIndex === undefined ? undefined : items[selectedIndex];

  return (
    <Dialog>
      <article className="relative bg-cream">
        <div className="shell section-pad">
          <SectionHeading
            eyebrow="Zrealizowane"
            title="Domy, które już stoją"
            description="Zajrzyj do galerii wybranych realizacji – od stanu surowego po gotowe wnętrza."
          />

          <div
            className="mt-12 flex flex-col gap-3 lg:h-[clamp(24rem,60svh,34rem)] lg:flex-row lg:gap-4"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {items.map(({ title, src, images }, index) => {
              const isOpen = index === current;

              return (
                <motion.div
                  key={title}
                  ref={register(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  /* `flexGrow` działa tylko tam, gdzie jest wolne miejsce – w kolumnie
                     o automatycznej wysokości (telefon) nie robi nic, więc jeden układ
                     obsługuje oba przypadki */
                  animate={{ flexGrow: isOpen ? OPEN_RATIO : 1 }}
                  transition={{ opacity: { duration: 0.7, ease: EASE, delay: index * 0.1 }, y: { duration: 0.7, ease: EASE, delay: index * 0.1 }, flexGrow: { duration: 0.8, ease: EASE } }}
                  /* `lg:grow` jest zabezpieczeniem: dopóki `whileInView` nie wpuści sekcji, Framer nie
                     ustawia `flexGrow`, a samo `basis-0` dałoby panelom zerową szerokość */
                  className="h-64 min-w-0 sm:h-72 lg:h-full lg:grow lg:basis-0"
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`Otwórz galerię: ${title}`}
                      className="group relative block h-full w-full overflow-hidden rounded-2xl text-left shadow-soft ring-1 ring-ink/5 transition-shadow duration-500 ease-smooth hover:shadow-lift"
                    >
                      <img
                        src={src}
                        alt={title}
                        loading="lazy"
                        className={cn(
                          'h-full w-full object-cover transition-transform [transition-duration:1400ms] ease-smooth',
                          isOpen ? 'scale-105' : 'scale-100',
                        )}
                      />

                      <span
                        className={cn(
                          'pointer-events-none absolute inset-0 transition-opacity duration-700',
                          isOpen ? 'bg-gradient-to-t from-ink/90 via-ink/20 to-transparent' : 'bg-ink/45',
                        )}
                      />

                      <span className="absolute left-5 top-5 font-display text-sm tracking-[0.25em] text-white/70">0{index + 1}</span>

                      {/* zwinięty panel na dużym ekranie pokazuje tylko tytuł wzdłuż krawędzi */}
                      <span
                        className={cn(
                          'pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-display text-lg text-white/90 transition-opacity duration-500 [writing-mode:vertical-rl] lg:block',
                          isOpen ? 'opacity-0' : 'opacity-100',
                        )}
                        style={{ transform: 'translateX(-50%) rotate(180deg)' }}
                      >
                        {title}
                      </span>

                      <span
                        className={cn(
                          'absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 p-5 transition-all duration-500 sm:p-6',
                          'lg:opacity-0',
                          isOpen && 'lg:opacity-100',
                        )}
                      >
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[0.7rem] font-semibold text-white backdrop-blur-md">
                          <Camera className="h-3.5 w-3.5" />
                          {images.length} zdjęć
                        </span>

                        <span className="font-display text-xl font-normal leading-snug text-white sm:text-2xl lg:text-[1.75rem]">{title}</span>

                        <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-light">
                          Zobacz galerię
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </span>
                    </button>
                  </DialogTrigger>
                </motion.div>
              );
            })}
          </div>

          <Reveal delay={120} className="mt-12 flex justify-center">
            <button
              type="button"
              className="group inline-flex h-[3.4rem] items-center gap-3 rounded-full border border-ink/15 px-9 text-sm font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-brand"
              onClick={() => navigate('/realizacje')}
            >
              Więcej realizacji
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </Reveal>
        </div>
      </article>

      {selected && <Lightbox title={selected.title} items={selected.images} />}
    </Dialog>
  );
};
