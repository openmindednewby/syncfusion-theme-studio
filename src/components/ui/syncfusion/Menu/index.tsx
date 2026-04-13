/**
 * Menu - Theme-aware Syncfusion MenuComponent wrapper.
 *
 * Maps BaseMenuProps items to MenuItemModel array for MenuComponent.
 * Supports nested submenus and light/dark theming.
 *
 * @see {@link https://ej2.syncfusion.com/react/documentation/menu-bar/getting-started | Syncfusion Menu docs}
 */
import { memo, forwardRef, useMemo, useCallback } from 'react';

import {
  MenuComponent,
  type MenuItemModel,
  type MenuEventArgs,
} from '@syncfusion/ej2-react-navigations';

import type { BaseMenuItem, BaseMenuProps } from '@/components/ui/shared/menuTypes';
import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends BaseMenuProps {}

/** Recursively convert BaseMenuItem[] to Syncfusion MenuItemModel[] */
function toMenuItemModels(items: BaseMenuItem[]): MenuItemModel[] {
  return items.map((item) => ({
    text: item.text,
    ...(isValueDefined(item.separator) ? { separator: item.separator } : {}),
    ...(isValueDefined(item.items) ? { items: toMenuItemModels(item.items) } : {}),
  }));
}

/** Build a flat lookup from text → onClick callback */
function buildClickMap(items: BaseMenuItem[], map: Map<string, () => void>): void {
  for (const item of items) {
    if (isValueDefined(item.onClick)) map.set(item.text, item.onClick);
    if (isValueDefined(item.items)) buildClickMap(item.items, map);
  }
}

const Menu = forwardRef<MenuComponent, Props>(
  (
    {
      items,
      ariaLabel = 'Menu',
      testId,
      className,
    },
    ref,
  ): JSX.Element => {
    const mode = useThemeStore((s) => s.mode);

    const cssClass = useMemo(() => {
      const modeClass = mode === Mode.Dark ? 'sf-dark' : 'sf-light';
      return cn('sf-menu', modeClass);
    }, [mode]);

    const menuItems = useMemo(() => toMenuItemModels(items), [items]);

    const clickMap = useMemo(() => {
      const map = new Map<string, () => void>();
      buildClickMap(items, map);
      return map;
    }, [items]);

    const handleSelect = useCallback(
      (args: MenuEventArgs) => {
        const text = args.item.text;
        if (isValueDefined(text)) clickMap.get(text)?.();
      },
      [clickMap],
    );

    return (
      <div aria-label={ariaLabel} className={className} data-testid={testId}>
        <MenuComponent
          ref={ref}
          cssClass={cssClass}
          items={menuItems}
          select={handleSelect}
        />
      </div>
    );
  },
);

Menu.displayName = 'Menu';

export default memo(Menu);
export type { Props as MenuProps };