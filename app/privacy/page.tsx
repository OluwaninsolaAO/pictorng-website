import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.legalName} collects, uses and protects personal data.`,
};

const sections: LegalSection[] = [
  {
    h: 'Who we are',
    body: [
      `This website is run by ${site.legalName} (${site.rcNumber}), a company registered in Nigeria, with its office at ${site.address}. We process personal data in line with the Nigeria Data Protection Act 2023 (NDPA).`,
      `For anything in this policy, contact us at ${site.email} or ${site.phone}.`,
    ],
  },
  {
    h: 'Two roles we can have',
    body: [
      'The way we handle personal data depends on the relationship we have with you.',
      {
        table: {
          head: ['Data', 'Our role', 'What that means'],
          rows: [
            [
              'Website visitors, enquiries and our own clients and contacts',
              'Controller',
              'We decide why and how the data is used, and this policy applies.',
            ],
            [
              'Personal data we handle while building or running a system for a client',
              'Processor',
              'The client decides why the data is used. We process it only on their instructions and under our agreement with them.',
            ],
          ],
        },
      },
      'Our own products have their own privacy policies. For example, Horbit publishes its policy at horbit.ng/privacy, and it applies to Horbit workspaces.',
    ],
  },
  {
    h: 'What we collect',
    body: [
      {
        table: {
          head: ['Category', 'Examples', 'Where it comes from'],
          rows: [
            [
              'Enquiry data',
              'Name, email address, phone number, organisation, topic, subject and message, and the page the form was sent from',
              'You, through our contact form or by email',
            ],
            [
              'Client and project data',
              'Contact and billing details, contracts, invoices, correspondence, project files and credentials you share with us',
              'You, when you engage us',
            ],
            [
              'Payment data',
              'Payment reference, amount, status and the payer’s name and email. Card numbers are handled by the payment provider and are not stored by us',
              'You and the payment provider (for example Paystack)',
            ],
            [
              'Technical data',
              'IP address, browser type and basic request logs created when you visit the website',
              'Your device and our hosting provider',
            ],
          ],
        },
      },
      'We do not knowingly collect sensitive personal data through this website. Please do not include it in your messages.',
    ],
  },
  {
    h: 'Why we use it',
    body: [
      {
        list: [
          'To reply to your enquiry and prepare proposals.',
          'To deliver, support and invoice the services you engage us for.',
          'To keep our website and systems secure, and to prevent spam and abuse.',
          'To keep records and meet legal, tax and accounting obligations.',
          'To tell existing clients about changes that affect their service. We send marketing messages only where you have agreed or the law allows, and every one can be opted out of.',
        ],
      },
      'We do not sell personal data, and we do not use it for advertising or profiling.',
    ],
  },
  {
    h: 'Lawful bases',
    body: [
      {
        list: [
          'Contract: where we need your data to take steps you ask for before a contract, or to perform it.',
          'Legitimate interests: running and securing our business and answering enquiries, balanced against your rights.',
          'Legal obligation: tax, accounting and regulatory duties.',
          'Consent: where you have agreed, for example to optional communications. You can withdraw it at any time.',
        ],
      },
      'When we are a processor, the client is responsible for having the lawful basis for the data they ask us to process.',
    ],
  },
  {
    h: 'Who we share it with',
    body: [
      'We share personal data only with people who need it to help us run the business, under written terms that protect it.',
      {
        table: {
          head: ['Recipient', 'Why'],
          rows: [
            [
              'Horbit (operated by Monolith Technologies Limited)',
              'Receives and stores messages sent through our contact form',
            ],
            [
              'Hosting and infrastructure providers',
              'Run this website and our systems, and keep standard server logs',
            ],
            [
              'Payment providers such as Paystack',
              'Process payments and help us reconcile them',
            ],
            [
              'Professional advisers and auditors',
              'Legal, accounting and compliance advice',
            ],
            [
              'Authorities',
              'When the law requires it, for example a valid court order or regulator request',
            ],
          ],
        },
      },
      'Some of these providers are outside Nigeria. When data is transferred abroad, we make sure it is protected as the NDPA requires, for example by using providers with appropriate safeguards or contractual protections.',
      'Within Monolith, access is limited to people who need it for their role.',
    ],
  },
  {
    h: 'Cookies and similar technology',
    body: [
      'This website does not use advertising or analytics cookies. Our hosting provider may keep standard server logs, and your browser may store information needed to display the site. If we add analytics or other cookies later, we will update this page and ask for consent where required.',
    ],
  },
  {
    h: 'Security',
    body: [
      'We protect personal data with measures suited to its sensitivity, including encrypted connections, access controls limited by role, secret and credential management, separation of environments, and logging and monitoring of our systems.',
      'No system is completely secure. If a breach is likely to put your rights and freedoms at risk, we will report it to the Nigeria Data Protection Commission and tell affected people, as the NDPA requires.',
    ],
  },
  {
    h: 'How long we keep it',
    body: [
      {
        list: [
          'Enquiry data: for up to 24 months after our last contact, unless it becomes the start of a client relationship.',
          'Client and project records: for the length of the engagement and then as long as needed for contractual, tax and accounting purposes (generally six years).',
          'Payment records: as long as financial regulations require.',
          'Server logs: for a short period, normally no longer than 90 days.',
        ],
      },
      'When we no longer need data, we delete it or anonymise it. When we are a processor, we follow the client’s instructions and the agreement on return or deletion at the end of the engagement.',
    ],
  },
  {
    h: 'Your rights',
    body: [
      'Under the NDPA, you may ask to:',
      {
        list: [
          'access the personal data we hold about you;',
          'have inaccurate data corrected, or data deleted where we no longer need it;',
          'restrict or object to our processing, including for direct marketing;',
          'receive your data in a portable format;',
          'withdraw consent you gave earlier.',
        ],
      },
      `Send requests to ${site.email} and include enough detail for us to identify you. We reply within the time the law allows. If we hold your data as a processor for a client, we will pass your request on to them. You may also complain to the Nigeria Data Protection Commission (NDPC).`,
    ],
  },
  {
    h: 'Children',
    body: [
      'Our website and services are intended for businesses and adults. We do not knowingly collect personal data from children. If you believe a child has sent us data, contact us and we will delete it.',
    ],
  },
  {
    h: 'Changes to this policy',
    body: [
      'We may update this policy. The date at the top shows the latest version. Material changes will be posted here and, where we have a relationship with you, sent by email before they take effect.',
    ],
  },
  {
    h: 'Contact us',
    body: [
      `Questions and rights requests go to ${site.email}. You can also write to ${site.legalName}, ${site.address}.`,
    ],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      current="/privacy"
      title="Privacy Policy"
      updated="27 October 2026"
      intro={`This policy explains what personal data ${site.legalName} collects through this website and in our work with clients, why we use it, who receives it, how long we keep it and what rights you have. Read it together with our Terms of Service.`}
      summary={[
        'We collect the details you send us, such as your name, email and message, and the data we need to deliver and bill for our services.',
        'For our own clients and enquiries we decide how data is used. When we build or run a system for a client, they decide and we process it on their instructions.',
        'We do not sell personal data or use it for advertising. This website does not use advertising or analytics cookies.',
        'Contact messages are received through Horbit, which is also operated by Monolith.',
        'You can ask to access, correct or delete your data, or complain to the NDPC.',
      ]}
      sections={sections}
    />
  );
}
