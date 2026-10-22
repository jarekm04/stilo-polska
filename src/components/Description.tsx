import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ScrollWords } from '@/components/fx/ScrollWords';

const paragraphs = [
  'Jesteśmy jednym z liderów wśród producentów domów z bala, szczególnie przy realizacji technologicznie skomplikowanych projektów. Cechuje nas najwyższa staranność i profesjonalne podejście do każdego zlecenia. Do budowy używamy tylko oryginalnych i selekcjonowanych bali suszonych, które importujemy z wysokich rejonów Alp.',
  'Nasze konstrukcje można spotkać w całej Polsce. Do 2022 roku budowaliśmy domy z bali okrągłych pozyskiwanych z mroźnej Syberii. Od momentu wybuchu wojny w Ukrainie pozyskujemy surowiec od wysoko wyspecjalizowanych firm z Austrii, które w oparciu o swoje wieloletnie doświadczenie oraz wysokiej jakości park maszynowy dostarczają nam bale o bardzo wysokiej jakości, spełniające nasze normy technologiczne.',
];

export const Description = () => {
  return (
    <article className="relative overflow-hidden bg-ink text-cream">
      {/* poświaty dryfują bardzo wolno – tło oddycha, zamiast stać */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 70, -40, 0], y: [0, -50, 40, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/[0.13] blur-[130px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -60, 50, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand/[0.09] blur-[130px]"
      />

      <div className="shell section-pad relative">
        <div className="flex flex-col gap-5">
          <Reveal>
            <span className="eyebrow">O firmie</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-xl font-display font-normal">
              <span className="text-cream">Stilo Polska</span>
              <br />
              <em className="not-italic text-brand-light">na rynku od 2004 roku</em>
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-2">
            <p className="max-w-lg text-base font-light leading-relaxed text-cream/55 sm:text-lg">
              Budujemy domy drewniane, które łączą tradycyjne rzemiosło z nowoczesną technologią obróbki bali.
            </p>
          </Reveal>
        </div>

        {/* sedno sekcji: tekst zapala się słowo po słowie w rytm przewijania */}
        <div className="mt-16 flex max-w-4xl flex-col gap-12 lg:mt-20 lg:gap-16">
          {paragraphs.map((paragraph, index) => (
            <ScrollWords
              key={index}
              text={paragraph}
              className="text-xl font-light leading-[1.55] text-cream sm:text-2xl lg:text-[1.75rem] lg:leading-[1.5]"
            />
          ))}
        </div>

        <Reveal delay={120} className="mt-14">
          <Link
            to="/kontakt"
            className="group inline-flex h-[3.4rem] items-center gap-3 rounded-full bg-brand px-9 text-sm font-semibold text-white shadow-brand transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            Skontaktuj się z nami
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
};
