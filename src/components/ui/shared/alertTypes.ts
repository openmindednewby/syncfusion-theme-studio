import type { ReactNode } from 'react';

/** Alert severity levels shared across native and Syncfusion */
export const enum AlertSeverity {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

/** Base alert props shared between native and Syncfusion implementations */
export interface BaseAlertProps {
  /** Alert severity level */
  severity?: AlertSeverity;
  /** Alert title (optional) */
  title?: string;
  /** Alert content */
  children: ReactNode;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Called when alert is dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
}
