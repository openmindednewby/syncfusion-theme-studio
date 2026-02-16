import { memo, useCallback } from 'react';

import { FM } from '@/localization/helpers';
import { NativeTestIds } from '@/shared/testIds.native';
import { cn } from '@/utils/cn';

const SORT_ASC_PATH = 'M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12';
const SORT_DESC_PATH = 'M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25';

interface ColumnMenuSortItemsProps {
  field: string;
  sortField: string | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
  onSort: (field: string) => void;
  onClose: () => void;
}

/**
 * Sort menu items.
 *
 * The underlying onSort is a toggle: new field → ascending, same field → flip.
 * To reach a specific direction we may need to call onSort once or twice.
 * React batches functional setState calls, so two consecutive calls to the
 * same updater will chain correctly within a single event handler.
 */
const ColumnMenuSortItems = memo(
  ({ field, sortField, sortDirection, onSort, onClose }: ColumnMenuSortItemsProps): JSX.Element => {
    const isSameField = sortField === field;
    const isAscActive = isSameField && sortDirection === 'ascending';
    const isDescActive = isSameField && sortDirection === 'descending';

    const handleSortAsc = useCallback(() => {
      if (!isAscActive) 
        onSort(field);
        // If we were on a different field, the first call already set ascending.
        // No second call needed.
      
      onClose();
    }, [field, isAscActive, onSort, onClose]);

    const handleSortDesc = useCallback(() => {
      if (!isDescActive) {
        if (!isSameField) 
          // Different field: first call → ascending, second → descending
          onSort(field);
        
        // Same field and ascending, or after the first call above: toggle to descending
        onSort(field);
      }
      onClose();
    }, [field, isSameField, isDescActive, onSort, onClose]);

    return (
      <>
        <button
          className={cn(
            'native-grid-colmenu-item flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors',
            isAscActive && 'font-semibold',
          )}
          data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_SORT_ASC}
          role="menuitem"
          type="button"
          onClick={handleSortAsc}
        >
          <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d={SORT_ASC_PATH} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {FM('table.sortAscending')}
        </button>
        <button
          className={cn(
            'native-grid-colmenu-item flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors',
            isDescActive && 'font-semibold',
          )}
          data-testid={NativeTestIds.NATIVE_GRID_COLUMN_MENU_SORT_DESC}
          role="menuitem"
          type="button"
          onClick={handleSortDesc}
        >
          <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d={SORT_DESC_PATH} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {FM('table.sortDescending')}
        </button>
      </>
    );
  },
);

ColumnMenuSortItems.displayName = 'ColumnMenuSortItems';

export default ColumnMenuSortItems;
