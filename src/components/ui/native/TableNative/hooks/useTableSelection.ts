/**
 * Selection hook for TableNative.
 *
 * Supports single/multiple row selection, checkbox column with select-all,
 * cell selection, and keyboard modifiers (Ctrl for toggle, Shift for range).
 */
import { useMemo } from 'react';

import { isValueDefined } from '@/utils/is';

import { useRowClickHandler } from './useRowClickHandler';
import { useSelectionHandlers } from './useSelectionHandlers';
import { useSelectionState } from './useSelectionState';
import { useSingleSelect, useMultiToggle } from './useSelectModes';

import type { UseTableSelectionProps, UseTableSelectionResult } from './selectionUtils';

/** Build selection state config, omitting undefined optional keys */
function buildStateConfig(
  data: Array<Record<string, unknown>>,
  rowKeyAccessor: UseTableSelectionProps['rowKeyAccessor'],
  onSelectionChange: UseTableSelectionProps['onSelectionChange'],
): Parameters<typeof useSelectionState>[0] {
  return {
    data,
    ...(isValueDefined(rowKeyAccessor) ? { rowKeyAccessor } : {}),
    ...(isValueDefined(onSelectionChange) ? { onSelectionChange } : {}),
  };
}

/** Build mode callbacks, omitting undefined optional keys */
function buildModeCbs(
  setSelectedRowIds: (ids: Set<unknown>) => void,
  notifyChange: (ids: Set<unknown>) => void,
  onRowSelected: UseTableSelectionProps['onRowSelected'],
  onRowDeselected: UseTableSelectionProps['onRowDeselected'],
): Parameters<typeof useSingleSelect>[2] {
  return {
    setSelectedRowIds, notifyChange,
    ...(isValueDefined(onRowSelected) ? { onRowSelected } : {}),
    ...(isValueDefined(onRowDeselected) ? { onRowDeselected } : {}),
    setLastIndex: (_idx: number) => { /* managed in useRowClickHandler */ },
  };
}

export function useTableSelection({
  data, selectionType = 'Single', selectionMode = 'Row',
  checkboxEnabled = false, rowKeyAccessor,
  onRowSelected, onRowDeselected, onSelectionChange,
}: UseTableSelectionProps): UseTableSelectionResult {
  const state = useSelectionState(buildStateConfig(data, rowKeyAccessor, onSelectionChange));

  const modeCbs = useMemo(
    () => buildModeCbs(state.setSelectedRowIds, state.notifyChange, onRowSelected, onRowDeselected),
    [state.setSelectedRowIds, onRowSelected, onRowDeselected, state.notifyChange],
  );

  const handleSingleSelect = useSingleSelect(state.getKey, state.selectedRowIds, modeCbs);
  const handleMultiToggle = useMultiToggle(state.getKey, state.selectedRowIds, modeCbs);
  const handleRowClick = useRowClickHandler({
    selectedRowIds: state.selectedRowIds, setSelectedRowIds: state.setSelectedRowIds,
    getKey: state.getKey, data, selectionType, selectionMode, checkboxEnabled,
    notifyChange: state.notifyChange, handleSingleSelect, handleMultiToggle,
    ...(isValueDefined(onRowSelected) ? { onRowSelected } : {}),
  });
  const cellHandlers = useSelectionHandlers({
    selectedCells: state.selectedCells, isAllSelected: state.isAllSelected,
    setSelectedRowIds: state.setSelectedRowIds, setSelectedCells: state.setSelectedCells,
    getKey: state.getKey, data, selectionMode, notifyChange: state.notifyChange,
  });

  return { ...state, handleRowClick, ...cellHandlers };
}
