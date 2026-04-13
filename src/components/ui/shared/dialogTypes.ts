import type { ReactNode } from 'react';

/** Base dialog button configuration */
export interface BaseDialogButton {
  /** Button text */
  text: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Click handler */
  onClick?: () => void;
  /** Test ID for E2E testing */
  testId?: string;
}

/** Base dialog props shared between native and Syncfusion implementations */
export interface BaseDialogProps {
  /** Dialog title */
  title: string;
  /** Dialog content */
  children: ReactNode;
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Called when dialog should close */
  onClose: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Width of the dialog */
  width?: string | number;
}
