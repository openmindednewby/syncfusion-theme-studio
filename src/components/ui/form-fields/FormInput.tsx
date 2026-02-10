/**
 * FormInput - Syncfusion TextBox adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with Syncfusion TextBoxComponent.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import Input from '@/components/ui/syncfusion/Input';
import type { InputProps } from '@/components/ui/syncfusion/Input';
import { resolveTranslationError } from '@/localization/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'input' | 'blur' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

interface InputChangeArgs {
  value: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...inputProps
}: FormInputProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleInput(args: InputChangeArgs): void {
        field.onChange(args.value);
      }

      // Build props conditionally to satisfy exactOptionalPropertyTypes
      const componentProps = {
        ...inputProps,
        ref: field.ref,
        blur: field.onBlur,
        input: handleInput,
        value: String(field.value ?? ''),
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <Input {...componentProps} />;
    }}
  />
);
