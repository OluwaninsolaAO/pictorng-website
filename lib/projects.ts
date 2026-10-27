// Add a project by appending an object here. Cards, filters, detail pages,
// the sitemap and the home page all read from this list.

export type ProjectStatus = 'live' | 'beta' | 'soon';

export type Project = {
  slug: string;
  name: string;
  /** Short line shown on cards and under the page title. */
  tagline: string;
  /** Paragraph(s) on the detail page. */
  summary: string[];
  /** Grouping used by the filter chips on /projects. */
  kind: string;
  /** Key into the icon map in components/project-card.tsx. */
  icon: 'users' | 'terminal' | 'gauge' | 'box';
  status: ProjectStatus;
  /** External site. Leave out when the project has no public site yet. */
  href?: string;
  features: string[];
  tags: string[];
  /** Shown on the home page. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'horbit',
    name: 'Horbit',
    tagline: 'Community platform for members, events, communication and blogging.',
    summary: [
      'Horbit gives organisations one workspace to run their community: member registration, event listings and ticketing, communication and a blog.',
      'It ships with a public API and developer documentation, so organisations can power their own website with Horbit content, contact forms and registrations.',
    ],
    kind: 'Platform',
    icon: 'users',
    status: 'live',
    href: 'https://horbit.ng',
    features: [
      'Member registration with verification and membership payments',
      'Events with ticket tiers, custom questions and payments',
      'Blog with categories, authors, comments and reactions',
      'Contact requests inbox and team communication',
      'Public API and developer documentation',
    ],
    tags: ['Community', 'Events', 'Memberships', 'API'],
    featured: true,
  },
  {
    slug: 'developer-tools',
    name: 'Developer Tools',
    tagline: 'Cloud APIs, webhook management and utilities for engineering teams.',
    summary: [
      'We build developer-facing software for the parts of integration work that are tedious and easy to get wrong: receiving, inspecting and replaying webhooks, and calling dependable cloud APIs.',
      'These are the tools we use ourselves when connecting payment providers, devices and third-party platforms.',
    ],
    kind: 'Developer tools',
    icon: 'terminal',
    status: 'live',
    features: [
      'Webhook management and delivery tooling',
      'Cloud APIs for common integration tasks',
      'Debugging and inspection utilities',
      'Documentation written for engineers',
    ],
    tags: ['APIs', 'Webhooks', 'Utilities'],
    featured: true,
  },
  {
    slug: 'smart-utility-platform',
    name: 'Smart Utility Platform',
    tagline: 'Metering and utility-vending software for estates and commercial users.',
    summary: [
      'Software that connects residents, tenants and utility customers to prepaid gas, electricity and water services through web and mobile apps and IoT hardware.',
      'It combines customer apps, payment collection, device integration and operator dashboards in one system.',
    ],
    kind: 'IoT & utilities',
    icon: 'gauge',
    status: 'live',
    features: [
      'Prepaid vending through web and mobile apps',
      'IoT meter and hardware integration',
      'Online payments and reconciliation',
      'Operator dashboards for estates and providers',
    ],
    tags: ['IoT', 'Payments', 'Metering'],
    featured: true,
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  soon: 'Coming soon',
};

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectKinds = Array.from(new Set(projects.map((p) => p.kind)));
