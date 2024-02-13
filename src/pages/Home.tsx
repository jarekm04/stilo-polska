import { Slider } from '@/components/common/Slider';
import { About } from '@/components/common/About';
import { Offer } from '@/components/common/Offer';
import { Technology } from '@/components/common/Technology';

export const Home = () => {
  return (
    <section>
      <Slider />
      <About />
      <Offer />
      <Technology />
    </section>
  );
};
