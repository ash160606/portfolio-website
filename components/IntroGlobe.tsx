'use client';

import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';
import createGlobe, { type Globe } from 'cobe';
import {
  CITIES,
  EXIT_MS,
  EXIT_PEAK,
  EXIT_WIND,
  SPIN,
  STATIC_PHI,
  WIND_FRACTION,
  applyStatic,
  createGlobeState,
} from '@/lib/intro';

export type IntroGlobeHandle = {
  /** Start the exit ramp. Safe to call more than once. */
  spinOut: () => void;
};

type IntroGlobeProps = {
  /** Fired if WebGL is unavailable or the context is lost. */
  onFail?: () => void;
  ref?: Ref<IntroGlobeHandle>;
};

/**
 * cobe v2 notes, since the published README still documents v1:
 *  - `onRender` does not exist. There is no internal render loop.
 *  - `update()` re-uploads buffers and draws synchronously, so we own the rAF.
 *  - `destroy()` does NOT cancel a queued frame — cancel first, then destroy,
 *    or a pending frame calls update() into a torn-down WebGL context.
 *  - createGlobe WRAPS our canvas in a div of its own making and puts the
 *    marker anchor elements in there, so teardown has to clear the host
 *    rather than just remove the canvas.
 */
export default function IntroGlobe({ onFail, ref }: IntroGlobeProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  // Read the callback through a ref so the effect keeps an empty dep array and
  // never re-runs — a parent re-render must not rebuild the globe.
  const onFailRef = useRef(onFail);
  onFailRef.current = onFail;

  /** performance.now() when the exit began; 0 while idle. */
  const exitAtRef = useRef(0);

  useImperativeHandle(
    ref,
    () => ({
      spinOut: () => {
        if (!exitAtRef.current) exitAtRef.current = performance.now();
      },
    }),
    [],
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let globe: Globe | null = null;
    let raf = 0;
    let disposed = false;
    let resizeTimer = 0;
    let builtSize = 0;

    const teardown = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (globe) {
        try {
          globe.destroy();
        } catch {
          // a lost context can throw here; nothing useful to do
        }
        globe = null;
      }
      // Clears the canvas AND the wrapper cobe inserts around it, which would
      // otherwise accumulate one orphan per resize rebuild.
      host.replaceChildren();
    };

    const build = () => {
      if (disposed) return;

      const size = Math.round(host.getBoundingClientRect().width);
      if (size <= 0) return;
      builtSize = size;

      // 3x on a phone is 9x the fragment work for no visible gain here.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // A fresh canvas per build. React 19 StrictMode double-invokes effects in
      // dev, and getContext() on a canvas whose context was already destroyed
      // hands back a dead one — the globe would silently render nothing.
      const canvas = document.createElement('canvas');
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      canvas.style.display = 'block';
      canvas.setAttribute('aria-hidden', 'true');
      host.appendChild(canvas);

      // cobe wants device pixels in width/height; CSS pixels go on the element.
      const state = createGlobeState(size, dpr);
      applyStatic(state);
      if (reduce) state.phi = STATIC_PHI;

      try {
        globe = createGlobe(canvas, state);
      } catch {
        teardown();
        onFailRef.current?.();
        return;
      }

      canvas.addEventListener(
        'webglcontextlost',
        (event) => {
          event.preventDefault();
          disposed = true;
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
          onFailRef.current?.();
        },
        { once: true },
      );

      if (reduce) {
        // One frame, drawn after layout has settled. No loop at all.
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (!disposed) globe?.update(state);
        });
        return;
      }

      let last = performance.now();

      const frame = (now: number) => {
        if (disposed || !globe) return;
        raf = requestAnimationFrame(frame);

        // rAF pauses in a background tab, so the first frame back can carry a
        // delta of minutes. Clamping stops phi jumping by radians.
        const dt = Math.min(now - last, 100);
        last = now;

        let speed = SPIN;
        const exitAt = exitAtRef.current;
        if (exitAt) {
          const p = Math.min((now - exitAt) / EXIT_MS, 1);
          if (p < WIND_FRACTION) {
            // Wind-up: a half-sine dip below zero and back, so the globe
            // rotates backwards a few degrees while the content crouches.
            const q = p / WIND_FRACTION;
            speed = SPIN * (1 - EXIT_WIND * Math.sin(q * Math.PI));
          } else {
            // Then it lets go — easeInCubic into the launch.
            const q = (p - WIND_FRACTION) / (1 - WIND_FRACTION);
            speed = SPIN * (1 + EXIT_PEAK * q * q * q);
          }
        }

        state.phi += speed * dt;
        // Always pass the whole state object. Whether update() merges or
        // replaces isn't knowable from its signature, and guessing wrong means
        // the markers vanish on frame two.
        globe.update(state);
      };

      raf = requestAnimationFrame(frame);
    };

    build();

    const observer = new ResizeObserver(() => {
      if (exitAtRef.current) return; // never rebuild mid-exit
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (disposed || exitAtRef.current) return;
        const next = Math.round(host.getBoundingClientRect().width);
        // <4px is address-bar jitter and sub-pixel churn, not a real resize.
        if (next <= 0 || Math.abs(next - builtSize) < 4) return;
        teardown();
        build();
      }, 150);
    });
    observer.observe(host);

    return () => {
      disposed = true;
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      teardown();
    };
  }, []);

  return (
    <>
      <div ref={hostRef} aria-hidden className="aspect-square w-full" />
      {/* Pinned to the markers via cobe's `anchor-name: --cobe-{id}` elements.
          These must follow the host in tree order — anchor positioning requires
          the positioned element to come after its anchor. Hidden from AT
          because the fallback line in IntroGate carries the same names. */}
      {CITIES.map((city) => (
        <span
          key={city.id}
          aria-hidden
          data-city={city.id}
          className="intro-label"
        >
          {city.name}
        </span>
      ))}
    </>
  );
}
