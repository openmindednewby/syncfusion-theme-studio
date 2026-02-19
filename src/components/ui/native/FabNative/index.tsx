/**
 * FabNative - Floating Action Button using native HTML.
 *
 * Fixed-position floating button with optional label for extended FAB.
 * Uses theme CSS variables. No Syncfusion dependency.
 */
import { memo, forwardRef, type ButtonHTMLAttributes } from 'react';

import { FabPosition } from '@/components/ui/shared/fabTypes';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Icon element to render */
  icon: React.ReactNode;
  /** Optional label for extended FAB */
  label?: string;
  /** Fixed position on screen */
  position?: FabPosition;
  /** Accessible label (required) */
  ariaLabel: string;
}

const POSITION_CLASSES: Record<FabPosition, string> = {
  [FabPosition.BottomRight]: 'native-fab-bottom-right',
  [FabPosition.BottomLeft]: 'native-fab-bottom-left',
  [FabPosition.TopRight]: 'native-fab-top-right',
  [FabPosition.TopLeft]: 'native-fab-top-left',
};

const FabNative = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      testId,
      icon,
      label,
      position = FabPosition.BottomRight,
      ariaLabel,
      disabled,
      type = 'button',
      ...rest
    },
    ref,
  ): JSX.Element => {
    const isExtended = isValueDefined(label) && label !== '';

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'native-fab',
          POSITION_CLASSES[position],
          isExtended && 'native-fab-extended',
          className,
        )}
        data-testid={testId}
        disabled={disabled === true}
        type={type}
        {...rest}
      >
        <span aria-hidden="true" className="native-fab-icon">{icon}</span>
        {isExtended ? <span className="native-fab-label">{label}</span> : null}
      </button>
    );
  },
);

FabNative.displayName = 'FabNative';

export default memo(FabNative);
export { FabPosition };
export type { Props as FabNativeProps };
