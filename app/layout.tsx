import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

const SITE_URL = 'https://eay-core.github.io';
const DESCRIPTION =
  'Local-first AI stack. One endpoint for every AI subscription and API key you own, plus a workspace, a model arena and a terminal coding agent.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'EAY: Every AI, Yours', template: '%s · EAY' },
  description: DESCRIPTION,
  icons: { icon: '/brand/eay-mark.svg' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'EAY',
    title: 'EAY: Every AI, Yours',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary', title: 'EAY: Every AI, Yours', description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c11' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-[100dvh] font-sans">{children}</body>
    </html>
  );
}
