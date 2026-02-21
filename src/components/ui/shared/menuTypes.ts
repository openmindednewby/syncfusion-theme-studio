/** A single menu item, optionally with child items or separator */
export interface BaseMenuItem {
  /** Display text */
  text: string;
  /** Child menu items (creates a submenu) */
  items?: BaseMenuItem[];
  /** Whether this is a separator */
  separator?: boolean;
  /** Click handler (for leaf items) */
  onClick?: () => void;
  /** Test ID for E2E testing */
  testId?: string;
}

/** Base menu props shared between implementations */
export interface BaseMenuProps {
  /** Top-level menu items */
  items: BaseMenuItem[];
  /** Accessible label for the menu */
  ariaLabel?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}
