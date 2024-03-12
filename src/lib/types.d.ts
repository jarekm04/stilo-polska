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

export interface MediaDetail {
  media_details: {
    sizes: {
      full: {
        source_url: string;
      };
      thumbnail: {
        source_url: string;
      };
    };
  };
}
export type MediaDetails = MediaDetail[];
