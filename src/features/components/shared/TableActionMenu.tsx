/**
 * Reusable table action menu with View button and overflow dropdown.
 * Matches Figma TABLEACTIONS.png design.
 */
import { useEffect, useRef, useState } from 'react';

import { IconMoreVertical } from '@/components/layout/Sidebar/SidebarIcons';
import { FM } from '@/localization/helpers';

interface ActionItem {
  labelKey: string;
  testId: string;
  onClick?: () => void;
}

interface TableActionMenuProps {
  actions: ActionItem[];
  viewLabelKey?: string;
}

export const TableActionMenu = ({
  actions,
  viewLabelKey = 'gridShowcase.view',
}: TableActionMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent): void => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- EventTarget needs narrowing to Node for .contains()
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target))
        setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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
        className="px-1 py-1 text-text-muted hover:text-text-primary"
        data-testid="alert-action-more"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IconMoreVertical />
      </button>
      {isOpen ? <div
          className="absolute right-0 top-full z-10 mt-1 min-w-[160px] rounded border border-border-default bg-surface-elevated py-1 shadow-md"
          data-testid="alert-action-dropdown"
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
        </div> : null}
    </div>
  );
}
