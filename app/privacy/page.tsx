import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="27 October 2026"
      sections={[
        {
          h: '1. Controller',
          body: [
            `${site.legalName} is the controller of personal data collected through this website. We process personal data in line with the Nigeria Data Protection Act 2023 (NDPA).`,
          ],
        },
        {
          h: '2. What we collect',
          body: [
            'Contact form data: your name, email address, optional phone number and organisation, and the message you send. Basic technical data such as the page you submitted from. We do not run advertising trackers on this website.',
          ],
        },
        {
          h: '3. Why we use it',
          body: [
            'To respond to your enquiry and, where relevant, to prepare and deliver services you request (legitimate interests and steps before entering a contract). To keep our systems secure and prevent spam.',
          ],
        },
        {
          h: '4. Processors and sharing',
          body: [
            'Contact messages are received through Horbit, a community platform operated by Monolith Technologies Limited. We use hosting and infrastructure providers to run this website. We do not sell personal data.',
          ],
        },
        {
          h: '5. Retention',
          body: [
            'We keep enquiry data only as long as needed to handle it and for reasonable record-keeping, then delete or anonymise it.',
          ],
        },
        {
          h: '6. Your rights',
          body: [
            `You may request access to, correction of, or deletion of your personal data, object to processing, or complain to the Nigeria Data Protection Commission. Contact ${site.email}.`,
          ],
        },
        {
          h: '7. Security',
          body: [
            'We use encryption in transit, access controls and monitoring appropriate to the data we hold.',
          ],
        },
      ]}
    />
  );
}
