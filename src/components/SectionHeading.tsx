import { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
};

export const SectionHeading = ({ eyebrow, title, description, align = 'center', tone = 'dark', className }: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', isCenter ? 'mx-auto items-center text-center' : 'items-start text-left', className)}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className={cn('text-3xl font-normal leading-[1.15] sm:text-4xl lg:text-[2.75rem]', tone === 'light' ? 'text-cream' : 'text-ink')}>{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p className={cn('text-sm font-light leading-relaxed sm:text-base', tone === 'light' ? 'text-cream/70' : 'text-ink/65')}>{description}</p>
        </Reveal>
      )}
    </div>
  );
};
