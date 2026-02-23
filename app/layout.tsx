import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
// import 'react-chrono/dist/style.css';
import './globals.css';
import CursorGlow from '@/components/CursorGlow';

const _inter = Inter({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aadit Shah — Portfolio',
  description: 'Personal portfolio for Aadit Shah.',
  icons: {
    icon: '/coding.gif',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased relative">
        <CursorGlow />
        <div className="relative z-10">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
