/**
 * CommandCell renders Edit/Delete/Save/Cancel action buttons for a table row.
 *
 * Switches between view mode (Edit, Delete) and edit mode (Save, Cancel)
 * based on whether the row is currently being edited.
 */
import { memo, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';
import { cn } from '@/utils/cn';

const BTN_BASE = 'rounded px-2 py-1 text-xs transition-colors';

interface Props {
  rowId: unknown;
  isEditing: boolean;
  allowEditing: boolean;
  allowDeleting: boolean;
  onEdit: (rowId: unknown) => void;
  onDelete: (rowId: unknown) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CommandCell = ({
  rowId,
  isEditing,
  allowEditing,
  allowDeleting,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: Props): JSX.Element => {
  const handleEdit = useCallback(() => {
    onEdit(rowId);
  }, [rowId, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(rowId);
  }, [rowId, onDelete]);

  if (isEditing)
    return (
      <div className="flex gap-1">
        <button
          className={cn(BTN_BASE, 'native-grid-action-btn text-white')}
          data-testid={`cmd-save-${String(rowId)}`}
          style={{ backgroundColor: 'var(--component-datagrid-action-btn)' }}
          type="button"
          onClick={onSave}
        >
          {FM('common.save')}
        </button>
        <button
          className={cn(BTN_BASE, 'border border-border text-text-primary hover:bg-surface-hover')}
          data-testid={`cmd-cancel-${String(rowId)}`}
          type="button"
          onClick={onCancel}
        >
          {FM('common.cancel')}
        </button>
      </div>
    );

  return (
    <div className="flex gap-1">
      {allowEditing ? (
        <button
          className={cn(BTN_BASE, 'hover:bg-primary-500/10')}
          data-testid={`cmd-edit-${String(rowId)}`}
          style={{ color: 'var(--component-datagrid-action-btn)' }}
          type="button"
          onClick={handleEdit}
        >
          {FM('common.edit')}
        </button>
      ) : null}
      {allowDeleting ? (
        <button
          className={cn(BTN_BASE, 'text-red-500 hover:bg-red-500/10')}
          data-testid={`cmd-delete-${String(rowId)}`}
          type="button"
          onClick={handleDelete}
        >
          {FM('common.delete')}
        </button>
      ) : null}
    </div>
  );
};

export default memo(CommandCell);
