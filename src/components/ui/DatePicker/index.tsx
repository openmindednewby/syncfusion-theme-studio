import { memo, forwardRef, useId } from 'react';

import {
  DatePickerComponent,
  type DatePickerModel,
  type ChangedEventArgs,
} from '@syncfusion/ej2-react-calendars';

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
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    function handleChange(args: ChangedEventArgs): void {
      if (isValueDefined(onChange)) {
        const selectedDate = args.value ?? undefined;
        onChange(selectedDate);
      }
    }

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
        <DatePickerComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          change={handleChange}
          cssClass={cn(hasError && 'e-error', fullWidth && 'e-block')}
          enabled={enabled}
          floatLabelType="Never"
          format={format}
          htmlAttributes={{ id }}
          placeholder={placeholder}
          value={value}
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

DatePicker.displayName = 'DatePicker';

export default memo(DatePicker);
export type { Props as DatePickerProps };
