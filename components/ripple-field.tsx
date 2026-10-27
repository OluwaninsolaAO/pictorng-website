'use client';

import { useEffect } from 'react';
import { attachPointer } from '@/lib/ripple';

/** Mount once in the root layout. Feeds pointer movement to the ripple field. */
export default function RippleField() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return attachPointer();
  }, []);
  return null;
}
