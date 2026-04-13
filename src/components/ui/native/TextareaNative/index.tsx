/**
 * TextareaNative - Zero-dependency themed textarea using native HTML.
 *
 * Provides a styled multiline text input with label, helper text, error state,
 * required indicator, and full-width support. Uses .native-textarea CSS class
 * with --component-input-* CSS variables.
 */
import { memo, forwardRef, useId, type TextareaHTMLAttributes } from 'react';

import type { BaseInputProps } from '@/components/ui/shared/inputTypes';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {}

const TextareaNative = forwardRef<HTMLTextAreaElement, Props>(
  (
    { label, helperText, error, className, testId, fullWidth = false, required = false, ...rest },
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
          <label className="native-input-label" htmlFor={id}>
            {label}
            {required ? <span className="ml-0.5 text-error-500">*</span> : null}
          </label>
        )}
        <textarea
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          className={cn('native-textarea', fullWidth && 'w-full')}
          data-error={hasError}
          id={id}
          {...rest}
        />
        {hasHelperOrError ? (
          <span className={hasError ? 'native-input-error' : 'native-input-helper'} id={helperId}>
            {hasError ? error : helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

TextareaNative.displayName = 'TextareaNative';

export default memo(TextareaNative);
export type { Props as TextareaNativeProps };
