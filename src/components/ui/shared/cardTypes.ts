import type { ReactNode } from 'react';

/** Base card props shared between native and Syncfusion implementations */
export interface BaseCardProps {
  /** Card body content */
  children: ReactNode;
  /** Optional header content */
  header?: ReactNode;
  /** Optional footer content */
  footer?: ReactNode;
  /** Click handler (renders card as a button when provided) */
  onClick?: () => void;
  /** Whether the card shows a hover shadow effect */
  hoverable?: boolean;
  /** Whether the card has a visible border */
  bordered?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}
