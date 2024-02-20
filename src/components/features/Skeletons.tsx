export const SkeletonRealizations = () => {
  return (
    <article className={`group grid cursor-pointer grid-rows-[5fr_1fr_1fr] gap-3 overflow-hidden bg-white shadow-xl`}>
      <img src="/src/assets/ready1.jpeg" className="h-full animate-pulse object-cover blur-md brightness-50" alt="skeleton-house" />
      <div className="mx-5 my-1 animate-pulse rounded-full bg-gray-300"></div>
      <div className="mx-20 my-2 animate-pulse rounded-full bg-gray-300"></div>
    </article>
  );
};
