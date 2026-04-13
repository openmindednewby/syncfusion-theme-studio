import type { ReactNode } from 'react';

/** Tag/chip style variants shared across native and Syncfusion */
export const enum TagVariant {
  Default = 'default',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

/** Base tag props shared between native and Syncfusion implementations */
export interface BaseTagProps {
  /** Display text */
  label: string;
  /** Visual style variant */
  variant?: TagVariant;
  /** Whether the tag shows a remove button */
  removable?: boolean;
  /** Called when remove button is clicked */
  onRemove?: () => void;
  /** Called when the tag itself is clicked (renders as button) */
  onClick?: () => void;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
  /** Test ID for E2E testing */
  testId?: string;
  /** Tag size */
  size?: 'sm' | 'md';
}
