export type ProfileConfig = {
  name: string;
  tagline: string;
  bio: string;
  image: string;
  imageAlt: string;
  email: string;
  links: {
    linkedin: string;
    resume: string;
    email: string;
  };
};

export const profile: ProfileConfig = {
  name: 'Aadit Shah',
  tagline:
    'Software Development | Data Analysis & Visualization | Student @ UBC',
  bio: 'I build clean solutions for messy problems. Data driven approaches, clean code, and even cleaner design is the way to go! I love learning new practices in the tech world and applying them to projects, be it prototype or production.',
  image: '/me.png',
  imageAlt: 'Portrait photo of Aadit Shah',
  email: 'shahaadit2016@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/ashah16',
    resume: '/resume.pdf',
    email: 'shahaadit2016@gmail.com',
  },
};
