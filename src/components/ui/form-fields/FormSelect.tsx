/**
 * FormSelect - Syncfusion DropDown adapter for react-hook-form
 *
 * Bridges react-hook-form Controller with Syncfusion DropDownListComponent.
 * Shows errors only when field is touched for better UX.
 *
 * Note: React 19 handles memoization automatically via the React Compiler.
 */
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import Select from '@/components/ui/syncfusion/Select';
import type { SelectProps } from '@/components/ui/syncfusion/Select';
import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'value' | 'onChange' | 'error' | 'blur'> {
  /** Field name from the form schema */
  name: FieldPath<T>;
  /** Control object from useFormWithSchema */
  control: Control<T>;
  /** Optional label override */
  label?: string;
  /** Optional helper text */
  helperText?: string;
}

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...selectProps
}: FormSelectProps<T>): JSX.Element => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const hasError = fieldState.isTouched && isValueDefined(fieldState.error);
      const errorMessage = hasError ? FM(fieldState.error?.message ?? '') : '';

      function handleChange(value: string | number): void {
        field.onChange(value);
      }

      // Build props conditionally to satisfy exactOptionalPropertyTypes
      const componentProps = {
        ...selectProps,
        ref: field.ref,
        blur: field.onBlur,
        value: field.value,
        onChange: handleChange,
        ...(isValueDefined(label) ? { label } : {}),
        ...(errorMessage !== '' ? { error: errorMessage } : {}),
        ...(hasError || !isValueDefined(helperText) ? {} : { helperText }),
      };

      return <Select {...componentProps} />;
    }}
  />
);
