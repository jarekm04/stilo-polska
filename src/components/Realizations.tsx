import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Lightbox } from '@/components/Gallery';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { images1, images2, images3 } from '@/lib/utils';
import ready1 from '@/assets/ready1.jpg';
import ready2 from '@/assets/ready2.jpg';
import ready3 from '@/assets/ready3.jpg';

const items = [
  { title: 'Dom całoroczny bal klejony 279 m²', src: ready1, id: 1, images: images1 },
  { title: 'Dom całoroczny 140 m²', src: ready2, id: 2, images: images2 },
  { title: 'Dom całoroczny bal klejony 450 m²', src: ready3, id: 3, images: images3 },
];

/* Każda karta zajmuje w pionie jeden ekran; ogon daje ostatniej chwilę na scenie,
   zanim stos puści i strona pojedzie dalej. */
const CARD_VH = 100;
const TAIL_VH = 20;

type StackCardProps = {
  item: (typeof items)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: (id: number) => void;
};

const StackCard = ({ item: { title, src, images }, index, total, progress, onOpen }: StackCardProps) => {
  const travel = (total - 1) * CARD_VH + TAIL_VH;
  /** W którym miejscu postępu karta dolatuje na swoją pozycję. */
  const stickAt = (cardIndex: number) => (cardIndex * CARD_VH) / travel;

  /* Karta zaczyna cofać się w głąb, gdy tylko wyląduje – i cofa się dalej
     z każdą kolejną, która na nią wchodzi. Stąd punkty pośrednie, a nie dwa skrajne. */
  const stops: number[] = [];
  const scaleOut: number[] = [];
  const rotateOut: number[] = [];
  const veilOut: number[] = [];

  for (let next = index; next < total; next += 1) {
    const depth = next - index;

    stops.push(stickAt(next));
    scaleOut.push(1 - depth * 0.05);
    rotateOut.push(depth === 0 ? 0 : 6 + (depth - 1) * 2);
    /* na tyle mocno, by karta odjechała w tło, na tyle słabo, by dalej było widać zdjęcie */
    veilOut.push(Math.min(0.45, depth * 0.22));
  }

  /* domknięcie zakresu – `useTransform` potrzebuje co najmniej dwóch punktów */
  stops.push(1);
  scaleOut.push(scaleOut[scaleOut.length - 1]);
  rotateOut.push(rotateOut[rotateOut.length - 1]);
  veilOut.push(veilOut[veilOut.length - 1]);

  const scale = useTransform(progress, stops, scaleOut);
  const rotateX = useTransform(progress, stops, rotateOut);
  const veil = useTransform(progress, stops, veilOut);

  return (
    <div
      className="sticky top-0 flex h-[100svh] items-start justify-center px-5 [perspective:1400px] sm:px-8 lg:px-12"
      style={{ paddingTop: `calc(6svh + ${index * 2.2}rem)` }}
    >
      <motion.div style={{ scale, rotateX, originY: 0 }} className="w-full max-w-5xl">
        <DialogTrigger asChild>
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="group relative block h-[clamp(20rem,74svh,44rem)] w-full overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10"
          >
            <img src={src} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.05]" alt={title} loading="lazy" />

            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />
            {/* przyciemnienie rośnie, w miarę jak karta cofa się pod kolejną */}
            <motion.span style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-ink" />

            <span className="absolute left-6 top-6 font-display text-sm tracking-[0.25em] text-white/60">0{index + 1}</span>

            <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[0.7rem] font-semibold text-white backdrop-blur-md">
              <Camera className="h-3.5 w-3.5" />
              {images.length} zdjęć
            </span>

            <span className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 text-left sm:p-9">
              <h3 className="font-display text-2xl font-normal leading-snug text-white sm:text-3xl lg:text-4xl">{title}</h3>
              <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-light">
                Zobacz galerię
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </span>
          </button>
        </DialogTrigger>
      </motion.div>
    </div>
  );
};

export const Realizations = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const stackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  const selected = selectedIndex === undefined ? undefined : items[selectedIndex];

  return (
    <Dialog>
      <article className="relative bg-cream">
        <div className="shell section-pad pb-0">
          <SectionHeading
            eyebrow="Zrealizowane"
            title="Domy, które już stoją"
            description="Zajrzyj do galerii wybranych realizacji – od stanu surowego po gotowe wnętrza."
          />
        </div>

        {/* stos: wszystkie karty przyklejone do góry jednego, wysokiego kontenera –
            kolejna wjeżdża na poprzednią, a tamta cofa się w głąb */}
        <div ref={stackRef} className="relative mt-10" style={{ paddingBottom: `${TAIL_VH}svh` }}>
          {items.map((item, index) => (
            <StackCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} onOpen={setSelectedIndex} />
          ))}
        </div>

        <div className="shell px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
          <Reveal delay={120} className="flex justify-center">
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
