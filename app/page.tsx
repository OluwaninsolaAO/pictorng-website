import Button from '@/components/mods/button';
import Link from 'next/link';
import CalendlyBooking from './components/calendly';
import { Facebook, Linkedin } from 'lucide-react';

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

const socials = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/pictorng',
    icon: Facebook,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oluwaninsolaao/',
    icon: Linkedin,
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh space-y-18">
      <div className="max-w-[1400px] mx-auto p-5">
        <div className="rounded-2xl px-8 py-18 bg-gradient-to-br from-gray-900 via-transparent to-gray-900 border border-gray-800 space-y-6">
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
            <Link
              href="mailto:info@pictor.com.ng"
              className="p-1 border border-gray-700 rounded-lg inline-block hover:translate-y-1 transition-all ease-in-out duration-500"
            >
              <Button>Contact Us</Button>
            </Link>
            <Link
              href="https://calendly.com/pictor-info"
              className="p-1 border border-gray-700 rounded-lg inline-block hover:translate-y-1 transition-all ease-in-out duration-500"
            >
              <Button>Book A Meeting</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto p-5 space-y-8">
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
                className="rounded-2xl p-8  space-y-2 border border-gray-800 bg-gradient-to-br from-gray-900 via-transparent to-gray-900 text-center content-center lg:hover:translate-y-2 transition-all ease-in-out duration-500 hover:border-gray-900"
                key={index}
              >
                <h2 className="text-2xl">{service.title}</h2>
                <p className="text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="max-w-[700px] mx-auto border-0 h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-[1400px] mx-auto p-5 space-y-4">
        <div className="text-center text-balance space-y-4">
          <h2 className="text-4xl md:text-5xl break-words hyphens-auto">
            Let’s Create What’s Next
          </h2>
          <p className="max-w-[1100px] m-auto">
            Select a time that works for you and meet with our team to discuss
            how we can bring precision, creativity, and tech brilliance to your
            next project.
          </p>
        </div>
        <CalendlyBooking />
      </div>

      <div className="max-w-[1400px] mx-auto space-y-4 -mt-10">
        <div className="flex gap-6 justify-center">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <Link
                key={index}
                href={social.url}
                className="bg-gradient-to-br from-gray-900 via-transparent to-gray-900 p-2 rounded-full group hover:translate-y-1 transition-all ease-in-out duration-500 border border-gray-800 hover:border-gray-900"
                target="_blank"
              >
                <Icon className="text-gray-700 group-hover:text-gray-600 transition-all ease-in-out duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
}
