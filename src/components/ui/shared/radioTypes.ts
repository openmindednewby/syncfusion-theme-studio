/** Base radio props shared between native and Syncfusion implementations */
export interface BaseRadioProps {
  /** Radio label */
  label?: string;
  /** Helper text below radio */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Radio group name */
  name?: string;
  /** Radio value */
  value?: string;
  /** Whether the radio is checked */
  checked?: boolean;
  /** Called when checked state changes */
  onChange?: (value: string) => void;
}
