import { cn } from '@/lib/utils';

/** Monolith mark: a solid slab with an "M" carved out of it. */
export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  const id = 'monolith-mark-gradient'; // identical defs when repeated, so duplicate ids are harmless
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="4" y1="0" x2="28" y2="32">
          <stop stopColor="#8B8DFF" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={`url(#${id})`}
        d="M8 0h16a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8Zm1.5 23V9h3.4l3.1 5.4L19.1 9h3.4v14h-3.2v-8.2l-2.1 3.7h-2.4l-2.1-3.7V23H9.5Z"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.04em] leading-none">
        monolith
      </span>
    </span>
  );
}
