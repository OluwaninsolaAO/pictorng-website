'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { site } from '@/lib/site';

const ENDPOINT = 'https://api.horbit.ng/v1/public/contacts';
const KEY = process.env.NEXT_PUBLIC_HORBIT_PUBLISHABLE_KEY;

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'done'; message: string }
  | { status: 'error'; message: string };

const topics = [
  ['general', 'General enquiry'],
  ['partnership', 'Project or partnership'],
  ['support', 'Support'],
  ['media', 'Media'],
] as const;

const field =
  'w-full rounded-xl border border-line bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15';

export default function ContactForm() {
  const [state, setState] = useState<State>({ status: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setState({ status: 'sending' });
    try {
      if (!KEY) throw new Error('Form is not configured yet.');

      const body: Record<string, string> = { sourceUrl: location.href };
      for (const [k, v] of data.entries()) {
        const value = String(v).trim();
        if (value) body[k] = value;
      }

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': KEY },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message ?? 'Something went wrong.');

      form.reset();
      setState({
        status: 'done',
        message: json.message ?? 'Thanks, we will reply within one business day.',
      });
    } catch (err) {
      setState({
        status: 'error',
        message:
          err instanceof Error ? err.message : 'Could not send your message.',
      });
    }
  }

  if (state.status === 'done') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-raised p-8">
        <CheckCircle2 className="text-accent" size={28} />
        <h3 className="text-xl font-semibold tracking-tight">Message sent</h3>
        <p className="text-muted">{state.message}</p>
        <button
          onClick={() => setState({ status: 'idle' })}
          className="text-sm text-accent underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-line bg-raised p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Label text="Full name">
          <input name="fullName" required autoComplete="name" className={field} />
        </Label>
        <Label text="Email">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </Label>
        <Label text="Phone (optional)">
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234…"
            className={field}
          />
        </Label>
        <Label text="Organisation (optional)">
          <input name="organisation" autoComplete="organization" className={field} />
        </Label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Label text="Topic">
          <select name="topic" defaultValue="general" className={field}>
            {topics.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </Label>
        <Label text="Subject">
          <input name="subject" required className={field} />
        </Label>
      </div>

      <Label text="How can we help?">
        <textarea name="message" required rows={6} className={field} />
      </Label>

      {/* Honeypot: real visitors never see or fill this. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {state.status === 'error' && (
        <p role="alert" className="text-sm text-red-500">
          {state.message} You can also email{' '}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'sending'}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {state.status === 'sending' && <Loader2 size={16} className="animate-spin" />}
        {state.status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p className="text-xs text-muted">
        We use your details only to respond to this enquiry. See our{' '}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{text}</span>
      {children}
    </label>
  );
}
