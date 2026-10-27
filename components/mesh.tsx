'use client';

import { useEffect, useRef } from 'react';
import { AMP, sample, subscribe } from '@/lib/ripple';

const GAP = 56; // grid cell size, px
const STEP = 14; // sample spacing along each line, px

type Seg = { x0: number; y0: number; x1: number; y1: number; a: number };

function hexToRgb(v: string, fallback: [number, number, number]) {
  const m = /^#?([0-9a-f]{6})$/i.exec(v.trim());
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as [number, number, number];
}

/**
 * Grid background for a section (parent must be `relative isolate`).
 * `opacity` scales how visible the mesh is (grid and ripple glow); the ripple
 * motion itself is the same everywhere. About 0.55 for heroes, 0.4 elsewhere.
 */
export default function MeshBackground({ opacity = 0.4 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const cs = getComputedStyle(canvas);
    const [fr, fg, fb] = hexToRgb(cs.getPropertyValue('--fg'), [255, 255, 255]);
    const [ar, ag, ab] = hexToRgb(cs.getPropertyValue('--accent-soft'), [139, 141, 255]);
    const light = fr + fg + fb < 200; // dark ink means a light section
    const baseAlpha = light ? 0.08 : 0.06;

    let w = 0;
    let h = 0;
    let visible = true;
    let ox = 0; // canvas origin in page coords
    let oy = 0;

    const draw = (now: number) => {
      if (!visible) return;
      const r = canvas.getBoundingClientRect();
      ox = r.left + window.scrollX;
      oy = r.top + window.scrollY;
      ctx.clearRect(0, 0, w, h);

      const base = new Path2D();
      const hot: Seg[] = [];
      const trace = (horizontal: boolean, c: number) => {
        const len = horizontal ? w : h;
        let prev: { x: number; y: number; lit: number } | null = null;
        for (let p = 0; p <= len + STEP; p += STEP) {
          const lx = horizontal ? p : c;
          const ly = horizontal ? c : p;
          const s = sample(lx + ox, ly + oy, now);
          const pt = { x: lx + s.dx * (AMP / 10), y: ly + s.dy * (AMP / 10), lit: s.lit };
          if (!prev) base.moveTo(pt.x, pt.y);
          else {
            base.lineTo(pt.x, pt.y);
            const a = (pt.lit + prev.lit) / 2;
            if (a > 0.03) hot.push({ x0: prev.x, y0: prev.y, x1: pt.x, y1: pt.y, a });
          }
          prev = pt;
        }
      };
      for (let x = 0; x <= w; x += GAP) trace(false, x);
      for (let y = 0; y <= h; y += GAP) trace(true, y);

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${fr},${fg},${fb},${(baseAlpha * opacity).toFixed(4)})`;
      ctx.stroke(base);
      for (const s of hot) {
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${(Math.min(0.7 * s.a, 0.7) * opacity).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(s.x0, s.y0);
        ctx.lineTo(s.x1, s.y1);
        ctx.stroke();
      }
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) draw(performance.now());
    });
    io.observe(canvas);
    const unsub = subscribe(draw);
    return () => {
      ro.disconnect();
      io.disconnect();
      unsub();
    };
  }, [opacity]);

  return (
    <div className="mesh-mask pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <canvas ref={ref} className="size-full" />
    </div>
  );
}
