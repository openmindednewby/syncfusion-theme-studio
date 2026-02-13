/** Progress bar style variants shared across native and Syncfusion */
export const enum ProgressBarVariant {
  Default = 'default',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

/** Base progress bar props shared between native and Syncfusion implementations */
export interface BaseProgressBarProps {
  /** Current progress value */
  value: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Visual style variant */
  variant?: ProgressBarVariant;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Bar thickness */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show indeterminate animation */
  indeterminate?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
  /** Custom label text (displayed alongside percentage) */
  label?: string;
}
