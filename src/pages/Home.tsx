import { Slider } from '@/components/Slider';
import { Stats } from '@/components/Stats';
import { Description } from '@/components/Description';
import { Highlights } from '@/components/Highlights';
import { Offer } from '@/components/Offer';
import { Technology } from '@/components/Technology';
import { Realizations } from '@/components/Realizations';
import { CtaBand } from '@/components/CtaBand';

/**
 * Kolejność opowiada: zobacz → kim jesteśmy → co budujemy → co już stoi →
 * jak to robimy → zadzwoń. Stara prowadziła przez firmę, zanim pokazała
 * choć jeden dom.
 */
export const Home = () => {
  return (
    <section>
      <Slider />
      <Stats />
      <Description />
      <Highlights />
      <Offer />
      <Realizations />
      <Technology />
      <CtaBand />
    </section>
  );
};
