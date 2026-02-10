/**
 * DatePickerNative - Zero-dependency themed date picker using native HTML.
 *
 * Renders a native `<input type="date">` with label, helper text, error state,
 * min/max date constraints, required indicator, and full-width support.
 * Relies on the browser's built-in date picker UI.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, forwardRef, useId, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  /** DatePicker label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width input */
  fullWidth?: boolean;
  /** Minimum date (YYYY-MM-DD format) */
  minDate?: string;
  /** Maximum date (YYYY-MM-DD format) */
  maxDate?: string;
  /** Show required indicator (*) - visual only, use HTML required for validation */
  showRequired?: boolean;
}

const DatePickerNative = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      helperText,
      error,
      className,
      testId,
      fullWidth = false,
      showRequired = false,
      minDate,
      maxDate,
      disabled,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    return (
      <div
        className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}
        data-testid={testId}
      >
        {isValueDefined(label) && (
          <label className="text-sm font-medium text-text-primary" htmlFor={id}>
            {label}
            {showRequired ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        <input
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          className={cn(
            'h-10 rounded-md border px-3 py-2 text-sm transition-colors',
            'bg-surface text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            hasError
              ? 'border-error-500 focus:ring-error-500'
              : 'border-border hover:border-primary-300',
            disabled === true && 'cursor-not-allowed opacity-50',
            fullWidth && 'w-full',
          )}
          disabled={disabled}
          id={id}
          max={maxDate}
          min={minDate}
          type="date"
          {...rest}
        />
        {hasHelperOrError ? (
          <span
            className={cn('text-sm', hasError ? 'text-error-500' : 'text-text-secondary')}
            id={helperId}
          >
            {hasError ? error : helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

DatePickerNative.displayName = 'DatePickerNative';

export default memo(DatePickerNative);
export type { Props as DatePickerNativeProps };
