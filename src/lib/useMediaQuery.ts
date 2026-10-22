import { useEffect, useState } from 'react';

/**
 * Nasłuch zapytania medialnego w Reakcie.
 *
 * Potrzebny tam, gdzie różnica między wersjami nie jest kwestią stylu, tylko
 * innego zachowania — przyklejona sekcja z jazdą poziomą na desktopie kontra
 * zwykły snap-scroll palcem na telefonie. Samym CSS-em tego nie załatwimy.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches));

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
};
