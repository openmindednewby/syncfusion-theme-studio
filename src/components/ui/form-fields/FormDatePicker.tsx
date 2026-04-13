/**
 * FormDatePicker - Syncfusion DatePicker adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with Syncfusion DatePickerComponent.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import DatePicker from '@/components/ui/syncfusion/DatePicker';
import type { DatePickerProps } from '@/components/ui/syncfusion/DatePicker';
import { resolveTranslationError } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormDatePickerProps<T extends FieldValues>
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'error' | 'blur'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...datePickerProps
}: FormDatePickerProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleChange(date: Date | undefined): void {
        field.onChange(date);
      }

      const dateValue = isDateValue(field.value) ? field.value : undefined;

      return (
        <DatePicker
          {...datePickerProps}
          ref={field.ref}
          blur={field.onBlur}
          onChange={handleChange}
          {...(isValueDefined(dateValue) ? { value: dateValue } : {})}
          {...(isValueDefined(label) ? { label } : {})}
          {...(errorMessage !== '' ? { error: errorMessage } : {})}
          {...(!hasError && isValueDefined(helperText) ? { helperText } : {})}
        />
      );
    }}
  />
);

/**
 * Type guard to check if a value is a Date object
 */
function isDateValue(value: unknown): value is Date {
  return isValueDefined(value) && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}
