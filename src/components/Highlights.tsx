import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Ruler, Trees } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
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
 * Atuty: nagłówek po lewej, cztery kafle w siatce 2×2 po prawej.
 *
 * Wcześniej każdy atut dostawał pół ekranu wysokości, żeby przyklejona kolumna
 * miała po czym jechać — cztery krótkie akapity rozciągały się wtedy na 1848 px
 * i strona świeciła pustkami. Treści jest tu na jeden ekran i tyle ma zajmować.
 */
export const Highlights = () => (
  <article className="relative overflow-hidden bg-cream">
    <div className="shell section-pad grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16">
      <div className="flex flex-col items-start gap-5">
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

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        {highlights.map(({ icon: Icon, title, text }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: (index % 2) * 0.1 }}
            className="group flex h-full flex-col gap-3 rounded-2xl border border-ink/[0.07] bg-white p-6 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift lg:p-7"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <h3 className="text-lg font-medium leading-snug text-ink lg:text-xl">{title}</h3>
            <p className="text-sm font-light leading-relaxed text-ink/60">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </article>
);
