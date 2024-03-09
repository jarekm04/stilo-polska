import longThumb from '@/assets/long-thumb.png';
import shortThumb from '@/assets/short-thumb.png';
import visualisationThumb from '@/assets/visualisation-thumb.png';
import residenceThumb from '@/assets/residence-thumb.png';
import houseThumb from '@/assets/house-thumb.png';

export const ThumbShort = () => {
  return (
    <div className="relative h-full w-full">
      <h2 className="absolute left-4 top-4 text-white">Dom całoroczny</h2>
      <img src={shortThumb} className="h-full w-full" alt="Thumbnail" />
    </div>
  );
};

export const ThumbLong = () => {
  return (
    <div className="relative h-full w-full">
      <h2 className="absolute left-4 top-4 text-white">Przebieg budowy domu z bali</h2>
      <img src={longThumb} className="h-full w-full" alt="Thumbnail" />
    </div>
  );
};

export const ThumbResidence = () => {
  return (
    <div className="relative h-full w-full">
      <h2 className="absolute left-4 top-4 text-white">Rezydencja z bali</h2>
      <img src={residenceThumb} className="h-full w-full" alt="Thumbnail" />
    </div>
  );
};

export const ThumbHouse = () => {
  return (
    <div className="relative h-full w-full">
      <h2 className="absolute left-4 top-4 text-white">Dom w Jurze Krokowsko Częstochowskiej 450m2</h2>
      <img src={houseThumb} className="h-full w-full" alt="Thumbnail" />
    </div>
  );
};

export const ThumbVisualisation = () => {
  return (
    <div className="relative h-full w-full">
      <h2 className="absolute left-4 top-4 text-white">Ekskluzywny dom z bali</h2>
      <img src={visualisationThumb} className="h-full w-full" alt="Thumbnail" />
    </div>
  );
};
