import { TreePine, Wrench, BatteryCharging } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';

const pillars = [
  {
    icon: TreePine,
    title: 'Materiały',
    paragraphs: [
      'Wszystkie elementy budynku wykonane wg projektu technologicznego, skompletowane na paletach, dostarczane są na teren budowy w dowolnym miejscu w Polsce jak i za granicą (na obszarze Europy).',
      'Elementy drewniane transportowane są dużymi naczepami (TIR), co wymaga od kupującego zagwarantowania swobodnego dojazdu ciągnika siodłowego z naczepą na teren budowy.',
      'Na podstawie projektu inwestora wykonujemy projekt technologiczny, który jest podstawą ostatecznej wyceny.',
    ],
  },
  {
    icon: Wrench,
    title: 'Konstrukcja',
    paragraphs: [
      'Domy wykonujemy z bali suszonych, klejonych. Najczęściej stosowane grubości to 20 i 24 cm, łączone na poczwórny pióro-wpust. Węgły uszczelniane są dodatkowymi elastycznymi materiałami. W balach przygotowywane są otwory pod instalację elektryczną. Materiał do budowy to wyselekcjonowany świerk alpejski, starannie dobierany, ścinany tylko zimą.',
      'Na fundamencie przygotowanym przez Klienta, zgodnie z projektem, wykonujemy montaż budynku. Stabilność konstrukcji uzyskujemy poprzez zastosowanie specjalnych szpilek metalowych z automatycznym systemem docisku, które przechodzą od pierwszego do ostatniego bala.',
    ],
  },
  {
    icon: BatteryCharging,
    title: 'Ekonomia',
    paragraphs: [
      'W domu z bali nie instaluje się systemów wentylacyjnych (wyjątek stanowi kuchnia i łazienka). W ścianie zbudowanej tylko z drewna możliwa jest wymiana powietrza w obu kierunkach – miliardy mikroporów umożliwiają nieustanne przenikanie powietrza przy utrzymaniu izolacji cieplnej.',
      'Tylko w domu drewnianym występuje zjawisko termosowe: zimą ciepło, latem chłodno. Dom sam reguluje poziom wilgotności wewnętrznej, a koszty eksploatacji są niższe niż domów budowanych w innej technologii o tej samej kubaturze.',
    ],
  },
];

export const Technology = () => {
  return (
    <article className="relative overflow-hidden bg-sand">
      <div className="shell section-pad">
        <SectionHeading
          eyebrow="Technologia"
          title="Trzy filary naszej pracy"
          description="Od doboru surowca, przez montaż, po codzienną eksploatację – wszystko przemyślane w najmniejszym detalu."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, paragraphs }, index) => (
            <Reveal key={title} delay={index * 120} className="h-full">
              <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-ink/[0.07] bg-white p-7 shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-lift lg:p-8">
                <span className="pointer-events-none absolute -right-2 -top-4 font-display text-[5.5rem] leading-none text-ink/[0.05] transition-colors duration-500 group-hover:text-brand/10">
                  0{index + 1}
                </span>

                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>

                <h3 className="text-2xl font-normal uppercase tracking-wide text-ink">{title}</h3>
                <span className="h-px w-12 bg-brand/50" />

                <div className="flex flex-col gap-4">
                  {paragraphs.map((text, i) => (
                    <p key={i} className="text-sm font-light leading-relaxed text-ink/60">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
};
