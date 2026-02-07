import { memo, forwardRef } from 'react';

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import type { ButtonModel } from '@syncfusion/ej2-react-buttons';

import { cn } from '@/utils/cn';


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
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'e-primary',
  secondary: 'e-secondary',
  outline: 'e-outline',
  ghost: 'e-flat',
  danger: 'e-danger',
};

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
      children,
      disabled,
      onClick,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const variantClass = VARIANT_CLASSES[variant];
    const sizeClass = SIZE_CLASSES[size];
    const fullWidthClass = fullWidth ? 'e-block' : undefined;

    const cssClass = cn(variantClass, sizeClass, fullWidthClass, className);

    return (
      <ButtonComponent
        ref={ref}
        aria-label={ariaLabel}
        cssClass={cssClass}
        data-testid={testId}
        disabled={disabled ?? false}
        onClick={onClick}
        {...rest}
      >
        {children}
      </ButtonComponent>
    );
  },
);

Button.displayName = 'Button';

export default memo(Button);
export type { Props as ButtonProps, ButtonVariant, ButtonSize };
