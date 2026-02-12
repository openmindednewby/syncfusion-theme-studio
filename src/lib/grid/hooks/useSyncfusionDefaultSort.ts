/**
 * Apply default sort columns to a Syncfusion DataGrid on mount.
 */
import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

import type { GridComponent } from '@syncfusion/ej2-react-grids';

import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import type { SortColumnConfig } from '../types';

/**
 * Set initial sort columns on a Syncfusion GridComponent.
 *
 * @param gridRef - Ref to the GridComponent instance
 * @param defaultSort - Array of sort column configurations
 */
export function useSyncfusionDefaultSort(
  gridRef: MutableRefObject<GridComponent | undefined>,
  defaultSort?: SortColumnConfig[],
): void {
  useEffect(() => {
    if (!isNotEmptyArray(defaultSort)) return;

    const grid = gridRef.current;
    if (!isValueDefined(grid)) return;

    // eslint-disable-next-line react-compiler/react-compiler -- imperative Syncfusion API
    grid.sortSettings = {
      columns: defaultSort.map((col) => ({
        field: col.field,
        direction: col.direction,
      })),
    };
  }, [gridRef, defaultSort]);
}
