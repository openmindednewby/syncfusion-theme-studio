/**
 * Select - Theme-aware Syncfusion DropDownListComponent wrapper.
 *
 * Provides a styled dropdown select with label, helper text, error state,
 * required indicator, and full-width option. Maps `SelectOption[]` to
 * Syncfusion's field configuration for label/value binding.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/drop-down-list/getting-started | Syncfusion DropDownList docs}
 */
import { memo, forwardRef, useId, useMemo } from 'react';

import {
  DropDownListComponent,
  type DropDownListModel,
  type ChangeEventArgs,
} from '@syncfusion/ej2-react-dropdowns';

import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

/** Option item for the dropdown. Index signature required for Syncfusion dataSource compatibility. */
interface SelectOption {
  [key: string]: object | string | number;
  value: string | number;
  label: string;
}

interface Props extends Omit<DropDownListModel, 'cssClass' | 'dataSource' | 'fields'> {
  /** Select options */
  options: SelectOption[];
  /** Select label */
  label?: string;
  /** Helper text below select */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width select */
  fullWidth?: boolean;
  /** Show required indicator (*) */
  required?: boolean;
  /** Change handler */
  onChange?: (value: string | number) => void;
}

const FIELD_MAPPING = { text: 'label', value: 'value' };

const Select = forwardRef<DropDownListComponent, Props>(
  (
    {
      options,
      label,
      helperText,
      error,
      className,
      testId,
      fullWidth = false,
      required = false,
      placeholder = 'Select an option',
      value,
      onChange,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const { mode } = useThemeStore();

    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    const selectCssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      const errorClass = hasError ? 'e-error sf-select-error' : '';
      const fullWidthClassStr = fullWidth ? 'e-block sf-select-full' : '';
      return cn('sf-select', modeClass, errorClass, fullWidthClassStr);
    }, [mode, hasError, fullWidth]);

    const wrapperClass = cn(
      'sf-select-wrapper flex flex-col gap-1',
      fullWidth && 'w-full',
      className,
    );

    const helperClass = cn(
      'sf-select-helper text-sm',
      hasError ? 'text-error-500' : 'text-text-secondary',
    );

    function handleChange(args: ChangeEventArgs): void {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const selectedValue = args.value as string | number | undefined;
      if (isValueDefined(onChange) && isValueDefined(selectedValue)) onChange(selectedValue);
    }

    return (
      <div className={wrapperClass} data-testid={testId}>
        {isValueDefined(label) && (
          <label
            className="sf-select-label text-sm font-medium text-text-primary"
            htmlFor={id}
          >
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        <DropDownListComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          change={handleChange}
          cssClass={selectCssClass}
          dataSource={options}
          fields={FIELD_MAPPING}
          htmlAttributes={{ id }}
          placeholder={placeholder}
          value={value}
          {...rest}
        />
        {hasHelperOrError ? (
          <span className={helperClass} id={helperId}>
            {hasError ? error : helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default memo(Select);
export type { Props as SelectProps, SelectOption };
