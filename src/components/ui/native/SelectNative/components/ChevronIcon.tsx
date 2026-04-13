import { memo } from 'react';

/** Figma: 3.5x7px stroke rotated -90deg = 7x3.5px downward chevron */
const CHEVRON_WIDTH = 7;
const CHEVRON_HEIGHT = 3.5;
const STROKE_WIDTH = 1.17;

interface ChevronIconProps {
  isOpen: boolean;
}

/** Animated chevron icon matching Figma's 3.5x7px stroke chevron rotated -90deg. */
const ChevronIcon = ({ isOpen }: ChevronIconProps): JSX.Element => (
  <span className="native-select-chevron" data-open={isOpen}>
    <svg
      aria-hidden="true"
      fill="none"
      height={CHEVRON_HEIGHT}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={STROKE_WIDTH}
      viewBox="0 0 7 3.5"
      width={CHEVRON_WIDTH}
    >
      <path d="M0.58 0.58L3.5 2.92L6.42 0.58" />
    </svg>
  </span>
);

ChevronIcon.displayName = 'ChevronIcon';

export default memo(ChevronIcon);
