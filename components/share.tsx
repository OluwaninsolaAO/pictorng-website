"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { Facebook, LinkedIn, WhatsApp, XLogo } from "./blog-icons";

const btn =
  "grid size-9 cursor-pointer place-items-center rounded-full border border-line bg-raised text-fg transition hover:bg-fg hover:text-bg";

export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, label: "Share on LinkedIn", icon: <LinkedIn size={16} /> },
    { href: `https://wa.me/?text=${t}%20${u}`, label: "Share on WhatsApp", icon: <WhatsApp size={17} /> },
    { href: `https://x.com/intent/post?url=${u}&text=${t}`, label: "Share on X", icon: <XLogo size={14} /> },
    { href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, label: "Share on Facebook", icon: <Facebook size={16} /> },
  ];
  return (
    <div className="flex gap-1.5">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label} className={btn}>
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        className={btn}
        onClick={() => navigator.clipboard?.writeText(url).then(() => (setCopied(true), setTimeout(() => setCopied(false), 1800)))}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied!" : "Copy link"}
      >
        <Link2 size={16} />
      </button>
    </div>
  );
}
