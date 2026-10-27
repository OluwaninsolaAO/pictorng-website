import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: `When and how ${site.legalName} issues refunds and handles cancellations.`,
};

const sections: LegalSection[] = [
  {
    h: 'Who this policy covers',
    body: [
      `This policy applies to services and subscriptions sold directly by ${site.legalName}. Where you have a signed proposal or contract, its payment and cancellation terms apply first, and this policy fills any gaps.`,
      'Items sold by other organisations through our platforms, such as event tickets or memberships on Horbit, are covered in the last section.',
    ],
  },
  {
    h: 'Project services',
    body: [
      'Fees for custom work are paid according to the milestones in your proposal. Work that has been delivered or is in progress is billable.',
      {
        list: [
          'If we cannot deliver an agreed milestone, we will correct it or refund the fee for that milestone.',
          'If you ask for a change that alters the agreed scope, we will agree the revised fee with you in writing before work on it begins.',
          'Fees for approved milestones, and for work that has already been accepted, are not refundable.',
        ],
      },
    ],
  },
  {
    h: 'Cancelling a project',
    body: [
      'Either party may cancel an engagement with written notice as stated in the agreement.',
      {
        list: [
          'You pay for work completed and approved expenses up to the cancellation date.',
          'Prepayments for work we have not started are refunded in full.',
          'We hand over completed deliverables once those fees are paid.',
        ],
      },
    ],
  },
  {
    h: 'Subscriptions and hosted services',
    body: [
      'Recurring services, such as hosting, maintenance or support plans, can be cancelled before the next billing date to avoid further charges.',
      'Fees for a billing period already started are not refunded, unless the service was materially unavailable for a significant part of it because of a fault on our side. In that case we will credit or refund a fair share of that period’s fee.',
    ],
  },
  {
    h: 'Duplicate or incorrect charges',
    body: [
      'If you were charged twice, or charged an amount you did not agree to, tell us. We will check the payment and refund the incorrect amount in full.',
    ],
  },
  {
    h: 'How to request a refund',
    body: [
      `Email ${site.email}, or call ${site.phone}, with:`,
      {
        list: [
          'your name and the email address used for the payment;',
          'the invoice number or payment reference;',
          'the amount and date of the payment;',
          'the reason for the request.',
        ],
      },
      'We acknowledge requests within two business days and aim to decide within seven business days.',
    ],
  },
  {
    h: 'How refunds are paid',
    body: [
      'Approved refunds are returned to the original payment method, typically within 5 to 10 business days depending on your bank or card issuer. If the original method is no longer available, we will agree another way to pay you back, usually by bank transfer to an account in your name.',
    ],
  },
  {
    h: 'Chargebacks and disputes',
    body: [
      'Please contact us before disputing a charge with your bank. We can usually resolve problems faster directly. If a chargeback is raised for a payment we have already refunded or for work that was delivered as agreed, we will provide evidence to the payment provider.',
    ],
  },
  {
    h: 'Items sold by other organisations',
    body: [
      'Event tickets, memberships and similar items sold by organisations through Horbit or other platforms we operate are sold by those organisations. Their own refund rules, shown at checkout, apply, and refund requests should go to the organisation. Monolith does not set these rules or keep those payments.',
    ],
  },
  {
    h: 'Contact us',
    body: [
      `Questions about this policy: ${site.email}, ${site.phone}, or ${site.legalName}, ${site.address}.`,
    ],
  },
];

export default function Refunds() {
  return (
    <LegalPage
      current="/refunds"
      title="Refund & Cancellation Policy"
      updated="27 October 2026"
      intro={`This policy explains when ${site.legalName} gives refunds, how to cancel a project or subscription, and how to ask for your money back. It sits alongside our Terms of Service.`}
      summary={[
        'Custom project fees follow the milestones in your proposal. Delivered and approved work is not refundable.',
        'If we cannot deliver an agreed milestone, we correct it or refund that milestone.',
        'Cancel a subscription before the next billing date to avoid further charges.',
        'Duplicate or incorrect charges are refunded in full.',
        'Refunds go back to the original payment method within about 5 to 10 business days.',
        'Event tickets and memberships on Horbit follow the organiser’s refund rules.',
      ]}
      sections={sections}
    />
  );
}
