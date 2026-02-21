/**
 * Batch save and cancel actions for the table editing system.
 *
 * Handles committing or discarding all dirty cell changes,
 * added rows, and deleted rows in batch edit mode.
 */
import { useCallback } from 'react';

import { isValueDefined } from '@/utils/is';

import { findRowByKey } from './editingUtils';

import type { BatchChanges, EditingCell } from './editingUtils';

interface BatchSetters {
  setDirtyCells: (fn: (prev: Map<string, unknown>) => Map<string, unknown>) => void;
  setDirtyRows: (fn: (prev: Set<unknown>) => Set<unknown>) => void;
  setBatchAdded: (fn: (prev: Array<Record<string, unknown>>) => Array<Record<string, unknown>>) => void;
  setBatchDeleted: (fn: (prev: Set<unknown>) => Set<unknown>) => void;
  setEditingRowId: (v: unknown) => void;
  setEditingCell: (v: EditingCell | null) => void;
  setEditValues: (v: Record<string, unknown>) => void;
}

interface UseBatchActionsProps extends BatchSetters {
  editMode: 'Normal' | 'Dialog' | 'Batch';
  data: Array<Record<string, unknown>>;
  rowKeyField: string;
  onBatchSave?: (changes: BatchChanges) => void;
  dirtyRows: Set<unknown>;
  dirtyCells: Map<string, unknown>;
  batchAdded: Array<Record<string, unknown>>;
  batchDeleted: Set<unknown>;
}

interface BatchActions {
  saveBatch: () => void;
  cancelBatch: () => void;
}

export function useBatchActions(props: UseBatchActionsProps): BatchActions {
  const {
    editMode, data, rowKeyField, onBatchSave,
    dirtyRows, dirtyCells, batchAdded, batchDeleted,
  } = props;

  const saveBatch = useCallback(() => {
    if (editMode !== 'Batch') return;
    const edited = buildEditedRows(data, rowKeyField, dirtyRows, dirtyCells);
    const deleted = buildDeletedRows(data, rowKeyField, batchDeleted);
    const changes: BatchChanges = { added: [...batchAdded], edited, deleted };
    if (isValueDefined(onBatchSave)) onBatchSave(changes);
    clearBatchState(props);
  }, [editMode, data, rowKeyField, dirtyRows, dirtyCells, batchAdded, batchDeleted, onBatchSave, props]);

  const cancelBatch = useCallback(() => {
    if (editMode !== 'Batch') return;
    clearBatchState(props);
  }, [editMode, props]);

  return { saveBatch, cancelBatch };
}

/** Build the edited rows array from dirty cells */
function buildEditedRows(
  data: Array<Record<string, unknown>>,
  rowKeyField: string,
  dirtyRows: Set<unknown>,
  dirtyCells: Map<string, unknown>,
): Array<Record<string, unknown>> {
  const edited: Array<Record<string, unknown>> = [];
  for (const rowId of dirtyRows) {
    const orig = findRowByKey(data, rowKeyField, rowId);
    if (!isValueDefined(orig)) continue;
    const merged: Record<string, unknown> = { ...orig };
    for (const [cellKey, val] of dirtyCells) {
      const [id, field] = cellKey.split(':');
      if (id === String(rowId) && isValueDefined(field)) merged[field] = val;
    }
    edited.push(merged);
  }
  return edited;
}

/** Build the deleted rows array from batch deleted ids */
function buildDeletedRows(
  data: Array<Record<string, unknown>>,
  rowKeyField: string,
  batchDeleted: Set<unknown>,
): Array<Record<string, unknown>> {
  const deleted: Array<Record<string, unknown>> = [];
  for (const rowId of batchDeleted) {
    const row = findRowByKey(data, rowKeyField, rowId);
    if (isValueDefined(row)) deleted.push(row);
  }
  return deleted;
}

function clearBatchState(s: BatchSetters): void {
  s.setDirtyCells(() => new Map());
  s.setDirtyRows(() => new Set());
  s.setBatchAdded(() => []);
  s.setBatchDeleted(() => new Set());
  s.setEditingRowId(null);
  s.setEditingCell(null);
  s.setEditValues({});
}
