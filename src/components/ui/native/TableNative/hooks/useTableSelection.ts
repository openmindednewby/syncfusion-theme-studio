/**
 * Selection hook for TableNative.
 *
 * Supports single/multiple row selection, checkbox column with select-all,
 * cell selection, and keyboard modifiers (Ctrl for toggle, Shift for range).
 */
import { useMemo } from 'react';

import { useRowClickHandler } from './useRowClickHandler';
import { useSelectionHandlers } from './useSelectionHandlers';
import { useSelectionState } from './useSelectionState';
import { useSingleSelect, useMultiToggle } from './useSelectModes';

import type { UseTableSelectionProps, UseTableSelectionResult } from './selectionUtils';

export function useTableSelection({
  data, selectionType = 'Single', selectionMode = 'Row',
  checkboxEnabled = false, rowKeyAccessor,
  onRowSelected, onRowDeselected, onSelectionChange,
}: UseTableSelectionProps): UseTableSelectionResult {
  const state = useSelectionState({ data, rowKeyAccessor, onSelectionChange });

  const modeCbs = useMemo(() => ({
    setSelectedRowIds: state.setSelectedRowIds,
    onRowSelected, onRowDeselected, notifyChange: state.notifyChange,
    setLastIndex: (_idx: number) => { /* managed in useRowClickHandler */ },
  }), [state.setSelectedRowIds, onRowSelected, onRowDeselected, state.notifyChange]);

  const handleSingleSelect = useSingleSelect(state.getKey, state.selectedRowIds, modeCbs);
  const handleMultiToggle = useMultiToggle(state.getKey, state.selectedRowIds, modeCbs);

  const handleRowClick = useRowClickHandler({
    selectedRowIds: state.selectedRowIds, setSelectedRowIds: state.setSelectedRowIds,
    getKey: state.getKey, data, selectionType, selectionMode, checkboxEnabled,
    onRowSelected, notifyChange: state.notifyChange, handleSingleSelect, handleMultiToggle,
  });

  const cellHandlers = useSelectionHandlers({
    selectedCells: state.selectedCells, isAllSelected: state.isAllSelected,
    setSelectedRowIds: state.setSelectedRowIds, setSelectedCells: state.setSelectedCells,
    getKey: state.getKey, data, selectionMode, notifyChange: state.notifyChange,
  });

  return {
    selectedRowIds: state.selectedRowIds, selectedCells: state.selectedCells,
    isRowSelected: state.isRowSelected, isCellSelected: state.isCellSelected,
    isAllSelected: state.isAllSelected, handleRowClick, ...cellHandlers,
  };
}
