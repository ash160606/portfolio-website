import type { CategoryId } from './categories';

export type SkillGroup = {
  id: string;
  title: string;
  /** Drives the 3px key bar above the column. */
  category: CategoryId;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'fullstack',
    title: 'FullStack Development',
    category: 'fullstack',
    items: [
      'TypeScript',
      'React',
      'REST APIs',
      'Java',
      'Next.js',
      'Django',
      'PixiJS',
      'TanStack',
      'TDD (Test Driven Development)',
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning/Data Analysis',
    category: 'ml',
    items: [
      'Python',
      'scikit-learn',
      'pandas',
      'NumPy',
      'PyTorch',
      'seaborn/Matplotlib',
      'Linear Regression',
      'Classification Models',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    category: 'automation',
    items: [
      'Git',
      'Docker',
      'PostgreSQL',
      'Cloudflare R2',
      'Capacitor.js',
    ],
  },
];
