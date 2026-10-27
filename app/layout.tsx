import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { site } from '@/lib/site';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Monolith | Software, Cloud & Cybersecurity Engineering',
    template: '%s | Monolith',
  },
  description: site.description,
  applicationName: 'Monolith',
  openGraph: {
    type: 'website',
    siteName: 'Monolith',
    title: 'Monolith | Software, Cloud & Cybersecurity Engineering',
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#07070b',
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: 'Monolith',
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/icon.svg`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
