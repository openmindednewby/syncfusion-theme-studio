/** Base select option used by both native and Syncfusion select components */
export interface BaseSelectOption {
  value: string | number;
  label: string;
}

/** Base select props shared between native and Syncfusion implementations */
export interface BaseSelectProps {
  /** Select options */
  options: BaseSelectOption[];
  /** Select label */
  label?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width select */
  fullWidth?: boolean;
  /** Show required indicator (*) */
  required?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Selected value */
  value?: string | number;
  /** Change handler - unified signature across native/Syncfusion */
  onChange?: (value: string | number) => void;
}
