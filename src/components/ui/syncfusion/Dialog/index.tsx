/**
 * Dialog - Theme-aware Syncfusion DialogComponent wrapper.
 *
 * Provides a modal dialog with configurable variant (default, confirm, danger),
 * primary/secondary action buttons, close icon, overlay click handling,
 * and ESC key support. Visibility is controlled via the `isOpen` prop.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/dialog/getting-started | Syncfusion Dialog docs}
 */
import { memo, useCallback, useEffect, useRef, useMemo } from 'react';

import {
  DialogComponent,
  type DialogModel,
  type BeforeCloseEventArgs,
} from '@syncfusion/ej2-react-popups';

import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

/** Dialog style variants controlling button defaults and appearance */
const enum DialogVariant {
  Default = 'default',
  Confirm = 'confirm',
  Danger = 'danger',
}

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
  [DialogVariant.Default]: 'sf-dialog-default',
  [DialogVariant.Confirm]: 'sf-dialog-confirm',
  [DialogVariant.Danger]: 'sf-dialog-danger',
};

function buildButtonConfig(
  button: DialogButton,
  defaultVariant: string,
): {
  buttonModel: { content: string; cssClass: string };
  click: () => void;
} {
  const variantKey = button.variant ?? defaultVariant;
  const variantClass = BUTTON_VARIANTS[variantKey] ?? 'e-secondary';
  const testClass = isValueDefined(button.testId) ? `test-${button.testId}` : '';

  return {
    buttonModel: {
      content: button.text,
      cssClass: cn(variantClass, testClass),
    },
    click: button.onClick ?? ((): void => {}),
  };
}

const Dialog = ({
  title,
  children,
  isOpen,
  onClose,
  variant = DialogVariant.Default,
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
  const { mode } = useThemeStore();

  // Build buttons array
  const buttons = useMemo(() => {
    const buttonList = [];
    if (isValueDefined(secondaryButton))
      buttonList.push(buildButtonConfig(secondaryButton, 'secondary'));
    if (isValueDefined(primaryButton)) {
      const defaultPrimaryVariant = variant === DialogVariant.Danger ? 'danger' : 'primary';
      buttonList.push(buildButtonConfig(primaryButton, defaultPrimaryVariant));
    }
    return buttonList;
  }, [primaryButton, secondaryButton, variant]);

  const dialogCssClass = useMemo(() => {
    const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
    const variantClass = VARIANT_CLASSES[variant];
    return cn('sf-dialog', modeClass, variantClass, className);
  }, [mode, variant, className]);

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
    const dialog = dialogRef.current;
    if (!isValueDefined(dialog)) return;

    if (isOpen) dialog.show();
    else dialog.hide();
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
      cssClass={dialogCssClass}
      data-testid={testId}
      header={title}
      overlayClick={handleOverlayClick}
      showCloseIcon={showCloseIcon}
      visible={false}
      width={width}
      {...rest}
    >
      <div className="sf-dialog-content">{children}</div>
    </DialogComponent>
  );
};

Dialog.displayName = 'Dialog';

export default memo(Dialog);
export { DialogVariant };
export type { Props as DialogProps, DialogButton };
