import { useQuery } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';
import ImageGallery from 'react-image-gallery';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/Skeletons';
import 'react-image-gallery/styles/css/image-gallery.css';
import '@/lib/gallery-fix.css';
import { MediaDetail } from '@/lib/types';

export const Gallery = ({ id, title, startIndex }: { id: number; title?: string; startIndex?: number }) => {
  const perPage = 100;

  const { data, isLoading } = useQuery({
    queryKey: ['gallery', id, perPage],
    queryFn: () => fetch(`https://jmajchrzak.tech/wp-json/wp/v2/media?parent=${id}&per_page=${perPage}&_fields=media_details`).then((res) => res.json()),
  });

  const formattedImages = data?.map((item: MediaDetail) => ({
    original: item.media_details.sizes.full.source_url,
    thumbnail: item.media_details.sizes.thumbnail.source_url,
  }));

  if (isLoading) return <LoadingSpinner />;

  if (!id) return <></>;

  return (
    <DialogContent
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="h-[60vh] w-[100vw] max-w-none grid-rows-[25px_1fr] gap-0 md:h-[75vh] lg:h-[90vh] lg:w-[80vw]"
    >
      <DialogHeader className="gap-6">
        <DialogTitle className="mr-4 text-sm uppercase sm:text-lg">{title}</DialogTitle>
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
