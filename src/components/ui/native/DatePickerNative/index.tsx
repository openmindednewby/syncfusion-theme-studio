/**
 * DatePickerNative - Zero-dependency themed date picker using native HTML.
 *
 * Renders a native `<input type="date">` with label, helper text, error state,
 * min/max date constraints, required indicator, and full-width support.
 * Relies on the browser's built-in date picker UI.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo, forwardRef, useId, type InputHTMLAttributes } from 'react';

import type { BaseDatePickerProps } from '@/components/ui/shared/datePickerTypes';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseDatePickerProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  /** Minimum date (YYYY-MM-DD format) */
  minDate?: string;
  /** Maximum date (YYYY-MM-DD format) */
  maxDate?: string;
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
      required = false,
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
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        <input
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          className={cn(
            'h-10 rounded-md border px-3 py-2 text-sm transition-colors',
            'bg-surface text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-surface',
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
