/**
 * Selection state management: selected rows, cells, and computed flags.
 *
 * Uses refs for callback and data to prevent stale closures in deeply
 * nested hook chains (notifyChange -> modeCbs -> handleMultiToggle).
 */
import { useState, useCallback, useMemo, useRef } from 'react';

import { isValueDefined } from '@/utils/is';

import { defaultRowKey, buildCellKey, getSelectedRows } from './selectionUtils';

import type { RowKeyFn } from './selectionUtils';

interface SelectionStateConfig {
  data: Array<Record<string, unknown>>;
  rowKeyAccessor?: RowKeyFn;
  onSelectionChange?: (rows: Array<Record<string, unknown>>) => void;
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

interface LatestRefs {
  dataRef: React.MutableRefObject<Array<Record<string, unknown>>>;
  getKeyRef: React.MutableRefObject<RowKeyFn>;
  callbackRef: React.MutableRefObject<SelectionStateConfig['onSelectionChange']>;
}

/** Refs that always point to the latest values, preventing stale closures. */
function useLatestRefs(
  data: Array<Record<string, unknown>>,
  getKey: RowKeyFn,
  onSelectionChange: SelectionStateConfig['onSelectionChange'],
): LatestRefs {
  const dataRef = useRef(data);
  dataRef.current = data;
  const callbackRef = useRef(onSelectionChange);
  callbackRef.current = onSelectionChange;
  const getKeyRef = useRef(getKey);
  getKeyRef.current = getKey;
  return { dataRef, getKeyRef, callbackRef };
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

  const { dataRef, getKeyRef, callbackRef } = useLatestRefs(data, getKey, onSelectionChange);
  const notifyChange = useCallback(
    (nextIds: Set<unknown>) => {
      if (isValueDefined(callbackRef.current))
        callbackRef.current(getSelectedRows(dataRef.current, nextIds, getKeyRef.current));
    },
    [callbackRef, dataRef, getKeyRef],
  );

  return {
    selectedRowIds, selectedCells, setSelectedRowIds, setSelectedCells,
    getKey, isRowSelected, isCellSelected, isAllSelected, notifyChange,
  };
}
