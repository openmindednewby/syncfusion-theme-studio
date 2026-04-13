/**
 * InputNative - Zero-dependency themed text input using native HTML.
 *
 * Provides a styled text input with label, helper text, error state,
 * required indicator, clearable button, and full-width support.
 * Auto-generates unique IDs for label-input association and aria-describedby linking.
 * Uses .native-input CSS class with --component-input-* CSS variables.
 */
import { memo, forwardRef, useId, useCallback, type InputHTMLAttributes } from 'react';

import { IconClose } from '@/components/icons';
import type { BaseInputProps } from '@/components/ui/shared/inputTypes';
import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** Show a clear button when the input has a value */
  clearable?: boolean;
  /** Callback when the clear button is clicked */
  onClear?: () => void;
}

interface HelperProps {
  hasError: boolean;
  error: BaseInputProps['error'];
  helperText: BaseInputProps['helperText'];
  helperId: string;
}

const HelperText = ({ hasError, error, helperText, helperId }: HelperProps): JSX.Element | null => {
  const hasHelperOrError = isValueDefined(helperText) || hasError;
  if (!hasHelperOrError) return null;
  return (
    <span className={hasError ? 'native-input-error' : 'native-input-helper'} id={helperId}>
      {hasError ? error : helperText}
    </span>
  );
};

const InputNative = forwardRef<HTMLInputElement, Props>(
  (
    {
      label, helperText, error, className, testId,
      fullWidth = false, required = false,
      clearable = false, onClear, value,
      ...rest
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;
    const showClear = clearable && isValueDefined(value) && String(value) !== '';

    const handleClear = useCallback(() => {
      onClear?.();
    }, [onClear]);

    const inputElement = (
      <input
        ref={ref}
        aria-describedby={hasHelperOrError ? helperId : undefined}
        aria-invalid={hasError}
        aria-label={label}
        className={cn('native-input', fullWidth && 'w-full')}
        data-error={hasError}
        id={id}
        value={value}
        {...rest}
      />
    );

    return (
      <div
        className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}
        data-testid={testId}
      >
        {isValueDefined(label) && (
          <label className="native-input-label" htmlFor={id}>
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        {clearable ? (
          <div className={cn('native-input-wrapper', fullWidth && 'w-full')}>
            {inputElement}
            {showClear ? (
              <button
                aria-label={FM('components.inputs.clearAriaLabel')}
                className="native-input-clear"
                type="button"
                onClick={handleClear}
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        ) : inputElement}
        <HelperText error={error} hasError={hasError} helperId={helperId} helperText={helperText} />
      </div>
    );
  },
);

InputNative.displayName = 'InputNative';

export default memo(InputNative);
export type { Props as InputNativeProps };
