/**
 * SubMenuItem - Renders a dropdown menu item with optional nested submenu.
 * Used internally by MenuNative for hierarchical menu structures.
 */
import { memo, useState, useCallback, type KeyboardEvent } from 'react';

import { cn } from '@/utils/cn';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import type { MenuItem } from '../types';

interface SubMenuItemProps {
  item: MenuItem;
  onClose: () => void;
}

const SUBMENU_CHEVRON_PATH = 'M9 5l7 7-7 7';

const SubMenuItem = memo(
  ({ item, onClose }: SubMenuItemProps): JSX.Element => {
    const [isSubOpen, setIsSubOpen] = useState(false);
    const hasChildren = isNotEmptyArray(item.items);

    const handleMouseEnter = useCallback(() => {
      if (hasChildren) setIsSubOpen(true);
    }, [hasChildren]);

    const handleMouseLeave = useCallback(() => {
      if (hasChildren) setIsSubOpen(false);
    }, [hasChildren]);

    const handleClick = useCallback(() => {
      if (isValueDefined(item.onClick)) item.onClick();
      if (!hasChildren) onClose();
    }, [item, hasChildren, onClose]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' && hasChildren) {
          e.preventDefault();
          setIsSubOpen(true);
        }
        if (e.key === 'Escape' || e.key === 'ArrowLeft') {
          e.preventDefault();
          setIsSubOpen(false);
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      },
      [hasChildren, handleClick],
    );

    if (item.separator === true)
      return <div className="my-1 h-px bg-border" role="separator" />;

    return (
      <li
        className="relative"
        role="none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          aria-expanded={hasChildren ? isSubOpen : undefined}
          aria-haspopup={hasChildren ? 'menu' : undefined}
          className={cn(
            'flex w-full items-center justify-between gap-4 px-3 py-2 text-sm',
            'text-text-primary transition-colors text-left',
            'hover:bg-surface-hover focus:outline-none focus:bg-surface-hover',
          )}
          data-testid={item.testId}
          role="menuitem"
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <span>{item.text}</span>
          {hasChildren ? (
            <svg
              aria-hidden="true"
              className="h-3 w-3 text-text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d={SUBMENU_CHEVRON_PATH} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </button>
        {hasChildren && isSubOpen ? (
          <ul
            className={cn(
              'absolute left-full top-0 z-50 min-w-[160px]',
              'rounded-md border border-border bg-surface shadow-lg',
              'py-1',
            )}
            role="menu" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role -- WAI-ARIA menu pattern
          >
            {item.items?.map((child) => (
              <SubMenuItem key={child.text} item={child} onClose={onClose} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  },
);

SubMenuItem.displayName = 'SubMenuItem';

export default SubMenuItem;
