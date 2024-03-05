import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';
import ImageGallery from 'react-image-gallery';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { extractImages } from '@/lib/utils';
import 'react-image-gallery/styles/css/image-gallery.css';
import '@/lib/gallery-fix.css';

export const Gallery = ({ id, startIndex }: { id: number; startIndex?: number }) => {
  const { data } = useQuery({
    queryKey: ['gallery', id],
    queryFn: () => fetch(`https://jmajchrzak.tech/wp-json/wp/v2/posts/${id}`).then((res) => res.json()),
  });

  const title = data?.title.rendered;
  const imagesUrls = extractImages(data?.content.rendered);
  const formattedImages = imagesUrls.map((url) => ({ original: url, thumbnail: url }));

  useEffect(() => {
    setTimeout(() => {}, 500);
  }, []);

  if (!id) return <></>;

  return (
    <DialogContent
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="h-[40vh] w-[80vw] max-w-none grid-rows-[25px_1fr] sm:h-[50vh] md:h-[65vh] lg:h-[80vh]"
    >
      <DialogHeader className="gap-6">
        <DialogTitle className="mr-4 text-sm sm:text-lg">{title}</DialogTitle>
      </DialogHeader>
      <div className="h-full max-w-full overflow-hidden">
        <ImageGallery
          items={formattedImages}
          showPlayButton={false}
          showIndex={true}
          showThumbnails={true}
          showNav={true}
          showFullscreenButton={isMobile ? false : true}
          startIndex={startIndex}
        />
      </div>
    </DialogContent>
  );
};
