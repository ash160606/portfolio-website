'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveals its children once, the first time they scroll into view.
 *
 * Kept deliberately thin: it receives server-rendered markup as `children`, so
 * the section it wraps stays a server component and this is the only JavaScript
 * the page ships for it.
 */
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={shown ? 'true' : 'false'}>
      {children}
    </div>
  );
}
