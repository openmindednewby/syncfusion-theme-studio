import type { CSSProperties, ElementType, ReactNode } from 'react';

/** Base description props shared between native and Syncfusion implementations */
export interface BaseDescriptionProps {
  /** Description content */
  children: ReactNode;
  /** HTML element to render as */
  as?: ElementType;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Inline style overrides */
  style?: CSSProperties;
}
