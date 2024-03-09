import ReactPlayer from 'react-player';
import { useState } from 'react';
import { ThumbHouse, ThumbLong, ThumbResidence, ThumbShort, ThumbVisualisation } from '@/lib/thumbnails';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import residence from '@/assets/residence.mp4';
import house from '@/assets/house.mp4';

const Projects = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <Separator className="h-[2px] w-14 bg-custom-tertiary" />
        <p className="mt-5 w-full px-3 text-sm font-thin md:w-[70%] md:px-4 md:text-base">
          W ciągu naszej 25-letniej historii zrealizowaliśmy wiele wspaniałych projektów w całej Polsce. Od domów całorocznych, przez letniskowe po obiekty
          gospodarcze.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-2 lg:grid-rows-1">
        <div className="max-h-[500px] max-w-[800px] p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
          <ReactPlayer
            url="https://jmajchrzak.tech/wp-content/uploads/2024/03/short-1.mp4"
            width="100%"
            height="100%"
            playing={true}
            controls={true}
            light={<ThumbShort />}
          />
        </div>
        <div className="max-h-[500px] max-w-[800px] p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
          <ReactPlayer url={residence} width="100%" height="100%" playing={true} controls={true} light={<ThumbResidence />} />
        </div>
      </div>
      <div className="max-h-[500px] max-w-[800px] p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
        <ReactPlayer
          url="https://jmajchrzak.tech/wp-content/uploads/2024/03/long.mp4"
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          light={<ThumbLong />}
        />
      </div>
    </div>
  );
};

const Visualisations = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <Separator className="h-[2px] w-14 bg-custom-tertiary" />
        <p className="mt-5 w-full px-3 text-sm font-thin md:w-[70%] md:px-4 md:text-base">
          Dzięki współpracy z renomowanym biurem architektonicznym - Cdom, oferujemy najwyższej jakości projekty. Konstrukcje z bala to nie tylko tradycyjne
          chaty, ale i nowoczesne domy.
        </p>
      </div>
      <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-2 lg:grid-rows-1">
        <div className="flex max-h-[400px] max-w-[700px] items-center p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
          <ReactPlayer
            url="https://jmajchrzak.tech/wp-content/uploads/2024/03/visualisation-1.mp4"
            height="100%"
            width="100%"
            playing={true}
            controls={true}
            light={<ThumbVisualisation />}
          />
        </div>
        <div className="max-h-[400px] max-w-[700px] p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
          <ReactPlayer url={house} width="100%" height="100%" playing={true} controls={true} light={<ThumbHouse />} />
        </div>
      </div>
    </div>
  );
};

export const Video = () => {
  const [showSecondContent, setShowSecondContent] = useState(false);

  return (
    <section className="mt-20 flex flex-col">
      <article className="flex flex-col gap-6 bg-gradient-to-b from-white to-orange-50 pt-4">
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex justify-center gap-6">
            <Button
              className="bg-custom-tertiary text-sm text-white transition-all hover:border-custom-tertiary hover:bg-orange-50 hover:text-custom-tertiary sm:text-base"
              onClick={() => setShowSecondContent(false)}
              disabled={!showSecondContent}
            >
              Realizacje
            </Button>
            <Button
              className="bg-custom-tertiary text-sm text-white transition-all hover:border-custom-tertiary hover:bg-orange-50 hover:text-custom-tertiary sm:text-base"
              onClick={() => setShowSecondContent(true)}
              disabled={showSecondContent}
            >
              Wizualizacje
            </Button>
          </div>
        </div>
        <div className="flex justify-center p-4 md:gap-16 md:px-14 md:pb-8">{showSecondContent ? <Visualisations /> : <Projects />}</div>
      </article>
      <Footer />
    </section>
  );
};
