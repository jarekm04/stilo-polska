import { useQuery } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';
import ImageGallery, { type ReactImageGalleryItem } from 'react-image-gallery';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/Skeletons';
import 'react-image-gallery/styles/css/image-gallery.css';
import '@/lib/gallery-fix.css';
import { MediaDetail } from '@/lib/types';

type LightboxProps = { title?: string; items: ReactImageGalleryItem[]; startIndex?: number };

/**
 * Pełnoekranowy, ciemny podgląd zdjęć.
 *
 * Wspólna oprawa dla galerii budowanych z lokalnych plików (strona główna)
 * i tych pobieranych z WordPressa (podstrony) – jedno miejsce na wygląd,
 * dwa źródła zdjęć.
 */
export const Lightbox = ({ title, items, startIndex }: LightboxProps) => (
  <DialogContent
    onOpenAutoFocus={(event) => event.preventDefault()}
    className="flex h-[100svh] w-screen max-w-none flex-col gap-0 rounded-none bg-ink p-0 sm:rounded-none"
  >
    <DialogHeader className="shrink-0 px-5 pb-4 pt-6 sm:px-8">
      <DialogTitle className="max-w-[calc(100%-4rem)] text-left font-display text-base font-normal text-cream sm:text-xl">{title}</DialogTitle>
    </DialogHeader>

    <div className="min-h-0 flex-1 px-3 pb-3 sm:px-6 sm:pb-6">
      <ImageGallery
        items={items}
        showPlayButton={false}
        showIndex
        showThumbnails
        showNav
        showFullscreenButton={!isMobile}
        startIndex={startIndex}
      />
    </div>
  </DialogContent>
);

export const Gallery = ({ id, title, startIndex }: { id: number; title?: string; startIndex?: number }) => {
  const perPage = 100;

  const { data, isLoading } = useQuery({
    queryKey: ['gallery', id, perPage],
    queryFn: () =>
      fetch(`https://stilopolska.pl/wp-json/wp/v2/media?parent=${id}&per_page=${perPage}&_fields=media_details&orderby=title&order=asc
    `).then((res) => res.json()),
  });

  const formattedImages = data?.map((item: MediaDetail) => ({
    original: item.media_details.sizes.full.source_url,
    thumbnail: item.media_details.sizes.thumbnail.source_url,
  }));

  if (isLoading) return <LoadingSpinner />;

  if (!id) return <></>;

  return <Lightbox title={title} items={formattedImages ?? []} startIndex={startIndex} />;
};
