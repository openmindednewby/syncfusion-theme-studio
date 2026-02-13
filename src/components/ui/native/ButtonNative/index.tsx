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
  /** Button content */
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800', // primary-600 for WCAG AA contrast
  [ButtonVariant.Secondary]: 'bg-surface-elevated text-text-primary hover:bg-surface-hover',
  [ButtonVariant.Outline]: 'border border-border bg-transparent text-text-primary hover:bg-surface',
  [ButtonVariant.Ghost]: 'bg-transparent text-text-primary hover:bg-surface',
  [ButtonVariant.Danger]: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  [ButtonSize.Sm]: 'h-8 px-3 text-xs',
  [ButtonSize.Md]: 'h-10 px-4 text-sm',
  [ButtonSize.Lg]: 'h-12 px-6 text-base',
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
      children,
      disabled,
      type = 'button',
      ...rest
    },
    ref,
  ): JSX.Element => {
    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-surface',
          'disabled:pointer-events-none disabled:opacity-50',
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && 'w-full',
          className,
        )}
        data-testid={testId}
        disabled={disabled}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

ButtonNative.displayName = 'ButtonNative';

export default memo(ButtonNative);
export { ButtonVariant, ButtonSize };
export type { Props as ButtonNativeProps };
