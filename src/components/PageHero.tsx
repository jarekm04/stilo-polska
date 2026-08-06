import { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

/** Wspólna belka nagłówkowa podstron – utrzymuje ten sam rytm co strona główna. */
export const PageHero = ({ eyebrow, title, children }: PageHeroProps) => {
  return (
    <div className="relative overflow-hidden bg-sand pb-14 pt-28 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/[0.08] blur-[110px]" />

      <div className="shell relative flex flex-col items-center gap-5 px-5 text-center sm:px-8 lg:px-12">
        <span className="eyebrow animate-fadeUp opacity-0">{eyebrow}</span>
        <h1 className="max-w-3xl animate-fadeUp text-4xl font-normal leading-[1.1] opacity-0 [animation-delay:120ms] sm:text-5xl lg:text-[3.5rem]">{title}</h1>
        {children && <div className="max-w-3xl animate-fadeUp opacity-0 [animation-delay:240ms]">{children}</div>}
      </div>
    </div>
  );
};
