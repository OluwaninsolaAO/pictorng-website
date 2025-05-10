import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  ...props
}: { children: ReactNode } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      {...props}
      className={cn(
        'bg-white px-6 py-3 text-black rounded-md hover:bg-blend-overlay',
        props.className
      )}
    >
      {children}
    </button>
  );
}
