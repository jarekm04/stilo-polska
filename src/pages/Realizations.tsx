import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SkeletonRealizations } from '@/components/features/Skeletons';
import { Footer } from '@/components/common/Footer';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Gallery } from '@/components/features/Gallery';
import ready1 from '@/assets/ready1.jpg';
import ready2 from '@/assets/ready2.jpg';
import ready3 from '@/assets/ready3.jpeg';

export interface FakePost {
  content: string;
  title: string;
  id: number;
}

const mockContent = [
  {
    content: ready1,
    title: 'dom całoroczny 250m2',
    id: 142,
  },
  {
    content: ready2,
    title: 'domy całoroczne 150m2 i 200m2',
    id: 140,
  },
  {
    content: ready3,
    title: 'dom całoroczny 149m2',
    id: 137,
  },
  {
    content: ready3,
    title: 'dom całoroczny 190m2',
    id: 135,
  },
  {
    content: ready2,
    title: 'stodoła 450m2',
    id: 130,
  },
  {
    content: ready1,
    title: 'dom letniskowy',
    id: 125,
  },
  {
    content: ready1,
    title: 'dom całoroczny 250m2',
    id: 122,
  },
  {
    content: ready2,
    title: 'dom całoroczny 130m2',
    id: 118,
  },
  {
    content: ready3,
    title: 'ruska bania',
    id: 116,
  },
  {
    content: ready2,
    title: 'dom całoroczny 230m2',
    id: 112,
  },
];

export const Realizations = () => {
  const [posts, setPosts] = useState<FakePost[]>([]);
  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    setTimeout(() => {
      setPosts(mockContent);
    }, 2000);
  }, []);

  return (
    <Dialog>
      <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
        <div className="flex flex-col items-center gap-7 py-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="mt-2 text-center text-2xl font-light">Nasze realizacje</h1>
            <Separator className="h-[2px] w-14 bg-custom-tertiary" />
            <p className="mt-5 w-[80%] px-4 text-center font-thin">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium recusandae sint, culpa veritatis omnis debitis repellat suscipit in nisi
              cumque, modi facilis repudiandae molestias dolorum consequuntur dignissimos odio hic id. Aliquid odio voluptates reprehenderit minus suscipit.
              Earum impedit aspernatur neque.
            </p>
          </div>
          {posts.length === 0 ? (
            <section className="grid grid-cols-1 gap-5 px-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonRealizations key={index} />
              ))}
            </section>
          ) : (
            <section className="grid grid-cols-1 gap-5 px-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
              {posts?.map(({ id, title, content }) => (
                <DialogTrigger asChild key={id}>
                  <article
                    className={`group grid max-h-[350px] cursor-pointer grid-rows-[7fr_1fr_1fr] overflow-hidden bg-white shadow-xl`}
                    onClick={() => setSelectedId(id)}
                  >
                    <img
                      src={content}
                      className="h-full max-h-[270px] w-full object-cover transition duration-500 group-hover:scale-110"
                      alt={`Realization house: ${id}`}
                    />
                    <p className="z-10 flex items-center justify-center bg-white px-2 py-1 text-center text-lg font-light uppercase text-custom-secondary">
                      {title}
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
