/**
 * Inline edit actions: startEdit, startCellEdit, updateEditValue,
 * saveEdit, cancelEdit, and deleteOriginal (non-batch delete).
 */
import { useCallback } from 'react';

import { isValueDefined } from '@/utils/is';

import { buildCellKey, findRowByKey } from './editingUtils';
import { useStartEditCallbacks } from './useStartEditCallbacks';

import type { EditingCell } from './editingUtils';

interface InlineSetters {
  setEditingRowId: (v: unknown) => void;
  setEditingCell: (v: EditingCell | null) => void;
  setEditValues: (v: Record<string, unknown>) => void;
  setIsDialogOpen: (v: boolean) => void;
  setDirtyCells: (fn: (prev: Map<string, unknown>) => Map<string, unknown>) => void;
  setDirtyRows: (fn: (prev: Set<unknown>) => Set<unknown>) => void;
}

interface InlineEditProps extends InlineSetters {
  data: Array<Record<string, unknown>>;
  columns: Array<{ field: string; headerText: string }>;
  editMode: 'Normal' | 'Dialog' | 'Batch';
  allowEditing: boolean;
  rowKeyField: string;
  onSave?: (e: Record<string, unknown>, o: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  editingRowId: unknown;
  editingCell: EditingCell | null;
  editValues: Record<string, unknown>;
}

interface InlineEditActions {
  startEdit: (rowId: unknown) => void;
  startCellEdit: (rowId: unknown, field: string) => void;
  updateEditValue: (field: string, value: unknown) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  deleteOriginal: (rowId: unknown) => void;
}

export function useInlineEditActions(props: InlineEditProps): InlineEditActions {
  const starts = useStartEditCallbacks(props);

  const updateEditValue = useCallback((field: string, value: unknown) => {
    props.setEditValues({ ...props.editValues, [field]: value });
    const cell = props.editingCell;
    if (props.editMode === 'Batch' && isValueDefined(cell)) {
      props.setDirtyCells((prev) => new Map(prev).set(buildCellKey(cell.rowId, field), value));
      props.setDirtyRows((prev) => new Set(prev).add(cell.rowId));
    }
  }, [props]);

  const saveEdit = useCallback(() => {
    if (props.editMode === 'Batch') saveBatchCell(props);
    else saveNormalRow(props);
  }, [props]);

  const cancelEdit = useCallback(() => clearEditState(props), [props]);

  const deleteOriginal = useCallback((rowId: unknown) => {
    const row = findRowByKey(props.data, props.rowKeyField, rowId);
    if (isValueDefined(row) && isValueDefined(props.onDelete)) props.onDelete(row);
  }, [props]);

  return { ...starts, updateEditValue, saveEdit, cancelEdit, deleteOriginal };
}

function clearEditState(s: InlineSetters): void {
  s.setEditingRowId(null);
  s.setEditingCell(null);
  s.setEditValues({});
  s.setIsDialogOpen(false);
}

/** Save a batch cell edit: mark the cell dirty and clear editing state */
function saveBatchCell(props: InlineEditProps): void {
  const cell = props.editingCell;
  if (isValueDefined(cell)) {
    const key = buildCellKey(cell.rowId, cell.field);
    props.setDirtyCells((prev) => new Map(prev).set(key, props.editValues[cell.field]));
    props.setDirtyRows((prev) => new Set(prev).add(cell.rowId));
  }
  props.setEditingCell(null);
  props.setEditingRowId(null);
  props.setEditValues({});
}

/** Save a normal/dialog row edit: call onSave and clear state */
function saveNormalRow(props: InlineEditProps): void {
  if (!isValueDefined(props.editingRowId)) return;
  const orig = findRowByKey(props.data, props.rowKeyField, props.editingRowId);
  if (!isValueDefined(orig)) return;
  if (isValueDefined(props.onSave)) props.onSave({ ...orig, ...props.editValues }, orig);
  clearEditState(props);
}
