import { ElementType, ReactNode } from 'react';
import { useReveal } from '@/lib/useReveal';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Opóźnienie w milisekundach – pozwala kaskadowo odsłaniać elementy listy. */
  delay?: number;
  as?: ElementType;
};

export const Reveal = ({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn('reveal', isVisible && 'reveal-in', className)}>
      {children}
    </Tag>
  );
};
