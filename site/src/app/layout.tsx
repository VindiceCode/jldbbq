import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Barlow_Condensed, Grand_Hotel, Karla, Ultra } from 'next/font/google';
import './globals.css';

const display = Ultra({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const script = Grand_Hotel({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

const heading = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const SITE = 'https://jldbbq.com';
const TITLE = "Just Like Dad's Barbecue — Catering in Northwest Ohio";
const DESCRIPTION =
  'Barbecue catering across Northwest Ohio for 15+ years. The Game Day Bundle feeds 12 for $200 — pulled pork, barbecue potatoes and baked beans, cooked fresh for your event and delivered ready to serve.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Just Like Dad's Barbecue",
  keywords: [
    'barbecue catering',
    'Northwest Ohio catering',
    'tailgate catering',
    'graduation party catering',
    'pulled pork',
    'Hamler Ohio',
    'BGSU homecoming',
  ],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: "Just Like Dad's Barbecue",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/photos/tailgate-setup.jpg', width: 1024, height: 768, alt: "A full Just Like Dad's chafing line set up at a tailgate" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/photos/tailgate-setup.jpg'],
  },
  alternates: { canonical: SITE },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#7B241C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${script.variable} ${heading.variable} ${body.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
