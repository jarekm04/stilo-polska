import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = { mode: 'idle' | 'link' | 'media'; label?: string };

/**
 * Własny wskaźnik: twarda kropka + pierścień z opóźnieniem.
 * Nad linkami pierścień się zwiera, nad galerią rozrasta w etykietę.
 * Działa wyłącznie przy precyzyjnym urządzeniu wskazującym – dotyk go nie widzi.
 */
export const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [{ mode, label }, setState] = useState<CursorState>({ mode: 'idle' });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  /* kropka nadąża niemal natychmiast, pierścień zostaje nieco z tyłu */
  const dotX = useSpring(x, { stiffness: 1400, damping: 70, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 70, mass: 0.25 });
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)');
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)');

    const sync = () => setEnabled(pointer.matches && motionOk.matches);

    sync();
    pointer.addEventListener('change', sync);
    motionOk.addEventListener('change', sync);

    return () => {
      pointer.removeEventListener('change', sync);
      motionOk.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('cursor-hidden');
      return;
    }

    document.body.classList.add('cursor-hidden');

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button, [role="button"]');

      if (!target) {
        setState({ mode: 'idle' });
        return;
      }

      const custom = target.dataset.cursor;

      setState(custom === 'media' ? { mode: 'media', label: target.dataset.cursorLabel } : { mode: 'link' });
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      document.body.classList.remove('cursor-hidden');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = mode === 'media' ? 86 : mode === 'link' ? 54 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <motion.span
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible && mode !== 'media' ? 1 : 0, scale: mode === 'link' ? 0.4 : 1 }}
        transition={{ duration: 0.25 }}
        className="absolute -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full bg-brand"
      />

      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, width: ringSize, height: ringSize, marginLeft: -ringSize / 2, marginTop: -ringSize / 2 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className={`absolute flex items-center justify-center rounded-full border backdrop-blur-[1px] transition-colors duration-300 ${
          mode === 'media' ? 'border-transparent bg-brand text-white' : 'border-brand/50 bg-brand/5'
        }`}
      >
        <AnimatePresence>
          {mode === 'media' && label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-[0.58rem] font-semibold uppercase tracking-[0.18em]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </div>
  );
};
