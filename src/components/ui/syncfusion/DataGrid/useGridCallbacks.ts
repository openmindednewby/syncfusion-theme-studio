/**
 * Hook that creates memoized event callbacks for the DataGrid.
 * Extracts callback creation from the main component to keep it lean.
 */
import { useCallback } from 'react';

import type { RowSelectEventArgs } from '@syncfusion/ej2-react-grids';

import { isValueDefined } from '@/utils/is';

import type { DataGridProps } from './types';

interface GridCallbacks {
  handleRowSelected: (args: RowSelectEventArgs) => void;
  handleRowDeselected: (args: RowSelectEventArgs) => void;
  handleActionBegin: ((args: unknown) => void) | undefined;
  handleActionComplete: ((args: unknown) => void) | undefined;
  handleToolbarClick: ((args: unknown) => void) | undefined;
  handleContextMenuClick: ((args: unknown) => void) | undefined;
  handleRowDrag: ((args: unknown) => void) | undefined;
  handleRowDrop: ((args: unknown) => void) | undefined;
}

/** Wrap an optional callback in a stable useCallback */
function useOptionalCallback(
  callback: ((args: unknown) => void) | undefined,
): ((args: unknown) => void) | undefined {
  const memoized = useCallback((args: unknown) => { callback?.(args); }, [callback]);
  return isValueDefined(callback) ? memoized : undefined;
}

/** Create row selection callbacks from destructured props */
function useRowCallbacks<T>(
  onRowSelected: ((row: T) => void) | undefined,
  onRowDeselected: ((row: T) => void) | undefined,
): Pick<GridCallbacks, 'handleRowSelected' | 'handleRowDeselected'> {
  const handleRowSelected = useCallback(
    (args: RowSelectEventArgs) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const rowData = args.data as T | undefined;
      if (isValueDefined(onRowSelected) && isValueDefined(rowData))
        onRowSelected(rowData);
    },
    [onRowSelected],
  );

  const handleRowDeselected = useCallback(
    (args: RowSelectEventArgs) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const rowData = args.data as T | undefined;
      if (isValueDefined(onRowDeselected) && isValueDefined(rowData))
        onRowDeselected(rowData);
    },
    [onRowDeselected],
  );

  return { handleRowSelected, handleRowDeselected };
}

/**
 * Create memoized callbacks for all DataGrid event handlers.
 */
export function useGridCallbacks<T extends object>(
  props: DataGridProps<T>,
): GridCallbacks {
  const rowCallbacks = useRowCallbacks(props.onRowSelected, props.onRowDeselected);

  return {
    ...rowCallbacks,
    handleActionBegin: useOptionalCallback(props.onActionBegin),
    handleActionComplete: useOptionalCallback(props.onActionComplete),
    handleToolbarClick: useOptionalCallback(props.onToolbarClick),
    handleContextMenuClick: useOptionalCallback(props.onContextMenuClick),
    handleRowDrag: useOptionalCallback(props.onRowDrag),
    handleRowDrop: useOptionalCallback(props.onRowDrop),
  };
}
