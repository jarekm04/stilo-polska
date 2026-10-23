import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type TiltCardProps = {
  children: ReactNode;
  /** Klasy zewnętrznej ramki – tu żyje perspektywa. */
  className?: string;
  /** Klasy warstwy obracanej – tu dajemy zaokrąglenie. */
  innerClassName?: string;
  /** Maksymalne wychylenie w stopniach. */
  max?: number;
  disabled?: boolean;
};

/**
 * Karta pochylająca się za kursorem w prawdziwej przestrzeni 3D.
 *
 * Dzieci mogą rozjechać się w głąb przez `translateZ` – stąd `preserve-3d`
 * na warstwie obracanej. Dlatego ta warstwa NIE MOŻE mieć `overflow: hidden`:
 * przycinanie spłaszcza kontekst 3D i `translateZ` przestaje działać.
 * Zaokrąglenia nakładamy więc na poszczególne warstwy, a nie na kontener.
 *
 * Reaguje wyłącznie na mysz – przy dotyku pochylanie tylko przeszkadza.
 */
export const TiltCard = ({ children, className, innerClassName, max = 9, disabled: isDisabledByCaller = false }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isStill = useReducedMotion();
  const disabled = isDisabledByCaller || Boolean(isStill);

  /* znormalizowana pozycja kursora w obrębie karty: 0…1 */
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-max, max]), spring);

  const glareX = useTransform(pointerX, (value) => `${value * 100}%`);
  const glareY = useTransform(pointerY, (value) => `${value * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.16), transparent 62%)`;

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType !== 'mouse') return;

    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div ref={ref} onPointerMove={handleMove} onPointerLeave={reset} className={cn('[perspective:1100px]', className)}>
      <motion.div
        style={disabled ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn('relative h-full w-full', innerClassName)}
      >
        {children}

        {!disabled && (
          <motion.span
            aria-hidden
            style={{ backgroundImage: glare, transform: 'translateZ(1px)' }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
};
