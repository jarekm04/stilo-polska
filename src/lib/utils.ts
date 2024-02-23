import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigation = [
  {
    path: '/',
    title: 'O nas',
  },
  {
    path: '/offer',
    title: 'Oferta',
  },
  {
    path: '/realizations',
    title: 'Nasze realizacje',
  },
  {
    path: '/video',
    title: 'Video',
  },
  {
    path: '/contact',
    title: 'Kontakt',
  },
];

export const extractImages = (content: string) => {
  const regex = /<img.*?src="(.*?)".*?>/g;
  const images = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    images.push(match[1]);
  }
  return images;
};
