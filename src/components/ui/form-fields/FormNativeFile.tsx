/**
 * FormNativeFile - Native FileInput adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with FileInputNative component.
 * FileInputNative is uncontrolled internally; this adapter connects
 * error display and forwards the onChange callback.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import FileInputNative from '@/components/ui/native/FileInputNative';
import type { FileInputNativeProps } from '@/components/ui/native/FileInputNative';
import { resolveTranslationError } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormNativeFileProps<T extends FieldValues>
  extends Omit<FileInputNativeProps, 'onChange' | 'error'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormNativeFile = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...fileProps
}: FormNativeFileProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleChange(files: FileList | null): void {
        field.onChange(files);
      }

      const componentProps = {
        ...fileProps,
        onChange: handleChange,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <FileInputNative {...componentProps} />;
    }}
  />
);
