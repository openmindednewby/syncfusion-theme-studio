/**
 * Start edit and start cell edit callbacks for inline editing.
 */
import { useCallback } from 'react';

import { isValueDefined } from '@/utils/is';

import { findRowByKey, buildEditValues } from './editingUtils';

import type { EditingCell } from './editingUtils';

interface StartEditDeps {
  data: Array<Record<string, unknown>>;
  columns: Array<{ field: string; headerText: string }>;
  editMode: 'Normal' | 'Dialog' | 'Batch';
  allowEditing: boolean;
  rowKeyField: string;
  setEditingRowId: (v: unknown) => void;
  setEditingCell: (v: EditingCell | null) => void;
  setEditValues: (v: Record<string, unknown>) => void;
  setIsDialogOpen: (v: boolean) => void;
}

interface StartEditActions {
  startEdit: (rowId: unknown) => void;
  startCellEdit: (rowId: unknown, field: string) => void;
}

export function useStartEditCallbacks(deps: StartEditDeps): StartEditActions {
  const startEdit = useCallback((rowId: unknown) => {
    if (!deps.allowEditing) return;
    const row = findRowByKey(deps.data, deps.rowKeyField, rowId);
    if (!isValueDefined(row)) return;
    deps.setEditingRowId(rowId);
    deps.setEditValues(buildEditValues(row, deps.columns));
    if (deps.editMode === 'Dialog') deps.setIsDialogOpen(true);
  }, [deps]);

  const startCellEdit = useCallback((rowId: unknown, field: string) => {
    if (!deps.allowEditing) return;
    const row = findRowByKey(deps.data, deps.rowKeyField, rowId);
    if (!isValueDefined(row)) return;
    deps.setEditingCell({ rowId, field });
    deps.setEditValues({ [field]: row[field] });
  }, [deps]);

  return { startEdit, startCellEdit };
}
