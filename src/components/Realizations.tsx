import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { ArrowRight, Camera } from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { images1, images2, images3 } from '@/lib/utils';
import ready1 from '@/assets/ready1.jpg';
import ready2 from '@/assets/ready2.jpg';
import ready3 from '@/assets/ready3.jpg';

const items = [
  { title: 'Dom całoroczny bal klejony 279 m²', src: ready1, id: 1, count: images1.length },
  { title: 'Dom całoroczny 140 m²', src: ready2, id: 2, count: images2.length },
  { title: 'Dom całoroczny bal klejony 450 m²', src: ready3, id: 3, count: images3.length },
];

const getSelectedImages = (id: number) => {
  switch (id) {
    case 2:
      return images2;
    case 3:
      return images3;
    default:
      return images1;
  }
};

export const Realizations = () => {
  const [selectedId, setSelectedId] = useState<number>();
  const navigate = useNavigate();

  return (
    <Dialog>
      <article className="relative overflow-hidden bg-cream">
        <div className="shell section-pad">
          <SectionHeading
            eyebrow="Zrealizowane"
            title="Domy, które już stoją"
            description="Zajrzyj do galerii wybranych realizacji – od stanu surowego po gotowe wnętrza."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map(({ title, src, id, count }, index) => (
              <Reveal key={id} delay={index * 100} className="h-full">
                <DialogTrigger asChild>
                  <div
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift"
                    onClick={() => setSelectedId(id)}
                  >
                    <div className="relative h-[240px] overflow-hidden">
                      <img
                        src={src}
                        className="h-full w-full object-cover transition-transform duration-1000 ease-smooth group-hover:scale-[1.08]"
                        alt={title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[0.7rem] font-semibold text-ink backdrop-blur-md">
                        <Camera className="h-3.5 w-3.5 text-brand" />
                        {count} zdjęć
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-start gap-3 p-6">
                      <h3 className="text-lg font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-brand">{title}</h3>
                      <span className="mt-auto inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand">
                        Zobacz galerię
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-12 flex justify-center">
            <button
              type="button"
              className="group inline-flex h-[3.25rem] items-center gap-3 rounded-full border border-ink/15 px-9 text-sm font-semibold text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-brand"
              onClick={() => navigate('/realizacje')}
            >
              Więcej realizacji
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </Reveal>
        </div>
      </article>

      {selectedId && (
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="h-[60vh] w-[100vw] max-w-none grid-rows-[25px_1fr] md:h-[75vh] lg:h-[90vh] lg:w-[80vw]"
        >
          <DialogHeader className="gap-6">
            <DialogTitle className="mr-4 text-sm font-medium uppercase tracking-wide sm:text-lg">{items.find((item) => item.id === selectedId)?.title}</DialogTitle>
          </DialogHeader>
          <div className="h-full max-w-full overflow-hidden">
            <ImageGallery items={getSelectedImages(selectedId)} showPlayButton={false} showIndex showThumbnails showNav showFullscreenButton={!isMobile} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
