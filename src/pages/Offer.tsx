import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/common/Footer';

const mockArray = [
  { p1: 'Nowoczesny dom z bala nad Solina', p2: '142B' },
  { p1: 'Nowoczesny dom z bala pod Gorlicami', p2: '141B' },
  { p1: 'Nowoczesny dom z bala o pow. uzytkowej 160,80 m2', p2: '140B' },
  { p1: 'Jakiś tam dom z czymś tam', p2: '21:37' },
];

export const Offer = () => {
  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-white to-orange-50">
      <div className="flex flex-col items-center gap-7 py-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="mt-2 text-center text-2xl font-light">Oferta</h1>
          <Separator className="h-[2px] w-14 bg-custom-tertiary" />
          <p className="mt-5 w-[60%] px-4 text-center font-thin">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium recusandae sint, culpa veritatis omnis debitis repellat suscipit in nisi
            cumque, modi facilis repudiandae molestias dolorum consequuntur dignissimos odio hic id. Aliquid odio voluptates reprehenderit minus suscipit. Earum
            impedit aspernatur neque.
          </p>
        </div>
        <div className="grid grid-cols-3 place-content-center gap-5 px-14 py-8">
          {mockArray.map((item, index) => (
            <div
              key={item.p2}
              className={`shadow-blue-gray-900/50 group relative flex min-h-60 cursor-pointer select-none flex-col items-center justify-center gap-2 shadow-xl`}
            >
              <img
                src="/src/assets/karczma.jpg"
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center brightness-75 transition-all group-hover:brightness-100"
                alt="offer-house"
              />
              <p className="px-1 text-center text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.p1}</p>
              <p className="px-1 text-center text-lg font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.p2}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};
