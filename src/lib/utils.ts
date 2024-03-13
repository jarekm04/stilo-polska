import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ready1_1,
  ready1_2,
  ready1_3,
  ready1_4,
  ready1_5,
  ready1_6,
  ready1_7,
  ready1_8,
  ready1_9,
  ready1_10,
  ready1_11,
  ready1_12,
  ready1_13,
  ready1_14,
  ready1_15,
  ready2_1,
  ready2_2,
  ready2_3,
  ready2_4,
  ready2_5,
  ready2_6,
  ready2_7,
  ready2_8,
  ready2_9,
  ready2_10,
  ready2_11,
  ready2_12,
  ready2_13,
  ready2_14,
  ready2_15,
  ready2_16,
  ready2_17,
  ready2_18,
  ready2_19,
  ready2_20,
  ready3_1,
  ready3_2,
  ready3_3,
  ready3_4,
  ready3_5,
  ready3_6,
  ready3_7,
  ready3_8,
  ready3_9,
} from './images';

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

export const extractHeading = (content: string) => {
  const regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const headings = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    headings.push(match[1]);
  }
  return headings[0];
};

export const images1 = [
  { original: ready1_1, thumbnail: ready1_1 },
  { original: ready1_2, thumbnail: ready1_2 },
  { original: ready1_3, thumbnail: ready1_3 },
  { original: ready1_4, thumbnail: ready1_4 },
  { original: ready1_5, thumbnail: ready1_5 },
  { original: ready1_6, thumbnail: ready1_6 },
  { original: ready1_7, thumbnail: ready1_7 },
  { original: ready1_8, thumbnail: ready1_8 },
  { original: ready1_9, thumbnail: ready1_9 },
  { original: ready1_10, thumbnail: ready1_10 },
  { original: ready1_11, thumbnail: ready1_11 },
  { original: ready1_12, thumbnail: ready1_12 },
  { original: ready1_13, thumbnail: ready1_13 },
  { original: ready1_14, thumbnail: ready1_14 },
  { original: ready1_15, thumbnail: ready1_15 },
];
export const images2 = [
  { original: ready2_1, thumbnail: ready2_1 },
  { original: ready2_2, thumbnail: ready2_2 },
  { original: ready2_3, thumbnail: ready2_3 },
  { original: ready2_4, thumbnail: ready2_4 },
  { original: ready2_5, thumbnail: ready2_5 },
  { original: ready2_6, thumbnail: ready2_6 },
  { original: ready2_7, thumbnail: ready2_7 },
  { original: ready2_8, thumbnail: ready2_8 },
  { original: ready2_9, thumbnail: ready2_9 },
  { original: ready2_10, thumbnail: ready2_10 },
  { original: ready2_11, thumbnail: ready2_11 },
  { original: ready2_12, thumbnail: ready2_12 },
  { original: ready2_13, thumbnail: ready2_13 },
  { original: ready2_14, thumbnail: ready2_14 },
  { original: ready2_15, thumbnail: ready2_15 },
  { original: ready2_16, thumbnail: ready2_16 },
  { original: ready2_17, thumbnail: ready2_17 },
  { original: ready2_18, thumbnail: ready2_18 },
  { original: ready2_19, thumbnail: ready2_19 },
  { original: ready2_20, thumbnail: ready2_20 },
];
export const images3 = [
  { original: ready3_1, thumbnail: ready3_1 },
  { original: ready3_2, thumbnail: ready3_2 },
  { original: ready3_3, thumbnail: ready3_3 },
  { original: ready3_4, thumbnail: ready3_4 },
  { original: ready3_5, thumbnail: ready3_5 },
  { original: ready3_6, thumbnail: ready3_6 },
  { original: ready3_7, thumbnail: ready3_7 },
  { original: ready3_8, thumbnail: ready3_8 },
  { original: ready3_9, thumbnail: ready3_9 },
];
