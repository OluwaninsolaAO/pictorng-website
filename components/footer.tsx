import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Container } from '@/components/ui';
import { nav, services, site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07070b] pt-16 pb-10 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              {site.tagline} Building and running software for businesses and
              individuals.
            </p>
            <address className="space-y-1 text-sm not-italic text-white/55">
              <a
                href={`mailto:${site.email}`}
                className="block hover:text-white"
              >
                {site.email}
              </a>
              {site.phone && <span className="block">{site.phone}</span>}
              {site.address && <span className="block">{site.address}</span>}
            </address>
          </div>

          <FooterCol title="Company">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Legal">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refunds">Refund &amp; Cancellation</Link>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights
            reserved.
            {site.rcNumber && ` ${site.rcNumber}.`}
          </p>
          <p>Registered in Nigeria.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5 text-sm text-white/65 [&>a:hover]:text-white [&>a]:w-fit [&>a]:transition">
        {children}
      </div>
    </div>
  );
}
