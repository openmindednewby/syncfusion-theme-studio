import type { ButtonSize } from './buttonSize';

/** Icon button style variants */
export const enum IconButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

/** Base icon button props shared between implementations */
export interface BaseIconButtonProps {
  variant?: IconButtonVariant;
  size?: ButtonSize;
  className?: string;
  testId?: string;
  disabled?: boolean;
  loading?: boolean;
  icon: React.ReactNode;
  ariaLabel: string;
}
