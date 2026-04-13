/**
 * CommandCell renders Edit/Delete/Save/Cancel action buttons for a table row.
 *
 * Switches between view mode (Edit, Delete) and edit mode (Save, Cancel)
 * based on whether the row is currently being edited.
 */
import { memo, useCallback } from 'react';

import GridButtonNative, { GridButtonVariant } from '@/components/ui/native/GridButtonNative';
import { FM } from '@/localization/utils/helpers';

interface Props {
  rowId: unknown;
  isEditing: boolean;
  allowEditing: boolean;
  allowDeleting: boolean;
  onEdit: (rowId: unknown) => void;
  onDelete: (rowId: unknown) => void;
  onSave: () => void;
  onCancel: () => void;
  /** Extra content rendered after the action buttons (e.g. kebab menu) */
  extra?: React.ReactNode;
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
  extra,
}: Props): JSX.Element => {
  const handleEdit = useCallback(() => {
    onEdit(rowId);
  }, [rowId, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(rowId);
  }, [rowId, onDelete]);

  if (isEditing)
    return (
      <div className="flex items-center justify-end gap-1">
        <GridButtonNative
          testId={`cmd-save-${String(rowId)}`}
          variant={GridButtonVariant.Save}
          onClick={onSave}
        >
          {FM('common.save')}
        </GridButtonNative>
        <GridButtonNative testId={`cmd-cancel-${String(rowId)}`} onClick={onCancel}>
          {FM('common.cancel')}
        </GridButtonNative>
        {extra}
      </div>
    );

  return (
    <div className="flex items-center justify-end gap-1">
      {allowEditing ? (
        <GridButtonNative testId={`cmd-edit-${String(rowId)}`} onClick={handleEdit}>
          {FM('common.edit')}
        </GridButtonNative>
      ) : null}
      {allowDeleting ? (
        <GridButtonNative
          testId={`cmd-delete-${String(rowId)}`}
          variant={GridButtonVariant.Delete}
          onClick={handleDelete}
        >
          {FM('common.delete')}
        </GridButtonNative>
      ) : null}
      {extra}
    </div>
  );
};

export default memo(CommandCell);
