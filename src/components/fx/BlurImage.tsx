import { useState } from 'react';
import { cn } from '@/lib/utils';

type BlurImageProps = {
  src: string;
  /** Miniatura tego samego kadru – pokazywana rozmyta, zanim dojdzie pełne zdjęcie. */
  placeholder?: string;
  alt: string;
  className?: string;
};

/**
 * Zdjęcie wchodzące przez rozmytą miniaturę.
 *
 * WordPress oddaje dla każdego załącznika również rozmiar `thumbnail` – waży
 * kilka kilobajtów i dociera niemal natychmiast. Powiększona i rozmyta daje
 * kolor oraz kompozycję kadru od pierwszej chwili, więc siatka nie miga pustymi
 * prostokątami. Pełne zdjęcie wchodzi przenikaniem dopiero, gdy się wczyta.
 */
export const BlurImage = ({ src, placeholder, alt, className }: BlurImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span className="absolute inset-0 block overflow-hidden bg-sand">
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden
          className={cn('absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700', isLoaded && 'opacity-0')}
        />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn('relative h-full w-full object-cover transition-opacity duration-700', isLoaded ? 'opacity-100' : 'opacity-0', className)}
      />
    </span>
  );
};
