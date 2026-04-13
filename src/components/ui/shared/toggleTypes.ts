/** Base toggle/switch props shared between native and Syncfusion implementations */
export interface BaseToggleProps {
  /** Whether the toggle is on */
  checked: boolean;
  /** Called with the new checked value when toggled */
  onChange: (checked: boolean) => void;
  /** Accessible label for screen readers */
  label?: string;
  /** Disables interaction */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}
