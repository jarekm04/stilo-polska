/**
 * Konwersja assetów do WebP.
 *
 * Uruchomienie: `npm run assets` (dopisanie `-- --force` nadpisuje istniejące pliki).
 *
 * Skrypt jest powtarzalny: domyślnie pomija to, co już zrobił, więc można go puścić
 * po dorzuceniu nowych zdjęć. Oryginały zostawia nietknięte – usunięcie ich to
 * osobna, świadoma decyzja.
 */
import { readdir, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS = path.resolve('src/assets');
const force = process.argv.includes('--force');

/**
 * Zadania: skąd, w jakiej szerokości i z jaką jakością.
 * `portrait` dokłada kadr 9:16 pod telefon – sharp sam wybiera najciekawszy
 * fragment kadru, więc dom nie ucieka poza krawędź.
 */
const jobs = [
  { label: 'miniatury wideo', files: ['house-thumb.png', 'house2-thumb.png', 'inside-thumb.png', 'long-thumb.png', 'residence-thumb.png', 'short-thumb.png', 'visualisation-thumb.png'], width: 1600, quality: 80 },
  { label: 'kadry hero', files: ['slider1.jpg', 'slider2.jpg', 'slider3.jpg', 'slider4.jpg', 'slider5.jpg'], width: 2048, quality: 80, portrait: true },
  { label: 'podglądy hero', files: ['slider1FCP.jpg', 'slider2FCP.jpg', 'slider3FCP.jpg', 'slider4FCP.jpg', 'slider5FCP.jpg'], width: 640, quality: 60 },
  { label: 'oferta', files: ['offer1.jpg', 'offer2.jpg', 'offer3.jpg', 'offer4.jpg'], width: 1600, quality: 80 },
  { label: 'realizacje', files: ['ready1.jpg', 'ready2.jpg', 'ready3.jpg'], width: 1600, quality: 80 },
  { label: 'pozostałe', files: ['contact.jpeg', 'detective.png', 'offer-skeleton.jpg', 'realization-skeleton.jpeg'], width: 1600, quality: 78 },
];

const galleries = ['ready1', 'ready2', 'ready3'];

const toWebp = (file) => `${file.replace(/\.(jpe?g|png)$/i, '')}.webp`;

const convert = async (from, to, width, quality) => {
  if (!force && existsSync(to)) return { skipped: true, before: 0, after: 0 };

  const before = (await stat(from)).size;
  const image = sharp(from);
  const meta = await image.metadata();

  await image
    .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(to);

  return { skipped: false, before, after: (await stat(to)).size };
};

const mb = (bytes) => (bytes / 1048576).toFixed(2);

const run = async () => {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const { label, files, width, quality, portrait } of jobs) {
    let before = 0;
    let after = 0;

    for (const file of files) {
      const from = path.join(ASSETS, file);

      if (!existsSync(from)) {
        console.warn(`  pominięto (brak pliku): ${file}`);
        continue;
      }

      const result = await convert(from, path.join(ASSETS, toWebp(file)), width, quality);

      before += result.before;
      after += result.after;

      if (portrait) {
        const target = path.join(ASSETS, toWebp(file).replace('.webp', '-portrait.webp'));

        if (force || !existsSync(target)) {
          await sharp(from).resize(1080, 1920, { fit: 'cover', position: sharp.strategy.attention }).webp({ quality, effort: 5 }).toFile(target);
          after += (await stat(target)).size;
        }
      }
    }

    totalBefore += before;
    totalAfter += after;
    console.log(`${label.padEnd(18)} ${mb(before)} MB → ${mb(after)} MB`);
  }

  for (const gallery of galleries) {
    const dir = path.join(ASSETS, gallery);
    const out = path.join(ASSETS, `${gallery}-webp`);

    await mkdir(out, { recursive: true });

    const entries = (await readdir(dir)).filter((name) => /\.jpe?g$/i.test(name) && !name.startsWith('._'));
    let before = 0;
    let after = 0;

    for (const name of entries) {
      const result = await convert(path.join(dir, name), path.join(out, toWebp(name)), 1920, 78);

      before += result.before;
      after += result.after;
    }

    totalBefore += before;
    totalAfter += after;
    console.log(`galeria ${gallery.padEnd(10)} ${mb(before)} MB → ${mb(after)} MB (${entries.length} plików)`);
  }

  console.log(`\nRAZEM ${mb(totalBefore)} MB → ${mb(totalAfter)} MB`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
