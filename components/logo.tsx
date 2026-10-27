import { cn } from '@/lib/utils';

/**
 * Monolith mark: an "M" made of two folded planes of one slab, lit from the
 * left. Gradient ids repeat across instances with identical defs, which is harmless.
 */
export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="2 2 28 28"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="mono-l" x1="4" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4C6FF" />
          <stop offset="1" stopColor="#7C7FFF" />
        </linearGradient>
        <linearGradient id="mono-r" x1="28" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
      </defs>
      <path fill="url(#mono-l)" d="M4 4h6.2l5.3 9.6V25L10.3 16v12H4z" />
      <path fill="url(#mono-r)" d="M28 4h-6.2l-5.3 9.6V25l5.2-9v12H28z" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark size={26} />
      <span className="flex flex-col gap-[3px]">
        <span className="text-[18px] font-semibold leading-none tracking-[-0.04em]">
          Monolith
        </span>
        <span className="text-[8.5px] font-medium uppercase leading-none tracking-[0.24em] opacity-60">
          Technologies Limited
        </span>
      </span>
    </span>
  );
}
