/**
 * Reusable table action menu with View button and overflow dropdown.
 * Matches Figma TABLEACTIONS.png design.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { IconMoreVertical } from '@/components/layout/Sidebar/SidebarIcons';
import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';

interface ActionItem {
  labelKey: string;
  testId: string;
  onClick?: () => void;
}

interface TableActionMenuProps {
  actions: ActionItem[];
  viewLabelKey?: string;
}

const DROPDOWN_MIN_WIDTH = 160;
const VIEWPORT_PADDING = 8;
const DROPDOWN_OFFSET_Y = 6;

export const TableActionMenu = ({
  actions,
  viewLabelKey = 'gridShowcase.view',
}: TableActionMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const updateMenuPosition = useCallback((): void => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const width = dropdownRef.current?.offsetWidth ?? DROPDOWN_MIN_WIDTH;
    const left = Math.max(VIEWPORT_PADDING, Math.min(rect.right - width, window.innerWidth - width - VIEWPORT_PADDING));
    const top = Math.min(rect.bottom + DROPDOWN_OFFSET_Y, window.innerHeight - VIEWPORT_PADDING);
    setMenuPos({ top, left, width });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent): void => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- EventTarget needs narrowing to Node for .contains()
      const target = e.target as Node;
      const menuElement = menuRef.current;
      const dropdownElement = dropdownRef.current;
      const clickedInsideTrigger = isValueDefined(menuElement) && menuElement.contains(target);
      const clickedInsideDropdown = isValueDefined(dropdownElement) && dropdownElement.contains(target);
      if (!clickedInsideTrigger && !clickedInsideDropdown) setIsOpen(false);
    };

    const handleViewportMove = (): void => {
      updateMenuPosition();
    };

    updateMenuPosition();
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleViewportMove);
    window.addEventListener('scroll', handleViewportMove, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleViewportMove);
      window.removeEventListener('scroll', handleViewportMove, true);
    };
  }, [isOpen, updateMenuPosition]);

  return (
    <div ref={menuRef} className="relative flex items-center gap-1">
      <button
        className="btn-ghost rounded border border-border-default px-2 py-1 text-xs text-text-secondary hover:text-text-primary"
        data-testid="alert-action-view"
        type="button"
      >
        {FM(viewLabelKey)}
      </button>
      <button
        ref={triggerRef}
        className="px-1 py-1 text-text-muted hover:text-text-primary"
        data-testid="alert-action-more"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IconMoreVertical />
      </button>
      {isOpen && menuPos ? createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[10050] min-w-[160px] rounded border border-border-default bg-surface-elevated py-1 shadow-md"
          data-testid="alert-action-dropdown"
          style={{
            left: `${String(menuPos.left)}px`,
            top: `${String(menuPos.top)}px`,
            width: `${String(menuPos.width)}px`,
            position: 'absolute',
            zIndex: 10050,
          }}
        >
          {actions.map((action) => (
            <button
              key={action.testId}
              className="w-full px-3 py-1.5 text-left text-xs text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              data-testid={action.testId}
              type="button"
              onClick={() => {
                action.onClick?.();
                setIsOpen(false);
              }}
            >
              {FM(action.labelKey)}
            </button>
          ))}
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
