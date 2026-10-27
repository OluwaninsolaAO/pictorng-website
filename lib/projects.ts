// Add a project by appending an object here. Cards, filters, detail pages,
// the sitemap and the home page all read from this list.
// Developer tools are individual entries with kind 'Developer tools', one per tool.

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
  icon: 'users' | 'terminal' | 'gauge' | 'box' | 'radio';
  /** Favicon/logo under /public. Falls back to the icon. */
  logo?: string;
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
    logo: '/projects/horbit.png',
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
    slug: 'mqtt-scope',
    name: 'MQTT Scope',
    tagline: 'A message inspector for MQTT networks.',
    summary: [
      'MQTT Scope lets you subscribe to a set of topics, watch messages arrive in real time, and open any one of them to read the payload and the packet flags the broker delivered.',
      'It is part of our developer tools line: small, focused tools for the debugging work that connected-device and integration projects keep needing.',
    ],
    kind: 'Developer tools',
    icon: 'radio',
    logo: '/projects/mqtt-scope.png',
    status: 'live',
    href: 'https://mqtt-scope.monolith.ng',
    features: [
      'Subscribe to one or many topics at once',
      'Live message stream as packets arrive',
      'Inspect the payload of any message',
      'See the packet flags the broker delivered',
    ],
    tags: ['MQTT', 'IoT', 'Debugging'],
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
