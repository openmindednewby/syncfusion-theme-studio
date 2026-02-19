/**
 * IconButtonNative - Circular icon-only button using native HTML.
 *
 * Provides variant-based styling (primary, secondary, tertiary)
 * with theme CSS variables. No Syncfusion dependency.
 */
import { memo, forwardRef, type ButtonHTMLAttributes } from 'react';

import { ButtonSize } from '@/components/ui/shared/buttonSize';
import { IconButtonVariant } from '@/components/ui/shared/iconButtonTypes';
import { cn } from '@/utils/cn';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** Icon button variant */
  variant?: IconButtonVariant;
  /** Icon button size */
  size?: ButtonSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label (required for icon-only buttons) */
  ariaLabel: string;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Icon element to render */
  icon: React.ReactNode;
}

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
  [IconButtonVariant.Primary]: 'native-icon-btn-primary',
  [IconButtonVariant.Secondary]: 'native-icon-btn-secondary',
  [IconButtonVariant.Tertiary]: 'native-icon-btn-tertiary',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  [ButtonSize.Sm]: 'native-icon-btn-sm',
  [ButtonSize.Md]: 'native-icon-btn-md',
  [ButtonSize.Lg]: 'native-icon-btn-lg',
};

const IconButtonNative = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = IconButtonVariant.Primary,
      size = ButtonSize.Md,
      className,
      testId,
      ariaLabel,
      loading,
      icon,
      disabled,
      type = 'button',
      ...rest
    },
    ref,
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        aria-busy={loading === true ? true : undefined}
        aria-label={ariaLabel}
        className={cn(
          'native-icon-btn',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
        )}
        data-testid={testId}
        disabled={disabled === true || loading === true}
        type={type}
        {...rest}
      >
        {loading === true ? (
          <span aria-hidden="true" className="native-btn-spinner" />
        ) : (
          <span aria-hidden="true" className="native-icon-btn-icon">{icon}</span>
        )}
      </button>
    );
  },
);

IconButtonNative.displayName = 'IconButtonNative';

export default memo(IconButtonNative);
export { IconButtonVariant, ButtonSize };
export type { Props as IconButtonNativeProps };
