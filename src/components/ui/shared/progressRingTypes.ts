/** Base progress ring props shared between native and Syncfusion implementations */
export interface BaseProgressRingProps {
  /** Current progress value */
  value: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Ring diameter in pixels */
  size?: number;
  /** Ring stroke width in pixels */
  strokeWidth?: number;
  /** Test ID for E2E testing */
  testId?: string;
}
