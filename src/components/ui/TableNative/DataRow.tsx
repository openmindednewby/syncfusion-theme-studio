/**
 * DataRow renders a single table row with support for selection,
 * inline editing, dirty cell highlighting, and command buttons.
 */
import { memo, useCallback } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import CommandCell from './CommandCell';
import { EditableCell, ReadOnlyCell, isCellInEditMode } from './DataRowCells';

import type { EditingHandlers, SelectionHandlers, CellEditContext } from './DataRowCells';
import type { TableColumn } from './types';

const EVEN_ROW_INDEX_DIVISOR = 2;
const SELECTED_ROW_BG = 'bg-primary-500/10';
const DELETED_ROW_OPACITY = 'opacity-40 line-through';

interface Props {
  row: Record<string, unknown>;
  rowIndex: number;
  columns: TableColumn[];
  cellPadding: string;
  striped: boolean;
  hoverable: boolean;
  rowKeyField: string;
  showCheckbox: boolean;
  selectionEnabled: boolean;
  selection?: SelectionHandlers | undefined;
  editingEnabled: boolean;
  editing?: EditingHandlers | undefined;
  allowEditing: boolean;
  allowDeleting: boolean;
  showCommandColumn: boolean;
}

/** Determine background class for striped rows */
function getRowBgClass(striped: boolean, isOddRow: boolean): string {
  if (striped && isOddRow) return 'bg-surface-elevated';
  return 'bg-surface';
}

const DataRow = ({
  row, rowIndex, columns, cellPadding,
  striped, hoverable, rowKeyField,
  showCheckbox, selectionEnabled, selection,
  editingEnabled, editing, allowEditing, allowDeleting, showCommandColumn,
}: Props): JSX.Element => {
  const rowId = row[rowKeyField] ?? rowIndex;
  const isSelected = selectionEnabled && selection?.isRowSelected(rowId) === true;
  const isDeleted = editingEnabled && editing?.isRowDeleted(rowId) === true;
  const isEditingRow = editingEnabled && editing?.editingRowId === rowId;
  const isOddRow = rowIndex % EVEN_ROW_INDEX_DIVISOR !== 0;
  const showCommand = showCommandColumn && editingEnabled && isValueDefined(editing);

  const editCtx: CellEditContext = { editingEnabled, editing, rowId, isEditingRow };

  const handleRowClick = useCallback(
    (e: React.MouseEvent) => {
      if (selectionEnabled && isValueDefined(selection))
        selection.handleRowClick(row, rowIndex, e);
    },
    [row, rowIndex, selectionEnabled, selection],
  );

  return (
    <tr
      className={cn(
        'border-b border-border transition-colors',
        getRowBgClass(striped, isOddRow),
        hoverable && 'hover:bg-surface-hover',
        isSelected && SELECTED_ROW_BG,
        isDeleted && DELETED_ROW_OPACITY,
      )}
      data-testid={`table-row-${String(rowId)}`}
      onClick={handleRowClick}
    >
      {showCheckbox ? (
        <td className={cn(cellPadding, 'text-center')}>
          <input
            checked={isSelected}
            className="h-4 w-4"
            data-testid={`row-checkbox-${String(rowId)}`}
            type="checkbox"
            onChange={() => {
              if (isValueDefined(selection))
                selection.handleRowClick(row, rowIndex, { ctrlKey: true, shiftKey: false, metaKey: false });
            }}
          />
        </td>
      ) : null}
      {columns.map((column) => {
        const isEditableCell = isCellInEditMode(editCtx, column.field);
        const isDirty = editingEnabled && editing?.isCellDirty(rowId, column.field) === true;

        if (isEditableCell && isValueDefined(editing))
          return (
            <EditableCell
              key={column.field}
              cellPadding={cellPadding}
              column={column}
              editing={editing}
              isDirty={isDirty}
              row={row}
            />
          );

        return (
          <ReadOnlyCell
            key={column.field}
            cellPadding={cellPadding}
            column={column}
            editing={editing}
            editingEnabled={editingEnabled}
            isDirty={isDirty}
            row={row}
            rowId={rowId}
            selection={selection}
            selectionEnabled={selectionEnabled}
          />
        );
      })}
      {showCommand ? (
        <td className={cn(cellPadding, 'text-right')}>
          <CommandCell
            allowDeleting={allowDeleting}
            allowEditing={allowEditing}
            isEditing={isEditingRow}
            rowId={rowId}
            onCancel={editing.cancelEdit}
            onDelete={editing.deleteRow}
            onEdit={editing.startEdit}
            onSave={editing.saveEdit}
          />
        </td>
      ) : null}
    </tr>
  );
};

export default memo(DataRow);
export type { SelectionHandlers, EditingHandlers, TableColumn as DataRowColumn };
