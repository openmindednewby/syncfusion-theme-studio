/** Base date picker props shared between native and Syncfusion implementations */
export interface BaseDatePickerProps {
  /** Date picker label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width */
  fullWidth?: boolean;
  /** Show required indicator */
  required?: boolean;
}
