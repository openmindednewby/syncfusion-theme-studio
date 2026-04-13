/**
 * Radio - Theme-aware Syncfusion RadioButtonComponent wrapper.
 *
 * Provides a styled radio button with label, helper text, error state,
 * and disabled styling. Automatically applies light/dark mode CSS classes
 * from the theme store.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/radio-button/getting-started | Syncfusion RadioButton docs}
 */
import { memo, forwardRef, useId, useMemo, useCallback } from 'react';

import { RadioButtonComponent, type ChangeArgs } from '@syncfusion/ej2-react-buttons';

import type { BaseRadioProps } from '@/components/ui/shared/radioTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseRadioProps {}

const Radio = forwardRef<RadioButtonComponent, Props>(
  (
    {
      label,
      helperText,
      error,
      className,
      testId,
      disabled = false,
      name,
      value,
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
      const errorClass = hasError ? 'sf-radio-error' : '';
      return cn('sf-radio', modeClass, errorClass);
    }, [mode, hasError]);

    const handleChange = useCallback(
      (args: ChangeArgs) => {
        if (isValueDefined(onChange) && isValueDefined(args.value)) onChange(String(args.value));
      },
      [onChange],
    );

    return (
      <div className={cn('flex flex-col gap-1', className)} data-testid={testId}>
        <RadioButtonComponent
          ref={ref}
          aria-describedby={hasHelperOrError ? helperId : undefined}
          change={handleChange}
          checked={checked}
          cssClass={cssClass}
          disabled={disabled}
          label={label}
          name={name ?? id}
          value={value}
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

Radio.displayName = 'Radio';

export default memo(Radio);
export type { Props as RadioProps };
