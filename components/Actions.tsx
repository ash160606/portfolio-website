import { Linkedin, FileText, Mail } from 'lucide-react';
import type { ProfileConfig } from '@/lib/profile';

type ActionsProps = {
  links: ProfileConfig['links'];
};

const base =
  'inline-flex items-center gap-2 rounded-plate px-5 py-3 text-sm font-medium transition-colors';

export function Actions({ links }: ActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* One primary action; the other two are quiet by comparison. */}
      <a
        href={`mailto:${links.email}`}
        aria-label="Send email"
        className={`${base} bg-ink text-ground hover:bg-muted`}
      >
        <Mail aria-hidden className="size-4" strokeWidth={1.75} />
        Get in touch!
      </a>
      <a
        href={links.resume}
        aria-label="View Resume"
        className={`${base} border border-ink text-ink hover:bg-ink hover:text-ground`}
      >
        <FileText aria-hidden className="size-4" strokeWidth={1.75} />
        Resume
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit LinkedIn profile"
        className={`${base} border border-rule text-ink hover:border-ink`}
      >
        <Linkedin aria-hidden className="size-4" strokeWidth={1.75} />
        LinkedIn
      </a>
    </div>
  );
}
