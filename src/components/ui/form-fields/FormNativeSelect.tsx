/**
 * FormNativeSelect - Native Select adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with SelectNative component.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import type { ChangeEvent } from 'react';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import SelectNative from '@/components/ui/SelectNative';
import type { SelectNativeProps } from '@/components/ui/SelectNative';
import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

interface FormNativeSelectProps<T extends FieldValues>
  extends Omit<SelectNativeProps, 'value' | 'onChange' | 'onBlur' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormNativeSelect = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...selectProps
}: FormNativeSelectProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? FM(fieldState.error?.message ?? '') : '';

      function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
        field.onChange(e.target.value);
      }

      // Build props conditionally to satisfy exactOptionalPropertyTypes
      const componentProps = {
        ...selectProps,
        ref: field.ref,
        value: String(field.value ?? ''),
        onChange: handleChange,
        onBlur: field.onBlur,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <SelectNative {...componentProps} />;
    }}
  />
);
