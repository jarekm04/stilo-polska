import { SkeletonRealizations } from '@/components/features/Skeletons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

const fetchPost = (postId: number) => {
  fetch(`https://admin.jmajchrzak.tech/wp-json/wp/v2/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      // Tutaj możesz obsłużyć odebrane dane
      console.log(data);
    })
    .catch((error) => console.error('Error fetching post:', error));
};

// {extractImages(content.rendered).map((image, index) => (
//   <img key={index} src={image} alt={`Image ${index}`} className="w-40" />
// ))}

export const Realizations = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  console.log(posts);

  useEffect(() => {
    fetch('https://admin.jmajchrzak.tech/wp-json/wp/v2/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const extractImages = (content: string) => {
    const regex = /<img.*?src="(.*?)".*?>/g;
    const images = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      images.push(match[1]);
    }
    return images;
  };

  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col items-center gap-7 bg-gradient-to-b from-white to-orange-50 py-8">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="mt-2 text-center text-2xl font-light">Nasze realizacje</h1>
        <Separator className="h-[2px] w-14 bg-custom-tertiary" />
        <p className="mt-5 w-[60%] px-4 text-center font-thin">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium recusandae sint, culpa veritatis omnis debitis repellat suscipit in nisi cumque,
          modi facilis repudiandae molestias dolorum consequuntur dignissimos odio hic id. Aliquid odio voluptates reprehenderit minus suscipit. Earum impedit
          aspernatur neque.
        </p>
      </div>
      {posts.length === 0 ? (
        <section className="grid grid-cols-1 gap-5 px-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonRealizations key={index} />
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-5 px-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {posts?.map(({ id, title, content }) => (
            <article
              key={id}
              className={`group grid cursor-pointer grid-rows-[7fr_2fr_1fr] overflow-hidden bg-white shadow-xl`}
              onClick={() => console.log('Slider')}
            >
              {extractImages(content.rendered)
                .slice(0, 1)
                .map((image, index) => (
                  <img key={index} src={image} className="h-full object-cover transition duration-500 group-hover:scale-110" alt={`Image ${index}`} />
                ))}
              <p className="flex items-center justify-center px-2 text-center text-lg font-light uppercase text-custom-secondary">{title.rendered}</p>
              <Button
                variant="link"
                className="text-xs font-semibold transition-all duration-200 ease-in-out group-hover:text-custom-tertiary group-hover:underline"
              >
                Więcej
              </Button>
            </article>
          ))}
        </section>
      )}
    </section>
  );
};
