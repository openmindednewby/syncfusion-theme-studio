/**
 * FormCheckbox - Native Checkbox adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with native checkbox input.
 * Uses CheckboxNative component for consistent theming.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import type { ChangeEvent } from 'react';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import CheckboxNative from '@/components/ui/native/CheckboxNative';
import type { CheckboxNativeProps } from '@/components/ui/native/CheckboxNative';
import { resolveTranslationError } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxNativeProps, 'checked' | 'onChange' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...checkboxProps
}: FormCheckboxProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        field.onChange(e.target.checked);
      }

      // Build props conditionally to satisfy exactOptionalPropertyTypes
      const componentProps = {
        ...checkboxProps,
        ref: field.ref,
        checked: field.value === true,
        onBlur: field.onBlur,
        onChange: handleChange,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <CheckboxNative {...componentProps} />;
    }}
  />
);
