/**
 * Input - Theme-aware Syncfusion TextBoxComponent wrapper.
 *
 * Provides a styled text input with label, helper text, error state,
 * required indicator, and full-width option. Automatically generates
 * unique IDs for label-input association and aria-describedby linking.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/textbox/getting-started | Syncfusion TextBox docs}
 */
import { memo, forwardRef, useId, useMemo } from 'react';

import { TextBoxComponent, type TextBoxModel } from '@syncfusion/ej2-react-inputs';

import { useThemeStore } from '@/stores/useThemeStore';
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
  /** Show required indicator (*) */
  required?: boolean;
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
      required = false,
      enabled,
      placeholder,
      value,
      type = 'text',
      ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const { mode } = useThemeStore();

    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    const inputCssClass = useMemo(() => {
      const modeClass = mode === 'dark' ? 'sf-dark' : 'sf-light';
      const errorClass = hasError ? 'e-error sf-input-error' : '';
      const fullWidthClassStr = fullWidth ? 'e-block sf-input-full' : '';
      return cn('sf-input', modeClass, errorClass, fullWidthClassStr);
    }, [mode, hasError, fullWidth]);

    const wrapperClass = cn(
      'sf-input-wrapper flex flex-col gap-1',
      fullWidth && 'w-full',
      className,
    );

    const helperClass = cn(
      'sf-input-helper text-sm',
      hasError ? 'text-error-500' : 'text-text-secondary',
    );

    return (
      <div className={wrapperClass} data-testid={testId}>
        {isValueDefined(label) && (
          <label
            className="sf-input-label text-sm font-medium text-text-primary"
            htmlFor={id}
          >
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        <TextBoxComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          cssClass={inputCssClass}
          enabled={enabled}
          floatLabelType="Never"
          htmlAttributes={{ id }}
          placeholder={placeholder}
          type={type}
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

Input.displayName = 'Input';

export default memo(Input);
export type { Props as InputProps };
