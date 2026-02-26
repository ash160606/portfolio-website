import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardAction,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { SocialButtons } from '@/components/SocialButtons';
import { Route } from 'lucide-react';
import type { ProfileConfig } from '@/lib/profile';
import Link from 'next/link';
type ProfileCardProps = {
  profile: ProfileConfig;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden p-0 border-border bg-card/60 backdrop-blur-sm shadow-2xl shadow-black/20">
      <div className="h-32 w-full rounded-t-xl bg-linear-to-r from-orange-400 to-red-500"></div>

      <CardContent className="w-full relative z-20 flex flex-col items-center gap-8 p-8 md:flex-row md:items-start md:gap-10 md:p-12">
        {/* Profile image */}
        <div className="flex w-full items-stretch gap-8">
          <div id="card-content" className="flex flex-2 gap-6 self-start">
            <div className="relative shrink-0">
              <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-border shadow-lg md:h-44 md:w-44">
                <img
                  src={profile.image}
                  alt={profile.imageAlt}
                  width={176}
                  height={176}
                  className="h-full w-full object-cover"
                  //   priority
                  //   unoptimized
                />
              </div>
              {/* Subtle glow behind image */}
              <div
                className="absolute inset-0 -z-10 rounded-full opacity-20 blur-2xl"
                style={{ background: 'oklch(0.7 0.1 35)' }}
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5 text-center md:text-left w-full">
              <div className="flex flex-col gap-2 max-w-none">
                <h1 className="text-3xl font-mono font-bold tracking-tight text-foreground md:text-4xl text-balance">
                  {'Hello, I\u2019m '}
                  <span style={{ color: 'oklch(0.7 0.1 35)' }}>
                    {profile.name}
                  </span>
                </h1>
                <p className="self-start items-center text-lg font-medium text-shadow-muted">
                  {profile.tagline}
                </p>
              </div>

              <p className="max-w-lg leading-relaxed text-muted-foreground">
                {profile.bio}
              </p>

              <SocialButtons links={profile.links} />
            </div>
          </div>
          {/* <div id="timeline-link" className="flex-1">
            <Link href="/journey" className="block w-full h-full">
              <div
                className="w-full h-full p-6 rounded-xl border border-border bg-muted/20 hover:bg-muted/30 flex flex-col items-center justify-center text-center
      transition-transform duration-300
      hover:-translate-y-1 hover:scale-[1.02]
      active:scale-[0.99]
      hover:ring-2 hover:ring-red-800 hover:ring-offset-2 hover:ring-offset-background
    "
                role="button"
                aria-label="Go to journey timeline"
              >
                <Route className="w-20 h-20 mb-4" />
                <h2 className="text-lg font-semibold">
                  Check out my journey so far
                </h2>
              </div>
            </Link>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
