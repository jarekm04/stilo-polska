import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import detective from '@/assets/detective.webp';

const EASE = [0.16, 1, 0.3, 1] as const;

export const ErrorPage = () => {
  const navigate = useNavigate();
  const frameRef = useRef(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const schedule = useCallback((next: { x: number; y: number }) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => setTilt(next));
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  /* detektyw odchyla się za kursorem – jedyny ruch na tej stronie, więc może być wyraźny */
  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;

    schedule({ x: (event.clientX / window.innerWidth - 0.5) * 40, y: (event.clientY / window.innerHeight - 0.5) * 28 });
  };

  return (
    <section onPointerMove={handleMove} onPointerLeave={() => schedule({ x: 0, y: 0 })} className="relative flex min-h-screen items-center overflow-hidden bg-cream">
      <motion.div
        aria-hidden
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-brand/[0.09] blur-[130px]"
      />

      <div className="shell relative grid items-center gap-10 px-6 py-24 sm:grid-cols-2 lg:px-12">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="order-2 flex flex-col items-start gap-5 sm:order-1"
        >
          <span className="eyebrow">Ups…</span>
          <h1 className="display-lg font-display font-normal">
            Wystąpił błąd
            <br />
            <em className="not-italic text-brand">lub strony tu nie ma</em>
          </h1>
          <p className="max-w-sm text-sm font-light leading-relaxed text-ink/60 sm:text-base">
            Wygląda na to, że nie mamy tego, czego szukasz. Wróć na stronę główną albo zajrzyj do naszych realizacji.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="group inline-flex h-[3.4rem] items-center gap-3 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-brand transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
              Wróć do strony głównej
            </button>
            <button
              type="button"
              onClick={() => navigate('/realizacje')}
              className="inline-flex h-[3.4rem] items-center rounded-full border border-ink/15 px-8 text-sm font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              Nasze realizacje
            </button>
          </div>
        </motion.article>

        <aside className="order-1 flex justify-center sm:order-2">
          <motion.img
            src={detective}
            alt=""
            aria-hidden
            animate={{ x: tilt.x, y: tilt.y }}
            transition={{ type: 'spring', stiffness: 90, damping: 20, mass: 0.8 }}
            className="h-auto w-full max-w-sm object-contain opacity-90"
          />
        </aside>
      </div>
    </section>
  );
};
