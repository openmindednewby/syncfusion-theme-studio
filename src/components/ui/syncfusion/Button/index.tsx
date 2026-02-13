/**
 * Button - Theme-aware Syncfusion ButtonComponent wrapper.
 *
 * Provides variant-based styling (primary, secondary, outline, ghost, danger),
 * size options, loading state with spinner, and left/right icon slots.
 * Automatically applies light/dark mode CSS classes from the theme store.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/button/getting-started | Syncfusion Button docs}
 */
import { memo, forwardRef, useMemo } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import type { ButtonModel } from '@syncfusion/ej2-react-buttons';

import { ButtonSize } from '@/components/ui/shared/buttonSize';
import { ButtonVariant } from '@/components/ui/shared/buttonTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';


interface Props extends Omit<ButtonModel, 'cssClass'> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label */
  ariaLabel?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

/** Syncfusion + themed variant classes */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'e-primary sf-btn-primary',
  [ButtonVariant.Secondary]: 'e-secondary sf-btn-secondary',
  [ButtonVariant.Outline]: 'e-outline sf-btn-outline',
  [ButtonVariant.Ghost]: 'e-flat sf-btn-ghost',
  [ButtonVariant.Danger]: 'e-danger sf-btn-danger',
};

/** Size classes */
const SIZE_CLASSES: Record<ButtonSize, string> = {
  [ButtonSize.Sm]: 'e-small',
  [ButtonSize.Md]: '',
  [ButtonSize.Lg]: 'e-large',
};

const Button = forwardRef<ButtonComponent, Props>(
  (
    {
      variant = ButtonVariant.Primary,
      size = ButtonSize.Md,
      className,
      testId,
      ariaLabel,
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const { mode } = useThemeStore();

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      const variantClass = VARIANT_CLASSES[variant];
      const sizeClass = SIZE_CLASSES[size];
      const fullWidthClass = fullWidth ? 'e-block sf-btn-full' : '';
      const loadingClass = loading ? 'sf-btn-loading' : '';

      return cn(
        'sf-button',
        modeClass,
        variantClass,
        sizeClass,
        fullWidthClass,
        loadingClass,
        className,
      );
    }, [variant, size, fullWidth, loading, className, mode]);

    const isDisabled = disabled === true || loading;

    return (
      <ButtonComponent
        ref={ref}
        aria-label={ariaLabel}
        cssClass={cssClass}
        data-testid={testId}
        disabled={isDisabled}
        onClick={onClick}
        {...rest}
      >
        {loading ? <span aria-hidden="true" className="sf-btn-spinner" /> : null}
        {!loading && isValueDefined(leftIcon) ? (
          <span className="sf-btn-icon-left">{leftIcon}</span>
        ) : null}
        <span className="sf-btn-content">{children}</span>
        {!loading && isValueDefined(rightIcon) ? (
          <span className="sf-btn-icon-right">{rightIcon}</span>
        ) : null}
      </ButtonComponent>
    );
  },
);

Button.displayName = 'Button';

export default memo(Button);
export { ButtonVariant, ButtonSize };
export type { Props as ButtonProps };
