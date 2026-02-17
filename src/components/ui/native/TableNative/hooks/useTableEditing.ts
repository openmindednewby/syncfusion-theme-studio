/**
 * Editing hook for TableNative.
 *
 * Supports three edit modes:
 * - Normal (inline): double-click cell to edit, Enter/Tab saves, Escape cancels
 * - Dialog: modal form with auto-generated fields
 * - Batch: edit multiple cells, save/cancel all at once
 */
import { isValueDefined } from '@/utils/is';

import { DEFAULT_KEY_FIELD } from './editingUtils';
import { useEditActions } from './useEditActions';
import { useEditingState } from './useEditingState';

import type {
  TableColumnDef, BatchChanges, EditingCell, UseTableEditingResult,
} from './editingUtils';

interface UseTableEditingProps {
  data: Array<Record<string, unknown>>;
  columns: TableColumnDef[];
  editMode?: 'Normal' | 'Dialog' | 'Batch';
  allowAdding?: boolean;
  allowEditing?: boolean;
  allowDeleting?: boolean;
  rowKeyField?: string;
  onSave?: (editedRow: Record<string, unknown>, originalRow: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  onAdd?: (newRow: Record<string, unknown>) => void;
  onBatchSave?: (changes: BatchChanges) => void;
}

/** Build optional callback props, omitting undefined keys */
function buildCallbackProps(
  onSave: UseTableEditingProps['onSave'],
  onDelete: UseTableEditingProps['onDelete'],
  onAdd: UseTableEditingProps['onAdd'],
  onBatchSave: UseTableEditingProps['onBatchSave'],
): Record<string, unknown> {
  return {
    ...(isValueDefined(onSave) ? { onSave } : {}),
    ...(isValueDefined(onDelete) ? { onDelete } : {}),
    ...(isValueDefined(onAdd) ? { onAdd } : {}),
    ...(isValueDefined(onBatchSave) ? { onBatchSave } : {}),
  };
}

export function useTableEditing({
  data, columns,
  editMode = 'Normal',
  allowAdding = false, allowEditing = true, allowDeleting = false,
  rowKeyField = DEFAULT_KEY_FIELD,
  onSave, onDelete, onAdd, onBatchSave,
}: UseTableEditingProps): UseTableEditingResult {
  const state = useEditingState({ data, rowKeyField });
  const callbacks = buildCallbackProps(onSave, onDelete, onAdd, onBatchSave);

  const actions = useEditActions({
    data, columns, editMode, allowAdding, allowEditing, allowDeleting,
    rowKeyField, ...callbacks, ...state,
  });

  return { ...state, ...actions };
}

export type { UseTableEditingProps, UseTableEditingResult, BatchChanges, EditingCell };
