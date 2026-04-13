import type { ButtonSize } from './buttonSize';

/** Button style variants shared across native and Syncfusion */
export const enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Outline = 'outline',
  Ghost = 'ghost',
  Danger = 'danger',
}

/** Base button props shared between native and Syncfusion implementations */
export interface BaseButtonProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon element rendered before the button text */
  leftIcon?: React.ReactNode;
  /** Icon element rendered after the button text */
  rightIcon?: React.ReactNode;
  /** Button content */
  children: React.ReactNode;
}
