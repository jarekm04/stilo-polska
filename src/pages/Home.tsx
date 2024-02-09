import { About } from '@/components/common/About';
import { Slider } from '@/components/common/Slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export const Home = () => {
  // jak jest isscrolled to daj jeszcze dropshadow na logo
  // 4 karty z przekierowaniem do oferta, realizacje, video, technologia - jak najeżdżasz to karta się powiększa i zmienia background np z białego na pomarańczowy
  // potem 4 karty z facebooka, czarne tło, pomarańczowy border i content w środku ssy
  // na końcu kontakt
  return (
    <section>
      <Slider />
      <About />
      <article className="bg-offer h-[500px] bg-cover bg-fixed brightness-90 drop-shadow-[2px_4px_50px_rgba(0,0,0,1)]"></article>
      <article className="grid grid-cols-2">
        <div className="flex flex-col gap-5 px-10 py-14">
          <Separator className="bg-custom-tertiary w-14" />
          <p className="font-thin">
            <strong>STILO POLSKA</strong> funkcjonuje na rynku budowlanym już od 30 lat. Jesteśmy liderem wśród producentów domów z bala. Nasze realizacje
            cechuje najwyższa staranność, użycie oryginalnych bali importowanych z mroźnej Syberii oraz opatentowane, autorskie techniki montażu. STILO to
            jakość ciesząca się najwyższa renomą.
          </p>
          <p className="font-thin">
            Nasze konstrukcje można podziwiać w całej Polsce, jak i poza jej granicami - w mroźnych górach Norwegii. Realizujemy domy zarówno na podstawie
            projektów klienta, jak i naszych partnerskich studiów projektowych.
          </p>
          <p className="font-thin">
            Przy konstrukcji naszych domów korzystamy z najnowszych technologii, opatentowanych metod montażu oraz najwyższej jakości materiałów. Wykorzystane
            rozwiązania to wymierne korzyści dla klienta - zdrowy i ekonomiczny dom na lata.
          </p>
          <Separator className="bg-custom-tertiary w-14" />
          <Link to="/contact">
            <Button className="bg-custom-tertiary hover:bg-custom-ninth animate-custom-appear">Skontaktuj się z nami</Button>
          </Link>
        </div>
        <div className="bg-green-300">
          <div className="flex flex-col">
            <div className="flex">
              <div className="h-12 w-12 rounded-full bg-karczma bg-center" />
              <h3>Domy z bali okrągłych</h3>
            </div>
            <p className="font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel hic voluptatum, illo amet quaerat, accusantium sequi, eum numquam consequuntur
              corporis repellat! Est eaque, numquam nam iure nostrum repellendus provident.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="h-12 w-12 rounded-full bg-karczma bg-center" />
              <h3>Domy z bali klejonych</h3>
            </div>
            <p className="font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel hic voluptatum, illo amet quaerat, accusantium sequi, eum numquam consequuntur
              corporis repellat! Est eaque, numquam nam iure nostrum repellendus provident.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="h-12 w-12 rounded-full bg-karczma bg-center" />
              <h3>Projekty domów z bali</h3>
            </div>
            <p className="font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit vel hic voluptatum, illo amet quaerat, accusantium sequi, eum numquam consequuntur
              corporis repellat! Est eaque, numquam nam iure nostrum repellendus provident.
            </p>
          </div>
          <Link to="/offer">
            <Button className="bg-custom-tertiary hover:bg-custom-ninth animate-custom-appear">Przejdź do pełnej oferty</Button>
          </Link>
        </div>
      </article>
    </section>
  );
};
