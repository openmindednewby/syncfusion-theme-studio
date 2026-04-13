/** Actions cell that delegates to inline editing context when available. */
import { useEditingActions } from '@/components/ui/native';
import GridButtonNative, { GridButtonVariant } from '@/components/ui/native/GridButtonNative';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { PlaygroundActionsCell } from '../../SyncfusionGridShowcase/components/PlaygroundActionsCell';

interface Props {
  row: Record<string, unknown>;
  showEdit: boolean;
  showDelete: boolean;
  showKebab: boolean;
  showView?: boolean;
  showExport?: boolean;
  showArchive?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
  onExport: () => void;
  onArchive: () => void;
}

const stopPropagation = (e: React.MouseEvent): void => { e.stopPropagation(); };

/** When editing context exists, Edit/Delete use inline actions. When the row is being edited, show Save/Cancel. */
const InlineAwareActionsCell = ({ row, showEdit, showDelete, showKebab, showView, showExport, showArchive, onEdit, onDelete, onView, onExport, onArchive }: Props): JSX.Element => {
  const editingActions = useEditingActions();
  const rowId = row['id'];
  const isRowEditing = isValueDefined(editingActions) && editingActions.editingRowId === rowId;

  if (isRowEditing)
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- stop grid event handling
      <div className="flex items-center justify-center gap-1" onClick={stopPropagation} onDoubleClick={stopPropagation}>
        <GridButtonNative ariaLabel={FM('common.save')} testId="pg-action-save" variant={GridButtonVariant.Save} onClick={editingActions.saveEdit}>{FM('common.save')}</GridButtonNative>
        <GridButtonNative ariaLabel={FM('common.cancel')} testId="pg-action-cancel" onClick={editingActions.cancelEdit}>{FM('common.cancel')}</GridButtonNative>
      </div>
    );

  const handleEdit = editingActions ? () => editingActions.startEdit(rowId) : onEdit;
  const handleDelete = editingActions ? () => editingActions.deleteRow(rowId) : onDelete;

  return (
    <PlaygroundActionsCell
      showArchive={showArchive ?? false} showDelete={showDelete} showEdit={showEdit}
      showExport={showExport ?? false} showKebab={showKebab} showView={showView ?? false}
      onArchive={onArchive} onDelete={handleDelete}
      onEdit={handleEdit} onExport={onExport} onView={onView}
    />
  );
};

export { InlineAwareActionsCell };
