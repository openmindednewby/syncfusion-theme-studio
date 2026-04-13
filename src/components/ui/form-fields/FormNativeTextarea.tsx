/**
 * FormNativeTextarea - Native Textarea adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with TextareaNative component.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import type { ChangeEvent } from 'react';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import TextareaNative from '@/components/ui/native/TextareaNative';
import type { TextareaNativeProps } from '@/components/ui/native/TextareaNative';
import { resolveTranslationError } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormNativeTextareaProps<T extends FieldValues>
  extends Omit<TextareaNativeProps, 'value' | 'onChange' | 'onBlur' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormNativeTextarea = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...textareaProps
}: FormNativeTextareaProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleChange(e: ChangeEvent<HTMLTextAreaElement>): void {
        field.onChange(e.target.value);
      }

      // Build props conditionally to satisfy exactOptionalPropertyTypes
      const componentProps = {
        ...textareaProps,
        ref: field.ref,
        value: String(field.value ?? ''),
        onChange: handleChange,
        onBlur: field.onBlur,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <TextareaNative {...componentProps} />;
    }}
  />
);
