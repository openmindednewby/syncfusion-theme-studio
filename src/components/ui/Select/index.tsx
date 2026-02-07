import { memo, forwardRef, useId } from 'react';

import {
  DropDownListComponent,
  type DropDownListModel,
  type ChangeEventArgs,
} from '@syncfusion/ej2-react-dropdowns';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

// Index signature needed for Syncfusion dataSource compatibility
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
      placeholder = 'Select an option',
      value,
      onChange,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    function handleChange(args: ChangeEventArgs): void {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const selectedValue = args.value as string | number | undefined;
      if (isValueDefined(onChange) && isValueDefined(selectedValue)) onChange(selectedValue);
    }

    return (
      <div
        className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}
        data-testid={testId}
      >
        {isValueDefined(label) && (
          <label className="text-sm font-medium text-text-primary" htmlFor={id}>
            {label}
          </label>
        )}
        <DropDownListComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          change={handleChange}
          cssClass={cn(hasError && 'e-error', fullWidth && 'e-block')}
          dataSource={options}
          fields={FIELD_MAPPING}
          htmlAttributes={{ id }}
          placeholder={placeholder}
          value={value}
          {...rest}
        />
        {hasHelperOrError ? <span
            className={cn('text-sm', hasError ? 'text-error-500' : 'text-text-secondary')}
            id={helperId}
          >
            {hasError ? error : helperText}
          </span> : null}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default memo(Select);
export type { Props as SelectProps, SelectOption };
