import React from 'react';

interface RingHalfProps {
  /** The back half is drawn behind the planet, the front half over it. */
  half: 'back' | 'front';
  animate: boolean;
  /** Seconds for one trip of the moon around the ring. */
  seconds: number;
  /** Ring width relative to the planet, as a Tailwind width class. */
  width: string;
}

// Clockwise from the right edge: the lower (front) half first, then the upper (back) half.
const ORBIT = 'M990 200 A490 130 0 0 1 10 200 A490 130 0 0 1 990 200';

/** One half of a planet's tilted ring, with a moon that shows only while it is on this half. */
export const RingHalf: React.FC<RingHalfProps> = ({ half, animate, seconds, width }) => (
  <svg
    viewBox="0 0 1000 400"
    fill="none"
    style={{ rotate: 'var(--ring-tilt, 0deg)' }}
    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none ${width}`}
  >
    <g transform="rotate(-14 500 200)">
      <path
        d={half === 'front' ? 'M990 200 A490 130 0 0 1 10 200' : 'M10 200 A490 130 0 0 1 990 200'}
        stroke="var(--color-paper)"
        strokeWidth="2.5"
        opacity={half === 'back' ? 0.55 : 1}
      />
      {animate ? (
        <circle r="15" fill="var(--color-sun)" opacity="0">
          <animateMotion dur={`${seconds}s`} repeatCount="indefinite" path={ORBIT} />
          <animate
            attributeName="opacity"
            dur={`${seconds}s`}
            repeatCount="indefinite"
            calcMode="discrete"
            keyTimes="0;0.5"
            values={half === 'front' ? '1;0' : '0;1'}
          />
        </circle>
      ) : (
        half === 'front' && <circle cx="990" cy="200" r="15" fill="var(--color-sun)" />
      )}
    </g>
  </svg>
);
