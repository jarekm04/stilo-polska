import { Footer } from '@/components/common/Footer';
import { Separator } from '@/components/ui/separator';
import ReactPlayer from 'react-player';
import longThumb from '@/assets/long-thumb.png';
import shortThumb from '@/assets/short-thumb.png';
import visualisationThumb from '@/assets/visualisation-thumb.png';
import short from '@/assets/short.mp4';
import long from '@/assets/long.mp4';
import visualisation from '@/assets/visualisation.mp4';

export const Video = () => {
  return (
    <section className="mt-20 flex flex-col">
      <article className="flex flex-col gap-6 md:gap-16 bg-gradient-to-b from-white to-orange-50 px-4 py-4 md:px-14 md:py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="mt-2 text-center text-xl font-light md:text-2xl">Lorem Ipsum</h1>
            <Separator className="h-[2px] w-14 bg-custom-tertiary" />
            <p className="mt-5 w-full md:w-[60%] px-2 text-center text-sm font-thin md:px-4 md:text-base">
              W ciągu naszej 25-letniej historii zrealizowaliśmy wiele wspaniałych projektów w całej Polsce. Od domów całorocznych, przez letniskowe po obiekty
              gospodarcze.
            </p>
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-2 lg:grid-rows-1">
            <div className="p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
              <ReactPlayer
                url={short}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                light={<img src={shortThumb} className="h-full w-full" alt="Thumbnail" />}
              />
            </div>
            <div className="p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
              <ReactPlayer
                url={long}
                width="100%"
                height="100%"
                playing={true}
                controls={true}
                light={<img src={longThumb} className="h-full w-full" alt="Thumbnail" />}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="mt-2 text-center text-xl font-light md:text-2xl">Lorem Ipsum</h1>
            <Separator className="h-[2px] w-14 bg-custom-tertiary" />
            <p className="mt-5 w-full md:w-[60%] px-2 text-center text-sm font-thin md:px-4 md:text-base">
              Dzięki współpracy z renomowanym biurem architektonicznym - Cdom, oferujemy najwyższej jakości projekty. Konstrukcje z bala to nie tylko tradycyjne
              chaty, ale i nowoczesne domy.
            </p>
          </div>
          <div className="p-3  transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
            <ReactPlayer
              url={visualisation}
              width="100%"
              height="100%"
              playing={true}
              controls={true}
              light={<img src={visualisationThumb} className="h-full w-full" alt="Thumbnail" />}
            />
          </div>
        </div>
      </article>
      <Footer />
    </section>
  );
};
