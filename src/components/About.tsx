import { ShieldCheck, TrendingUp, Ruler, Trees } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import logoImage from '@/assets/logo.png';

const stats = [
  { value: '2004', label: 'Na rynku od' },
  { value: '20+', label: 'Lat doświadczenia' },
  { value: '450', label: 'm² największa realizacja' },
  { value: '100%', label: 'Świerk alpejski' },
];

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

export const About = () => {
  return (
    <article className="relative overflow-hidden bg-cream">
      <div className="shell section-pad">
        <div className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <img src={logoImage} alt="Stilo Polska" className="h-20 w-auto md:h-24 lg:h-28" />
          </Reveal>
          <Reveal delay={80}>
            <span className="eyebrow">Kim jesteśmy</span>
          </Reveal>
          <Reveal delay={140}>
            <h2 className="max-w-3xl text-3xl font-normal leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
              Domy z bala, które <em className="not-italic text-brand">przetrwają pokolenia</em>
            </h2>
          </Reveal>
        </div>

        {/* pasek liczb */}
        <div className="mt-14 grid grid-cols-2 gap-y-10 border-y border-ink/[0.08] py-10 lg:grid-cols-4">
          {stats.map(({ value, label }, index) => (
            <Reveal key={label} delay={index * 90} className="flex flex-col items-center gap-1.5 lg:border-r lg:border-ink/[0.08] lg:last:border-r-0">
              <span className="font-display text-4xl text-brand lg:text-5xl">{value}</span>
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink/50">{label}</span>
            </Reveal>
          ))}
        </div>

        {/* atuty */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {highlights.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 90}>
              <div className="group h-full rounded-2xl border border-ink/[0.07] bg-white p-7 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className="mb-2 text-xl font-medium text-ink">{title}</h3>
                <p className="text-sm font-light leading-relaxed text-ink/60">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
};
