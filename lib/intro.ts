import type { Arc, COBEOptions, Marker } from 'cobe';

/**
 * The intro gate's globe.
 *
 * Three places, permanently connected by arcs, on a slowly turning blue globe.
 *
 * On colour: cobe's fragment shader multiplies ONE colour uniform by a scalar
 * for the whole sphere —
 *   m += vec4(F*(mix((1.-q)*pow(i,.4), q, n.z) + .1) + pow(1.-i,4.)*w, 1);
 * where F is baseColor, q is the land term and w is glowColor. Land can only
 * be a brighter or darker shade of the ocean, never a different hue, so the
 * "green land on blue ocean" look is not reachable without forking the
 * library. `mapBrightness` is what makes continents read.
 *
 * Markers DO carry an `id`: cobe turns each one into a 1x1px element with
 * `anchor-name: --cobe-{id}` plus a `--cobe-visible-{id}` custom property,
 * which is how the city labels pin themselves to the globe.
 */

export type CityId = 'ahmedabad' | 'saskatoon' | 'vancouver';

export type City = {
  id: CityId;
  name: string;
  /** [latitude, longitude] */
  location: [number, number];
};

export const CITIES: City[] = [
  { id: 'ahmedabad', name: 'Ahmedabad', location: [23.0225, 72.5714] },
  { id: 'saskatoon', name: 'Saskatoon', location: [52.1332, -106.67] },
  { id: 'vancouver', name: 'Vancouver', location: [49.2827, -123.1207] },
];

/** Ahmedabad → Saskatoon → Vancouver → Ahmedabad. All drawn at once. */
const LEGS: [number, number][] = [
  [0, 1],
  [1, 2],
  //   [2, 0], no need to do YVR - AMD
];

/** Shown above the globe. */
export const INTRO_SUBTEXT = 'AMD - YXE - YVR \n Click anywhere to enter';

const OCEAN: [number, number, number] = [0.118, 0.29, 0.482]; // #1E4A7B
const SKY: [number, number, number] = [0.631, 0.788, 0.957]; // #A1C9F4
const SEAGREEN: [number, number, number] = [0.3476, 0.6008, 0.2107]; // #58e761
// const SALMON: [number, number, number] = [1, 0.624, 0.608]; // #FF9F9B

const MARKER_SIZE = 0.015;

// Timing. All in ms except SPIN, which is rad/ms.
export const SPIN = 0.00018;
export const EXIT_MS = 620;
export const EXIT_REDUCED_MS = 160;
/** Peak speed multiplier at the end of the exit ramp. */
export const EXIT_PEAK = 320;
/**
 * The exit opens with the globe rotating *backwards* — real anticipation, the
 * wind-up before the whip. WIND_FRACTION is the share of the exit spent
 * winding back, and must stay in step with the crouch in the `intro-squash`
 * keyframes in globals.css. EXIT_WIND scales the reverse (~8° of travel).
 */
export const WIND_FRACTION = 0.22;
export const EXIT_WIND = 6;

/**
 * Rotation used for the single static frame under `prefers-reduced-motion`.
 * Ahmedabad and Vancouver sit ~164° apart, so no single value shows all three
 * markers — this centres North America and lets Ahmedabad fall near the limb.
 * Purely empirical; adjust by eye.
 */
export const STATIC_PHI = 4.2;

export function createGlobeState(cssSize: number, dpr: number): COBEOptions {
  return {
    width: cssSize * dpr,
    height: cssSize * dpr,
    devicePixelRatio: dpr,
    phi: 0,
    theta: 0.28,
    dark: 1,
    diffuse: 0.6,
    mapSamples: cssSize < 400 ? 11000 : 16000,
    // The knob that decides whether continents read as pale blue-white or stay
    // lost in the ocean. Invisible land -> raise; blown out and textureless ->
    // lower toward 8.
    mapBrightness: 11,
    mapBaseBrightness: 0.08,
    baseColor: OCEAN,
    markerColor: SEAGREEN,
    glowColor: SKY, // the atmospheric rim — the one place a second hue is legal
    markers: [],
    arcs: [],
    arcColor: SEAGREEN,
    // cobe's own default is 1. Raise for chunkier arcs, drop toward 0.5 if
    // they start to read as bands rather than lines.
    arcWidth: 0.75,
    arcHeight: 0.35,
    markerElevation: 0.01,
    opacity: 1,
    scale: 1,
    offset: [0, 0],
    // alpha:true is load-bearing — without it the area outside the sphere
    // paints an opaque black square instead of compositing onto the paper.
    context: { antialias: true, alpha: true },
  };
}

function marker(city: City): Marker {
  return {
    id: city.id, // drives --cobe-{id}, which the labels anchor to
    location: city.location,
    size: MARKER_SIZE,
    color: SEAGREEN,
  };
}

function arc(from: City, to: City): Arc {
  return { from: from.location, to: to.location, color: SEAGREEN };
}

/** All three arcs and all three markers, permanently. */
export function applyStatic(state: COBEOptions): void {
  state.arcs = LEGS.map(([a, b]) => arc(CITIES[a], CITIES[b]));
  state.markers = CITIES.map(marker);
}
