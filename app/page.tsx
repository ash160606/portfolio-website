import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { Tools } from '@/components/Tools';
import { Journey } from '@/components/Journey';
import { SiteFooter } from '@/components/SiteFooter';
import IntroGate from '@/components/IntroGate';

export default function Home() {
  return (
    <>
      <div id="site-root" className="flex min-h-svh flex-col">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Hero />
          <Tools />
          <Journey />
        </main>
        <SiteFooter />
      </div>
      <IntroGate />
    </>
  );
}
