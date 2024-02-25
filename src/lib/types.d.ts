export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

export type ImageItem = {
  original: string;
  thumbnail: string;
};