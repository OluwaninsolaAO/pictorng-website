import MeshBackground from '@/components/mesh';
import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/contact-form';
import { Container, PageHero } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.legalName} about software, cloud and security projects.`,
};

export default function ContactPage() {
  const details = [
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.phone && { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    site.address && { icon: MapPin, label: 'Office', value: site.address, href: '' },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to build."
        lead="Send a message and an engineer will reply within one business day."
      />
      <section className="theme-light bg-bg py-16 text-fg sm:py-24 relative isolate">
        <MeshBackground strength={0.18} />
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm />
          <aside className="space-y-8 lg:pt-4">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.02em]">
                {site.legalName}
              </h2>
              <p className="mt-2 text-muted">
                Information technology services, registered in Nigeria.
              </p>
            </div>
            <ul className="space-y-5">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="font-medium hover:text-accent">
                        {value}
                      </a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
