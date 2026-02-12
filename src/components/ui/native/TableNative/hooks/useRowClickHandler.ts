/**
 * Row click handler with range select support for the selection system.
 */
import { useCallback, useRef } from 'react';

import { isValueDefined } from '@/utils/is';

import type { RowKeyFn, ModifierKeys } from './selectionUtils';

interface RowClickDeps {
  selectedRowIds: Set<unknown>;
  setSelectedRowIds: (ids: Set<unknown>) => void;
  getKey: RowKeyFn;
  data: Array<Record<string, unknown>>;
  selectionType: 'Single' | 'Multiple';
  selectionMode: 'Row' | 'Cell' | 'Both';
  checkboxEnabled: boolean;
  onRowSelected?: ((row: Record<string, unknown>) => void) | undefined;
  notifyChange: (ids: Set<unknown>) => void;
  handleSingleSelect: (row: Record<string, unknown>, rowIndex: number) => void;
  handleMultiToggle: (row: Record<string, unknown>, rowIndex: number) => void;
}

export function useRowClickHandler(
  deps: RowClickDeps,
): (row: Record<string, unknown>, rowIndex: number, event: ModifierKeys) => void {
  const lastClickedIndexRef = useRef<number>(-1);

  return useCallback(
    (row: Record<string, unknown>, rowIndex: number, event: ModifierKeys) => {
      const canSelectRow = deps.selectionMode === 'Row' || deps.selectionMode === 'Both';
      if (!canSelectRow) return;
      if (deps.selectionType === 'Single') { deps.handleSingleSelect(row, rowIndex); return; }
      if (event.shiftKey) {
        handleRange(deps, lastClickedIndexRef.current, rowIndex);
        return;
      }
      const isToggle = event.ctrlKey || event.metaKey;
      if (isToggle || deps.checkboxEnabled) { deps.handleMultiToggle(row, rowIndex); return; }
      const key = deps.getKey(row);
      deps.setSelectedRowIds(new Set<unknown>([key]));
      lastClickedIndexRef.current = rowIndex;
      if (isValueDefined(deps.onRowSelected)) deps.onRowSelected(row);
      deps.notifyChange(new Set<unknown>([key]));
    },
    [deps],
  );
}

/** Handle shift-click range selection */
function handleRange(deps: RowClickDeps, lastIdx: number, rowIndex: number): void {
  const start = Math.min(lastIdx >= 0 ? lastIdx : 0, rowIndex);
  const end = Math.max(lastIdx >= 0 ? lastIdx : 0, rowIndex);
  const nextIds = new Set(deps.selectedRowIds);
  for (let i = start; i <= end; i++) {
    const row = deps.data[i];
    if (isValueDefined(row)) nextIds.add(deps.getKey(row));
  }
  deps.setSelectedRowIds(nextIds);
  deps.notifyChange(nextIds);
}
