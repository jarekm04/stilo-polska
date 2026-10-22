import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const paragraphs = [
  <>
    Jesteśmy jednym z liderów wśród producentów domów z bala, szczególnie przy realizacji technologicznie skomplikowanych projektów. Cechuje nas najwyższa
    staranność i profesjonalne podejście do każdego zlecenia. Do budowy używamy tylko oryginalnych i selekcjonowanych bali suszonych, które importujemy z
    wysokich rejonów Alp.
  </>,
  <>
    Nasze konstrukcje można spotkać w całej Polsce. Do 2022 roku budowaliśmy domy z bali okrągłych pozyskiwanych z mroźnej Syberii. Od momentu wybuchu wojny w
    Ukrainie pozyskujemy surowiec od wysoko wyspecjalizowanych firm z Austrii, które w oparciu o swoje wieloletnie doświadczenie oraz wysokiej jakości park
    maszynowy dostarczają nam bale o bardzo wysokiej jakości, spełniające nasze normy technologiczne.
  </>,
];

export const Description = () => {
  return (
    <article className="relative overflow-hidden bg-ink text-cream">
      {/* delikatna poświata w tle */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-brand/[0.07] blur-[120px]" />

      <div className="shell section-pad relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="eyebrow">O firmie</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-3xl font-normal leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
              <span className="text-cream">Stilo Polska</span>
              <br />
              <em className="not-italic text-brand-light">na rynku od 2004 roku</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-md text-sm font-light leading-relaxed text-cream/55">
              Budujemy domy drewniane, które łączą tradycyjne rzemiosło z nowoczesną technologią obróbki bali.
            </p>
          </Reveal>
          <Reveal delay={200} className="hidden lg:block">
            <Link
              to="/kontakt"
              className="group mt-2 inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-brand px-9 text-sm font-semibold text-white shadow-brand transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Skontaktuj się z nami
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col gap-7">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 110}>
              <p className="border-l-2 border-brand/40 pl-6 text-sm font-light leading-[1.85] text-cream/75 sm:text-[0.95rem]">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={240} className="lg:hidden">
            <Link
              to="/kontakt"
              className="group inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-brand px-9 text-sm font-semibold text-white shadow-brand transition-all duration-300 ease-smooth hover:bg-brand-dark"
            >
              Skontaktuj się z nami
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
};
