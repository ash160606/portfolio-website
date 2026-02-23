'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SkillCardProps = {
  techItems: string[];
  title?: string;
};

const BADGE_VARIANTS = ['default', 'secondary', 'destructive'] as const;
type BadgeVariant = (typeof BADGE_VARIANTS)[number];

let variant_tracker = 0;
function getRandomVariant(): BadgeVariant {
  variant_tracker++;
  return BADGE_VARIANTS[variant_tracker % BADGE_VARIANTS.length];
}

export default function SkillCard({ techItems, title }: SkillCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      className="
    group
    w-full
    text-left
    transition-transform duration-300
    hover:-translate-y-1
    hover:scale-[1.02]
    active:scale-[0.99]
  "
      aria-label={`Toggle ${title ?? 'skill'} card`}
    >
      {/* This wrapper gives us 3D perspective */}
      <div className="perspective-[1000px]">
        {/* This is the rotating “card” */}
        <div
          className={[
            'relative min-h-[180px] transition-transform duration-500 [transform-style:preserve-3d]',
            flipped ? '[transform:rotateY(180deg)]' : '',
          ].join(' ')}
        >
          {/* FRONT (default) */}
          <div className=" h-full backface-hidden [backface-visibility:hidden]">
            <Card
              className="
              h-full
            transition-shadow duration-300
            group-hover:shadow-xl
            group-hover:shadow-black/40
            group-hover:ring-1 group-hover:ring-red-800
"
            >
              <CardHeader>
                <CardTitle>{title ?? 'default'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  Tap to reveal
                </p>
              </CardContent>
            </Card>
          </div>

          {/* BACK (your current view) */}
          <div className="h-full absolute inset-0 backface-hidden transform-[rotateY(180deg)]">
            <Card
              className="
              h-full
                transition-shadow duration-300
                group-hover:shadow-xl
  group-hover:shadow-black/40
content-center
group-hover:ring-1 group-hover:ring-orange-400/30
"
            >
              <CardHeader>
                <CardTitle>{title ?? 'default'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {techItems.map((item) => (
                    <Badge
                      key={item}
                      className="px-5 py-2 text-base font-semibold rounded-full"
                      variant={getRandomVariant()}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </button>
  );
}
