import { Separator } from '@/components/ui/separator';

export const Offer = () => {
  return (
    <section className="mt-20 flex min-h-[calc(100vh-64px)] flex-col items-center gap-7 bg-gradient-to-b from-white to-orange-50 py-8">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="mt-2 text-center text-2xl font-light">Oferta</h1>
        <Separator className="h-[2px] w-14 bg-custom-tertiary" />
        <p className="font-thin px-4 text-center mt-5 w-[60%]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium recusandae sint, culpa veritatis omnis debitis repellat suscipit in nisi cumque,
          modi facilis repudiandae molestias dolorum consequuntur dignissimos odio hic id. Aliquid odio voluptates reprehenderit minus suscipit. Earum impedit
          aspernatur neque.
        </p>
      </div>
    </section>
  );
};
