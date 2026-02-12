/**
 * FormNativeDatePicker - Native DatePicker adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with DatePickerNative component.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import type { ChangeEvent } from 'react';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import DatePickerNative from '@/components/ui/native/DatePickerNative';
import type { DatePickerNativeProps } from '@/components/ui/native/DatePickerNative';
import { resolveTranslationError } from '@/localization/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormNativeDatePickerProps<T extends FieldValues>
  extends Omit<DatePickerNativeProps, 'value' | 'onChange' | 'onBlur' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormNativeDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...datePickerProps
}: FormNativeDatePickerProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        field.onChange(e.target.value);
      }

      // Build props conditionally to satisfy exactOptionalPropertyTypes
      const componentProps = {
        ...datePickerProps,
        ref: field.ref,
        value: String(field.value ?? ''),
        onChange: handleChange,
        onBlur: field.onBlur,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <DatePickerNative {...componentProps} />;
    }}
  />
);
