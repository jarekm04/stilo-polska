import { motion, useScroll, useSpring } from 'framer-motion';

/** Bursztynowa nitka postępu tuż pod paskiem nawigacji. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-brand via-brand-light to-brand"
    />
  );
};
