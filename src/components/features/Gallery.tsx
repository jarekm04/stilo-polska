import { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageGallery from 'react-image-gallery';
import { ImageItem } from '@/lib/types';
import 'react-image-gallery/styles/css/image-gallery.css';
import '@/lib/gallery-fix.css';

const mockImages = [
  {
    original: '/ready1.jpg',
    thumbnail: '/ready1.jpg',
  },
  {
    original: '/ready2.jpg',
    thumbnail: '/ready2.jpg',
  },
  {
    original: '/ready3.jpeg',
    thumbnail: '/ready3.jpeg',
  },
  {
    original: '/ready1.jpg',
    thumbnail: '/ready1.jpg',
  },
  {
    original: '/ready2.jpg',
    thumbnail: '/ready2.jpg',
  },
  {
    original: '/ready3.jpeg',
    thumbnail: '/ready3.jpeg',
  },
  {
    original: '/ready1.jpg',
    thumbnail: '/ready1.jpg',
  },
];

export const Gallery = ({ id, startIndex }: { id: number; startIndex?: number }) => {
  const [title, setTitle] = useState('Dom całoroczny 250m2');
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setImages(mockImages);
    }, 500);
  }, []);

  if (!id) return <></>;

  return (
    <DialogContent className="h-[80vh] w-[80vw] max-w-none grid-rows-[25px_1fr]">
      <DialogHeader className="gap-6">
        <DialogTitle className="text-lg">{title}</DialogTitle>
      </DialogHeader>
      <div className="h-full max-w-full overflow-hidden">
        <ImageGallery items={images} showFullscreenButton={true} showPlayButton={false} showIndex={true} showThumbnails={true} startIndex={startIndex} />
      </div>
    </DialogContent>
  );
};
