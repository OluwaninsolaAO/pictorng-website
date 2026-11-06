"use client";

import { useEffect, useState, type FormEvent } from "react";
import { horbit, visitorId } from "@/lib/horbit-client";

const field =
  "w-full rounded-xl border border-line bg-raised px-4 text-sm text-fg outline-none transition placeholder:text-muted hover:border-fg/30 focus:border-accent focus:ring-4 focus:ring-accent/15";

type ReactionType = { type: string; label: string; emoji: string; svg: string };

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    horbit(`/blog/posts/${slug}/views`, { body: { visitorId: visitorId() } }).catch(() => {});
  }, [slug]);
  return null;
}

export function Reactions({ slug, initial }: { slug: string; initial: Record<string, number> }) {
  const [types, setTypes] = useState<ReactionType[]>([]);
  const [counts, setCounts] = useState(initial);
  const [mine, setMine] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = visitorId();
    horbit<{ counts: Record<string, number>; mine: string[]; types: ReactionType[] }>(
      `/blog/posts/${slug}/reactions${id ? `?visitorId=${id}` : ""}`,
    )
      .then(({ data }) => {
        setTypes(data.types);
        setCounts(data.counts);
        setMine(data.mine);
      })
      .catch((e: Error) => setError(e.message || "Reactions are unavailable right now."));
  }, [slug]);

  const toggle = async (type: string) => {
    const had = mine.includes(type);
    // Optimistic update, rolled back on failure.
    setMine((m) => (had ? m.filter((t) => t !== type) : [...m, type]));
    setCounts((c) => ({ ...c, [type]: Math.max(0, (c[type] ?? 0) + (had ? -1 : 1)) }));
    try {
      const { data } = await horbit<{ counts?: Record<string, number>; mine?: string[] }>(`/blog/posts/${slug}/reactions`, {
        body: { type, visitorId: visitorId() },
      });
      if (data?.counts) setCounts(data.counts);
      if (data?.mine) setMine(data.mine);
    } catch {
      setMine((m) => (had ? [...m, type] : m.filter((t) => t !== type)));
      setCounts((c) => ({ ...c, [type]: Math.max(0, (c[type] ?? 0) + (had ? 1 : -1)) }));
    }
  };

  if (error) return <p className="text-sm text-muted">{error}</p>;
  if (!types.length) return <div className="min-h-[42px]" aria-busy="true" />;

  return (
    <div className="grid gap-2" role="group" aria-label="React to this article">
      {types.map((t) => (
        <button
          key={t.type}
          type="button"
          aria-pressed={mine.includes(t.type)}
          onClick={() => toggle(t.type)}
          title={t.label}
          className="inline-flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-full border border-line bg-raised px-4 text-sm font-medium transition hover:border-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white"
        >
          <span className="inline-flex items-center gap-2"><span dangerouslySetInnerHTML={{ __html: t.svg }} className="inline-flex size-[18px] [&>svg]:size-full" />
          <span>{t.label}</span></span>
          <span className="font-mono text-xs font-bold tabular-nums">{counts[t.type] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}

type Comment = {
  id: string;
  authorName: string;
  avatarUrl?: string | null;
  bodyHtml: string;
  createdAt: string;
  replies?: Comment[];
};

function CommentForm({ slug, parentId, onDone }: { slug: string; parentId?: string; onDone?: (c: Comment, status: string) => void }) {
  const [state, setState] = useState<{ busy: boolean; msg: string; ok: boolean }>({ busy: false, msg: "", ok: false });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState({ busy: true, msg: "", ok: false });
    try {
      const { data } = await horbit<Comment & { status: string }>(`/blog/posts/${slug}/comments`, {
        body: { authorName: f.authorName, authorEmail: f.authorEmail, body: f.body, parentId, visitorId: visitorId(), website: f.website },
      });
      form.reset();
      const live = data?.status === "approved";
      setState({ busy: false, ok: true, msg: live ? "Thanks — your comment is live." : "Thanks — your comment will appear once a moderator approves it." });
      onDone?.(data, data?.status);
    } catch (err) {
      setState({ busy: false, ok: false, msg: (err as Error).message });
    }
  };

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="sr-only">Name</span>
          <input className={`${field} h-[52px]`} name="authorName" placeholder="Your name" required maxLength={80} autoComplete="name" />
        </label>
        <label>
          <span className="sr-only">Email</span>
          <input className={`${field} h-[52px]`} name="authorEmail" type="email" placeholder="Email (not published)" required autoComplete="email" />
        </label>
      </div>
      <label>
        <span className="sr-only">Comment</span>
        <textarea className={`${field} min-h-36 resize-y py-3.5`} name="body" placeholder={parentId ? "Write a reply…" : "Join the conversation…"} required maxLength={5000} />
      </label>
      <input className="sr-only" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={state.busy} className="inline-flex h-11 cursor-pointer items-center rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-progress disabled:opacity-60">{state.busy ? "Posting…" : parentId ? "Post reply" : "Post comment"}</button>
        {state.msg && <p role="status" className={`rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700"}`}>{state.msg}</p>}
      </div>
    </form>
  );
}

function CommentItem({ c, slug, depth, canReply }: { c: Comment; slug: string; depth: number; canReply: boolean }) {
  const [replying, setReplying] = useState(false);
  const [replies, setReplies] = useState(c.replies ?? []);
  return (
    <div className="grid grid-cols-[44px_1fr] gap-3.5 border-b border-line py-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="size-10 rounded-full bg-raised object-cover" src={c.avatarUrl || "/brand/icon-512.png"} alt="" width={40} height={40} loading="lazy" />
      <div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <strong className="font-sans text-sm text-fg">{c.authorName}</strong>
          <span>·</span>
          <time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</time>
        </div>
        <div className="my-1.5 text-sm leading-relaxed text-fg/85 [&_a]:text-accent [&_a]:underline [&_p+p]:mt-2" dangerouslySetInnerHTML={{ __html: c.bodyHtml }} />
        {canReply && depth < 3 && (
          <button type="button" className="cursor-pointer text-sm font-semibold text-accent" onClick={() => setReplying((r) => !r)}>{replying ? "Cancel" : "Reply"}</button>
        )}
        {replying && (
          <div style={{ marginTop: 12 }}>
            <CommentForm slug={slug} parentId={c.id} onDone={(r, status) => status === "approved" && setReplies((x) => [...x, r])} />
          </div>
        )}
        {replies.length > 0 && (
          <div className="mt-2.5 border-l-2 border-line pl-4">
            {replies.map((r) => (
              <CommentItem key={r.id} c={r} slug={slug} depth={depth + 1} canReply={canReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Comments({ slug, open, initialCount }: { slug: string; open: boolean; initialCount: number }) {
  const [thread, setThread] = useState<Comment[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    horbit<Comment[]>(`/blog/posts/${slug}/comments`)
      .then(({ data, meta }) => {
        setThread(data);
        if (meta && typeof meta.commentsOpen === "boolean") setIsOpen(meta.commentsOpen);
      })
      .catch((e: Error) => {
        setLoadError(e.message);
        setThread([]);
      });
  }, [slug]);

  const count = thread ? thread.reduce(function n(a: number, c: Comment): number { return a + 1 + (c.replies ?? []).reduce(n, 0); }, 0) : initialCount;

  return (
    <section className="mt-12 border-t border-line pt-10" id="comments" aria-labelledby="comments-title">
      <h2 id="comments-title" className="mb-6 text-2xl font-semibold tracking-[-0.03em]">
        {count} {count === 1 ? "Comment" : "Comments"}
      </h2>
      {isOpen ? (
        <CommentForm slug={slug} onDone={(c, status) => status === "approved" && setThread((t) => [...(t ?? []), c])} />
      ) : (
        <p className="rounded-xl bg-fg/5 px-4 py-3 text-sm">Comments are closed for this article.</p>
      )}
      {loadError ? (
        <p className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700">{loadError}</p>
      ) : thread === null ? (
        <p className="mt-6 text-sm text-muted">Loading comments…</p>
      ) : thread.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No comments yet. Be the first to share your view.</p>
      ) : (
        thread.map((c) => <CommentItem key={c.id} c={c} slug={slug} depth={1} canReply={isOpen} />)
      )}
    </section>
  );
}
