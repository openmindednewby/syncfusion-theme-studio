/**
 * Toggle - Theme-aware Syncfusion SwitchComponent wrapper.
 *
 * Provides a toggle switch with label and disabled support.
 * Automatically applies light/dark mode CSS classes from the theme store.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/switch/getting-started | Syncfusion Switch docs}
 */
import { memo, forwardRef, useMemo, useCallback } from 'react';

import { SwitchComponent, type ChangeEventArgs } from '@syncfusion/ej2-react-buttons';

import type { BaseToggleProps } from '@/components/ui/shared/toggleTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseToggleProps {}

const Toggle = forwardRef<SwitchComponent, Props>(
  (
    {
      checked,
      onChange,
      label,
      disabled = false,
      testId,
      className,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-toggle', modeClass);
    }, [mode]);

    const handleChange = useCallback(
      (args: ChangeEventArgs) => {
        onChange(args.checked === true);
      },
      [onChange],
    );

    return (
      <div className={cn('flex items-center gap-2', className)} data-testid={testId}>
        <SwitchComponent
          ref={ref}
          aria-label={isValueDefined(label) ? label : undefined}
          change={handleChange}
          checked={checked}
          cssClass={cssClass}
          disabled={disabled}
        />
        {isValueDefined(label) ? (
          <span className={cn('text-sm text-text-primary', disabled && 'opacity-50')}>
            {label}
          </span>
        ) : null}
      </div>
    );
  },
);

Toggle.displayName = 'Toggle';

export default memo(Toggle);
export type { Props as ToggleProps };
