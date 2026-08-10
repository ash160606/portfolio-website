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
      'Node.js',
      'REST APIs',
      'Next.js(This website!!)',
      'TailwindCSS (This website!!)',
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
    id: 'automation',
    title: 'Automation',
    category: 'automation',
    items: [
      'n8n',
      'Zapier',
      'OAuthV2 Integration',
      'Google Cloud Console',
      'GMail Automations',
      'WebScraping',
    ],
  },
];
