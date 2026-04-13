/**
 * FormNativeSpinner - Native SpinnerInput adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with SpinnerInputNative component.
 * Uses onValueChange for numeric value updates.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import SpinnerInputNative from '@/components/ui/native/SpinnerInputNative';
import type { SpinnerInputNativeProps } from '@/components/ui/native/SpinnerInputNative';
import { resolveTranslationError } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormNativeSpinnerProps<T extends FieldValues>
  extends Omit<SpinnerInputNativeProps, 'value' | 'onValueChange' | 'onChange' | 'onBlur' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormNativeSpinner = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...spinnerProps
}: FormNativeSpinnerProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleValueChange(val: number): void {
        field.onChange(val);
      }

      const componentProps = {
        ...spinnerProps,
        ref: field.ref,
        value: Number(field.value ?? 0),
        onValueChange: handleValueChange,
        onBlur: field.onBlur,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <SpinnerInputNative {...componentProps} />;
    }}
  />
);
