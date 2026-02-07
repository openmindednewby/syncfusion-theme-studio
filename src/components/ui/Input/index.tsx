import { memo, forwardRef, useId } from 'react';

import { TextBoxComponent, type TextBoxModel } from '@syncfusion/ej2-react-inputs';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<TextBoxModel, 'cssClass' | 'floatLabelType'> {
  /** Input label */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for E2E testing */
  testId?: string;
  /** Full width input */
  fullWidth?: boolean;
}

const Input = forwardRef<TextBoxComponent, Props>(
  (
    {
      label,
      helperText,
      error,
      className,
      testId,
      fullWidth = false,
      enabled,
      placeholder,
      value,
      type = 'text',
      ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

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
        <TextBoxComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          cssClass={cn(hasError && 'e-error', fullWidth && 'e-block')}
          enabled={enabled}
          floatLabelType="Never"
          htmlAttributes={{ id }}
          placeholder={placeholder}
          type={type}
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

Input.displayName = 'Input';

export default memo(Input);
export type { Props as InputProps };
