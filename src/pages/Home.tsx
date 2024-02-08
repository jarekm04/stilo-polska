import { About } from '@/components/common/About';
import { Slider } from '@/components/common/Slider';

export const Home = () => {
  return (
    <section>
      <Slider />
      <About />
      <article className="bg-offer h-[500px] bg-fixed bg-cover drop-shadow-[2px_4px_50px_rgba(0,0,0,1)] brightness-50"></article>
    </section>
  );
};
