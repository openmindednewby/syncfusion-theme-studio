/**
 * FormNativeToggle - Native Toggle adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with ToggleNative component.
 * ToggleNative has no error/helperText props, so this adapter
 * wraps it with error display via a div + error span.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import ToggleNative from '@/components/ui/native/ToggleNative';
import type { ToggleNativeProps } from '@/components/ui/native/ToggleNative';
import { resolveTranslationError } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

interface FormNativeToggleProps<T extends FieldValues>
  extends Omit<ToggleNativeProps, 'checked' | 'onChange'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
}

export const FormNativeToggle = <T extends FieldValues>({
  name,
  control,
  ...toggleProps
}: FormNativeToggleProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? resolveTranslationError(fieldState.error?.message ?? '') : '';

      function handleChange(checked: boolean): void {
        field.onChange(checked);
      }

      return (
        <div>
          <ToggleNative
            {...toggleProps}
            checked={field.value === true}
            onChange={handleChange}
          />
          {errorMessage !== '' ? (
            <span className="mt-1 block text-xs text-error-500">{errorMessage}</span>
          ) : null}
        </div>
      );
    }}
  />
);
