// Single source of truth for company facts. Anything left empty is hidden in the UI.
export const site = {
  name: 'Monolith',
  legalName: 'Monolith Technologies Limited',
  domain: 'monolith.ng',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://monolith.ng',
  email: 'info@monolith.ng',
  phone: '', // e.g. '+234 800 000 0000'
  address: '', // registered office, e.g. '12 Example Street, Lagos, Nigeria'
  rcNumber: '', // CAC registration number, e.g. 'RC 1234567'
  tagline: 'Software, cloud and security engineering.',
  description:
    'Monolith Technologies Limited is an IT services company providing software development, systems integration, digital transformation consultancy, IT infrastructure, cloud computing and cybersecurity for corporate and individual clients.',
  socials: [] as { label: string; href: string }[],
};

export const services = [
  {
    slug: 'software-development',
    title: 'Software Development',
    summary:
      'Custom web, mobile and API-driven software, designed around how your business actually runs.',
    points: [
      'Web applications and customer portals',
      'Mobile apps and progressive web apps',
      'REST and webhook APIs, developer tooling',
      'Maintenance, QA and long-term support',
    ],
  },
  {
    slug: 'systems-integration',
    title: 'Systems Integration',
    summary:
      'We connect the systems you already own: payments, ERPs, IoT and hardware, and third-party platforms.',
    points: [
      'Payment gateway and banking API integration',
      'IoT, device and hardware connectivity',
      'Data pipelines and reporting',
      'Legacy system modernisation',
    ],
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation Consultancy',
    summary:
      'Clear technical strategy for organisations moving processes, teams and customers onto modern digital rails.',
    points: [
      'Technology audits and roadmaps',
      'Process digitisation and automation',
      'Build-versus-buy analysis',
      'Vendor selection and delivery oversight',
    ],
  },
  {
    slug: 'it-infrastructure',
    title: 'IT Infrastructure',
    summary:
      'Design, deployment and management of the networks, servers and environments your software depends on.',
    points: [
      'Architecture and capacity planning',
      'Deployment and environment management',
      'Monitoring, backup and recovery',
      'Managed operations',
    ],
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing Solutions',
    summary:
      'Cloud architecture, migration and operations that stay fast, resilient and cost-aware.',
    points: [
      'Cloud migration and landing zones',
      'CI/CD and infrastructure as code',
      'Scalability and cost optimisation',
      'Multi-environment release workflows',
    ],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity Frameworks',
    summary:
      'Security built into design and operations, with the policies and controls to prove it.',
    points: [
      'Security assessments and hardening',
      'Access control and secrets management',
      'Policy and compliance frameworks (including NDPA)',
      'Incident readiness',
    ],
  },
] as const;

export const products = [
  {
    name: 'Horbit',
    href: 'https://horbit.ng',
    blurb:
      'A community platform for members, events, communication and blogging, with a public API and developer docs.',
    tag: 'Community platform',
  },
  {
    name: 'Smart Utility Platform',
    href: '',
    blurb:
      'Metering and utility-vending software that connects estate and commercial users to gas, electricity and water services through web and mobile apps and IoT hardware.',
    tag: 'IoT and utility software',
  },
];

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/#products' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
