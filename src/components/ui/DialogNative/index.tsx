import { memo, useEffect, useRef, useCallback, type ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

type DialogVariant = 'default' | 'confirm' | 'danger';

interface DialogButton {
  /** Button text */
  text: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Click handler */
  onClick?: () => void;
  /** Test ID for E2E testing */
  testId?: string;
}

interface Props {
  /** Dialog title */
  title: string;
  /** Dialog content */
  children: ReactNode;
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Called when dialog should close */
  onClose: () => void;
  /** Dialog variant */
  variant?: DialogVariant;
  /** Primary action button */
  primaryButton?: DialogButton;
  /** Secondary action button */
  secondaryButton?: DialogButton;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Width of the dialog */
  width?: string;
  /** Whether to show close button */
  showCloseIcon?: boolean;
  /** Whether clicking overlay closes dialog */
  closeOnOverlayClick?: boolean;
}

const BUTTON_CLASSES: Record<string, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-surface-elevated text-text-primary hover:bg-surface-hover border border-border',
  danger: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
};

const CLOSE_BUTTON_SIZE = 32;

const DialogNative = ({
  title,
  children,
  isOpen,
  onClose,
  variant = 'default',
  primaryButton,
  secondaryButton,
  className,
  testId,
  width = '400px',
  showCloseIcon = true,
  closeOnOverlayClick = true,
}: Props): JSX.Element | null => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync dialog open state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  // Handle ESC key via dialog's cancel event
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event): void => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return (): void => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      // Only close if clicking the backdrop (dialog element itself)
      const isBackdropClick = e.target === dialogRef.current;
      if (closeOnOverlayClick && isBackdropClick) onClose();
    },
    [closeOnOverlayClick, onClose],
  );

  const getButtonVariant = (
    button: DialogButton,
    defaultVariant: string,
  ): 'primary' | 'secondary' | 'danger' => {
    if (isValueDefined(button.variant)) return button.variant;
    if (variant === 'danger' && defaultVariant === 'primary') return 'danger';
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return defaultVariant as 'primary' | 'secondary' | 'danger';
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-labelledby="dialog-title"
      className={cn(
        'fixed inset-0 m-auto p-0 rounded-lg shadow-xl',
        'bg-surface border border-border',
        'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
        className,
      )}
      data-testid={testId}
      style={{ width, maxWidth: '90vw' }}
      onClick={handleOverlayClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary" id="dialog-title">
          {title}
        </h2>
        {showCloseIcon ? <button
            aria-label="Close dialog"
            className={cn(
              'rounded-md p-1 text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
            )}
            style={{ width: CLOSE_BUTTON_SIZE, height: CLOSE_BUTTON_SIZE }}
            type="button"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button> : null}
      </div>

      {/* Content */}
      <div className="p-4 text-text-primary">{children}</div>

      {/* Footer with buttons */}
      {(isValueDefined(primaryButton) || isValueDefined(secondaryButton)) && (
        <div className="flex justify-end gap-2 p-4 border-t border-border">
          {isValueDefined(secondaryButton) && (
            <button
              className={cn(
                'px-4 py-2 rounded-md font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
                BUTTON_CLASSES[getButtonVariant(secondaryButton, 'secondary')],
              )}
              data-testid={secondaryButton.testId}
              type="button"
              onClick={secondaryButton.onClick}
            >
              {secondaryButton.text}
            </button>
          )}
          {isValueDefined(primaryButton) && (
            <button
              className={cn(
                'px-4 py-2 rounded-md font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
                BUTTON_CLASSES[getButtonVariant(primaryButton, 'primary')],
              )}
              data-testid={primaryButton.testId}
              type="button"
              onClick={primaryButton.onClick}
            >
              {primaryButton.text}
            </button>
          )}
        </div>
      )}
    </dialog>
  );
};

DialogNative.displayName = 'DialogNative';

export default memo(DialogNative);
export type { Props as DialogNativeProps, DialogButton as DialogNativeButton, DialogVariant };
