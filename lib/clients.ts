// Add a client by appending to this list. `logo` is a light-on-transparent image
// in /public/clients (shown on dark backgrounds); without one the name is set as text.
export type Client = {
  name: string;
  href?: string;
  logo?: { src: string; width: number; height: number };
};

export const clients: Client[] = [
  {
    name: 'Helix Biogen Institute',
    href: 'https://www.helixbiogeninstitute.org',
    logo: { src: '/clients/helix-biogen-institute.png', width: 529, height: 185 },
  },
  {
    name: 'Bioseq Consult',
  },
];
