import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import offer1 from '@/assets/offer1.jpg';
import offer2 from '@/assets/offer2.jpg';
import offer3 from '@/assets/offer3.jpg';
import offer4 from '@/assets/offer4.jpg';

const items = [
  { title: 'Nowoczesny dom z bala nad Soliną', area: '142', src: offer1, id: 993, span: 'lg:col-span-7' },
  { title: 'Nowoczesny dom z bala o pow. użytkowej 160,80 m²', area: '140', src: offer2, id: 927, span: 'lg:col-span-5' },
  { title: 'Nowoczesny dom z bala o pow. 148 m²', area: '108', src: offer3, id: 538, span: 'lg:col-span-5' },
  { title: 'Nowoczesny dom z bala o pow. użytkowej 110,00 m²', area: '103', src: offer4, id: 331, span: 'lg:col-span-7' },
];

export const Offer = () => {
  return (
    <article className="relative overflow-hidden bg-sand">
      <div className="shell section-pad">
        <SectionHeading
          eyebrow="Wybrane projekty"
          title="Zobacz, co możemy dla Ciebie zbudować"
          description="Każdy dom powstaje na podstawie projektu technologicznego, dopasowanego do indywidualnych oczekiwań inwestora."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {items.map(({ title, area, src, id, span }, index) => (
            <Reveal key={id} delay={index * 100} className={`sm:col-span-1 ${span}`}>
              <Link
                to={`/oferta/${id}`}
                className="group relative flex h-[300px] w-full flex-col justify-end overflow-hidden rounded-2xl shadow-soft transition-all duration-500 ease-smooth hover:shadow-lift md:h-[380px]"
              >
                <img
                  src={src}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-smooth group-hover:scale-[1.07]"
                  alt={title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition-opacity duration-500 group-hover:from-ink/90" />

                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  <Maximize2 className="h-3.5 w-3.5" />
                  {area} m²
                </span>

                <div className="relative z-10 p-6 md:p-7">
                  <h3 className="text-xl font-normal leading-snug text-white md:text-2xl">{title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
                    Zobacz szczegóły
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <Link
            to="/oferta"
            className="group inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-ink px-9 text-sm font-semibold text-cream transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand hover:shadow-brand"
          >
            Przejdź do pełnej oferty
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
};
