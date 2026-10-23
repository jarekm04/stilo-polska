import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Lightbox } from '@/components/Gallery';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { images1, images2, images3, cn } from '@/lib/utils';
import ready1 from '@/assets/ready1.webp';
import ready2 from '@/assets/ready2.webp';
import ready3 from '@/assets/ready3.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

const items = [
  { title: 'Dom całoroczny bal klejony 279 m²', src: ready1, id: 1, images: images1 },
  { title: 'Dom całoroczny 140 m²', src: ready2, id: 2, images: images2 },
  { title: 'Dom całoroczny bal klejony 450 m²', src: ready3, id: 3, images: images3 },
];

type CardProps = {
  item: (typeof items)[number];
  index: number;
  isFeature: boolean;
  onOpen: (index: number) => void;
};

const RealizationCard = ({ item: { title, src, images }, index, isFeature, onOpen }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
    className={cn('min-h-0', isFeature && 'lg:row-span-2')}
  >
    <DialogTrigger asChild>
      <button
        type="button"
        onClick={() => onOpen(index)}
        className={cn(
          'group relative block w-full overflow-hidden rounded-2xl text-left shadow-soft ring-1 ring-ink/5 transition-shadow duration-500 ease-smooth hover:shadow-lift',
          isFeature ? 'h-[20rem] lg:h-full' : 'h-[16rem] lg:h-full',
        )}
      >
        <img
          src={src}
          className="h-full w-full object-cover transition-transform [transition-duration:1200ms] ease-smooth group-hover:scale-[1.05]"
          alt={title}
          loading="lazy"
        />

        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

        <span className="absolute left-5 top-5 font-display text-sm tracking-[0.25em] text-white/60">0{index + 1}</span>

        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[0.7rem] font-semibold text-white backdrop-blur-md">
          <Camera className="h-3.5 w-3.5" />
          {images.length} zdjęć
        </span>

        <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2.5 p-5 sm:p-6">
          <h3 className={cn('font-display font-normal leading-snug text-white', isFeature ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl')}>{title}</h3>
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-light">
            Zobacz galerię
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </span>
      </button>
    </DialogTrigger>
  </motion.div>
);

/**
 * Realizacje w układzie nierównym: jeden duży kadr obok dwóch mniejszych.
 *
 * Wcześniej każda karta miała własny ekran i cofała się w głąb przy przewijaniu –
 * trzy zdjęcia zajmowały 3287 px, a między nimi zostawała pustka. Ten sam materiał
 * mieści się teraz w jednym kadrze i od razu widać wszystkie trzy domy.
 */
export const Realizations = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const navigate = useNavigate();

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

          <div className="mt-12 grid gap-4 lg:h-[34rem] lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2 lg:gap-5">
            {items.map((item, index) => (
              <RealizationCard key={item.id} item={item} index={index} isFeature={index === 0} onOpen={setSelectedIndex} />
            ))}
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
