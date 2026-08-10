import type { Metadata, Viewport } from 'next';
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { profile } from '@/lib/profile';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
});

// IBM Plex Mono has no variable cut, so `weight` is mandatory here.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  title: 'Aadit Shah — Portfolio',
  description: profile.tagline,
  openGraph: {
    title: 'Aadit Shah — Portfolio',
    description: profile.tagline,
    type: 'profile',
  },
};

export const viewport: Viewport = {
  themeColor: '#EFEFF4',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the pre-paint script below stamps `data-intro`
    // on <html> before React hydrates, and React 19 treats <html> like any
    // other element in its extra-attribute diff. This silences only this
    // element's own attributes — descendants keep full mismatch checking.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Runs during HTML parsing, before #intro has even been created, so a
            returning visitor never gets a frame of the gate and a first-time
            visitor never gets a scrollbar flash.

            This has to be a raw inline script. next/script beforeInteractive
            queues inline code to run after the framework bundle executes —
            long after first paint — and React only hoists scripts that are
            src + async, so this one is emitted in place and runs synchronously.

            Path-guarded to '/', since the gate is route-scoped but the layout
            is not. Failure defaults to showing the gate. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;if(location.pathname!=='/'){return}try{d.dataset.intro=sessionStorage.getItem('intro-seen')==='1'?'skip':'open'}catch(e){d.dataset.intro='open'}})()",
          }}
        />
        {/* The series reveals on scroll via IntersectionObserver, and the intro
            gate is dismissed with JS. Without it, restore both. */}
        <noscript>
          <style>{`[data-reveal='false'] .milestone{opacity:1;transform:none}#intro{display:none}`}</style>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
