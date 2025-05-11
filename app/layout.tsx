import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PictorNG',
  description:
    'A premier technology and talent solutions firm, specializing in delivering cutting-edge software development, bespoke website design, enterprise-grade software testing, and strategic project management services that empower organisations to scale intelligently and sustainably.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/brand/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="shortcut icon" href="/brand/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/brand/apple-touch-icon.png"
        />
        <link rel="manifest" href="/brand/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="bg-gray-900 text-white py-6 mt-8">
          <div className="max-w-[1400px] mx-auto text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} PictorNG. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
