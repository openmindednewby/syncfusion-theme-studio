/**
 * Chip - Theme-aware Syncfusion ChipListComponent wrapper.
 *
 * Renders a single chip with variant styling, removable support,
 * and light/dark theming.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/chips/getting-started | Syncfusion Chips docs}
 */
import { memo, forwardRef, useMemo, useCallback } from 'react';

import {
  ChipListComponent,
  ChipsDirective,
  ChipDirective,
  type ClickEventArgs,
  type DeleteEventArgs,
} from '@syncfusion/ej2-react-buttons';

import type { BaseChipProps } from '@/components/ui/shared/chipTypes';
import { ChipVariant } from '@/components/ui/shared/chipTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseChipProps {}
export { ChipVariant };

const VARIANT_CSS: Record<ChipVariant, string> = {
  [ChipVariant.Default]: '',
  [ChipVariant.Primary]: 'sf-chip-primary',
  [ChipVariant.Success]: 'sf-chip-success',
  [ChipVariant.Warning]: 'sf-chip-warning',
  [ChipVariant.Danger]: 'sf-chip-danger',
};

const Chip = forwardRef<ChipListComponent, Props>(
  (
    {
      children,
      variant = ChipVariant.Default,
      removable = false,
      onClick,
      onRemove,
      disabled = false,
      testId,
      className,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-chip', modeClass, VARIANT_CSS[variant]);
    }, [mode, variant]);

    const handleClick = useCallback(
      (_args: ClickEventArgs) => {
        if (isValueDefined(onClick) && !disabled) onClick();
      },
      [onClick, disabled],
    );

    const handleDelete = useCallback(
      (_args: DeleteEventArgs) => {
        if (isValueDefined(onRemove) && !disabled) onRemove();
      },
      [onRemove, disabled],
    );

    return (
      <div className={className} data-testid={testId}>
        <ChipListComponent
          ref={ref}
          click={handleClick}
          cssClass={cssClass}
          delete={handleDelete}
          enableDelete={removable}
        >
          <ChipsDirective>
            <ChipDirective text={children} />
          </ChipsDirective>
        </ChipListComponent>
      </div>
    );
  },
);

Chip.displayName = 'Chip';

export default memo(Chip);
export type { Props as ChipProps };
