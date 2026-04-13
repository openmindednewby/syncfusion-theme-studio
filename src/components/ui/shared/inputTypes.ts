/** Base input props shared between native and Syncfusion implementations */
export interface BaseInputProps {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width input */
  fullWidth?: boolean;
  /** Show required indicator (*) */
  required?: boolean;
}
