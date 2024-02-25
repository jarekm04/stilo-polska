import { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageGallery from 'react-image-gallery';
import { extractImages } from '@/lib/utils';
import { ImageItem } from '@/lib/types';
import 'react-image-gallery/styles/css/image-gallery.css';
import '@/lib/gallery-fix.css';

export const Gallery = ({ id, startIndex}: { id: number; startIndex?: number }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`https://admin.jmajchrzak.tech/wp-json/wp/v2/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const imagesUrls = extractImages(data.content.rendered);
        const formattedImages = imagesUrls.map((url) => ({ original: url, thumbnail: url }));

        setImages(formattedImages);
        setTitle(data.title.rendered);
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);

  if (!id) return <></>;

  return (
    <DialogContent className="h-[80vh] w-[80vw] max-w-none grid-rows-[25px_1fr]">
      <DialogHeader className="gap-6">
        <DialogTitle className='text-lg'>{title}</DialogTitle>
      </DialogHeader>
      <div className="h-full max-w-full overflow-hidden">
        <ImageGallery items={images} showFullscreenButton={true} showPlayButton={false} showIndex={true} showThumbnails={true} startIndex={startIndex} />
      </div>
    </DialogContent>
  );
};
