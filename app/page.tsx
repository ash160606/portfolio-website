import { ProfileCard } from '@/components/ProfileCard';
import { profile } from '@/lib/profile';
import { Badge } from '@/components/ui/badge';
import SkillCard from '../components/SkillCard';
import Vert from '@/components/Timeline';
import './globals.css';
export default function Home() {
  const fullstackSkills: string[] = [
    'TypeScript',
    'React',
    'Node.js',
    'REST APIs',
    'Next.js(This website!!)',
    'TailwindCSS (This website!!)',
    'TDD (Test Driven Development)',
  ];
  const machineLearningSkills: string[] = [
    'Python',
    'scikit-learn',
    'pandas',
    'NumPy',
    'PyTorch',
    'seaborn/Matplotlib',
    'Linear Regression',
    'Classification Models',
  ];
  // const machineLearningSkills : string[] = ["Python"];
  const automationSkills: string[] = [
    'n8n',
    'Zapier',
    'OAuthV2 Integration',
    'Google Cloud Console',
    'GMail Automations',
    'WebScraping',
  ];
  return (
    <div className="relative flex min-h-svh min-w-none flex-col scroll-smooth">
      {/* Subtle radial gradient background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.20 0.03 260) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <main className="flex flex-col items-center md:justify-center px-4 py-16 sm:px-6 lg:px-8 max-h-none max-w-none">
        <section className="w-full" aria-label="About me">
          <ProfileCard profile={profile} />
        </section>
        <section
          className="w-full flex flex-col justify-center gap-12 mt-16"
          aria-label="My Tech Stack"
        >
          <h1 className="self-center text-3xl text-shadow-olive-500 font-mono font-bold tracking-tight text-foreground md:text-3xl text-balance gap-4">
            {'My Tools'}
          </h1>
          <div className="flex flex-col gap-1 md:gap-3 md:flex-row md:justify-evenly">
            <SkillCard
              title="FullStack Development"
              techItems={fullstackSkills}
            ></SkillCard>
            <SkillCard
              title="Machine Learning/Data Analysis"
              techItems={machineLearningSkills}
            ></SkillCard>
            <SkillCard
              title="Automation"
              techItems={automationSkills}
            ></SkillCard>
          </div>
        </section>
        <section className="w-full">
          <h1 className="text-3xl font-bold font-mono text-white p-3 text-center">
            My Journey
          </h1>
          <div className="mt-6 flex-1 min-h-0">
            <div className="h-full w-full rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-2xl shadow-black/20 p-6">
              <Vert />
            </div>
          </div>
        </section>
      </main>

      {/* Placeholder sections for future extensibility */}
      {/* <section id="projects" aria-label="Projects"></section> */}
      {/* <section id="experience" aria-label="Experience"></section> */}
      {/* <section id="contact" aria-label="Contact"></section> */}

      <footer className="border-t border-border bottom-0 text-center text-sm text-muted-foreground">
        <p>
          {'\u00A9 '}
          {new Date().getFullYear()} {profile.name}
          {'. All rights reserved.'}
        </p>
        <p className="mt-1">
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            {profile.email}
          </a>
        </p>
      </footer>
    </div>
  );
}
