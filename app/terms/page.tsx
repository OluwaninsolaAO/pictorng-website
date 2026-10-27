import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="27 October 2026"
      sections={[
        {
          h: '1. Who we are',
          body: [
            `${site.legalName} ("Monolith", "we") is a company registered in Nigeria that provides information technology services, including software development, systems integration, digital transformation consultancy, IT infrastructure, cloud computing and cybersecurity services.`,
            `These terms apply to your use of this website and to services we provide unless a separate written agreement says otherwise.`,
          ],
        },
        {
          h: '2. Services and engagements',
          body: [
            'Each project is governed by a proposal, statement of work or written agreement that sets out scope, deliverables, timelines and fees. If it conflicts with these terms, the signed agreement prevails.',
            'Changes to scope are agreed in writing before work begins on them.',
          ],
        },
        {
          h: '3. Fees and payment',
          body: [
            'Fees, currency, payment schedule and any applicable taxes are stated in the proposal or invoice. Online payments are processed by third-party payment providers; we do not store full card details.',
            'Unless agreed otherwise, invoices are payable within the period stated on the invoice. We may pause work on overdue accounts.',
          ],
        },
        {
          h: '4. Intellectual property',
          body: [
            'Unless the agreement says otherwise, ownership of bespoke deliverables transfers to the client on full payment. We retain ownership of our pre-existing tools, libraries and know-how, and grant the client a licence to use them as part of the deliverables.',
            'Third-party and open-source components remain under their own licences.',
          ],
        },
        {
          h: '5. Confidentiality and data',
          body: [
            'Each party keeps the other’s confidential information confidential and uses it only for the engagement. Personal data is handled as described in our Privacy Policy.',
          ],
        },
        {
          h: '6. Warranties and liability',
          body: [
            'We perform services with reasonable skill and care. Except as required by law, we do not give other warranties, and our total liability under an engagement is limited to the fees paid for the services giving rise to the claim. We are not liable for indirect or consequential loss.',
          ],
        },
        {
          h: '7. Acceptable use of this website',
          body: [
            'Do not misuse this website, attempt to access it without authorisation, or submit unlawful or abusive content through our forms.',
          ],
        },
        {
          h: '8. Governing law',
          body: [
            'These terms are governed by the laws of the Federal Republic of Nigeria. Courts in Nigeria have jurisdiction over disputes, subject to any dispute-resolution clause in a signed agreement.',
          ],
        },
        {
          h: '9. Contact',
          body: [`Questions about these terms: ${site.email}.`],
        },
      ]}
    />
  );
}
