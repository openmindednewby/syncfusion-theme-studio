/**
 * Toolbar - Theme-aware Syncfusion ToolbarComponent wrapper.
 *
 * Maps BaseToolbarProps items to ItemDirective children.
 * Supports buttons with icons/text, separators, and light/dark theming.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/toolbar/getting-started | Syncfusion Toolbar docs}
 */
import { memo, forwardRef, useMemo, useCallback } from 'react';

import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
  type ClickEventArgs,
} from '@syncfusion/ej2-react-navigations';

import type { BaseToolbarProps } from '@/components/ui/shared/toolbarTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseToolbarProps {}

function dataIndexAttr(index: number): Record<string, string> {
  return { 'data-index': String(index) };
}

const Toolbar = forwardRef<ToolbarComponent, Props>(
  (
    {
      items,
      ariaLabel = 'Toolbar',
      testId,
      className,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-toolbar', modeClass);
    }, [mode]);

    const handleClick = useCallback(
      (args: ClickEventArgs) => {
        const index = args.originalEvent.target instanceof HTMLElement
          ? Number(args.originalEvent.target.closest('[data-index]')?.getAttribute('data-index') ?? -1)
          : -1;
        if (index >= 0 && index < items.length) {
          const item = items[index];
          const isClickableButton = isValueDefined(item) && item.type === 'button';
          if (isClickableButton && item.onClick) item.onClick();
        }
      },
      [items],
    );

    return (
      <div aria-label={ariaLabel} className={className} data-testid={testId}>
        <ToolbarComponent
          ref={ref}
          clicked={handleClick}
          cssClass={cssClass}
        >
          <ItemsDirective>
            {items.map((item, index) => {
              if (item.type === 'separator')
                return <ItemDirective key={`sep-${String(index)}`} type="Separator" />;
              return (
                <ItemDirective
                  key={item.text ?? `btn-${String(index)}`}
                  disabled={item.disabled}
                  htmlAttributes={dataIndexAttr(index)}
                  text={item.text}
                  tooltipText={item.tooltip}
                  type="Button"
                />
              );
            })}
          </ItemsDirective>
        </ToolbarComponent>
      </div>
    );
  },
);

Toolbar.displayName = 'Toolbar';

export default memo(Toolbar);
export type { Props as ToolbarProps };
