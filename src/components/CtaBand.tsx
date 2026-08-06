import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const CtaBand = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-dark">
      {/* delikatne rozświetlenie w rogu */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[100px]" />

      <div className="shell relative flex flex-col items-center gap-8 px-5 py-14 text-center sm:px-8 md:py-16 lg:flex-row lg:justify-between lg:px-12 lg:text-left">
        <Reveal>
          <h2 className="text-2xl font-normal leading-snug text-white sm:text-3xl lg:text-[2.35rem]">
            Masz projekt? Przygotujemy dla Ciebie
            <br className="hidden sm:block" /> wycenę domu z bala.
          </h2>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/kontakt"
            className="group inline-flex h-[3.25rem] items-center justify-center gap-3 rounded-full bg-white px-8 text-sm font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-lift"
          >
            Napisz do nas
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          <a
            href="tel:+48585126999"
            className="inline-flex h-[3.25rem] items-center justify-center gap-3 rounded-full border border-white/40 px-8 text-sm font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            58 512-69-99
          </a>
        </Reveal>
      </div>
    </section>
  );
};
