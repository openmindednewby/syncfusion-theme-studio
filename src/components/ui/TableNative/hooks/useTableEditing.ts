/**
 * Editing hook for TableNative.
 *
 * Supports three edit modes:
 * - Normal (inline): double-click cell to edit, Enter/Tab saves, Escape cancels
 * - Dialog: modal form with auto-generated fields
 * - Batch: edit multiple cells, save/cancel all at once
 */
import { DEFAULT_KEY_FIELD } from './editingUtils';
import { useEditActions } from './useEditActions';
import { useEditingState } from './useEditingState';

import type {
  TableColumnDef, BatchChanges, EditingCell, UseTableEditingResult,
} from './editingUtils';

interface UseTableEditingProps {
  data: Array<Record<string, unknown>>;
  columns: TableColumnDef[];
  editMode?: 'Normal' | 'Dialog' | 'Batch' | undefined;
  allowAdding?: boolean | undefined;
  allowEditing?: boolean | undefined;
  allowDeleting?: boolean | undefined;
  rowKeyField?: string | undefined;
  onSave?: ((editedRow: Record<string, unknown>, originalRow: Record<string, unknown>) => void) | undefined;
  onDelete?: ((row: Record<string, unknown>) => void) | undefined;
  onAdd?: ((newRow: Record<string, unknown>) => void) | undefined;
  onBatchSave?: ((changes: BatchChanges) => void) | undefined;
}

export function useTableEditing({
  data, columns,
  editMode = 'Normal',
  allowAdding = false, allowEditing = true, allowDeleting = false,
  rowKeyField = DEFAULT_KEY_FIELD,
  onSave, onDelete, onAdd, onBatchSave,
}: UseTableEditingProps): UseTableEditingResult {
  const state = useEditingState({ data, rowKeyField });

  const actions = useEditActions({
    data, columns, editMode, allowAdding, allowEditing, allowDeleting,
    rowKeyField, onSave, onDelete, onAdd, onBatchSave,
    editingRowId: state.editingRowId, editingCell: state.editingCell,
    editValues: state.editValues, dirtyCells: state.dirtyCells,
    dirtyRows: state.dirtyRows, batchAdded: state.batchAdded,
    batchDeleted: state.batchDeleted,
    setEditingRowId: state.setEditingRowId, setEditingCell: state.setEditingCell,
    setEditValues: state.setEditValues, setIsDialogOpen: state.setIsDialogOpen,
    setDirtyCells: state.setDirtyCells, setDirtyRows: state.setDirtyRows,
    setBatchAdded: state.setBatchAdded, setBatchDeleted: state.setBatchDeleted,
  });

  return {
    editingRowId: state.editingRowId, editingCell: state.editingCell,
    editValues: state.editValues, dirtyRows: state.dirtyRows,
    dirtyCells: state.dirtyCells, isEditing: state.isEditing,
    isDialogOpen: state.isDialogOpen, batchAdded: state.batchAdded,
    batchDeleted: state.batchDeleted,
    ...actions, getCellValue: state.getCellValue,
    isCellDirty: state.isCellDirty, isRowDeleted: state.isRowDeleted,
  };
}

export type { UseTableEditingProps, UseTableEditingResult, BatchChanges, EditingCell };
