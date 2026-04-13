/**
 * FormNativeRadio - Native Radio adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with RadioNative component.
 * Uses a `radioValue` prop to determine which value this radio represents.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import RadioNative from '@/components/ui/native/RadioNative';
import type { RadioNativeProps } from '@/components/ui/native/RadioNative';
import { resolveTranslationError } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormNativeRadioProps<T extends FieldValues>
  extends Omit<RadioNativeProps, 'checked' | 'onChange' | 'value' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** The value this radio button represents */
  radioValue: string;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormNativeRadio = <T extends FieldValues>({
  name,
  control,
  radioValue,
  label,
  helperText,
  ...radioProps
}: FormNativeRadioProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleChange(): void {
        field.onChange(radioValue);
      }

      const componentProps = {
        ...radioProps,
        ref: field.ref,
        checked: field.value === radioValue,
        onChange: handleChange,
        onBlur: field.onBlur,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <RadioNative {...componentProps} />;
    }}
  />
);
