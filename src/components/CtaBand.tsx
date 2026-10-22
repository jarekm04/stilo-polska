import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

/** Promień plamy światła – połowa idzie na przesunięcie, żeby środek siedział pod kursorem. */
const GLOW_SIZE = 560;

export const CtaBand = () => {
  const bandRef = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  /** Pozycja plamy względem pasma; `null` oznacza „kursora tu nie ma”. */
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);

  const schedule = useCallback((next: { x: number; y: number } | null) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => setGlow(next));
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;

    const rect = bandRef.current?.getBoundingClientRect();

    if (!rect) return;

    schedule({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <section
      ref={bandRef}
      onPointerMove={handleMove}
      onPointerLeave={() => schedule(null)}
      className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-dark"
    >
      {/* plama światła chodzi za kursorem – pasmo reaguje, zanim cokolwiek klikniesz */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 rounded-full bg-white/25 blur-[90px]"
        style={{ width: GLOW_SIZE, height: GLOW_SIZE, marginLeft: -GLOW_SIZE / 2, marginTop: -GLOW_SIZE / 2 }}
        initial={false}
        animate={{ x: glow?.x ?? 0, y: glow?.y ?? 0, opacity: glow ? 1 : 0 }}
        transition={{ x: { type: 'spring', stiffness: 90, damping: 26 }, y: { type: 'spring', stiffness: 90, damping: 26 }, opacity: { duration: 0.5 } }}
      />

      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-[100px]" />

      <div className="shell relative flex flex-col items-center gap-10 px-5 py-16 text-center sm:px-8 md:py-20 lg:flex-row lg:justify-between lg:px-12 lg:text-left">
        <Reveal>
          <h2 className="font-display text-2xl font-normal leading-snug text-white sm:text-3xl lg:text-[2.6rem]">
            Masz projekt? Przygotujemy dla Ciebie
            <br className="hidden sm:block" /> wycenę domu z bala.
          </h2>
        </Reveal>

        <Reveal delay={120} className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/kontakt"
            className="group inline-flex h-[3.4rem] items-center justify-center gap-3 rounded-full bg-white px-8 text-sm font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-lift"
          >
            Napisz do nas
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          <a
            href="tel:+48585126999"
            className="inline-flex h-[3.4rem] items-center justify-center gap-3 rounded-full border border-white/40 px-8 text-sm font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            58 512-69-99
          </a>
        </Reveal>
      </div>
    </section>
  );
};
