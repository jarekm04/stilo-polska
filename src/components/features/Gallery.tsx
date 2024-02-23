import { useEffect, useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const fetchPost = (postId: number) => {
  fetch(`https://admin.jmajchrzak.tech/wp-json/wp/v2/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      // Tutaj możesz obsłużyć odebrane dane
      console.log(data);
    })
    .catch((error) => console.error('Error fetching post:', error));
};

export const Gallery = ({ id }: { id: number }) => {
  const [title, setTitle] = useState();
  const [images, setImages] = useState([]);
  console.log(images);

  useEffect(() => {
    if (!id) return;

    fetch(`https://admin.jmajchrzak.tech/wp-json/wp/v2/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data.content.rendered.match(/https:\/\/admin\.jmajchrzak\.tech\/wp-content\/uploads\/[\w\/.-]+\.jpg/g);
        console.log(imageUrls);
        const mainImageUrls = imageUrls.filter((url) => !url.match(/-\d+x\d+\.jpg$/));

        const formattedImages = mainImageUrls.map((url) => ({ original: url, thumbnail: url }));

        setImages(formattedImages);
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);

  if (!id) return <></>;

  return (
    <DialogContent className="h-[80vh] w-[80vw]" data-dataid="TU_START_DIALOG">
      <DialogHeader className="gap-6">
        <DialogTitle>{'title'}</DialogTitle>
      </DialogHeader>
      <div>
        <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} showIndex={true} />
      </div>
    </DialogContent>
  );
};
