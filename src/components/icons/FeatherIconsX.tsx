/**
 * Auto-generated Feather icons (IconX – IconXSquare).
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

export const IconX = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></svg>
);

export const IconXCircle = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" x2="9" y1="9" y2="15" />
    <line x1="9" x2="15" y1="9" y2="15" />
  </svg>
);

export const IconXOctagon = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <line x1="15" x2="9" y1="9" y2="15" />
    <line x1="9" x2="15" y1="9" y2="15" />
  </svg>
);

export const IconXSquare = ({ className }: IconProps): JSX.Element => (
  <svg {...defaults} className={className}>
    <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
    <line x1="9" x2="15" y1="9" y2="15" />
    <line x1="15" x2="9" y1="9" y2="15" />
  </svg>
);

