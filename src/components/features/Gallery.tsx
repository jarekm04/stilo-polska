import { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageGallery from 'react-image-gallery';
import { extractImages } from '@/lib/utils';
import 'react-image-gallery/styles/css/image-gallery.css';
import '@/lib/gallery-fix.css';

type ImageItem = {
  original: string;
  thumbnail: string;
};

export const Gallery = ({ id }: { id: number }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`https://admin.jmajchrzak.tech/wp-json/wp/v2/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        <ImageGallery items={images} showFullscreenButton={true} showPlayButton={false} showIndex={true} showThumbnails={true} />
      </div>
    </DialogContent>
  );
};
