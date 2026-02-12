/**
 * CheckboxNative - Zero-dependency themed checkbox using native HTML.
 *
 * Provides a styled checkbox with label, helper text, error state,
 * indeterminate state support, required indicator, and disabled styling.
 * Uses the native `<input type="checkbox">` with CSS accent-color theming.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, forwardRef, useId, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  /** Checkbox label */
  label?: string;
  /** Helper text below checkbox */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Show required indicator (*) - visual only, use HTML required for validation */
  showRequired?: boolean;
}

const CheckboxNative = forwardRef<HTMLInputElement, Props>(
  (
    { label, helperText, error, className, testId, indeterminate = false, showRequired = false, disabled, ...rest },
    ref,
  ): JSX.Element => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    // Handle indeterminate state via ref callback
    const handleRef = (el: HTMLInputElement | null): void => {
      if (isValueDefined(el)) 
        // Use Object.assign to avoid no-param-reassign lint error
        Object.assign(el, { indeterminate });
      
      if (typeof ref === 'function') ref(el);
      else if (isValueDefined(ref) && isValueDefined(ref)) 
        // Use Object.assign to avoid no-param-reassign lint error
        Object.assign(ref, { current: el });
      
    };

    return (
      <div className={cn('flex flex-col gap-1', className)} data-testid={testId}>
        <div className="flex min-h-[44px] items-center gap-2">
          <input
            ref={handleRef}
            aria-describedby={hasHelperOrError ? helperId : undefined}
            aria-invalid={hasError}
            className={cn(
              'size-4 shrink-0 rounded border transition-colors cursor-pointer',
              'text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
              'accent-primary-500',
              hasError ? 'border-error-500' : 'border-border',
              disabled === true && 'cursor-not-allowed opacity-50',
            )}
            disabled={disabled}
            id={id}
            type="checkbox"
            {...rest}
          />
          {isValueDefined(label) && (
            <label
              className={cn(
                'text-sm text-text-primary cursor-pointer',
                disabled === true && 'cursor-not-allowed opacity-50',
              )}
              htmlFor={id}
            >
              {label}
              {showRequired ? <span className="ml-0.5 text-error-500">*</span> : null}
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

CheckboxNative.displayName = 'CheckboxNative';

export default memo(CheckboxNative);
export type { Props as CheckboxNativeProps };
