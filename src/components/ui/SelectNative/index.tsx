import { memo, forwardRef, useId, type SelectHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface SelectOption {
  value: string | number;
  label: string;
}

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  /** Select options */
  options: SelectOption[];
  /** Select label */
  label?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width select */
  fullWidth?: boolean;
}

const SelectNative = forwardRef<HTMLSelectElement, Props>(
  (
    {
      options,
      label,
      helperText,
      error,
      placeholder = 'Select an option',
      className,
      testId,
      fullWidth = false,
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
          </label>
        )}
        <select
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          className={cn(
            'h-10 rounded-md border px-3 py-2 text-sm transition-colors appearance-none',
            'bg-surface text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%236b7280%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E")]',
            'bg-[length:1.25rem] bg-[position:right_0.5rem_center] bg-no-repeat pr-10',
            hasError
              ? 'border-error-500 focus:ring-error-500'
              : 'border-border hover:border-primary-300',
            fullWidth && 'w-full',
          )}
          id={id}
          {...rest}
        >
          {isValueDefined(placeholder) && (
            <option disabled value="">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

SelectNative.displayName = 'SelectNative';

export default memo(SelectNative);
export type { Props as SelectNativeProps, SelectOption as SelectNativeOption };
