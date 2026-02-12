/**
 * Single-select and multi-toggle selection mode hooks.
 */
import { useCallback } from 'react';

import { isValueDefined } from '@/utils/is';

import type { RowKeyFn } from './selectionUtils';

interface SelectCallbacks {
  setSelectedRowIds: (ids: Set<unknown>) => void;
  onRowSelected?: ((row: Record<string, unknown>) => void) | undefined;
  onRowDeselected?: ((row: Record<string, unknown>) => void) | undefined;
  notifyChange: (ids: Set<unknown>) => void;
  setLastIndex: (idx: number) => void;
}

/** Core single-select logic: toggle the clicked row */
export function useSingleSelect(
  getKey: RowKeyFn,
  selectedRowIds: Set<unknown>,
  callbacks: SelectCallbacks,
): (row: Record<string, unknown>, rowIndex: number) => void {
  return useCallback(
    (row: Record<string, unknown>, rowIndex: number) => {
      const key = getKey(row);
      const wasSelected = selectedRowIds.has(key);
      const nextIds = wasSelected ? new Set<unknown>() : new Set<unknown>([key]);
      callbacks.setSelectedRowIds(nextIds);
      const cb = wasSelected ? callbacks.onRowDeselected : callbacks.onRowSelected;
      if (isValueDefined(cb)) cb(row);
      callbacks.notifyChange(nextIds);
      callbacks.setLastIndex(rowIndex);
    },
    [getKey, selectedRowIds, callbacks],
  );
}

/** Core multi-toggle logic: add/remove from selection */
export function useMultiToggle(
  getKey: RowKeyFn,
  selectedRowIds: Set<unknown>,
  callbacks: SelectCallbacks,
): (row: Record<string, unknown>, rowIndex: number) => void {
  return useCallback(
    (row: Record<string, unknown>, rowIndex: number) => {
      const key = getKey(row);
      const nextIds = new Set(selectedRowIds);
      const wasSelected = nextIds.has(key);
      if (wasSelected) nextIds.delete(key);
      else nextIds.add(key);
      callbacks.setSelectedRowIds(nextIds);
      const cb = wasSelected ? callbacks.onRowDeselected : callbacks.onRowSelected;
      if (isValueDefined(cb)) cb(row);
      callbacks.setLastIndex(rowIndex);
      callbacks.notifyChange(nextIds);
    },
    [getKey, selectedRowIds, callbacks],
  );
}
