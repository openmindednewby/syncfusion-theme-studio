/**
 * Cell click, select-all, and clear handlers for the selection system.
 */
import { useCallback } from 'react';

import { buildCellKey } from './selectionUtils';

import type { RowKeyFn, ModifierKeys } from './selectionUtils';

interface CellSelectionDeps {
  selectedCells: Set<string>;
  isAllSelected: boolean;
  setSelectedRowIds: (ids: Set<unknown>) => void;
  setSelectedCells: (cells: Set<string>) => void;
  getKey: RowKeyFn;
  data: Array<Record<string, unknown>>;
  selectionMode: 'Row' | 'Cell' | 'Both';
  notifyChange: (ids: Set<unknown>) => void;
}

interface CellHandlers {
  handleCellClick: (row: Record<string, unknown>, field: string, event: ModifierKeys) => void;
  handleSelectAll: () => void;
  clearSelection: () => void;
}

export function useSelectionHandlers(deps: CellSelectionDeps): CellHandlers {
  const handleCellClick = useCallback(
    (row: Record<string, unknown>, field: string, _event: ModifierKeys) => {
      const canSelectCell = deps.selectionMode === 'Cell' || deps.selectionMode === 'Both';
      if (!canSelectCell) return;
      const cellKey = buildCellKey(deps.getKey(row), field);
      const nextCells = new Set(deps.selectedCells);
      if (nextCells.has(cellKey)) nextCells.delete(cellKey);
      else nextCells.add(cellKey);
      deps.setSelectedCells(nextCells);
    },
    [deps],
  );

  const handleSelectAll = useCallback(() => {
    const nextIds = deps.isAllSelected
      ? new Set<unknown>()
      : new Set<unknown>(deps.data.map(deps.getKey));
    deps.setSelectedRowIds(nextIds);
    deps.notifyChange(nextIds);
  }, [deps]);

  const clearSelection = useCallback(() => {
    deps.setSelectedRowIds(new Set());
    deps.setSelectedCells(new Set());
    deps.notifyChange(new Set());
  }, [deps]);

  return { handleCellClick, handleSelectAll, clearSelection };
}
