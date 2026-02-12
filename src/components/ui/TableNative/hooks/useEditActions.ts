/**
 * Edit action callbacks for the table editing system.
 *
 * Provides startEdit, saveEdit, cancelEdit, deleteRow, addNewRow,
 * saveBatch, cancelBatch, startCellEdit, and updateEditValue.
 */
import { useCallback } from 'react';

import { isValueDefined } from '@/utils/is';

import { createEmptyRow } from './editingUtils';
import { useBatchActions } from './useBatchActions';
import { useInlineEditActions } from './useInlineEditActions';

import type { TableColumnDef, BatchChanges, EditingCell } from './editingUtils';

interface EditSetters {
  setEditingRowId: (v: unknown) => void;
  setEditingCell: (v: EditingCell | null) => void;
  setEditValues: (v: Record<string, unknown>) => void;
  setIsDialogOpen: (v: boolean) => void;
  setDirtyCells: (fn: (prev: Map<string, unknown>) => Map<string, unknown>) => void;
  setDirtyRows: (fn: (prev: Set<unknown>) => Set<unknown>) => void;
  setBatchAdded: (fn: (prev: Array<Record<string, unknown>>) => Array<Record<string, unknown>>) => void;
  setBatchDeleted: (fn: (prev: Set<unknown>) => Set<unknown>) => void;
}

interface UseEditActionsProps extends EditSetters {
  data: Array<Record<string, unknown>>;
  columns: TableColumnDef[];
  editMode: 'Normal' | 'Dialog' | 'Batch';
  allowAdding: boolean;
  allowEditing: boolean;
  allowDeleting: boolean;
  rowKeyField: string;
  onSave?: ((e: Record<string, unknown>, o: Record<string, unknown>) => void) | undefined;
  onDelete?: ((row: Record<string, unknown>) => void) | undefined;
  onAdd?: ((row: Record<string, unknown>) => void) | undefined;
  onBatchSave?: ((changes: BatchChanges) => void) | undefined;
  editingRowId: unknown;
  editingCell: EditingCell | null;
  editValues: Record<string, unknown>;
  dirtyCells: Map<string, unknown>;
  dirtyRows: Set<unknown>;
  batchAdded: Array<Record<string, unknown>>;
  batchDeleted: Set<unknown>;
}

interface EditActions {
  startEdit: (rowId: unknown) => void;
  startCellEdit: (rowId: unknown, field: string) => void;
  updateEditValue: (field: string, value: unknown) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  deleteRow: (rowId: unknown) => void;
  addNewRow: () => void;
  saveBatch: () => void;
  cancelBatch: () => void;
}

export function useEditActions(props: UseEditActionsProps): EditActions {
  const inline = useInlineEditActions(props);

  const deleteRow = useCallback((rowId: unknown) => {
    if (!props.allowDeleting) return;
    if (props.editMode === 'Batch') { props.setBatchDeleted((prev) => new Set(prev).add(rowId)); return; }
    inline.deleteOriginal(rowId);
  }, [props, inline]);

  const addNewRow = useCallback(() => {
    if (!props.allowAdding) return;
    const newRow = createEmptyRow(props.columns);
    if (props.editMode === 'Batch') { props.setBatchAdded((prev) => [...prev, newRow]); return; }
    if (isValueDefined(props.onAdd)) props.onAdd(newRow);
  }, [props]);

  const batch = useBatchActions(props);

  return {
    startEdit: inline.startEdit, startCellEdit: inline.startCellEdit,
    updateEditValue: inline.updateEditValue, saveEdit: inline.saveEdit,
    cancelEdit: inline.cancelEdit, deleteRow, addNewRow,
    saveBatch: batch.saveBatch, cancelBatch: batch.cancelBatch,
  };
}
