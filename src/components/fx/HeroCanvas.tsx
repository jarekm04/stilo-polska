import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl';

type HeroCanvasProps = {
  /** Adresy zdjęć w pełnej rozdzielczości, w kolejności slajdów. */
  images: string[];
  /** Lekkie podglądy tych samych kadrów – pokazywane, zanim dojdą pełne. */
  placeholders?: string[];
  /** Indeks slajdu, który ma być widoczny. */
  index: number;
  /** Czas przenikania w sekundach. */
  duration?: number;
  /** Czas, przez jaki kadr powoli się przybliża (efekt Kena Burnsa), w sekundach. */
  zoomDuration?: number;
  className?: string;
};

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * Przenikanie przez szum: zamiast ciąć kadr prostą krawędzią, jedno zdjęcie
 * rozpływa się w drugie wzdłuż nieregularnej granicy, a oba są przy tym lekko
 * przesuwane. Granica wędruje od dołu do góry, więc ruch ma kierunek.
 */
const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform vec2 uFromSize;
  uniform vec2 uToSize;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uProgress;
  uniform float uFromZoom;
  uniform float uToZoom;

  varying vec2 vUv;

  /* kadrowanie „cover” – zdjęcie wypełnia kadr bez zniekształceń */
  vec2 coverUv(vec2 uv, vec2 texSize, float zoom) {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (texSize.x / texSize.y), 1.0),
      min((uResolution.y / uResolution.x) / (texSize.y / texSize.x), 1.0)
    );
    vec2 covered = vec2(uv.x * ratio.x + (1.0 - ratio.x) * 0.5, uv.y * ratio.y + (1.0 - ratio.y) * 0.5);

    return (covered - 0.5) / zoom + 0.5;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  /* trzy oktawy wystarczą na miękką, „ciekłą” granicę */
  float fbm(vec2 p) {
    return valueNoise(p) * 0.55 + valueNoise(p * 2.3) * 0.3 + valueNoise(p * 4.7) * 0.15;
  }

  void main() {
    vec2 parallax = uPointer * vec2(0.014, -0.014);
    float noise = fbm(vUv * 3.4);

    /* próg wędruje poza zakres 0–1, żeby przenikanie zaczynało i kończyło się pełnym kadrem */
    float threshold = uProgress * 1.6 - 0.3;
    float field = vUv.y * 0.45 + noise * 0.55;
    float mask = smoothstep(threshold - 0.22, threshold + 0.22, field);

    /* oba kadry rozjeżdżają się w przeciwne strony – stąd wrażenie falowania */
    vec2 push = (vec2(noise, noise) - 0.5) * 0.08;
    vec2 fromUv = coverUv(vUv + parallax + (1.0 - mask) * push, uFromSize, uFromZoom);
    vec2 toUv = coverUv(vUv + parallax - mask * push, uToSize, uToZoom);

    vec4 fromColor = texture2D(uFrom, fromUv);
    vec4 toColor = texture2D(uTo, toUv);

    gl_FragColor = mix(toColor, fromColor, mask);
  }
`;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Płótno WebGL z kadrem hero.
 *
 * Komponent zakłada, że wywołujący sprawdził już obsługę WebGL i zgodę na ruch –
 * przy ich braku w ogóle nie powinien być montowany, a hero zostaje przy wersji CSS.
 */
export const HeroCanvas = ({ images, placeholders, index, duration = 1.4, zoomDuration = 9, className }: HeroCanvasProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Stan przejścia żyje poza Reactem – pętla renderująca czyta go co klatkę. */
  const transitionRef = useRef({ from: index, to: index, start: 0, slideStart: 0 });
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  /* --- budowa sceny: raz na życie komponentu --- */
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const renderer = new Renderer({ canvas, alpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;

    const textures = images.map(() => new Texture(gl, { generateMipmaps: false }));
    const sizes: [number, number][] = images.map(() => [1, 1]);

    /* podgląd wchodzi od razu, pełny kadr go podmienia; po drodze nie wolno cofnąć jakości */
    const hasFull = images.map(() => false);

    const apply = (imageIndex: number, image: HTMLImageElement, isFull: boolean) => {
      if (!isFull && hasFull[imageIndex]) return;

      if (isFull) hasFull[imageIndex] = true;

      textures[imageIndex].image = image;
      sizes[imageIndex] = [image.naturalWidth, image.naturalHeight];
    };

    const load = (src: string, imageIndex: number, isFull: boolean) => {
      const image = new Image();

      image.crossOrigin = 'anonymous';
      image.onload = () => apply(imageIndex, image, isFull);
      image.src = src;

      return image;
    };

    images.forEach((src, imageIndex) => {
      if (placeholders?.[imageIndex]) load(placeholders[imageIndex], imageIndex, false);

      load(src, imageIndex, true);
    });

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uFrom: { value: textures[0] },
        uTo: { value: textures[0] },
        uFromSize: { value: [1, 1] },
        uToSize: { value: [1, 1] },
        uResolution: { value: [1, 1] },
        uPointer: { value: [0, 0] },
        uProgress: { value: 1 },
        uFromZoom: { value: 1 },
        uToZoom: { value: 1 },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    /**
     * Mierzymy owijkę, nie samo płótno. `setSize` wpisuje rozmiar w styl płótna,
     * więc gdyby pierwszy pomiar trafił przed dojściem arkusza stylów (w trybie
     * deweloperskim CSS dochodzi asynchronicznie), płótno zostałoby przypięte do
     * domyślnych 300×150 i nigdy już by nie urosło. Po `setSize` przywracamy
     * rozciąganie na 100%, żeby ten zapis nie zablokował kolejnych pomiarów.
     */
    const resize = () => {
      const wrapper = wrapperRef.current;

      if (!wrapper) return;

      const { clientWidth, clientHeight } = wrapper;

      if (!clientWidth || !clientHeight) return;

      renderer.setSize(clientWidth, clientHeight);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      program.uniforms.uResolution.value = [clientWidth, clientHeight];
    };

    resize();

    const observer = new ResizeObserver(resize);

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      pointerRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    /* Poza kadrem nie ma po co rysować – pętla tyka dalej, ale nie dotyka GPU.
       Liczy się przy drugim płótnie na stronie: kiedy patrzysz na jedno, drugie śpi. */
    let isOnScreen = true;

    const visibility = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
    });

    if (wrapperRef.current) visibility.observe(wrapperRef.current);

    let frame = 0;

    const render = (time: number) => {
      if (!isOnScreen) {
        frame = requestAnimationFrame(render);
        return;
      }

      const transition = transitionRef.current;
      const pointer = pointerRef.current;

      if (!transition.start) {
        transition.start = time;
        transition.slideStart = time;
      }

      const raw = Math.min(1, (time - transition.start) / (duration * 1000));
      const eased = easeInOut(raw);

      /* kadr dojeżdżający powoli się przybliża – ruch nie zatrzymuje się po przenikaniu */
      const sinceSlide = (time - transition.slideStart) / (zoomDuration * 1000);
      const zoom = 1 + 0.06 * Math.min(1, Math.max(0, sinceSlide));

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      program.uniforms.uFrom.value = textures[transition.from];
      program.uniforms.uTo.value = textures[transition.to];
      program.uniforms.uFromSize.value = sizes[transition.from];
      program.uniforms.uToSize.value = sizes[transition.to];
      program.uniforms.uProgress.value = eased;
      program.uniforms.uFromZoom.value = 1.06;
      program.uniforms.uToZoom.value = zoom;
      program.uniforms.uPointer.value = [pointer.x, pointer.y];

      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      textures.forEach((texture) => gl.deleteTexture(texture.texture));
    };
  }, [images, placeholders, duration, zoomDuration]);

  /* --- zmiana slajdu: tylko przestawienie celu, resztą zajmuje się pętla --- */
  useEffect(() => {
    const transition = transitionRef.current;

    if (transition.to === index) return;

    transition.from = transition.to;
    transition.to = index;
    transition.start = performance.now();
    transition.slideStart = performance.now();
  }, [index]);

  return (
    <div ref={wrapperRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
