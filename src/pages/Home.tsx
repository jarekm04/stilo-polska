import { Slider } from '@/components/Slider';
import { About } from '@/components/About';
import { Offer } from '@/components/Offer';
import { Technology } from '@/components/Technology';
import { Realizations } from '@/components/Realizations';
import { Footer } from '@/components/Footer';
import { Description } from '@/components/Description';
import { CtaBand } from '@/components/CtaBand';

export const Home = () => {
  return (
    <section>
      <Slider />
      <About />
      <Offer />
      <Description />
      <Realizations />
      <Technology />
      <CtaBand />
      <Footer />
    </section>
  );
};
