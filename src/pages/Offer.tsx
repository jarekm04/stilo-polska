import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/common/Footer';
import { SkeletonOffers } from '@/components/features/Skeletons';
import { extractHeading, extractImages } from '@/lib/utils';
import { Post } from '@/lib/types';

export const Offer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categoryId = 3;
    const perPage = 100;
    fetch(`https://jmajchrzak.tech/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
      <div className="flex flex-col items-center gap-2 py-3 md:gap-7 md:py-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="mt-2 text-center text-xl font-light md:text-2xl">Oferta</h1>
          <Separator className="h-[2px] w-14 bg-custom-tertiary" />
          <p className="mt-5 w-full px-2 text-center text-sm font-thin sm:text-base md:w-[80%] md:px-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium recusandae sint, culpa veritatis omnis debitis repellat suscipit in nisi
            cumque, modi facilis repudiandae molestias dolorum consequuntur dignissimos odio hic id. Aliquid odio voluptates reprehenderit minus suscipit. Earum
            impedit aspernatur neque.
          </p>
        </div>
        {posts.length === 0 ? (
          <div className="grid grid-cols-1 place-content-center gap-5 px-8 py-8 md:grid-cols-2 lg:grid-cols-3 lg:px-14">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonOffers key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 place-content-center gap-5 px-8 py-8 md:grid-cols-2 lg:grid-cols-3 lg:px-14">
            {posts?.map(({ id, title, content }) => (
              <article
                key={id}
                className={`shadow-blue-gray-900/50 group relative flex min-h-60 cursor-pointer select-none flex-col items-center justify-center gap-2 shadow-xl`}
                onClick={() => navigate(`/offer/${id}`)}
              >
                {extractImages(content.rendered)
                  .slice(0, 1)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center brightness-75 transition-all group-hover:brightness-100"
                      alt={`Offer house - ${index}`}
                    />
                  ))}
                <p className="px-1 text-center text-2xl uppercase text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{title.rendered}</p>
                <p className="absolute right-0 top-0 bg-gray-500 px-1 text-center text-lg font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {extractHeading(content.rendered)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};
