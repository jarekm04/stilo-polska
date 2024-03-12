import ReactPlayer from 'react-player';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube } from 'lucide-react';
import { ThumbHouse, ThumbHouse2, ThumbInside, ThumbLong, ThumbResidence, ThumbShort, ThumbVisualisation } from '@/lib/thumbnails';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import residence from '@/assets/residence.mp4';
import house from '@/assets/house.mp4';
import house2 from '@/assets/house2.mp4';
import inside from '@/assets/inside.mp4';

const Projects = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <Separator className="h-[2px] w-14 bg-custom-tertiary" />
        <p className="mt-5 w-full px-3 text-center text-sm font-light md:px-4 md:text-base">Kilka przykładowych realizacji, które cieszą oko.</p>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-2 px-3 text-sm font-light md:px-4 md:text-base">
          <p className="text-sm font-light md:text-base">Po więcej zapraszamy na</p>
          <Link
            className="flex gap-2 transition-all hover:text-custom-tertiary"
            to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs"
            target="_blank"
          >
            <Facebook /> Facebook
          </Link>
          <p className="text-sm font-light md:text-base">oraz na</p>
          <Link className="flex gap-2 transition-all hover:text-custom-tertiary" to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank">
            <Youtube /> Youtube
          </Link>
          <p className="text-sm font-light md:text-base">.</p>
        </div>
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
        <div className="xs:max-h-[350px] max-h-[220px] max-w-[800px] p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)] sm:max-h-[500px]">
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
        <p className="mt-5 w-full px-3 text-sm font-light text-center lg:w-[70%] md:px-4 md:text-base">
          Dzięki współpracy z renomowanym biurem architektonicznym -{' '}
          <Link to="https://tinyurl.com/yc3htpw3" target="_blank" className="text-custom-tertiary underline">
            Cdom
          </Link>
          , oferujemy najwyższej jakości projekty. Konstrukcje z bala to nie tylko tradycyjne chaty, ale i nowoczesne domy.
        </p>
        <div className="flex w-full flex-wrap justify-center gap-x-2 px-3 text-sm font-light lg:w-[70%] md:px-4 md:text-base">
          <p className="text-sm font-light md:text-base">Po więcej zapraszamy na</p>
          <Link className="flex gap-2 transition-all hover:text-custom-tertiary" to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank">
            <Youtube /> Youtube Cdom.
          </Link>
        </div>
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
      <div className="grid grid-cols-1 grid-rows-2 gap-3 lg:grid-cols-2 lg:grid-rows-1">
        <div className="flex max-h-[400px] max-w-[700px] items-center p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
          <ReactPlayer url={house2} height="100%" width="100%" playing={true} controls={true} light={<ThumbHouse2 />} />
        </div>
        <div className="max-h-[400px] max-w-[700px] p-3 transition-all duration-300 ease-in-out hover:cursor-pointer hover:drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
          <ReactPlayer url={inside} width="100%" height="100%" playing={true} controls={true} light={<ThumbInside />} />
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
