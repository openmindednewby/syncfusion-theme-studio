/**
 * ButtonNative - Zero-dependency themed button using native HTML.
 *
 * Provides variant-based styling (primary, secondary, outline, ghost, danger),
 * size options, and full-width support using Tailwind CSS utility classes
 * with theme CSS variables. No Syncfusion dependency for minimal bundle size.
 */
import { memo, forwardRef, type ButtonHTMLAttributes } from 'react';

import { ButtonSize } from '@/components/ui/shared/buttonSize';
import { ButtonVariant } from '@/components/ui/shared/buttonTypes';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
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
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon element rendered before the button text */
  leftIcon?: React.ReactNode;
  /** Icon element rendered after the button text */
  rightIcon?: React.ReactNode;
  /** Button content */
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'native-btn-primary',
  [ButtonVariant.Secondary]: 'native-btn-secondary',
  [ButtonVariant.Outline]: 'native-btn-outline',
  [ButtonVariant.Ghost]: 'native-btn-ghost',
  [ButtonVariant.Danger]: 'native-btn-danger',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  [ButtonSize.Sm]: 'native-btn-sm',
  [ButtonSize.Md]: 'native-btn-md',
  [ButtonSize.Lg]: 'native-btn-lg',
};

const ButtonNative = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = ButtonVariant.Primary,
      size = ButtonSize.Md,
      className,
      testId,
      ariaLabel,
      fullWidth = false,
      loading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      ...rest
    },
    ref,
  ): JSX.Element => {
    const isLoading = loading === true;
    const showLeftIcon = !isLoading && isValueDefined(leftIcon);
    const showRightIcon = !isLoading && isValueDefined(rightIcon);

    return (
      <button
        ref={ref}
        aria-busy={isLoading ? true : undefined}
        aria-label={ariaLabel}
        className={cn(
          'native-btn',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && 'w-full',
          className,
        )}
        data-testid={testId}
        disabled={disabled === true || isLoading}
        type={type}
        {...rest}
      >
        {isLoading ? <span aria-hidden="true" className="native-btn-spinner" /> : null}
        {showLeftIcon ? <span className="native-btn-icon-left">{leftIcon}</span> : null}
        <span className="native-btn-content">{children}</span>
        {showRightIcon ? <span className="native-btn-icon-right">{rightIcon}</span> : null}
      </button>
    );
  },
);

ButtonNative.displayName = 'ButtonNative';

export default memo(ButtonNative);
export { ButtonVariant, ButtonSize };
export type { Props as ButtonNativeProps };
