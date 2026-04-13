import type { ReactNode } from 'react';

/** Toolbar item that is a clickable button */
export interface BaseToolbarButton {
  type: 'button';
  /** Button text (optional if icon provided) */
  text?: string;
  /** Icon element to render before text */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Tooltip text */
  tooltip?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Test ID for E2E testing */
  testId?: string;
}

/** Visual separator between toolbar items */
export interface BaseToolbarSeparator {
  type: 'separator';
}

export type BaseToolbarItem = BaseToolbarButton | BaseToolbarSeparator;

/** Base toolbar props shared between implementations */
export interface BaseToolbarProps {
  /** Array of toolbar items */
  items: BaseToolbarItem[];
  /** Accessible label for the toolbar */
  ariaLabel?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Additional CSS classes */
  className?: string;
}
