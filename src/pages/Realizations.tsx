import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SkeletonRealizations } from '@/components/features/Skeletons';
import { Footer } from '@/components/common/Footer';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Gallery } from '@/components/features/Gallery';
import { Post } from '@/lib/types';
import { extractImages } from '@/lib/utils';

export const Realizations = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    const categoryId = 4;
    const perPage = 100;
    fetch(`https://jmajchrzak.tech/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <Dialog>
      <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
        <div className="mb-2 flex flex-col items-center gap-7 py-3 md:py-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="mt-2 text-center text-xl font-light lg:text-2xl">Nasze realizacje</h1>
            <Separator className="h-[2px] w-14 bg-custom-tertiary" />
            <p className="mt-5 w-full px-2 text-center text-sm font-thin sm:text-base md:w-[80%] md:px-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium recusandae sint, culpa veritatis omnis debitis repellat suscipit in nisi
              cumque, modi facilis repudiandae molestias dolorum consequuntur dignissimos odio hic id. Aliquid odio voluptates reprehenderit minus suscipit.
              Earum impedit aspernatur neque.
            </p>
          </div>
          {posts.length === 0 ? (
            <section className="flex flex-wrap justify-center gap-5 px-2 sm:px-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonRealizations key={index} />
              ))}
            </section>
          ) : (
            <section className="flex flex-wrap justify-center gap-5 px-2 sm:px-4">
              {posts?.map(({ id, title, content }) => (
                <DialogTrigger asChild key={id}>
                  <article
                    className={`group grid max-h-[350px] w-[350px] cursor-pointer grid-rows-[7fr_1fr_1fr] overflow-hidden bg-white shadow-xl sm:w-[450px]`}
                    onClick={() => setSelectedId(id)}
                  >
                    {extractImages(content.rendered)
                      .slice(0, 1)
                      .map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          className="h-full max-h-[270px] w-full object-cover transition duration-500 group-hover:scale-110"
                          alt={`Realization house: ${index}`}
                        />
                      ))}
                    <p className="z-10 flex items-center justify-center bg-white px-2 py-1 text-center text-lg font-light uppercase text-custom-secondary">
                      {title.rendered}
                    </p>
                    <Button
                      variant="link"
                      className="text-xs font-semibold transition-all duration-200 ease-in-out group-hover:text-custom-tertiary group-hover:underline"
                    >
                      Więcej
                    </Button>
                  </article>
                </DialogTrigger>
              ))}
            </section>
          )}
        </div>
        <Footer />
      </section>
      {selectedId && <Gallery id={selectedId} />}
    </Dialog>
  );
};
