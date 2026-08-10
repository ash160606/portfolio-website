import { skillGroups } from '@/lib/skills';
import { categories } from '@/lib/categories';
import { SectionHeading } from '@/components/SectionHeading';

export function Tools() {
  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="mx-auto w-full max-w-page px-6 pt-24 sm:px-8 lg:px-12"
    >
      <SectionHeading id="tools-heading" title="My Tools" />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {skillGroups.map((group) => (
          <article
            key={group.id}
            className="overflow-hidden rounded-plate border border-rule bg-panel"
          >
            {/* the category key, as the column's top edge */}
            <div
              aria-hidden
              className={`h-[3px] w-full ${categories[group.category].barClass}`}
            />
            <div className="p-6">
              <h3 className="font-display text-xl leading-snug font-medium text-ink">
                {group.title}
              </h3>
              <ul className="mt-5 divide-y divide-rule border-t border-rule font-mono text-[0.8125rem] text-ink">
                {group.items.map((item) => (
                  <li key={item} className="py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
