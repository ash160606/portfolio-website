'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      // Smooth follow (lerp)
      const speed = 0.5; // smaller = more floaty, bigger = snappier
      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;

      document.documentElement.style.setProperty(
        '--cursor-x',
        `${current.current.x}px`,
      );
      document.documentElement.style.setProperty(
        '--cursor-y',
        `${current.current.y}px`,
      );

      // Keep animating while moving
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(300px circle at var(--cursor-x) var(--cursor-y), rgba(251, 146, 60, 0.5), transparent 75%)',
      }}
    />
  );
}
