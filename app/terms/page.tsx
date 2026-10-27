import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms that govern use of the ${site.legalName} website and services.`,
};

const sections: LegalSection[] = [
  {
    h: 'Who we are',
    body: [
      `${site.legalName} ("Monolith", "we", "us") is a company registered in Nigeria (${site.rcNumber}) with its office at ${site.address}. We provide information technology services, including software development, systems integration, digital transformation consultancy, IT infrastructure, cloud computing and cybersecurity services, and we build and operate our own platforms and developer tools.`,
      'These terms apply to your use of this website and, unless a signed agreement says otherwise, to services we provide to you. Read them together with our Privacy Policy and Refund & Cancellation Policy.',
    ],
  },
  {
    h: 'Using this website',
    body: [
      'You may browse this website and send us enquiries for lawful purposes. You must not:',
      {
        list: [
          'attempt to gain unauthorised access to the website, our systems or other users’ data;',
          'introduce malware, scrape the site at a rate that affects its availability, or probe it for vulnerabilities without our written permission;',
          'submit unlawful, abusive, misleading or spam content through our forms;',
          'impersonate any person or organisation.',
        ],
      },
      'We may block access that breaches these rules. Information on this website is general and is not a binding offer. A binding engagement exists only once we agree a proposal or contract in writing.',
    ],
  },
  {
    h: 'Our services and engagements',
    body: [
      'Each project is governed by a proposal, statement of work or written agreement that sets out the scope, deliverables, timelines, fees and any acceptance process. If it conflicts with these terms, the signed agreement prevails.',
      'Changes to scope, timelines or fees are agreed in writing before work on them begins. We may use subcontractors or specialists, and remain responsible for their work under the engagement.',
    ],
  },
  {
    h: 'Our products',
    body: [
      'We operate our own software, including Horbit and our developer tools. Use of a product may be governed by its own terms and privacy policy, which apply to that product in place of these terms where they differ. For example, Horbit is governed by the terms published on horbit.ng.',
      'Event tickets, memberships and similar items sold by organisations through our platforms are sold by those organisations, not by Monolith, under the rules shown at checkout.',
    ],
  },
  {
    h: 'Fees, invoices and payment',
    body: [
      'Fees, currency, payment schedule and any applicable taxes are stated in the proposal or invoice. Unless agreed otherwise, invoices are payable within the period stated on the invoice, without set-off.',
      'Online payments are processed by third-party payment providers such as Paystack, and we also accept bank transfer. We do not store full card details. Late payments may attract interest at a reasonable rate stated on the invoice, and we may pause work on overdue accounts after giving notice.',
      'Refunds and cancellations are covered in our Refund & Cancellation Policy.',
    ],
  },
  {
    h: 'Your responsibilities',
    body: [
      'To deliver on time we need your cooperation. You agree to:',
      {
        list: [
          'give us accurate information, timely feedback and the access we reasonably need;',
          'make sure you have the right to give us any content, data, credentials or third-party materials you provide;',
          'keep your accounts and credentials secure;',
          'comply with the laws that apply to your use of what we deliver.',
        ],
      },
    ],
  },
  {
    h: 'Intellectual property',
    body: [
      'Unless the agreement says otherwise, ownership of bespoke deliverables transfers to you on full payment. Until then you hold a licence to use them for the purposes of the engagement.',
      'We keep ownership of our pre-existing tools, libraries, templates and know-how, including anything we develop independently of your project. We grant you a non-exclusive, perpetual licence to use these as part of the deliverables.',
      'Our software, designs, documentation, logos and trademarks, including Monolith and Horbit, belong to us. These terms do not give you any right to use them beyond what is needed to use the services. You keep ownership of your own content and data.',
    ],
  },
  {
    h: 'Confidentiality',
    body: [
      'Each party will keep the other’s confidential information confidential, use it only for the engagement, and disclose it only to people who need it and are bound by similar duties. This does not apply to information that is public through no fault of the recipient, was already lawfully known, or must be disclosed by law.',
      'These duties continue for three years after the engagement ends, and for as long as the information remains a trade secret.',
    ],
  },
  {
    h: 'Personal data',
    body: [
      'We handle personal data under the Nigeria Data Protection Act 2023. When we process personal data on your behalf as part of an engagement, you are the controller and we act as processor on your documented instructions, and we will enter into a data processing agreement if you ask. How we handle data collected through this website is described in our Privacy Policy.',
    ],
  },
  {
    h: 'Third-party services and open source',
    body: [
      'Our work often relies on third-party services, such as payment, hosting, messaging and cloud providers, and on open-source software. These are provided under their own terms and licences, and we are not responsible for their availability or changes. We will tell you about third-party costs and dependencies that affect your project.',
    ],
  },
  {
    h: 'Warranties and support',
    body: [
      'We perform services with reasonable skill and care and will correct deliverables that do not meet the agreed specification if you report the problem within the warranty period in the agreement (30 days after acceptance if none is stated).',
      'Except as stated here or required by law, services and products are provided "as is" and we give no other warranty, including that software will be uninterrupted or error-free. Ongoing maintenance and support are provided only where the agreement includes them.',
    ],
  },
  {
    h: 'Liability',
    body: [
      'Nothing in these terms excludes liability that cannot lawfully be limited, including for fraud or for death or personal injury caused by negligence.',
      'To the extent the law allows, we are not liable for indirect or consequential loss, loss of profit, revenue, goodwill or data, and our total liability for all claims arising from an engagement is limited to the fees you paid us for the services giving rise to the claim in the twelve months before it arose.',
    ],
  },
  {
    h: 'Indemnity',
    body: [
      'You will indemnify us against third-party claims, losses and reasonable costs arising from your breach of these terms, content or materials you supply that infringe third-party rights, or your unlawful use of what we deliver. We will tell you promptly about any claim and let you take reasonable steps to defend it.',
    ],
  },
  {
    h: 'Ending an engagement',
    body: [
      'Either party may end an engagement with the written notice stated in the agreement (14 days if none is stated), or immediately if the other party commits a material breach that is not remedied within a reasonable period after notice, or becomes insolvent.',
      'On ending, you pay for work done and approved expenses up to the end date, we hand over completed deliverables on payment, and each party returns or deletes the other’s confidential information on request. Sections that by nature continue, such as intellectual property, confidentiality, liability and governing law, survive.',
    ],
  },
  {
    h: 'Changes to these terms',
    body: [
      'We may update these terms. The date at the top shows the latest version. For clients with an active engagement, material changes will be sent by email before they take effect, and changes do not alter terms agreed in a signed contract. Continued use of the website after a change means you accept it.',
    ],
  },
  {
    h: 'Governing law and disputes',
    body: [
      'These terms are governed by the laws of the Federal Republic of Nigeria. We will first try to resolve any dispute directly and in good faith. If that fails, the courts of Nigeria have jurisdiction, unless a signed agreement provides for another dispute-resolution procedure.',
    ],
  },
  {
    h: 'Contact us',
    body: [
      `Questions about these terms: ${site.email}, ${site.phone}, or by post at ${site.address}.`,
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      current="/terms"
      title="Terms of Service"
      updated="27 October 2026"
      intro={`These terms govern your use of the ${site.legalName} website and the services we provide. By using the website, or by engaging us, you agree to them. If you do not agree, please do not use the website or our services.`}
      summary={[
        'We provide IT services, including software, cloud and security work, under written proposals or agreements that set scope, price and timelines.',
        'Our own products, such as Horbit, can have their own terms. Those apply to the product.',
        'Payments are processed by Paystack or by bank transfer. We do not store your card details.',
        'You own bespoke deliverables once you have paid in full. We keep our pre-existing tools and know-how.',
        'Either side can end an engagement, and you pay for work already done.',
        'Nigerian law governs these terms.',
      ]}
      sections={sections}
    />
  );
}
