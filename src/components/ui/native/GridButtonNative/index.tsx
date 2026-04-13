/**
 * GridButtonNative - Compact action button for grid command cells.
 *
 * Provides variant-based styling (default, save, delete) matching the
 * native-grid-btn CSS classes. Used in table row action columns.
 */
import { memo, forwardRef, type ButtonHTMLAttributes } from 'react';

import { GridButtonVariant } from '@/components/ui/shared/gridButtonTypes';
import { cn } from '@/utils/cn';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /** Grid button variant */
  variant?: GridButtonVariant;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label */
  ariaLabel?: string;
  /** Button content */
  children: React.ReactNode;
}
export { GridButtonVariant };

const VARIANT_CLASSES: Partial<Record<GridButtonVariant, string>> = {
  [GridButtonVariant.Save]: 'native-grid-btn-save',
  [GridButtonVariant.Delete]: 'native-grid-btn-delete',
  [GridButtonVariant.View]: 'native-grid-btn-view',
  [GridButtonVariant.Export]: 'native-grid-btn-export',
  [GridButtonVariant.Archive]: 'native-grid-btn-archive',
};

const GridButtonNative = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = GridButtonVariant.Default,
      className,
      testId,
      ariaLabel,
      children,
      disabled,
      type = 'button',
      ...rest
    },
    ref,
  ): JSX.Element => (
    <button
      ref={ref}
      aria-label={ariaLabel}
      className={cn('native-grid-btn', VARIANT_CLASSES[variant], className)}
      data-testid={testId}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  ),
);

GridButtonNative.displayName = 'GridButtonNative';

export default memo(GridButtonNative);
export type { Props as GridButtonNativeProps };
