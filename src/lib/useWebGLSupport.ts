import { useState } from 'react';

const detect = () => {
  if (typeof window === 'undefined') return false;

  /* przy prośbie o ograniczenie animacji nie uruchamiamy płótna w ogóle */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  try {
    const canvas = document.createElement('canvas');

    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

/**
 * Czy możemy sięgnąć po WebGL.
 *
 * Sprawdzane raz, przy pierwszym renderze – inaczej hero mignęłoby najpierw
 * w wersji awaryjnej, a dopiero potem przeskoczyło na płótno.
 */
export const useWebGLSupport = () => {
  const [isSupported] = useState(detect);

  return isSupported;
};
