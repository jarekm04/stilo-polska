import { cn } from '@/lib/utils';
import realization from '@/assets/realization-skeleton.jpeg';
import offer from '@/assets/offer-skeleton.jpg';

/** Przesuwający się połysk – używany na wszystkich placeholderach. */
const Shimmer = () => (
  <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
);

export const SkeletonRealizations = () => {
  return (
    <article className="relative w-[350px] overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft sm:w-[450px]">
      <div className="relative h-[240px] overflow-hidden">
        <img src={realization} className="h-full w-full object-cover blur-md brightness-[0.85] saturate-50" alt="" aria-hidden />
        <Shimmer />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div className="h-4 w-3/4 rounded-full bg-ink/10" />
        <div className="h-3 w-1/3 rounded-full bg-ink/[0.07]" />
      </div>
      <Shimmer />
    </article>
  );
};

export const SkeletonOffers = () => {
  return (
    <article className="relative flex h-[300px] w-full flex-col justify-end overflow-hidden rounded-2xl shadow-soft md:h-[380px]">
      <img src={offer} className="absolute inset-0 h-full w-full object-cover object-center blur-md brightness-[0.6] saturate-50" alt="" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
      <div className="relative z-10 flex flex-col gap-3 p-6">
        <div className="h-5 w-4/5 rounded-full bg-white/25" />
        <div className="h-3 w-2/5 rounded-full bg-white/15" />
      </div>
      <Shimmer />
    </article>
  );
};

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div role="status" aria-label="Ładowanie" className={cn('flex items-center justify-center', className)}>
      <span className="relative flex h-10 w-10">
        <span className="absolute inset-0 rounded-full border-2 border-brand/15" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand" />
      </span>
    </div>
  );
};

export const SkeletonDetails = () => {
  return (
    <section className="mt-20 flex h-[calc(100vh-80px)] items-center justify-center bg-cream">
      <LoadingSpinner />
    </section>
  );
};
