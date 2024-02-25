export const SkeletonRealizations = () => {
  return (
    <article className={`group grid cursor-pointer grid-rows-[5fr_1fr_1fr] gap-3 overflow-hidden bg-white shadow-xl`}>
      <img src="/src/assets/realization-skeleton.jpeg" className="h-full animate-pulse object-cover blur-md brightness-50" alt="skeleton-house" />
      <div className="mx-5 my-1 animate-pulse rounded-full bg-gray-300"></div>
      <div className="mx-20 my-2 animate-pulse rounded-full bg-gray-300"></div>
    </article>
  );
};

export const SkeletonOffers = () => {
  return (
    <article
      className={`shadow-blue-gray-900/50 group relative flex min-h-60 min-w-[300px] cursor-pointer select-none flex-col items-center justify-center gap-2 shadow-xl`}
    >
      <img
        src="/src/assets/offer-skeleton.jpg"
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center blur-md brightness-50"
        alt="skeleton-house"
      />
      <p className="mx-4 animate-pulse rounded-2xl bg-gray-100 text-center text-2xl text-gray-100">Nowoczesny dom z bala na wzgórzu</p>
      <p className="absolute right-0 top-0 animate-pulse bg-gray-100 px-1 text-center text-lg font-medium text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        ???
      </p>
    </article>
  );
};
