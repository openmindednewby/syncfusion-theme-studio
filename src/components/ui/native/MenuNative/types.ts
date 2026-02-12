/** A single menu item, optionally with child items or separator */
export interface MenuItem {
  /** Display text */
  text: string;
  /** Child menu items (creates a submenu) */
  items?: MenuItem[];
  /** Whether this is a separator */
  separator?: boolean;
  /** Click handler (for leaf items) */
  onClick?: () => void;
  /** Test ID for E2E testing */
  testId?: string;
}

export interface MenuNativeProps {
  /** Top-level menu items */
  items: MenuItem[];
  /** Accessible label for the menu */
  ariaLabel?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}
