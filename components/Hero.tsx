import Image from 'next/image';
import { profile, taglineParts } from '@/lib/profile';
import { categories, type CategoryId } from '@/lib/categories';
import { Actions } from '@/components/Actions';

/**
 * The tagline's four segments, keyed to the categories they actually belong to.
 * The first two are work domains and take their filled key; the last two are
 * both the academic strand, so both render as the hollow education marker.
 * Mapping them to four different colours would invent a distinction that isn't
 * in the content.
 */
const taglineKeys: CategoryId[] = ['fullstack', 'ml', 'education', 'education'];

export function Hero() {
  return (
    <section
      id="top"
      aria-label="About me"
      className="mx-auto w-full max-w-page px-6 pt-16 pb-4 sm:px-8 lg:px-12 lg:pt-24"
    >
      <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">
        <div className="min-w-0 flex-1">
          <p
            className="rise font-mono text-xs tracking-[0.2em] text-muted uppercase"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            {'Hello, I’m'}
          </p>

          <h1
            className="rise mt-4 font-display text-[clamp(3rem,9vw,6rem)] leading-[0.92] font-medium tracking-[-0.02em] text-balance text-ink"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            {profile.name}
          </h1>

          {/* The tagline, read as a key. */}
          <ul
            className="rise mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-rule pt-5 font-mono text-xs text-ink"
            style={{ '--i': 2 } as React.CSSProperties}
          >
            {taglineParts.map((part, i) => (
              <li
                key={part}
                className={`flex items-center gap-2.5 ${
                  categories[taglineKeys[i] ?? 'education'].pointClass
                }`}
              >
                <span aria-hidden className="key-dot" />
                {part}
              </li>
            ))}
          </ul>

          <p
            className="rise mt-8 max-w-measure text-[1.0625rem] leading-relaxed text-ink"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            {/* Mobile bio */}
            <span className="md:hidden">{profile.bioShort}</span>
            {/* Desktop bio */}
            <span className="hidden md:inline">{profile.bio}</span>
          </p>

          <div
            className="rise mt-9"
            style={{ '--i': 4 } as React.CSSProperties}
          >
            <Actions links={profile.links} />
          </div>
        </div>

        {/* the portrait plate */}
        <div
          className="rise w-full max-w-[17.5rem] shrink-0 self-start overflow-hidden rounded-plate border border-rule bg-panel"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          <Image
            src={profile.image}
            alt={profile.imageAlt}
            width={280}
            height={338}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
