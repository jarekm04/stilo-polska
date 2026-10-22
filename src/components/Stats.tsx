import { motion, type Variants } from 'framer-motion';
import { stats } from '@/lib/stats';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Kolumny ruszają jedna po drugiej, znaki wewnątrz kolumny – jeszcze gęściej. */
const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const column: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
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
 * Liczby firmy dla małych ekranów.
 *
 * Na dużych siedzą w szklanej belce hero – tam mieszczą się w jednym rzędzie nad
 * zdjęciem. Na telefonie belka musiałaby urosnąć na dwa rzędy i zjeść pół kadru,
 * więc dostają własny, wąski pasek tuż pod hero.
 */
export const Stats = () => (
  <section className="relative overflow-hidden bg-sand lg:hidden" aria-label="Stilo Polska w liczbach">
    <motion.div
      variants={grid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="shell grid grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 sm:grid-cols-4 sm:px-8"
    >
      {stats.map(({ value, label: text }) => (
        <motion.div key={text} variants={column} className="flex flex-col items-center gap-2 text-center">
          <span className="flex overflow-hidden pb-[0.08em]">
            {[...value].map((char, charIndex) => (
              <motion.span key={`${char}-${charIndex}`} variants={character} className="block font-display text-4xl leading-none text-brand">
                {char}
              </motion.span>
            ))}
          </span>
          <motion.span variants={label} className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink/50">
            {text}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  </section>
);
