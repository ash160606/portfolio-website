export type ProfileConfig = {
  name: string;
  tagline: string;
  bio: string;
  bioShort: string;
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
    'Software Development | Data Analysis & Visualization | Student @ UBC | Science Co-op Program',
  bio: "I build clean solutions for messy problems. Excited to chat about any opportunities across Canada, and equally ready to relocate! This portfolio is a way for me to show you what I've done so far. I plan to keep updating it as I gain more experience and skills, so make sure to keep coming back!",
  bioShort:
    'I build clean solutions for messy problems! Open to work across Canada, and would LOVE to discuss anything tech',
  image: '/me.png',
  imageAlt: 'Portrait photo of Aadit Shah',
  email: 'shahaadit2016@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/ashah16',
    resume: '/resume.pdf',
    email: 'shahaadit2016@gmail.com',
  },
};

/**
 * The tagline's pipe-separated segments, derived rather than duplicated.
 * The hero renders them as a chart legend, one pastel key each, in order.
 */
export const taglineParts: string[] = profile.tagline
  .split('|')
  .map((part) => part.trim())
  .filter(Boolean);
