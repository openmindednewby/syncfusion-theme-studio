import { memo, useEffect, useRef, type RefObject } from 'react';

import { createPortal } from 'react-dom';

import type { ColumnType, FilterOperator } from '@/lib/grid/types';
import { NativeTestIds } from '@/shared/testIds.native';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import ColumnMenuColumnsItem from './ColumnMenuColumnsItem';
import ColumnMenuFilterItem from './ColumnMenuFilterItem';
import ColumnMenuSortItems from './ColumnMenuSortItems';
import { useColumnMenuPosition } from './useColumnMenuPosition';

import type { TableColumn } from '../types';

interface ColumnMenuPopupProps {
  field: string;
  sortField: string | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
  onSort: (field: string) => void;
  onClose: () => void;
  allColumns: TableColumn[];
  hiddenFields: Set<string>;
  onToggleColumn: (field: string) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  columnType: ColumnType;
  filterValue: string;
  filterOperator: FilterOperator;
  onFilterChange: (field: string, value: string) => void;
  onFilterOperatorChange: (field: string, operator: FilterOperator) => void;
}

/** Closes menu when clicking outside both popup and trigger */
function useClickOutsideMenu(
  popupRef: RefObject<HTMLDivElement | null>,
  triggerRef: RefObject<HTMLButtonElement | null>,
  onClose: () => void,
): void {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const handler = (e: Event): void => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrowing EventTarget to Node for .contains()
      const target = e.target as Node;
      if (isValueDefined(popupRef.current) && popupRef.current.contains(target)) return;
      if (isValueDefined(triggerRef.current) && triggerRef.current.contains(target)) return;
      onCloseRef.current();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return (): void => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [popupRef, triggerRef]);
}

const ColumnMenuPopup = memo(
  ({
    field, sortField, sortDirection, onSort, onClose,
    allColumns, hiddenFields, onToggleColumn,
    triggerRef, columnType, filterValue, filterOperator, onFilterChange, onFilterOperatorChange,
  }: ColumnMenuPopupProps): JSX.Element => {
    const popupRef = useRef<HTMLDivElement>(null);
    const pos = useColumnMenuPosition(triggerRef, true);
    useClickOutsideMenu(popupRef, triggerRef, onClose);

    return createPortal(
      <div
        ref={popupRef}
        className={cn('native-grid-colmenu-popup fixed z-50', 'min-w-[200px] rounded-md shadow-lg py-1')}
        data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_POPUP}
        role="menu"
        style={{
          top: pos.top, left: pos.left, transform: 'translateX(-100%)',
          backgroundColor: 'var(--component-datagrid-colmenu-bg)',
          border: '1px solid var(--component-datagrid-colmenu-border)',
          color: 'var(--component-datagrid-colmenu-text)',
        }}
      >
        <ColumnMenuSortItems field={field} sortDirection={sortDirection} sortField={sortField} onClose={onClose} onSort={onSort} />
        <hr className="native-grid-colmenu-separator my-1 border-t" style={{ borderColor: 'var(--component-datagrid-colmenu-separator)' }} />
        <ColumnMenuFilterItem columnType={columnType} field={field} filterOperator={filterOperator} filterValue={filterValue} onFilterChange={onFilterChange} onFilterOperatorChange={onFilterOperatorChange} />
        <hr className="native-grid-colmenu-separator my-1 border-t" style={{ borderColor: 'var(--component-datagrid-colmenu-separator)' }} />
        <ColumnMenuColumnsItem allColumns={allColumns} hiddenFields={hiddenFields} onToggleColumn={onToggleColumn} />
      </div>,
      document.body,
    );
  },
);

ColumnMenuPopup.displayName = 'ColumnMenuPopup';

export default ColumnMenuPopup;
