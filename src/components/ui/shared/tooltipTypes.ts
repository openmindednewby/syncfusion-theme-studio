import type { ReactNode } from 'react';

/** Tooltip placement positions shared across native and Syncfusion */
export const enum TooltipPlacement {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

/** Base tooltip props shared between native and Syncfusion implementations */
export interface BaseTooltipProps {
  /** Tooltip content (supports text and JSX) */
  content: ReactNode;
  /** Trigger element */
  children: ReactNode;
  /** Tooltip position relative to trigger */
  placement?: TooltipPlacement;
  /** Delay in ms before showing the tooltip */
  delay?: number;
  /** Test ID for E2E testing */
  testId?: string;
}
