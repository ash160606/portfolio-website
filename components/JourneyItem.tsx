'use client';

import type { ReactNode } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

type JourneyItemProps = {
  date: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  icon: ReactNode;
  position?: 'left' | 'right';
  onClick?: () => void;
};

const ACCENT = '#f97316';

export default function JourneyItem({
  date,
  title,
  subtitle,
  children,
  icon,
  position,
  onClick,
}: JourneyItemProps) {
  return (
    <VerticalTimelineElement
      date={date}
      position={position}
      onTimelineElementClick={onClick}
      contentStyle={{
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        color: '#e5e7eb',
        borderRadius: '16px',
      }}
      contentArrowStyle={{
        borderRight: `7px solid rgba(249, 115, 22, 0.9)`,
      }}
      iconStyle={{
        background: 'rgba(15, 23, 42, 0.75)',
        color: ACCENT,
        boxShadow:
          '0 0 0 2px rgba(249,115,22,0.35), 0 20px 40px rgba(0,0,0,0.35)',
      }}
      textClassName="transition-transform duration-300 hover:-translate-y-1"
      dateClassName="text-sm md:text-base text-muted-foreground"
      icon={icon}
    >
      <h3 className="text-lg md:text-xl font-bold text-foreground">{title}</h3>

      {subtitle ? (
        <h4 className="mt-1 text-sm md:text-base font-medium text-foreground p-2">
          {subtitle}
        </h4>
      ) : null}

      {children ? (
        <div className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
      ) : null}
    </VerticalTimelineElement>
  );
}
