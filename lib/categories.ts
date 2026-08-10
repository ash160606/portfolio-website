/**
 * Category keys for the site.
 *
 * Colour here is data encoding, not decoration: every pastel maps to one kind
 * of work, and the same key is used in the hero legend, the tools bars and the
 * journey series so the three sections read as one chart.
 *
 * The four fills come from seaborn's `pastel` palette. `education` is
 * deliberately *not* a fifth hue — it renders as a hollow marker (panel fill,
 * same ink ring), which is standard chart grammar for "unfilled point".
 *
 * The class strings must stay literal. Tailwind's scanner reads source text,
 * so a template literal like `bg-key-${id}` compiles to nothing.
 */

export type CategoryId =
  | 'fullstack'
  | 'ml'
  | 'automation'
  | 'ongoing'
  | 'education';

export type Category = {
  /** Human-readable name, shown in the legend and to screen readers. */
  label: string;
  /** Sets `--point`, the fill of a legend swatch or series point. */
  pointClass: string;
  /** Background for the 3px rule above a tools column. */
  barClass: string;
};

export const categories: Record<CategoryId, Category> = {
  fullstack: {
    label: 'Fullstack',
    pointClass: '[--point:var(--color-key-blue)]',
    barClass: 'bg-key-blue',
  },
  ml: {
    label: 'ML / Data',
    pointClass: '[--point:var(--color-key-green)]',
    barClass: 'bg-key-green',
  },
  automation: {
    label: 'Automation',
    pointClass: '[--point:var(--color-key-violet)]',
    barClass: 'bg-key-violet',
  },
  ongoing: {
    label: 'Ongoing work',
    pointClass: '[--point:var(--color-key-salmon)]',
    barClass: 'bg-key-salmon',
  },
  education: {
    label: 'Education',
    pointClass: '[--point:var(--color-panel)]',
    barClass: 'bg-rule',
  },
};

/** Legend order: the four filled keys first, hollow marker last. */
export const legendOrder: CategoryId[] = [
  'fullstack',
  'ml',
  'automation',
  'ongoing',
  'education',
];
