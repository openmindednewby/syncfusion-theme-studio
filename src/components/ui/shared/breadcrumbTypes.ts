import type { ReactNode } from 'react';

/** Single breadcrumb navigation item */
export interface BaseBreadcrumbItem {
  /** Display text */
  text: string;
  /** Optional URL (makes item clickable) */
  url?: string;
  /** Optional icon element */
  icon?: ReactNode;
}

/** Base breadcrumb props shared between implementations */
export interface BaseBreadcrumbProps {
  /** Array of breadcrumb items */
  items: BaseBreadcrumbItem[];
  /** Separator character between items */
  separator?: string;
  /** Accessible label for the nav */
  ariaLabel?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
  /** Callback when a non-current breadcrumb item is clicked */
  onItemClick?: (item: BaseBreadcrumbItem, event: React.MouseEvent<HTMLAnchorElement>) => void;
}
