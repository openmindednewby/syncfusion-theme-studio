/**
 * Spec icons for input showcase pages.
 * Static representations matching exact design measurements.
 */
import { ChevronDirection } from './chevronDirection';

/** Spec close icon: 14px X shape */
export const SpecCloseIcon = ({ color }: { color: string }): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    height={14}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
    width={14}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6L18 18" />
  </svg>
);

/** Spec search icon: 14px magnifier */
export const SpecSearchIcon = ({ color }: { color: string }): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    height={14}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={14}
  >
    <circle cx={11} cy={11} r={8} />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const CHEVRON_SVG_SHORT = 6;
const CHEVRON_SVG_LONG = 10;

const CHEVRON_PATHS: Record<ChevronDirection, string> = {
  [ChevronDirection.Up]: 'M9 5L5 1L1 5',
  [ChevronDirection.Down]: 'M1 1L5 5L9 1',
  [ChevronDirection.Left]: 'M5 1L1 5L5 9',
  [ChevronDirection.Right]: 'M1 1L5 5L1 9',
};

/** Spec chevron for spinner buttons */
export const SpecChevron = ({ direction, color }: { direction: ChevronDirection; color: string }): JSX.Element => {
  const isHorizontal = direction === ChevronDirection.Left || direction === ChevronDirection.Right;

  return (
    <svg
      fill="none"
      height={isHorizontal ? CHEVRON_SVG_LONG : CHEVRON_SVG_SHORT}
      viewBox={isHorizontal ? '0 0 6 10' : '0 0 10 6'}
      width={isHorizontal ? CHEVRON_SVG_SHORT : CHEVRON_SVG_LONG}
    >
      <path d={CHEVRON_PATHS[direction]} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
};
