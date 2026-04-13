import type { ReactNode } from 'react';

/** Base form dialog props shared between native and Syncfusion implementations */
export interface BaseFormDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Dialog title */
  title: string;
  /** Called when form is submitted */
  onSave: () => void;
  /** Called when dialog is cancelled/closed */
  onCancel: () => void;
  /** Form content (fields, layout, etc.) */
  children: ReactNode;
  /** Test ID for E2E testing */
  testId?: string;
  /** Dialog width */
  width?: string | number;
  /** Custom save button text (defaults to localized "Save") */
  saveText?: string;
  /** Custom cancel button text (defaults to localized "Cancel") */
  cancelText?: string;
  /** Whether the save button is disabled */
  saveDisabled?: boolean;
  /** Test ID for save button */
  saveTestId?: string;
  /** Test ID for cancel button */
  cancelTestId?: string;
}
