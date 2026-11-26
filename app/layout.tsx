import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@/lib/theme';
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
    { media: '(prefers-color-scheme: light)', color: '#f8f7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#090b0f' },
  ],
};

// Runs before paint so returning visitors never see a flash of the wrong theme.
const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t==='ascii'||t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme',${JSON.stringify(DEFAULT_THEME)});}}catch(e){document.documentElement.setAttribute('data-theme',${JSON.stringify(DEFAULT_THEME)});}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-[100dvh] font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
