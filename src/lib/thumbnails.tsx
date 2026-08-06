import { Play } from 'lucide-react';
import longThumb from '@/assets/long-thumb.png';
import shortThumb from '@/assets/short-thumb.png';
import visualisationThumb from '@/assets/visualisation-thumb.png';
import residenceThumb from '@/assets/residence-thumb.png';
import houseThumb from '@/assets/house-thumb.png';
import house2Thumb from '@/assets/house2-thumb.png';
import insideThumb from '@/assets/inside-thumb.png';

/**
 * Wspólna miniatura odtwarzacza: kadr, gradient, tytuł i przycisk play.
 * Część miniatur pochodzi z pionowych filmów i ma wypalone czarne pasy –
 * dlatego kadr skalujemy przez `object-contain`, a tło wypełnia rozmyta kopia zdjęcia.
 */
const Thumb = ({ src, title }: { src: string; title: string }) => (
  <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-ink">
    <img src={src} className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl saturate-150" alt="" aria-hidden />
    <img
      src={src}
      className="relative h-full w-full object-contain transition-transform duration-1000 ease-smooth group-hover:scale-[1.04]"
      alt={title}
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/25" />

    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-500 ease-smooth group-hover:scale-110 group-hover:bg-brand">
      <Play className="ml-1 h-6 w-6 fill-white text-white" />
    </span>

    <h2 className="absolute bottom-0 left-0 right-0 p-5 text-left font-display text-lg font-normal leading-snug text-white sm:text-xl">{title}</h2>
  </div>
);

export const ThumbShort = () => <Thumb src={shortThumb} title="Dom całoroczny" />;

export const ThumbLong = () => <Thumb src={longThumb} title="Przebieg budowy domu z bali" />;

export const ThumbResidence = () => <Thumb src={residenceThumb} title="Rezydencja z bali" />;

export const ThumbHouse = () => <Thumb src={houseThumb} title="Dom w Jurze Krakowsko-Częstochowskiej 450 m²" />;

export const ThumbVisualisation = () => <Thumb src={visualisationThumb} title="Ekskluzywny dom z bali" />;

export const ThumbHouse2 = () => <Thumb src={house2Thumb} title="Dom pod Krzeszowicami" />;

export const ThumbInside = () => <Thumb src={insideThumb} title="Wnętrza – wizualizacje" />;
