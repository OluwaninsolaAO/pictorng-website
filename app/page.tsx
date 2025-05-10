import Button from '@/components/mods/button';
import Link from 'next/link';

const services = [
  {
    title: 'Custom Software Development',
    description:
      'We architect and build scalable, secure, and elegant software tailored to your business needs—empowering you to innovate with confidence and precision.',
  },
  {
    title: 'Bespoke Web App Design',
    description:
      'From seamless UX to cutting-edge interfaces, we craft visually stunning and high-performing websites and web applications that reflect your brand’s identity and elevate user engagement.',
  },
  {
    title: 'Tech Talent & Expert Network',
    description:
      'Access a curated network of top-tier professionals across diverse domains. We connect you with vetted talent and consultants to lead and deliver with excellence.',
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh space-y-18">
      <div className="max-w-[1400px] mx-auto p-5">
        <div className="rounded-2xl px-8 py-18 bg-gray-900 space-y-6">
          <div className="text-center text-balance space-y-4">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl break-words hyphens-auto bg-gradient-to-br from-red-200 via-slate-100 to-blue-400 text-transparent bg-clip-text"
              lang="de"
            >
              Digital Brilliance for Visionary Enterprises
            </h1>
            <p className="text-lg">
              Empowering ambitious brands with precision-engineered software,
              expert-driven project execution, and a handpicked network of
              top-tier talents.
            </p>
          </div>
          <div className="flex flex-wrap justify-center  gap-4 md:gap-8">
            <Link href="mailto:info@pictor.com.ng">
              <Button>Contact Us</Button>
            </Link>
            <Link href="https://calendly.com/pictor-info">
              <Button>Book A Meeting</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto p-5 space-y-8">
        <hr className="max-w-[700px] mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <h2 className="text-4xl md:text-5xl break-words hyphens-auto text-center text-balance">
          What We Engineer for the Bold
        </h2>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 break-words hyphens-auto"
          lang="de"
        >
          {services.map((service, index) => {
            return (
              <div
                className="rounded-2xl p-8 bg-gray-900 space-y-2"
                key={index}
              >
                <h2 className="text-2xl">{service.title}</h2>
                <p className="text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div id="#booking">
        <div
          className="calendly-inline-widget min-w-[320px] h-[700px]"
          data-url="https://calendly.com/pictor-info?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=101828&text_color=62748e"
        ></div>
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>
      </div>
    </div>
  );
}
