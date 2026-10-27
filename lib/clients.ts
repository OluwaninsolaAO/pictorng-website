// Add a client by appending to this list. `logo` is a transparent image in
// /public/clients that reads on dark backgrounds. `display` is the rendered height in px,
// tuned so wide wordmarks and square emblems look the same size. Without a logo the
// name is set as text.
export type Client = {
  name: string;
  href?: string;
  logo?: { src: string; width: number; height: number; display: number };
};

export const clients: Client[] = [
  {
    name: 'Helix Biogen Institute',
    href: 'https://www.helixbiogeninstitute.org',
    logo: { src: '/clients/helix-biogen-institute.png', width: 529, height: 185, display: 56 },
  },
  {
    name: 'Bioseq Consult',
    href: 'https://www.bioseqc.com',
    logo: { src: '/clients/bioseq-consult.png', width: 1488, height: 380, display: 36 },
  },
  {
    name: 'Ogbomoso Academics',
    href: 'https://www.ogbomosoacademics.org',
    logo: { src: '/clients/ogbomoso-academics.png', width: 481, height: 480, display: 68 },
  },
];
