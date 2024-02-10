import { Slider } from '@/components/common/Slider';
import { About } from '@/components/common/About';
import { Offer } from '@/components/common/Offer';
import { Technology } from '@/components/common/Technology';

export const Home = () => {
  // jak jest isscrolled to daj jeszcze dropshadow na logo
  // 4 karty z przekierowaniem do oferta, realizacje, video, technologia - jak najeżdżasz to karta się powiększa i zmienia background np z białego na pomarańczowy
  // potem 4 karty z facebooka, czarne tło, pomarańczowy border i content w środku ssy
  // na końcu kontakt
  return (
    <section>
      <Slider />
      <About />
      <Offer />
      <Technology />
      
    </section>
  );
};
