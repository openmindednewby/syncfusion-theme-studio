/**
 * Reusable table column filter popup with operator select, value input,
 * and Filter/Clear buttons. Matches Figma TABLEFILTERING.png design.
 */
import { useEffect, useRef, useState } from 'react';

import { IconFilter } from '@/components/layout/Sidebar/SidebarIcons';
import { FM } from '@/localization/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

interface TableColumnFilterProps {
  operators: string[];
  onFilter: (operator: string, value: string) => void;
  onClear: () => void;
}

export const TableColumnFilter = ({
  operators,
  onFilter,
  onClear,
}: TableColumnFilterProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [operator, setOperator] = useState(operators[0] ?? '');
  const [value, setValue] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent): void => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- EventTarget needs narrowing to Node for .contains()
      const target = e.target as Node;
      if (popupRef.current && !popupRef.current.contains(target))
        setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleFilter = (): void => {
    onFilter(operator, value);
    setIsOpen(false);
  };

  const handleClear = (): void => {
    setValue('');
    setOperator(operators[0] ?? '');
    onClear();
    setIsOpen(false);
  };

  return (
    <div ref={popupRef} className="relative inline-block">
      <button
        className="flex items-center gap-1 rounded border border-border-default px-2 py-1 text-xs text-text-secondary hover:text-text-primary"
        data-testid={ComponentTestIds.COLUMN_FILTER_BUTTON}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IconFilter />
        {FM('gridShowcase.filter')}
      </button>
      {isOpen ? <div
          className="absolute left-0 top-full z-10 mt-1 flex min-w-[200px] flex-col gap-2 rounded border border-border-default bg-surface-elevated p-3 shadow-md"
          data-testid={ComponentTestIds.COLUMN_FILTER_POPUP}
        >
          <select
            className="rounded border border-border-default bg-surface-primary px-2 py-1 text-xs text-text-primary"
            data-testid={ComponentTestIds.COLUMN_FILTER_OPERATOR}
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            {operators.map((op) => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
          <input
            className="rounded border border-border-default bg-surface-primary px-2 py-1 text-xs text-text-primary"
            data-testid={ComponentTestIds.COLUMN_FILTER_VALUE}
            placeholder={FM('gridShowcase.enterValue')}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="btn-primary rounded px-3 py-1 text-xs"
              data-testid={ComponentTestIds.COLUMN_FILTER_APPLY}
              type="button"
              onClick={handleFilter}
            >
              {FM('gridShowcase.filter')}
            </button>
            <button
              className="px-3 py-1 text-xs text-text-secondary hover:text-text-primary"
              data-testid={ComponentTestIds.COLUMN_FILTER_CLEAR}
              type="button"
              onClick={handleClear}
            >
              {FM('gridShowcase.clear')}
            </button>
          </div>
        </div> : null}
    </div>
  );
}
