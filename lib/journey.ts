import type { LucideIcon } from 'lucide-react';
import {
  School,
  Waves,
  CirclePile,
  Fullscreen,
  PartyPopper,
  Wrench,
  DollarSign,
  LibraryBig,
  Layers,
  Globe,
} from 'lucide-react';
import type { CategoryId } from './categories';

export type Milestone = {
  id: string;
  /** Display string, kept exactly as authored. */
  date: string;
  /** `YYYY-MM` of the start, used only to space and tick the series. */
  start: string;
  title: string;
  subtitle?: string;
  body: string;
  icon: LucideIcon;
  category: CategoryId;
};

export const milestones: Milestone[] = [
  {
    id: 'ubc-start',
    date: 'Sep 2024 - Current',
    start: '2024-09',
    title: 'Started Undergrad @ UBC',
    subtitle: 'CS + Stats',
    body: "Start of a long journey at one of Canada's best institutions",
    icon: School,
    category: 'education',
  },
  {
    id: 'tidal-regression',
    date: 'Jan 2025',
    start: '2025-01',
    title: 'Built Tidal Height Regression Model',
    subtitle: 'Used real data from Steveston Harbor',
    body: 'Building a strong base in Python (TensorFlow, scikit-learn) and developed an intuition for data science + analysis.',
    icon: Waves,
    category: 'ml',
  },
  {
    id: 'snooker-app',
    date: 'March 2025 - April 2025',
    start: '2025-03',
    title: 'Developed a Snooker Scorekeeping App',
    subtitle:
      'Used Java Swing to track scores for multiple concurrent snooker games',
    body: 'Intro to Software Construction, OOP Best Practices and Test Driven Development',
    icon: CirclePile,
    category: 'fullstack',
  },
  {
    id: 'mnist-classifier',
    date: 'March - April 2025',
    start: '2025-03',
    title: 'Trained a Binary Classifier on the MNIST Dataset',
    subtitle:
      'Entered the world of Machine Learning through image classification - 99% accuracy on held out test set',
    body: 'Getting proficient with Python, understanding vectorized scripting, ML Training principles (k-fold cross-validation, parameter fine-tuning, blind testing)',
    icon: Fullscreen,
    category: 'ml',
  },
  {
    id: 'first-year-done',
    date: 'May 2025',
    start: '2025-05',
    title: 'Finished off first-year strong',
    subtitle: 'Accepted to UBC Science Co-op as a first year applicant',
    body: 'Finished the year of strong academically with a 90%+ GPA.',
    icon: PartyPopper,
    category: 'education',
  },
  {
    id: 'email-summarizer',
    date: 'June 2025',
    start: '2025-06',
    title: 'Built a personal tool - the UBC Email Summarizer',
    subtitle:
      'Developed a web automation to solve a problem in my own life, hosted it on Google Cloud Connsole',
    body: 'Applying what I learnt from a year of Computer Science and experimenting in my own time',
    icon: Wrench,
    category: 'automation',
  },
  {
    id: 'abjayon-internship',
    date: 'June 2025 - July 2025',
    start: '2025-06',
    title: 'Meter Data Management Intern @ Abjayon Technologies',
    subtitle: 'First internship experience, working with production-scale data',
    body: 'Applying my python proficiency and statistical principles to a place where every mistake had a $$$ cost attached to it',
    icon: DollarSign,
    category: 'ml',
  },
  {
    id: 'second-year',
    date: 'Sept 2025 - Dec 2025',
    start: '2025-09',
    title: 'Second Year @ UBC Begins!',
    subtitle: 'Diving Deeper into Low Level Development - C, C++, ASM',
    body: 'Making a simulation that runs MIPS Based ASM as part of coursework, diving deep into data structures, pathfinding algorithms and C compilers',
    icon: LibraryBig,
    category: 'education',
  },
  {
    // Authored title was 'ONGOING WORK - InsightUBC'. The "ONGOING WORK"
    // prefix now lives in `category`, which renders as a salmon point and an
    // "ongoing" tag beside the date, so the words are still on screen without
    // shouting from inside a display heading.
    id: 'insight-ubc',
    date: 'Jan 2026 - Apr 2026',
    start: '2026-01',
    title: 'InsightUBC',
    subtitle:
      'A fullstack web-app to host complex queries over historical course offerings at UBC',
    body: 'Using TypeScript + Express.js to design a RESTFul API, support large batch uploads through .zip files, design a React frontend to support CRUD Operations',
    icon: Layers,
    category: 'fullstack',
  },
  {
    // Authored title was 'ONGOING WORK - News-Views'. See the note above.
    id: 'news-views',
    date: 'May 2026 - Current',
    start: '2026-05',
    title: 'Software Developer @ CoDHerS',
    subtitle:
      'Web + Game Dev Co-op Position',
    body: 'Building a digital platform for minoritized languages. With a focus on Uyghur, we use Typescript game libraries, a custom Django backend to serve dynamic assets with full CRUD operations enabled through a GUI for non technical contributors',
    icon: Globe,
    category: 'ongoing',
  },
];

/** `YYYY-MM` → absolute month index, for measuring gaps between milestones. */
function monthIndex(start: string): number {
  const [year, month] = start.split('-').map(Number);
  return year * 12 + month;
}

export type PlottedMilestone = Milestone & {
  /** Months elapsed since the previous milestone; 0 for the first. */
  gapMonths: number;
  /** Set on the first milestone of each calendar year, for the axis ticks. */
  yearTick?: string;
};

/**
 * Lays the milestones out as a series.
 *
 * Rows stay in normal document flow and only the whitespace *between* them is
 * proportional to elapsed time. Positioning points absolutely by date would
 * collide — two entries start in March 2025 and two in June 2025 — while
 * spacing rows evenly would throw away the temporal signal entirely.
 */
export function plotMilestones(
  items: Milestone[] = milestones,
): PlottedMilestone[] {
  let previousMonth: number | null = null;
  let previousYear: string | null = null;

  return items.map((milestone) => {
    const month = monthIndex(milestone.start);
    const year = milestone.start.slice(0, 4);

    const plotted: PlottedMilestone = {
      ...milestone,
      gapMonths: previousMonth === null ? 0 : month - previousMonth,
      yearTick: year === previousYear ? undefined : year,
    };

    previousMonth = month;
    previousYear = year;
    return plotted;
  });
}
