import { profile } from '@/lib/profile';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ground">
      <div className="mx-auto flex h-14 w-full max-w-page items-center justify-between px-6 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="font-mono text-xs tracking-[0.18em] text-ink uppercase"
        >
          {profile.name}
        </a>
        <a
          href={profile.links.resume}
          className="rounded-plate border border-ink px-4 py-2 font-mono text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:bg-ink hover:text-ground"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
