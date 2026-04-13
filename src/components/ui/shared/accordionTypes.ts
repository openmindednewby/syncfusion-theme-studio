import type { ReactNode } from 'react';

/** Single accordion panel item */
export interface BaseAccordionItem {
  /** Header text displayed in the summary */
  header: string;
  /** Content shown when expanded */
  content: string | ReactNode;
}

/** Base accordion props shared between implementations */
export interface BaseAccordionProps {
  /** Array of accordion items */
  items: BaseAccordionItem[];
  /** Test ID for E2E testing */
  testId?: string;
  /** Allow multiple items open simultaneously */
  allowMultiple?: boolean;
  /** Additional CSS classes */
  className?: string;
}
