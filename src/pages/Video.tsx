import ReactPlayer from 'react-player';
import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Facebook, Youtube } from 'lucide-react';
import { ThumbHouse, ThumbHouse2, ThumbInside, ThumbLong, ThumbResidence, ThumbShort, ThumbVisualisation } from '@/lib/thumbnails';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';
import residence from '@/assets/residence.mp4';
import house from '@/assets/house.mp4';
import house2 from '@/assets/house2.mp4';
import inside from '@/assets/inside.mp4';
import heroImage from '@/assets/slider3.webp';

/* Link zostaje elementem inline (bez inline-flex), dzięki czemu jego tekst leży
   na tej samej linii bazowej co reszta akapitu; ikonę dosuwamy do tekstu przez align. */
const socialLinkClasses = 'font-medium text-brand transition-colors hover:text-brand-dark';
/* krótkie etykiety trzymamy w jednej linii razem z ikoną */
const socialLinkNowrapClasses = cn(socialLinkClasses, 'whitespace-nowrap');
const socialIconClasses = 'mr-1.5 inline-block h-4 w-4 align-[-0.2em]';

/**
 * Kadr 16:9 z zaokrągleniem – ujednolica wszystkie odtwarzacze.
 * Każdy jedzie we własnym tempie względem strony, więc siatka nagrań oddycha
 * zamiast przesuwać się jednym blokiem.
 */
const Frame = ({ children, delay = 0, shift = 40 }: { children: ReactNode; delay?: number; shift?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isStill = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);

  return (
    <Reveal delay={delay}>
      <motion.div
        ref={ref}
        style={isStill ? undefined : { y }}
        className="aspect-video w-full overflow-hidden rounded-2xl bg-ink shadow-soft transition-shadow duration-500 ease-smooth hover:shadow-lift"
      >
        {children}
      </motion.div>
    </Reveal>
  );
};

const playerProps = { width: '100%', height: '100%', playing: true, controls: true } as const;

const Projects = () => (
  <div className="flex flex-col gap-10">
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-light leading-relaxed text-ink/65 sm:text-base">
        Kilka przykładowych realizacji, które cieszą oko. Po więcej zapraszamy na{' '}
        <Link className={socialLinkNowrapClasses} to="https://www.facebook.com/people/Domy-z-bali-Stilo-Polska/100057174441927/?ref=br_rs" target="_blank">
          <Facebook className={socialIconClasses} />
          Facebook
        </Link>{' '}
        oraz{' '}
        <Link className={socialLinkNowrapClasses} to="https://www.youtube.com/channel/UCy3px_4qWAVVZhfCnmsyEmA" target="_blank">
          <Youtube className={socialIconClasses} />
          YouTube
        </Link>
        .
      </p>
    </Reveal>

    <div className="grid gap-6 lg:grid-cols-2">
      <Frame>
        <ReactPlayer url="https://stilopolska.pl/wp-content/uploads/2024/03/short.mp4" {...playerProps} light={<ThumbShort />} />
      </Frame>
      <Frame delay={100} shift={-40}>
        <ReactPlayer url={residence} {...playerProps} light={<ThumbResidence />} />
      </Frame>
    </div>

    <div className="mx-auto w-full lg:max-w-4xl">
      <Frame delay={60} shift={24}>
        <ReactPlayer url="https://stilopolska.pl/wp-content/uploads/2024/03/long.mp4" {...playerProps} light={<ThumbLong />} />
      </Frame>
    </div>
  </div>
);

const Visualisations = () => (
  <div className="flex flex-col gap-10">
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-light leading-relaxed text-ink/65 sm:text-base">
        Dzięki współpracy z renomowanym biurem architektonicznym –{' '}
        <Link to="https://tinyurl.com/yc3htpw3" target="_blank" className="font-medium text-brand underline decoration-brand/30 underline-offset-4">
          Cdom
        </Link>{' '}
        – oferujemy najwyższej jakości projekty. Konstrukcje z bala to nie tylko tradycyjne chaty, ale i nowoczesne domy. Po więcej zapraszamy na{' '}
        <Link className={socialLinkClasses} to="https://www.youtube.com/@cdomprojektypiotrstoklosa8873/videos" target="_blank">
          <Youtube className={socialIconClasses} />
          YouTube Cdom Piotr Stokłosa
        </Link>
        .
      </p>
    </Reveal>

    <div className="grid gap-6 lg:grid-cols-2">
      <Frame>
        <ReactPlayer url="https://stilopolska.pl/wp-content/uploads/2024/03/visualisation.mp4" {...playerProps} light={<ThumbVisualisation />} />
      </Frame>
      <Frame delay={100} shift={-40}>
        <ReactPlayer url={house} {...playerProps} light={<ThumbHouse />} />
      </Frame>
      <Frame delay={60} shift={-28}>
        <ReactPlayer url={house2} {...playerProps} light={<ThumbHouse2 />} />
      </Frame>
      <Frame delay={140} shift={32}>
        <ReactPlayer url={inside} {...playerProps} light={<ThumbInside />} />
      </Frame>
    </div>
  </div>
);

const tabs = [
  { id: 'projects', label: 'Realizacje' },
  { id: 'visualisations', label: 'Wizualizacje' },
] as const;

export const Video = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('projects');

  return (
    <section className="flex min-h-screen flex-col bg-cream">
      <PageHero eyebrow="Galeria wideo" title="Zobacz nasze domy w ruchu" image={heroImage}>
        {/* wskaźnik przejeżdża między zakładkami zamiast przeskakiwać – wspólne `layoutId` */}
        <div className="mt-1 inline-flex rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md backdrop-saturate-150">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-pressed={activeTab === id}
              className="relative rounded-full px-7 py-2.5 text-sm font-semibold"
            >
              {activeTab === id && (
                <motion.span
                  layoutId="video-tab-indicator"
                  className="absolute inset-0 rounded-full bg-brand shadow-brand"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className={cn('relative z-10 transition-colors duration-300', activeTab === id ? 'text-white' : 'text-white/60 hover:text-white')}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </PageHero>

      <div className="shell px-5 py-14 sm:px-8 lg:px-12 lg:py-20">{activeTab === 'projects' ? <Projects /> : <Visualisations />}</div>

      <CtaBand />
    </section>
  );
};
