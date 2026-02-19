/**
 * RadioNative - Zero-dependency themed radio button using native HTML.
 *
 * Provides a styled radio with label, disabled state, and error support.
 * Uses the native `<input type="radio">` with CSS variable theming.
 */
import { memo, forwardRef, useId, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  /** Radio label */
  label?: string;
  /** Helper text below radio */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
}

const RadioNative = forwardRef<HTMLInputElement, Props>(
  ({ label, helperText, error, className, testId, disabled, ...rest }, ref): JSX.Element => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    return (
      <div className={cn('flex flex-col gap-1', className)} data-testid={testId}>
        <div className="flex min-h-[44px] items-center gap-2">
          <input
            ref={ref}
            aria-describedby={hasHelperOrError ? helperId : undefined}
            className={cn(
              'native-radio',
              hasError && 'border-error-500',
            )}
            disabled={disabled}
            id={id}
            type="radio"
            {...rest}
          />
          {isValueDefined(label) && (
            <label
              className={cn(
                'text-sm cursor-pointer',
                disabled === true ? 'cursor-not-allowed' : '',
              )}
              htmlFor={id}
              style={{ color: disabled === true ? 'var(--component-radio-label-disabled)' : 'var(--component-radio-label-color)' }}
            >
              {label}
            </label>
          )}
        </div>
        {hasHelperOrError ? (
          <span
            className={cn('text-sm ml-6', hasError ? 'text-error-500' : 'text-text-secondary')}
            id={helperId}
          >
            {hasError ? error : helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

RadioNative.displayName = 'RadioNative';

export default memo(RadioNative);
export type { Props as RadioNativeProps };
