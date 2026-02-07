import { memo, useCallback, useEffect, useRef } from 'react';

import {
  DialogComponent,
  type DialogModel,
  type BeforeCloseEventArgs,
} from '@syncfusion/ej2-react-popups';

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

interface Props extends Omit<DialogModel, 'buttons' | 'cssClass' | 'content'> {
  /** Dialog title */
  title: string;
  /** Dialog content */
  children: React.ReactNode;
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
  width?: string | number;
  /** Whether to show close button */
  showCloseIcon?: boolean;
  /** Whether clicking overlay closes dialog */
  closeOnOverlayClick?: boolean;
}

const BUTTON_VARIANTS: Record<string, string> = {
  primary: 'e-primary',
  secondary: 'e-secondary',
  danger: 'e-danger',
};

const VARIANT_CLASSES: Record<DialogVariant, string> = {
  default: 'dialog-default',
  confirm: 'dialog-confirm',
  danger: 'dialog-danger',
};

function buildButtonConfig(
  button: DialogButton,
  defaultVariant: string,
): {
  buttonModel: { content: string; cssClass: string };
  click: () => void;
} {
  const variantClass = BUTTON_VARIANTS[button.variant ?? defaultVariant] ?? 'e-secondary';
  const testClass = isValueDefined(button.testId) ? `test-${button.testId}` : undefined;

  return {
    buttonModel: {
      content: button.text,
      cssClass: cn(variantClass, testClass),
    },
    click: button.onClick ?? (() => {}),
  };
}

const Dialog = ({
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
  ...rest
}: Props): JSX.Element => {
  const dialogRef = useRef<DialogComponent>(null);

  // Build buttons array
  const buttons = [];

  if (isValueDefined(secondaryButton))
    buttons.push(buildButtonConfig(secondaryButton, 'secondary'));

  if (isValueDefined(primaryButton)) {
    const defaultPrimaryVariant = variant === 'danger' ? 'danger' : 'primary';
    buttons.push(buildButtonConfig(primaryButton, defaultPrimaryVariant));
  }

  const handleBeforeClose = useCallback(
    (args: BeforeCloseEventArgs) => {
      // Allow ESC key to close
      const isEscapeKey = args.isInteracted;
      if (isEscapeKey) onClose();
    },
    [onClose],
  );

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) onClose();
  }, [closeOnOverlayClick, onClose]);

  // Sync visibility with isOpen prop
  useEffect(() => {
    if (isValueDefined(dialogRef.current)) 
      if (isOpen) dialogRef.current.show();
      else dialogRef.current.hide();
    
  }, [isOpen]);

  return (
    <DialogComponent
      ref={dialogRef}
      closeOnEscape
      isModal
      allowDragging={false}
      animationSettings={{ effect: 'FadeZoom', duration: 200 }}
      beforeClose={handleBeforeClose}
      buttons={buttons}
      cssClass={cn(VARIANT_CLASSES[variant], className)}
      data-testid={testId}
      header={title}
      overlayClick={handleOverlayClick}
      showCloseIcon={showCloseIcon}
      visible={false}
      width={width}
      {...rest}
    >
      <div className="dialog-content">{children}</div>
    </DialogComponent>
  );
};

Dialog.displayName = 'Dialog';

export default memo(Dialog);
export type { Props as DialogProps, DialogButton, DialogVariant };
