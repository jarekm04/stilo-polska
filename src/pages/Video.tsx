import { Footer } from '@/components/features/Footer';
import { Separator } from '@/components/ui/separator';
import ReactPlayer from 'react-player';

export const Video = () => {
  return (
    <section className="flex flex-col mt-20">
      <article className="flex flex-col gap-16 bg-gradient-to-b from-slate-200 via-white to-orange-50 px-14 pt-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-5">
            <Separator className="h-[80px] w-1 bg-custom-tertiary" orientation="vertical" />
            <p className="text-center text-sm font-light">
              W ciągu naszej 25-letniej historii zrealizowaliśmy wiele wspaniałych projektów w całej Polsce. Od domów całorocznych, przez letniskowe po obiekty
              gospodarcze.
            </p>
            <Separator className="h-[80px] w-1 bg-custom-tertiary" orientation="vertical" />
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-2 lg:grid-rows-1">
            <div className="p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
              <ReactPlayer
                url="short.mp4"
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                light={<img src="short-thumb.png" className="h-full w-full" alt="Thumbnail" />}
              />
            </div>
            <div className="p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
              <ReactPlayer
                url="long.mp4"
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                light={<img src="long-thumb.png" className="h-full w-full" alt="Thumbnail" />}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-5">
            <Separator className="h-[80px] w-1 bg-custom-tertiary" orientation="vertical" />
            <p className="text-center text-sm font-light">
              Dzięki współpracy z renomowanym biurem architektonicznym - Cdom, oferujemy najwyższej jakości projekty. Konstrukcje z bala to nie tylko tradycyjne
              chaty, ale i nowoczesne domy.
            </p>
            <Separator className="h-[80px] w-1 bg-custom-tertiary" orientation="vertical" />
          </div>
          <div className="p-3  transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
            <ReactPlayer
              url="visualisation.mp4"
              width="100%"
              height="100%"
              playing={true}
              controls={true}
              light={<img src="visualisation-thumb.png" className="h-full w-full" alt="Thumbnail" />}
            />
          </div>
        </div>
      </article>
      <Footer />
    </section>
  );
};
