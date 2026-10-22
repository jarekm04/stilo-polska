import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: '2004', label: 'Na rynku od' },
  { value: '20+', label: 'Lat doświadczenia' },
  { value: '450', label: 'm² największa realizacja' },
  { value: '100%', label: 'Świerk alpejski' },
];

/** Kolumny ruszają jedna po drugiej, znaki wewnątrz kolumny – jeszcze gęściej. */
const column: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const character: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.85, ease: EASE } },
};

const label: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Pasek liczb tuż pod hero. Celowo na tym samym ciemnym tle, w które hero gaśnie
 * przy przewijaniu – kadr nie przecina się, tylko przechodzi dalej.
 *
 * Cyfry wjeżdżają rolką spod maski wiersza (jak w odometrze), a kreski nad i pod
 * paskiem rysują się w poziomie w miarę wjeżdżania sekcji w kadr.
 */
export const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center center'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink text-cream" aria-label="Stilo Polska w liczbach">
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-brand/[0.08] blur-[120px]" />

      <div className="shell relative px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <motion.span style={{ scaleX: lineScale }} className="block h-px origin-left bg-cream/15" />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-2 gap-y-10 py-12 lg:grid-cols-4 lg:py-14"
        >
          {stats.map(({ value, label: text }, index) => (
            <motion.div
              key={text}
              variants={column}
              className={`flex flex-col items-center gap-2.5 px-2 lg:border-r lg:border-cream/10 ${index === stats.length - 1 ? 'lg:border-r-0' : ''}`}
            >
              <span className="flex overflow-hidden pb-[0.08em]">
                {[...value].map((char, charIndex) => (
                  <motion.span key={`${char}-${charIndex}`} variants={character} className="block font-display text-5xl leading-none text-brand lg:text-7xl">
                    {char}
                  </motion.span>
                ))}
              </span>
              <motion.span variants={label} className="text-center text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cream/45">
                {text}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        <motion.span style={{ scaleX: lineScale }} className="block h-px origin-right bg-cream/15" />
      </div>
    </section>
  );
};
