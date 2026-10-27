'use client';

import { useEffect, useRef } from 'react';

type Ripple = { x: number; y: number; t: number; s: number };

const GAP = 56; // grid cell size, px
const STEP = 14; // sample spacing along each line, px
const LIFE = 2600; // ripple lifetime, ms
const SPEED = 0.3; // wavefront speed, px/ms
const WAVELENGTH = 95;
const BAND = 70; // wavefront thickness (gaussian sigma), px
const AMP = 10; // peak displacement, px
const GLOW_R = 130;
const MAX_RIPPLES = 12;

/**
 * Grid that ripples outward from the cursor. Listens on its parent element,
 * and only runs its animation loop while something is moving.
 */
export default function HeroMesh() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement?.parentElement; // the hero section
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let ripples: Ripple[] = [];
    let mouse = { x: -999, y: -999 };
    let glow = 0;
    let glowTarget = 0;
    let lastSpawn = { x: -999, y: -999, t: 0 };
    let raf = 0;
    let running = false;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    // Displacement + brightness at (x, y) from all live ripples and the cursor glow.
    const sample = (x: number, y: number, now: number) => {
      let dx = 0;
      let dy = 0;
      let lit = 0;
      for (const rp of ripples) {
        const age = now - rp.t;
        const fade = (1 - age / LIFE) ** 2;
        const ox = x - rp.x;
        const oy = y - rp.y;
        const d = Math.hypot(ox, oy) || 1;
        const delta = d - SPEED * age;
        const env = Math.exp(-(delta * delta) / (2 * BAND * BAND));
        const push = AMP * rp.s * fade * env * Math.sin((delta / WAVELENGTH) * Math.PI * 2);
        dx += (ox / d) * push;
        dy += (oy / d) * push;
        lit += env * fade * rp.s;
      }
      if (glow > 0.01) {
        const gd = Math.hypot(x - mouse.x, y - mouse.y);
        lit += glow * Math.exp(-(gd * gd) / (2 * (GLOW_R / 1.6) ** 2));
      }
      return { x: x + dx, y: y + dy, lit: Math.min(lit, 1) };
    };

    const line = (
      horizontal: boolean,
      c: number,
      now: number,
      base: Path2D,
      hot: { x0: number; y0: number; x1: number; y1: number; a: number }[]
    ) => {
      const len = horizontal ? w : h;
      let prev: ReturnType<typeof sample> | null = null;
      for (let p = 0; p <= len + STEP; p += STEP) {
        const pt = horizontal ? sample(p, c, now) : sample(c, p, now);
        if (!prev) base.moveTo(pt.x, pt.y);
        else {
          base.lineTo(pt.x, pt.y);
          const a = (pt.lit + prev.lit) / 2;
          if (a > 0.04) hot.push({ x0: prev.x, y0: prev.y, x1: pt.x, y1: pt.y, a });
        }
        prev = pt;
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const base = new Path2D();
      const hot: { x0: number; y0: number; x1: number; y1: number; a: number }[] = [];
      for (let x = 0; x <= w; x += GAP) line(false, x, now, base, hot);
      for (let y = 0; y <= h; y += GAP) line(true, y, now, base, hot);

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.stroke(base);
      for (const s of hot) {
        ctx.strokeStyle = `rgba(139,141,255,${Math.min(0.7 * s.a, 0.7).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(s.x0, s.y0);
        ctx.lineTo(s.x1, s.y1);
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      ripples = ripples.filter((r) => now - r.t < LIFE);
      glow += (glowTarget - glow) * 0.08;
      draw(now);
      if (ripples.length || Math.abs(glow - glowTarget) > 0.01 || glowTarget > 0) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const spawn = (x: number, y: number, s: number) => {
      const now = performance.now();
      ripples.push({ x, y, t: now, s });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      lastSpawn = { x, y, t: now };
    };

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      mouse = p;
      glowTarget = 1;
      const moved = Math.hypot(p.x - lastSpawn.x, p.y - lastSpawn.y);
      if (moved > 60 && performance.now() - lastSpawn.t > 70) spawn(p.x, p.y, 0.8);
      start();
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      spawn(p.x, p.y, 1.6);
      start();
    };
    const onLeave = () => {
      glowTarget = 0;
      start();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (!reduced) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerdown', onDown);
      host.addEventListener('pointerleave', onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerdown', onDown);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="mesh-mask pointer-events-none absolute inset-0" aria-hidden>
      <canvas ref={ref} className="size-full" />
    </div>
  );
}
