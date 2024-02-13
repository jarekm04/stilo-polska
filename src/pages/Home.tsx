import { Slider } from '@/components/common/Slider';
import { About } from '@/components/common/About';
import { Offer } from '@/components/common/Offer';
import { Technology } from '@/components/common/Technology';
import { Realizations } from '@/components/common/Realizations';

export const Home = () => {
  return (
    <section>
      <Slider />
      <About />
      <Offer />
      <Realizations />
      <Technology />
    </section>
  );
};
