// Browser calls to Horbit with the publishable key (views, reactions, comments).
// The site's origin must be listed on the key in Horbit console > Configuration > API keys.
const KEY = process.env.NEXT_PUBLIC_HORBIT_PUBLISHABLE_KEY || '';
const BASE = 'https://api.horbit.ng/v1/public';

export type Envelope<T> = {
  status: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
};

/** Anonymous per-browser id so Horbit can dedupe views and toggle reactions. */
export function visitorId() {
  try {
    let id = localStorage.getItem('hbVisitor');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('hbVisitor', id);
    }
    return id;
  } catch {
    return undefined;
  }
}

export async function horbit<T>(
  path: string,
  init: { method?: string; body?: object } = {},
): Promise<Envelope<T>> {
  const res = await fetch(BASE + path, {
    method: init.method ?? (init.body ? 'POST' : 'GET'),
    headers: { 'x-api-key': KEY, 'content-type': 'application/json' },
    body: init.body && JSON.stringify(init.body),
  });
  const json = (await res.json().catch(() => null)) as Envelope<T> | null;
  if (res.status === 429) throw new Error('Too many attempts. Please wait a minute and try again.');
  if (res.status === 401 || (res.status === 403 && /key/i.test(json?.message || ''))) {
    console.error('Horbit:', json?.message);
    throw new Error("This isn't available right now. Please try again later.");
  }
  if (!res.ok || !json?.status) throw new Error(json?.message || `Request failed (${res.status})`);
  return json;
}

/** Horbit wants international format, e.g. +2348031234567. */
export function toIntlPhone(raw?: string) {
  const v = (raw || '').replace(/[^\d+]/g, '');
  if (!v) return undefined;
  if (v.startsWith('+')) return v;
  if (v.startsWith('234')) return `+${v}`;
  if (v.startsWith('0')) return `+234${v.slice(1)}`;
  return v.length >= 10 ? `+${v}` : undefined;
}
