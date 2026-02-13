import type { ReactNode } from 'react';

/** Badge style variants shared across native and Syncfusion */
export const enum BadgeVariant {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

/** Base badge props shared between native and Syncfusion implementations */
export interface BaseBadgeProps {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Wrapped element (badge overlays this) */
  children?: ReactNode;
  /** Numeric count to display */
  count?: number;
  /** Show as a small dot instead of a count */
  dot?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
  /** Maximum count before showing overflow (e.g. "99+") */
  maxCount?: number;
}
