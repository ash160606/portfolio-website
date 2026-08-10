import { plotMilestones } from '@/lib/journey';
import { categories, legendOrder } from '@/lib/categories';
import { SectionHeading } from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

export function Journey() {
  const plotted = plotMilestones();

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="mx-auto w-full max-w-page px-6 pt-24 sm:px-8 lg:px-12"
    >
      <SectionHeading id="journey-heading" title="My Journey" />

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[0.6875rem] tracking-[0.06em] text-muted">
        {legendOrder.map((id) => (
          <li
            key={id}
            className={`flex items-center gap-2 ${categories[id].pointClass}`}
          >
            <span aria-hidden className="key-dot" />
            {categories[id].label}
          </li>
        ))}
      </ul>

      <Reveal>
        <ol className="series mt-4">
          {plotted.map((milestone, index) => {
            const category = categories[milestone.category];
            const Icon = milestone.icon;
            const isOngoing = milestone.category === 'ongoing';

            return (
              <li
                key={milestone.id}
                className={`milestone ${category.pointClass}`}
                data-tick={milestone.yearTick ? '' : undefined}
                style={
                  {
                    '--gap-months': milestone.gapMonths,
                    '--i': index,
                  } as React.CSSProperties
                }
              >
                {milestone.yearTick ? (
                  <>
                    <span aria-hidden className="milestone__year font-mono">
                      {milestone.yearTick}
                    </span>
                    <span aria-hidden className="milestone__rule" />
                  </>
                ) : null}

                {/* Colour is the only category signal, so name it for AT too. */}
                <span className="sr-only">{category.label}. </span>

                <time
                  dateTime={milestone.start}
                  className="milestone__date font-mono text-xs tracking-[0.08em] text-muted"
                >
                  {milestone.date}
                </time>

                <h3 className="mt-2 flex items-start gap-2.5 font-display text-lg leading-snug font-medium text-ink md:mt-0 md:text-xl">
                  <Icon
                    aria-hidden
                    className="mt-[0.3rem] size-4 shrink-0 text-muted"
                    strokeWidth={1.5}
                  />
                  <span>
                    {milestone.title}
                    {isOngoing ? (
                      <span className="ml-3 inline-block rounded-plate border border-rule px-2 py-0.5 align-middle font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                        ongoing
                      </span>
                    ) : null}
                  </span>
                </h3>

                {milestone.subtitle ? (
                  <p className="mt-2 max-w-measure pl-[1.625rem] text-[0.9375rem] leading-relaxed text-ink">
                    {milestone.subtitle}
                  </p>
                ) : null}

                <p className="mt-2 max-w-measure pl-[1.625rem] text-[0.9375rem] leading-relaxed text-muted">
                  {milestone.body}
                </p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
