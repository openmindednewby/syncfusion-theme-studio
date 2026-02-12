/**
 * FormNativeInput - Native Input adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with InputNative component.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import type { ChangeEvent } from 'react';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import InputNative from '@/components/ui/native/InputNative';
import type { InputNativeProps } from '@/components/ui/native/InputNative';
import { resolveTranslationError } from '@/localization/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormNativeInputProps<T extends FieldValues>
  extends Omit<InputNativeProps, 'value' | 'onChange' | 'onBlur' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormNativeInput = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...inputProps
}: FormNativeInputProps<T>): JSX.Element => (
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
        ...inputProps,
        ref: field.ref,
        value: String(field.value ?? ''),
        onChange: handleChange,
        onBlur: field.onBlur,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <InputNative {...componentProps} />;
    }}
  />
);
