// Shared ripple field. One pointer stream, many consumers (mesh canvases and DOM elements).
// Client-only: import from client components.

export type Ripple = { x: number; y: number; t: number; s: number }; // page coordinates

const LIFE = 2600; // ripple lifetime, ms
const SPEED = 0.3; // wavefront speed, px/ms
const WAVELENGTH = 95;
const BAND = 70; // wavefront thickness (gaussian sigma), px
const GLOW_R = 130;
const MAX_RIPPLES = 12;
const IDLE_MS = 1200; // cursor glow fades this long after the pointer stops
export const AMP = 10; // peak mesh displacement, px

const state = {
  ripples: [] as Ripple[],
  cx: -9999, // pointer, client coords
  cy: -9999,
  mx: -9999, // pointer, page coords (refreshed each frame)
  my: -9999,
  glow: 0,
  glowTarget: 0,
  lastSpawn: { x: -9999, y: -9999, t: 0 },
};

type Drawer = (now: number) => void;
const drawers = new Set<Drawer>();
let els: HTMLElement[] = [];
const offsets = new WeakMap<HTMLElement, { x: number; y: number }>();
let running = false;
let idleTimer: ReturnType<typeof setTimeout> | undefined;

export function subscribe(d: Drawer) {
  drawers.add(d);
  return () => {
    drawers.delete(d);
  };
}

/** Displacement and brightness at a page point from all live ripples and the cursor glow. */
export function sample(px: number, py: number, now: number) {
  let dx = 0;
  let dy = 0;
  let lit = 0;
  for (const rp of state.ripples) {
    const age = now - rp.t;
    const fade = (1 - age / LIFE) ** 2;
    const ox = px - rp.x;
    const oy = py - rp.y;
    const d = Math.hypot(ox, oy) || 1;
    const delta = d - SPEED * age;
    const env = Math.exp(-(delta * delta) / (2 * BAND * BAND));
    const push = rp.s * fade * env * Math.sin((delta / WAVELENGTH) * Math.PI * 2);
    dx += (ox / d) * push;
    dy += (oy / d) * push;
    lit += env * fade * rp.s;
  }
  if (state.glow > 0.01) {
    const gd = Math.hypot(px - state.mx, py - state.my);
    lit += state.glow * Math.exp(-(gd * gd) / (2 * (GLOW_R / 1.6) ** 2));
  }
  return { dx, dy, lit: Math.min(lit, 1) };
}

function updateElements() {
  const sx = window.scrollX;
  const sy = window.scrollY;
  const vh = window.innerHeight;
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -150 || r.top > vh + 150) continue;
    const o = offsets.get(el) ?? { x: 0, y: 0 };
    const px = r.left - o.x + r.width / 2 + sx;
    const py = r.top - o.y + r.height / 2 + sy;
    const s = sample(px, py, performance.now());
    const clamp = (v: number) => Math.max(-5, Math.min(5, v * 0.5));
    const nx = state.ripples.length ? clamp(s.dx) : 0;
    const ny = state.ripples.length ? clamp(s.dy) : 0;
    offsets.set(el, { x: nx, y: ny });
    el.style.setProperty('--rx', `${nx.toFixed(2)}px`);
    el.style.setProperty('--ry', `${ny.toFixed(2)}px`);
    el.style.setProperty('--rl', s.lit.toFixed(3));
  }
}

function frame(now: number) {
  state.ripples = state.ripples.filter((r) => now - r.t < LIFE);
  state.glow += (state.glowTarget - state.glow) * 0.08;
  state.mx = state.cx + window.scrollX;
  state.my = state.cy + window.scrollY;
  drawers.forEach((d) => d(now));
  updateElements();
  if (state.ripples.length || Math.abs(state.glow - state.glowTarget) > 0.01 || state.glowTarget > 0) {
    requestAnimationFrame(frame);
  } else {
    running = false;
  }
}

function start() {
  if (running) return;
  running = true;
  els = Array.from(document.querySelectorAll<HTMLElement>('.card,[data-ripple]'));
  requestAnimationFrame(frame);
}

function spawn(clientX: number, clientY: number, s: number) {
  const now = performance.now();
  state.ripples.push({ x: clientX + window.scrollX, y: clientY + window.scrollY, t: now, s });
  if (state.ripples.length > MAX_RIPPLES) state.ripples.shift();
  state.lastSpawn = { x: clientX, y: clientY, t: now };
}

/** Attach pointer listeners once. Returns a cleanup function. */
export function attachPointer() {
  const onMove = (e: PointerEvent) => {
    state.cx = e.clientX;
    state.cy = e.clientY;
    state.glowTarget = 1;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      state.glowTarget = 0;
      start();
    }, IDLE_MS);
    const moved = Math.hypot(e.clientX - state.lastSpawn.x, e.clientY - state.lastSpawn.y);
    if (moved > 60 && performance.now() - state.lastSpawn.t > 70) spawn(e.clientX, e.clientY, 0.8);
    start();
  };
  const onDown = (e: PointerEvent) => {
    state.cx = e.clientX;
    state.cy = e.clientY;
    spawn(e.clientX, e.clientY, 1.6);
    start();
  };
  const onLeave = () => {
    state.glowTarget = 0;
    start();
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onDown);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    clearTimeout(idleTimer);
  };
}
