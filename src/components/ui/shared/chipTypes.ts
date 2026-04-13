/** Chip visual variant */
export const enum ChipVariant {
  Default = 'default',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

/** Base chip props shared between implementations */
export interface BaseChipProps {
  /** Chip label text */
  children: string;
  /** Visual variant */
  variant?: ChipVariant;
  /** Show close button */
  removable?: boolean;
  /** Click handler for the chip body */
  onClick?: () => void;
  /** Called when close button is clicked */
  onRemove?: () => void;
  /** Disables interaction */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}
