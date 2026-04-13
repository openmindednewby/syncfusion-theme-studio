/**
 * Checkbox - Theme-aware Syncfusion CheckBoxComponent wrapper.
 *
 * Provides a styled checkbox with label, helper text, error state,
 * indeterminate support, and disabled styling. Automatically applies
 * light/dark mode CSS classes from the theme store.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/check-box/getting-started | Syncfusion CheckBox docs}
 */
import { memo, forwardRef, useId, useMemo, useCallback } from 'react';

import { CheckBoxComponent, type ChangeEventArgs } from '@syncfusion/ej2-react-buttons';

import type { BaseCheckboxProps } from '@/components/ui/shared/checkboxTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseCheckboxProps {}

const Checkbox = forwardRef<CheckBoxComponent, Props>(
  (
    {
      label,
      helperText,
      error,
      className,
      testId,
      indeterminate = false,
      required = false,
      disabled = false,
      checked = false,
      onChange,
    },
    ref,
  ): JSX.Element => {
    const id = useId();
    const mode = useThemeStore((s) => s.mode);

    const hasError = isValueDefined(error);
    const helperId = `${id}-helper`;
    const hasHelperOrError = isValueDefined(helperText) || hasError;

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      const errorClass = hasError ? 'sf-checkbox-error' : '';
      return cn('sf-checkbox', modeClass, errorClass);
    }, [mode, hasError]);

    const handleChange = useCallback(
      (args: ChangeEventArgs) => {
        if (isValueDefined(onChange)) onChange(args.checked === true);
      },
      [onChange],
    );

    const labelText = isValueDefined(label) && required ? `${label} *` : label;

    return (
      <div className={cn('flex flex-col gap-1', className)} data-testid={testId}>
        <CheckBoxComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          aria-invalid={hasError}
          change={handleChange}
          checked={checked}
          cssClass={cssClass}
          disabled={disabled}
          indeterminate={indeterminate}
          label={labelText}
          name={id}
        />
        {hasHelperOrError ? (
          <span
            className={cn('text-sm ml-6', hasError ? 'text-error-500' : 'text-text-secondary')}
            id={helperId}
          >
            {hasError ? error : helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default memo(Checkbox);
export type { Props as CheckboxProps };
