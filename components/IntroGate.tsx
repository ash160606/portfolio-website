'use client';

import dynamic from 'next/dynamic';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { CITIES, EXIT_MS, EXIT_REDUCED_MS, INTRO_SUBTEXT } from '@/lib/intro';
import type { IntroGlobeHandle } from '@/components/IntroGlobe';

// Loaded on demand so a returning visitor — who never sees the gate — never
// downloads cobe at all. It carries embedded map data and is the largest thing
// on this page by some margin.
const IntroGlobe = dynamic(() => import('@/components/IntroGlobe'), {
  ssr: false,
});

type Phase = 'open' | 'exiting' | 'gone';

export default function IntroGate() {
  // Must match the server render; an effect corrects it, as in Reveal.tsx.
  const [phase, setPhase] = useState<Phase>('open');
  const [globeFailed, setGlobeFailed] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const globeRef = useRef<IntroGlobeHandle>(null);

  const phaseRef = useRef<Phase>('open');
  const exitMsRef = useRef(EXIT_MS);
  const timerRef = useRef(0);
  /** True only if the visitor actually dismissed the gate this load. */
  const enteredRef = useRef(false);

  const enter = useCallback(() => {
    if (phaseRef.current !== 'open') return; // Enter fires keydown AND click
    phaseRef.current = 'exiting';
    enteredRef.current = true;

    // Written at the START of the exit: a reload mid-spin still counts as
    // dismissed, which is the honest reading of what the visitor did.
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      // Safari Lockdown and some webviews throw; the gate still works
    }

    globeRef.current?.spinOut();
    setPhase('exiting');

    timerRef.current = window.setTimeout(() => {
      if (phaseRef.current === 'gone') return;
      phaseRef.current = 'gone';
      setPhase('gone');
    }, exitMsRef.current);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('intro-seen') === '1';
    } catch {
      // treated as unseen; showing the gate is the safe failure
    }
    if (seen) {
      phaseRef.current = 'gone';
      setPhase('gone');
      return;
    }

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce) {
      exitMsRef.current = EXIT_REDUCED_MS;
      // Keep the CSS fade and the dismissal timer on the same number.
      rootRef.current?.style.setProperty(
        '--intro-exit',
        `${EXIT_REDUCED_MS}ms`,
      );
    }

    const root = document.documentElement;
    const siteRoot = document.getElementById('site-root');

    root.dataset.intro = 'open';
    // One attribute takes every link under the overlay out of the tab order
    // and the accessibility tree. Set imperatively so the page stays a server
    // component.
    siteRoot?.setAttribute('inert', '');
    buttonRef.current?.focus();

    // Click and tap are handled natively by the viewport-sized button below.
    // This is only the keyboard courtesy on top of it.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'Tab') return; // let focus move; nothing to move to
      enter();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timerRef.current);
      // Unwind here too. If this unmounts any other way than a finished exit
      // — Fast Refresh in dev being the realistic case — the site would
      // otherwise be left inert and scroll-locked with no way back.
      root.dataset.intro = 'done';
      siteRoot?.removeAttribute('inert');
    };
  }, [enter]);

  // Restoration runs after React has unmounted the overlay, so focus can't be
  // stolen back by a button that's still on screen.
  useEffect(() => {
    if (phase !== 'gone') return;
    document.documentElement.dataset.intro = 'done';
    document.getElementById('site-root')?.removeAttribute('inert');
    if (!enteredRef.current) return; // skip path: nothing to restore
    // globals.css sets scroll-behavior: smooth, so this must be explicit.
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div
      id="intro"
      ref={rootRef}
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      style={{ '--intro-exit': `${EXIT_MS}ms` } as React.CSSProperties}
    >
      <div className="intro-stage pointer-events-none absolute inset-0">
        <div className="intro-copy">
          <p
            id="intro-title"
            className="intro-title font-script leading-[1.05] font-semibold tracking-normal text-ink"
          >
            {'I’m Aadit'}
          </p>

          {/* whitespace-pre-line so newlines in INTRO_SUBTEXT actually break;
              JSX text collapses them to spaces otherwise. */}
          <p className="mx-auto mt-6 max-w-measure text-sm leading-relaxed whitespace-pre-line text-muted">
            {INTRO_SUBTEXT}
          </p>

          {/* Shown only where CSS anchor positioning is unavailable, or when the
              globe failed to start — either way the three names stay readable. */}
          <p
            data-force={globeFailed ? '' : undefined}
            className="intro-cities-fallback mt-4 font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase"
          >
            {CITIES.map((city, index) => (
              <Fragment key={city.id}>
                {index > 0 ? <span className="mx-2 text-rule">·</span> : null}
                {city.name}
              </Fragment>
            ))}
          </p>
        </div>

        <div className="intro-globe">
          {globeFailed ? (
            // Keeps the composition from collapsing if WebGL is unavailable.
            <div className="aspect-square w-full rounded-full border border-rule" />
          ) : (
            <IntroGlobe ref={globeRef} onFail={() => setGlobeFailed(true)} />
          )}
        </div>
      </div>

      {/* Still a viewport-sized button, just with no visible label: it gives
          tap-anywhere, native Enter/Space, a correct role and an announced
          name, with no custom key handling. */}
      <button
        ref={buttonRef}
        type="button"
        onClick={enter}
        className="absolute inset-0 h-full w-full cursor-pointer"
      >
        <span className="sr-only">Enter the site</span>
      </button>
    </div>
  );
}
