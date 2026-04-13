/**
 * GridDropdownNative - Kebab menu dropdown for grid row actions.
 *
 * Encapsulates trigger button, popup, and menu items with
 * internal open/close state and click-outside dismissal.
 * Uses portal rendering to escape overflow-hidden table cells.
 */
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import type { GridDropdownItem } from '@/components/ui/shared/gridDropdownTypes';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

interface Props {
  /** Menu items to display in the dropdown */
  items: GridDropdownItem[];
  /** Test ID prefix for E2E testing */
  testId?: string;
  /** Accessible label for the trigger button */
  ariaLabel?: string;
  /** Whether the trigger is disabled */
  disabled?: boolean;
  /** Force the dropdown open (for showcase demos) */
  defaultOpen?: boolean;
}

const KebabIcon = (): JSX.Element => (
  <svg aria-hidden="true" fill="currentColor" height="12" viewBox="0 0 12 12" width="12">
    <circle cx="6" cy="2" r="1.2" />
    <circle cx="6" cy="6" r="1.2" />
    <circle cx="6" cy="10" r="1.2" />
  </svg>
);

const VIEWPORT_PADDING = 8;
const DROPDOWN_OFFSET_Y = 4;
const DROPDOWN_MIN_WIDTH = 140;

interface MenuPosition {
  top: number;
  left: number;
}

const GridDropdownNative = ({
  items,
  testId,
  ariaLabel,
  disabled,
  defaultOpen = false,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null);

  const updatePosition = useCallback((): void => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownWidth = dropdownRef.current?.offsetWidth ?? DROPDOWN_MIN_WIDTH;
    const left = Math.max(VIEWPORT_PADDING, Math.min(rect.left, window.innerWidth - dropdownWidth - VIEWPORT_PADDING));
    const top = rect.bottom + DROPDOWN_OFFSET_Y;
    setMenuPos({ top, left });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setMenuPos(null);
      return;
    }

    updatePosition();

    const handleClickOutside = (e: MouseEvent): void => {
      if (!(e.target instanceof Node)) return;
      const clickedTrigger = isValueDefined(triggerRef.current) && triggerRef.current.contains(e.target);
      const clickedDropdown = isValueDefined(dropdownRef.current) && dropdownRef.current.contains(e.target);
      if (!clickedTrigger && !clickedDropdown) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={ariaLabel}
        className="native-grid-dropdown-trigger"
        data-testid={testId}
        disabled={disabled}
        type="button"
        onClick={toggle}
      >
        <KebabIcon />
      </button>
      {isOpen && menuPos ? createPortal(
        <div
          ref={dropdownRef}
          className="native-grid-dropdown-popup fixed z-[10050]"
          data-testid={isValueDefined(testId) ? `${testId}-popup` : undefined}
          role="menu"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {items.map((item) => (
            <button
              key={item.testId}
              className={`native-grid-dropdown-item${item.danger === true ? ' native-grid-dropdown-item-danger' : ''}`}
              data-testid={item.testId}
              role="menuitem"
              type="button"
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
            >
              {FM(item.labelKey)}
            </button>
          ))}
        </div>,
        document.body,
      ) : null}
    </>
  );
};

GridDropdownNative.displayName = 'GridDropdownNative';

export default memo(GridDropdownNative);
export type { Props as GridDropdownNativeProps };
