import { profile } from '@/lib/profile';

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-rule">
      <div className="mx-auto flex w-full max-w-page flex-col gap-2 px-6 py-10 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          {'© '}
          {new Date().getFullYear()} {profile.name}
          {'. All rights reserved.'}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-plate text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
