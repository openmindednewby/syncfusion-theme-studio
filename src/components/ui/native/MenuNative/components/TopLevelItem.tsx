/**
 * TopLevelItem - Renders a top-level menu bar item with optional dropdown.
 * Used internally by MenuNative for the horizontal menu bar.
 */
import { memo, useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react';

import { cn } from '@/utils/cn';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import SubMenuItem from './SubMenuItem';

import type { MenuItem } from '../types';

const TopLevelItem = memo(
  ({ item }: { item: MenuItem }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const itemRef = useRef<HTMLLIElement>(null);
    const hasChildren = isNotEmptyArray(item.items);

    const handleClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleMouseEnter = useCallback(() => {
      setIsOpen(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' && hasChildren) {
          e.preventDefault();
          setIsOpen(true);
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (hasChildren) handleToggle();
          else if (isValueDefined(item.onClick)) item.onClick();
        }
      },
      [hasChildren, handleToggle, item],
    );

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return undefined;

      const handleOutsideClick = (e: MouseEvent): void => {
        if (!isValueDefined(itemRef.current)) return;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- EventTarget needs narrowing to Node for .contains()
        const target = e.target as Node;
        if (!itemRef.current.contains(target)) setIsOpen(false);
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return (): void => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    return (
      <li
        ref={itemRef}
        className="relative"
        role="none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          aria-expanded={hasChildren ? isOpen : undefined}
          aria-haspopup={hasChildren ? 'menu' : undefined}
          className={cn(
            'px-3 py-2 text-sm font-medium transition-colors rounded',
            'text-text-primary',
            'hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-500',
            isOpen && 'bg-surface-hover',
          )}
          data-testid={item.testId}
          role="menuitem"
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          {item.text}
        </button>
        {hasChildren && isOpen ? (
          <ul
            className={cn(
              'absolute left-0 top-full z-50 mt-1 min-w-[160px]',
              'rounded-md border border-border bg-surface shadow-lg',
              'py-1',
            )}
            role="menu" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role -- WAI-ARIA menu pattern
          >
            {item.items?.map((child) => (
              <SubMenuItem key={child.text} item={child} onClose={handleClose} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  },
);

TopLevelItem.displayName = 'TopLevelItem';

export default TopLevelItem;
