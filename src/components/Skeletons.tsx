import realization from '@/assets/realization-skeleton.jpeg';
import offer from '@/assets/offer-skeleton.jpg';

export const SkeletonRealizations = () => {
  return (
    <article className={`group grid w-[350px] max-h-[350px] cursor-pointer grid-rows-[5fr_1fr_1fr] gap-3 overflow-hidden bg-white shadow-xl sm:w-[450px]`}>
      <img src={realization} className="h-full animate-pulse object-cover blur-md brightness-50" alt="skeleton-house" />
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
      <img src={offer} className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center blur-md brightness-50" alt="skeleton-house" />
      <p className="mx-4 animate-pulse rounded-2xl bg-gray-100 text-center text-2xl text-gray-100">Nowoczesny dom z bala na wzgórzu</p>
      <p className="absolute right-0 top-0 animate-pulse bg-gray-100 px-1 text-center text-lg font-medium text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        ???
      </p>
    </article>
  );
};

export const SkeletonDetails = () => {
  return (
    <section className="mt-20 flex h-[calc(100vh-80px)] items-center justify-center">
      <div role="status">
        <svg
          aria-hidden="true"
          className="h-16 w-16 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    </section>
  );
};
