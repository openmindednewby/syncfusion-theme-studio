/**
 * MenuNative - Zero-dependency themed horizontal menu bar using native HTML.
 *
 * Renders a `role="menubar"` with hierarchical submenus that appear on
 * hover/click. Supports keyboard navigation (arrow keys, Enter, Escape)
 * and theming via Tailwind CSS utility classes.
 * No Syncfusion dependency for minimal bundle size.
 */
import { memo } from 'react';

import { cn } from '@/utils/cn';

import TopLevelItem from './components/TopLevelItem';

import type { MenuNativeProps, MenuItem } from './types';

const MenuNative = ({
  items,
  ariaLabel = 'Menu',
  testId,
  className,
}: MenuNativeProps): JSX.Element => (
  <nav
    aria-label={ariaLabel}
    className={cn('rounded-md border border-border bg-surface', className)}
    data-testid={testId}
  >
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- WAI-ARIA menu pattern requires role="menubar" on ul */}
    <ul className="flex items-center gap-1 px-2 py-1" role="menubar">
      {items.map((item) => (
        <TopLevelItem key={item.text} item={item} />
      ))}
    </ul>
  </nav>
);

MenuNative.displayName = 'MenuNative';

export default memo(MenuNative);
export type { MenuNativeProps, MenuItem };
