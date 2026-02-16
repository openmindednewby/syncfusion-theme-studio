import { memo, useRef } from 'react';

import { useClickOutside } from '@/components/ui/native/SelectNative/hooks/useClickOutside';
import { NativeTestIds } from '@/shared/testIds.native';
import { cn } from '@/utils/cn';

import ColumnMenuColumnsItem from './ColumnMenuColumnsItem';
import ColumnMenuSortItems from './ColumnMenuSortItems';

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
}

const ColumnMenuPopup = memo(
  ({
    field,
    sortField,
    sortDirection,
    onSort,
    onClose,
    allColumns,
    hiddenFields,
    onToggleColumn,
  }: ColumnMenuPopupProps): JSX.Element => {
    const popupRef = useRef<HTMLDivElement>(null);
    useClickOutside(popupRef, onClose, true);

    return (
      <div
        ref={popupRef}
        className={cn(
          'native-grid-colmenu-popup absolute right-0 top-full z-50 mt-1',
          'min-w-[180px] rounded-md shadow-lg py-1',
        )}
        data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_POPUP}
        role="menu"
      >
        <ColumnMenuSortItems
          field={field}
          sortDirection={sortDirection}
          sortField={sortField}
          onClose={onClose}
          onSort={onSort}
        />
        <hr className="native-grid-colmenu-separator my-1 border-t" />
        <ColumnMenuColumnsItem
          allColumns={allColumns}
          hiddenFields={hiddenFields}
          onToggleColumn={onToggleColumn}
        />
      </div>
    );
  },
);

ColumnMenuPopup.displayName = 'ColumnMenuPopup';

export default ColumnMenuPopup;
