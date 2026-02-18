/**
 * Auto-generated Feather icons (IconZapOff – IconZoomOut).
 * DO NOT EDIT — re-run: node scripts/generate-feather-icons.mjs
 */
import type { IconProps } from './types';

const ICON_SIZE = 18;

const defaults = {
  'aria-hidden': true as const,
  width: ICON_SIZE,
  height: ICON_SIZE,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconZapOff = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polyline points="12.41 6.75 13 2 10.57 4.92" />
    <polyline points="18.57 12.91 21 10 15.66 10" />
    <polyline points="8 8 3 14 12 14 11 22 16 16" />
    <line x1="1" x2="23" y1="1" y2="23" />
  </svg>
);

export const IconZoomIn = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
    <line x1="11" x2="11" y1="8" y2="14" />
    <line x1="8" x2="14" y1="11" y2="11" />
  </svg>
);

export const IconZoomOut = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
    <line x1="8" x2="14" y1="11" y2="11" />
  </svg>
);

