/**
 * Non-blocking filter setup for Syncfusion DataGrid.
 *
 * After mount, waits `idleDelay` ms before configuring filter settings
 * on the grid ref so the initial paint is not blocked.
 */
import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

import type { GridComponent } from '@syncfusion/ej2-react-grids';

import { isValueDefined } from '@/utils/is';

import { FilterType } from '../types';

import type { FilterConfig } from '../types';

const DEFAULT_IDLE_DELAY = 100;

/**
 * Apply filter settings to a Syncfusion GridComponent after an idle delay.
 *
 * @param gridRef - Ref to the GridComponent instance
 * @param filterConfig - Filter configuration from GridConfig
 */
export function useSyncfusionFilters(
  gridRef: MutableRefObject<GridComponent | undefined>,
  filterConfig?: FilterConfig,
): void {
  useEffect(() => {
    if (!isValueDefined(filterConfig) || !filterConfig.enabled) return;

    const delay = filterConfig.idleDelay ?? DEFAULT_IDLE_DELAY;
    const filterType = filterConfig.type ?? FilterType.Menu;

    const timer = window.setTimeout(() => {
      const grid = gridRef.current;
      if (!isValueDefined(grid)) return;

      // eslint-disable-next-line react-compiler/react-compiler -- imperative Syncfusion API
      grid.filterSettings = { type: filterType };
      grid.allowFiltering = true;
      grid.refresh();
    }, delay);

    return () => window.clearTimeout(timer);
  }, [gridRef, filterConfig]);
}
