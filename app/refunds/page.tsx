import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Refund & Cancellation Policy' };

export default function Refunds() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="27 October 2026"
      sections={[
        {
          h: '1. Project services',
          body: [
            'Fees for custom services are paid according to the milestones in the signed proposal. Work already delivered or in progress is billable. If we cannot deliver an agreed milestone, we will correct it or refund the fee attributable to that milestone.',
          ],
        },
        {
          h: '2. Cancellation',
          body: [
            'Either party may cancel an engagement with written notice as stated in the agreement. The client pays for work completed up to the cancellation date; unused prepayments for work not begun are refunded.',
          ],
        },
        {
          h: '3. Subscriptions and hosted services',
          body: [
            'Recurring services can be cancelled before the next billing date to avoid further charges. Fees for the current period are not refunded unless the service was materially unavailable.',
          ],
        },
        {
          h: '4. Duplicate or erroneous charges',
          body: [
            'If you were charged twice or in error, tell us and we will refund the amount in full to the original payment method.',
          ],
        },
        {
          h: '5. How refunds are paid',
          body: [
            `Approved refunds are returned to the original payment method, typically within 5 to 10 business days depending on your bank. Request a refund at ${site.email} with your invoice or payment reference.`,
          ],
        },
        {
          h: '6. Third-party products',
          body: [
            'Products operated on separate platforms, such as event tickets or memberships sold by organisers through Horbit, are governed by the organiser’s own refund rules shown at checkout.',
          ],
        },
      ]}
    />
  );
}
