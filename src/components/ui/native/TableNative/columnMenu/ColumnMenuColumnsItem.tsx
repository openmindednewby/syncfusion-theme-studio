import { memo, useState, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';
import { NativeTestIds } from '@/shared/testIds.native';
import { cn } from '@/utils/cn';

import type { TableColumn } from '../types';

const COLUMNS_ICON_PATH = 'M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z';
const CHEVRON_RIGHT_PATH = 'M9 5l7 7-7 7';

interface ColumnMenuColumnsItemProps {
  allColumns: TableColumn[];
  hiddenFields: Set<string>;
  onToggleColumn: (field: string) => void;
}

const ColumnMenuColumnsItem = memo(
  ({ allColumns, hiddenFields, onToggleColumn }: ColumnMenuColumnsItemProps): JSX.Element => {
    const [isSubOpen, setIsSubOpen] = useState(false);

    const handleMouseEnter = useCallback(() => setIsSubOpen(true), []);
    const handleMouseLeave = useCallback(() => setIsSubOpen(false), []);

    return (
      <div
        className="relative"
        role="presentation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          aria-expanded={isSubOpen}
          aria-haspopup="menu"
          className="native-grid-colmenu-item flex w-full items-center justify-between gap-2 px-3 py-2 text-sm transition-colors"
          data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_COLUMNS}
          role="menuitem"
          type="button"
        >
          <span className="flex items-center gap-2">
            <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d={COLUMNS_ICON_PATH} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {FM('table.columns')}
          </span>
          <svg aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d={CHEVRON_RIGHT_PATH} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {isSubOpen ? (
          <div
            className={cn(
              'native-grid-colmenu-popup absolute left-full top-0 z-50 min-w-[160px]',
              'rounded-md shadow-lg py-1',
            )}
            role="menu"
            style={{
              backgroundColor: 'var(--component-datagrid-colmenu-bg)',
              border: '1px solid var(--component-datagrid-colmenu-border)',
              color: 'var(--component-datagrid-colmenu-text)',
            }}
          >
            {allColumns.map((col) => {
              const isVisible = !hiddenFields.has(col.field);
              return (
                <button
                  key={col.field}
                  aria-checked={isVisible}
                  className="native-grid-colmenu-item flex w-full items-center gap-2 px-3 py-1.5 text-sm transition-colors"
                  role="menuitemcheckbox"
                  type="button"
                  onClick={() => onToggleColumn(col.field)}
                >
                  <input
                    readOnly
                    aria-hidden="true"
                    checked={isVisible}
                    className="pointer-events-none h-3.5 w-3.5"
                    tabIndex={-1}
                    type="checkbox"
                  />
                  {col.headerText}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  },
);

ColumnMenuColumnsItem.displayName = 'ColumnMenuColumnsItem';

export default ColumnMenuColumnsItem;
