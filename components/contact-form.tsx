'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toIntlPhone } from '@/lib/horbit-client';
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
  'w-full rounded-2xl border border-line bg-bg px-5 py-3.5 text-[15px] text-fg placeholder:text-muted/70 outline-none transition hover:border-fg/25 focus:border-accent focus:ring-4 focus:ring-accent/15';

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
      if (body.phone) {
        const phone = toIntlPhone(body.phone);
        if (phone) body.phone = phone;
        else delete body.phone;
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
      className="space-y-10 rounded-3xl border border-line bg-raised p-6 sm:p-10"
    >
      <Section n={1} title="About you">
        <Label text="Full name">
          <input
            name="fullName"
            required
            autoComplete="name"
            placeholder="e.g. Adaeze Okafor"
            className={field}
          />
        </Label>
        <div className="grid gap-5 sm:grid-cols-2">
          <Label text="Email" hint="We will reply to this address.">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={field}
            />
          </Label>
          <Label text="Phone / WhatsApp" optional hint="Include the country code. A WhatsApp number works well.">
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+2348031234567"
              className={field}
            />
          </Label>
        </div>
        <Label text="Organisation" optional>
          <input name="organisation" autoComplete="organization" className={field} />
        </Label>
      </Section>

      <Section n={2} title="Your enquiry" lead="Tell us what you want to build or fix.">
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
            <input name="subject" required placeholder="A short summary" className={field} />
          </Label>
        </div>
        <Label text="How can we help?" hint="Scope, timeline and any systems involved help us reply faster.">
          <textarea name="message" required rows={6} className={`${field} resize-y`} />
        </Label>
      </Section>

      {/* Honeypot: real visitors never see or fill this. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {state.status === 'error' && (
        <p role="alert" className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
          {state.message} You can also email{' '}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="space-y-4">
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
      </div>
    </form>
  );
}

function Section({
  n,
  title,
  lead,
  children,
}: {
  n: number;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5">
      <legend className="flex items-center gap-4">
        <span className="grid size-10 place-items-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
          {n}
        </span>
        <span className="text-xl font-semibold tracking-[-0.025em]">{title}</span>
      </legend>
      {lead && <p className="text-sm text-muted">{lead}</p>}
      {children}
    </fieldset>
  );
}

function Label({
  text,
  optional,
  hint,
  children,
}: {
  text: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold">{text}</span>
        {optional && <span className="text-xs text-muted">Optional</span>}
      </span>
      {children}
      {hint && <span className="block text-xs leading-relaxed text-muted">{hint}</span>}
    </label>
  );
}
