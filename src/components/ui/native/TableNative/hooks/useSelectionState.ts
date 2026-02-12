/**
 * Selection state management: selected rows, cells, and computed flags.
 */
import { useState, useCallback, useMemo } from 'react';

import { isValueDefined } from '@/utils/is';

import { defaultRowKey, buildCellKey, getSelectedRows } from './selectionUtils';

import type { RowKeyFn } from './selectionUtils';

interface SelectionStateConfig {
  data: Array<Record<string, unknown>>;
  rowKeyAccessor?: RowKeyFn | undefined;
  onSelectionChange?: ((rows: Array<Record<string, unknown>>) => void) | undefined;
}

interface SelectionStateResult {
  selectedRowIds: Set<unknown>;
  selectedCells: Set<string>;
  setSelectedRowIds: (ids: Set<unknown>) => void;
  setSelectedCells: (cells: Set<string>) => void;
  getKey: RowKeyFn;
  isRowSelected: (rowId: unknown) => boolean;
  isCellSelected: (rowId: unknown, field: string) => boolean;
  isAllSelected: boolean;
  notifyChange: (ids: Set<unknown>) => void;
}

export function useSelectionState({
  data, rowKeyAccessor, onSelectionChange,
}: SelectionStateConfig): SelectionStateResult {
  const [selectedRowIds, setSelectedRowIds] = useState<Set<unknown>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const getKey = rowKeyAccessor ?? defaultRowKey;

  const isRowSelected = useCallback(
    (rowId: unknown): boolean => selectedRowIds.has(rowId), [selectedRowIds],
  );
  const isCellSelected = useCallback(
    (rowId: unknown, field: string): boolean => selectedCells.has(buildCellKey(rowId, field)),
    [selectedCells],
  );
  const isAllSelected = useMemo(() => {
    if (data.length === 0) return false;
    return data.every((row) => selectedRowIds.has(getKey(row)));
  }, [data, selectedRowIds, getKey]);

  const notifyChange = useCallback(
    (nextIds: Set<unknown>) => {
      if (isValueDefined(onSelectionChange))
        onSelectionChange(getSelectedRows(data, nextIds, getKey));
    },
    [data, getKey, onSelectionChange],
  );

  return {
    selectedRowIds, selectedCells, setSelectedRowIds, setSelectedCells,
    getKey, isRowSelected, isCellSelected, isAllSelected, notifyChange,
  };
}
