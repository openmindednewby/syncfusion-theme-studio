import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  /** Display text */
  text: string;
  /** Optional URL (makes item clickable) */
  url?: string;
  /** Optional icon element */
  icon?: ReactNode;
  /** Optional test ID for E2E testing */
  testId?: string;
  /** Optional accessible label */
  ariaLabel?: string;
}

export interface BreadcrumbNativeProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Max visible items before collapsing; 0 = show all (default) */
  maxItems?: number;
  /** Separator element between items (string or ReactNode) */
  separator?: ReactNode;
  /** Accessible label for the nav */
  ariaLabel?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
  /** Callback when a non-current breadcrumb item is clicked */
  onItemClick?: (item: BreadcrumbItem, event: React.MouseEvent) => void;
  /** Callback when the collapsed ellipsis is clicked */
  onExpandCollapsed?: () => void;
}
