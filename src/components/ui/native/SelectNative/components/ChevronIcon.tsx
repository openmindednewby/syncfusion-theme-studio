import { memo } from 'react';

const CHEVRON_PATH = 'M6 9l6 6 6-6';
const ICON_SIZE = 16;

interface ChevronIconProps {
  isOpen: boolean;
}

/** Animated chevron icon that rotates 180 degrees when the dropdown is open. */
const ChevronIcon = ({ isOpen }: ChevronIconProps): JSX.Element => (
  <span className="native-select-chevron" data-open={isOpen}>
    <svg
      aria-hidden="true"
      fill="none"
      height={ICON_SIZE}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={ICON_SIZE}
    >
      <path d={CHEVRON_PATH} />
    </svg>
  </span>
);

ChevronIcon.displayName = 'ChevronIcon';

export default memo(ChevronIcon);
