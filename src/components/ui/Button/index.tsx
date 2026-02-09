import { memo, forwardRef, useMemo } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import type { ButtonModel } from '@syncfusion/ej2-react-buttons';

import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

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
  primary: 'e-primary sf-btn-primary',
  secondary: 'e-secondary sf-btn-secondary',
  outline: 'e-outline sf-btn-outline',
  ghost: 'e-flat sf-btn-ghost',
  danger: 'e-danger sf-btn-danger',
};

/** Size classes */
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'e-small',
  md: '',
  lg: 'e-large',
};

const Button = forwardRef<ButtonComponent, Props>(
  (
    {
      variant = 'primary',
      size = 'md',
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
      const modeClass = mode === 'dark' ? 'sf-dark' : 'sf-light';
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
export type { Props as ButtonProps, ButtonVariant, ButtonSize };
