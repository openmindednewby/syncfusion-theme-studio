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

/**
 * Type guard to check if a value is a Date object
 */
function isDateValue(value: unknown): value is Date {
  return isValueDefined(value) && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
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

      // Get the date value safely using type guard
      const dateValue = isDateValue(field.value) ? field.value : undefined;

      // Build props object step by step to satisfy exactOptionalPropertyTypes
      const componentProps: Record<string, unknown> = {
        ...datePickerProps,
        ref: field.ref,
        blur: field.onBlur,
        onChange: handleChange,
      };

      // Only add optional props if they have values
      if (isValueDefined(dateValue)) componentProps['value'] = dateValue;
      if (isValueDefined(label)) componentProps['label'] = label;
      if (errorMessage !== '') componentProps['error'] = errorMessage;
      if (!hasError && isValueDefined(helperText)) componentProps['helperText'] = helperText;

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return <DatePicker {...componentProps as DatePickerProps} />;
    }}
  />
);
