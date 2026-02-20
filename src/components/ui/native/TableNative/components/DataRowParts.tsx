/**
 * Sub-components for DataRow: CheckboxCell, CommandCellWrapper, and DataCell.
 *
 * Extracted to reduce DataRow file size and cyclomatic complexity.
 */
import { memo } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import CommandCell from './CommandCell';
import { EditableCell, ReadOnlyCell, isCellInEditMode } from './DataRowCells';

import type { EditingHandlers, SelectionHandlers, CellEditContext } from './DataRowCells';
import type { TableColumn } from '../types';

const CELL_PADDING_STYLE: React.CSSProperties = { padding: 'var(--component-datagrid-cell-padding)' };
const CHECKBOX_CELL_STYLE: React.CSSProperties = { padding: 0, width: '50px', textAlign: 'center', verticalAlign: 'middle' };

// -- CheckboxCell --

interface CheckboxCellProps {
  rowId: unknown;
  isSelected: boolean;
  row: Record<string, unknown>;
  rowIndex: number;
  selection: SelectionHandlers | undefined;
}

/** Render the selection checkbox cell */
const CheckboxCell = memo(({
  rowId, isSelected, row, rowIndex, selection,
}: CheckboxCellProps): JSX.Element => (
  <td style={CHECKBOX_CELL_STYLE}>
    <input
      checked={isSelected}
      className="native-grid-checkbox"
      data-testid={`row-checkbox-${String(rowId)}`}
      type="checkbox"
      onChange={() => {
        if (isValueDefined(selection))
          selection.handleRowClick(row, rowIndex, { ctrlKey: true, shiftKey: false, metaKey: false });
      }}
    />
  </td>
));

CheckboxCell.displayName = 'CheckboxCell';

// -- CommandCellWrapper --

interface CommandCellWrapperProps {
  cellPadding: string;
  allowEditing: boolean;
  allowDeleting: boolean;
  isEditingRow: boolean;
  rowId: unknown;
  editing: EditingHandlers;
}

/** Render the command column cell wrapping CommandCell */
const CommandCellWrapper = memo(({
  cellPadding, allowEditing, allowDeleting, isEditingRow, rowId, editing,
}: CommandCellWrapperProps): JSX.Element => (
  <td className={cn(cellPadding, 'text-right')} style={CELL_PADDING_STYLE}>
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
));

CommandCellWrapper.displayName = 'CommandCellWrapper';

// -- DataCell --

interface DataCellProps {
  column: TableColumn;
  cellPadding: string;
  editCtx: CellEditContext;
  editingEnabled: boolean;
  editing: EditingHandlers | undefined;
  row: Record<string, unknown>;
  rowId: unknown;
  selectionEnabled: boolean;
  selection: SelectionHandlers | undefined;
}

/** Render a single data cell (editable or read-only) */
const DataCell = memo(({
  column, cellPadding, editCtx, editingEnabled, editing,
  row, rowId, selectionEnabled, selection,
}: DataCellProps): JSX.Element => {
  const isEditableCell = isCellInEditMode(editCtx, column.field);
  const isDirty = editingEnabled && editing?.isCellDirty(rowId, column.field) === true;

  if (isEditableCell && isValueDefined(editing))
    return (
      <EditableCell
        cellPadding={cellPadding}
        column={column}
        editing={editing}
        isDirty={isDirty}
        row={row}
      />
    );

  return (
    <ReadOnlyCell
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
});

DataCell.displayName = 'DataCell';

export { CheckboxCell, CommandCellWrapper, DataCell };
