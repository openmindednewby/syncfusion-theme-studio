/** Base checkbox props shared between native and Syncfusion implementations */
export interface BaseCheckboxProps {
  /** Checkbox label */
  label?: string;
  /** Helper text below checkbox */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Show required indicator (*) */
  required?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Called when checked state changes */
  onChange?: (checked: boolean) => void;
}
