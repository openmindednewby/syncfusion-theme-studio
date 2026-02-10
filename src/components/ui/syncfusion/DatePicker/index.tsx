import { memo, forwardRef, useId, useMemo } from 'react';

import {
  DatePickerComponent,
  type DatePickerModel,
  type ChangedEventArgs,
} from '@syncfusion/ej2-react-calendars';

import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<DatePickerModel, 'cssClass' | 'floatLabelType'> {
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
  /** Show required indicator (*) */
  required?: boolean;
  /** Change handler */
  onChange?: (date: Date | undefined) => void;
}

const DatePicker = forwardRef<DatePickerComponent, Props>(
  (
    {
      label,
      helperText,
      error,
      className,
      testId,
      fullWidth = false,
      required = false,
      placeholder = 'Select a date',
      value,
      format = 'MM/dd/yyyy',
      enabled,
      onChange,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const { mode } = useThemeStore();

    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    const datePickerCssClass = useMemo(() => {
      const modeClass = mode === 'dark' ? 'sf-dark' : 'sf-light';
      const errorClass = hasError ? 'e-error sf-datepicker-error' : '';
      const fullWidthClassStr = fullWidth ? 'e-block sf-datepicker-full' : '';
      return cn('sf-datepicker', modeClass, errorClass, fullWidthClassStr);
    }, [mode, hasError, fullWidth]);

    const wrapperClass = cn(
      'sf-datepicker-wrapper flex flex-col gap-1',
      fullWidth && 'w-full',
      className,
    );

    const helperClass = cn(
      'sf-datepicker-helper text-sm',
      hasError ? 'text-error-500' : 'text-text-secondary',
    );

    function handleChange(args: ChangedEventArgs): void {
      if (isValueDefined(onChange)) {
        const selectedDate = args.value ?? undefined;
        onChange(selectedDate);
      }
    }

    return (
      <div className={wrapperClass} data-testid={testId}>
        {isValueDefined(label) && (
          <label
            className="sf-datepicker-label text-sm font-medium text-text-primary"
            htmlFor={id}
          >
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        <DatePickerComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          change={handleChange}
          cssClass={datePickerCssClass}
          enabled={enabled}
          floatLabelType="Never"
          format={format}
          htmlAttributes={{ id }}
          placeholder={placeholder}
          value={value}
          {...rest}
        />
        {hasHelperOrError ? (
          <span className={helperClass} id={helperId}>
            {hasError ? error : helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
export type { Props as DatePickerProps };
