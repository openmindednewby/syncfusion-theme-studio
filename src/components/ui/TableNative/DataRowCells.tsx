/**
 * Sub-components for DataRow: EditableCell and ReadOnlyCell.
 *
 * Extracted to reduce DataRow file size and complexity.
 */
import { memo } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import EditCell from './EditCell';
import { TextAlign } from './types';

import type { TableColumn } from './types';

const ALIGN_CLASSES: Record<TextAlign, string> = {
  [TextAlign.Left]: 'text-left',
  [TextAlign.Center]: 'text-center',
  [TextAlign.Right]: 'text-right',
};

const DIRTY_CELL_BG = 'bg-yellow-50 dark:bg-yellow-900/20';

interface EditingHandlers {
  editingRowId: unknown;
  editingCell: { rowId: unknown; field: string } | null;
  editValues: Record<string, unknown>;
  updateEditValue: (field: string, value: unknown) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  startEdit: (rowId: unknown) => void;
  deleteRow: (rowId: unknown) => void;
  isCellDirty: (rowId: unknown, field: string) => boolean;
  getCellValue: (rowId: unknown, field: string) => unknown;
  isRowDeleted: (rowId: unknown) => boolean;
}

interface SelectionHandlers {
  isRowSelected: (rowId: unknown) => boolean;
  isCellSelected: (rowId: unknown, field: string) => boolean;
  handleRowClick: (row: Record<string, unknown>, rowIndex: number, event: { ctrlKey: boolean; shiftKey: boolean; metaKey: boolean }) => void;
  handleCellClick: (row: Record<string, unknown>, field: string, event: { ctrlKey: boolean; shiftKey: boolean; metaKey: boolean }) => void;
}

/** Get display value for a cell */
function getCellDisplayValue(row: Record<string, unknown>, column: TableColumn): string {
  const raw = row[column.field];
  if (isValueDefined(column.format)) return column.format(raw);
  if (!isValueDefined(raw)) return '';
  return String(raw);
}

interface DirtyDisplayContext {
  isDirty: boolean;
  editing: EditingHandlers | undefined;
  rowId: unknown;
}

/** Compute display value considering dirty state */
function getDirtyAwareDisplayValue(
  ctx: DirtyDisplayContext, row: Record<string, unknown>, column: TableColumn,
): string {
  if (ctx.isDirty && isValueDefined(ctx.editing))
    return String(ctx.editing.getCellValue(ctx.rowId, column.field) ?? '');
  return getCellDisplayValue(row, column);
}

// -- EditableCell --

interface EditableCellProps {
  column: TableColumn;
  cellPadding: string;
  editing: EditingHandlers;
  isDirty: boolean;
  row: Record<string, unknown>;
}

/** Render an editable cell with inline input */
const EditableCell = memo(({ column, cellPadding, editing, isDirty, row }: EditableCellProps): JSX.Element => {
  const align = column.textAlign ?? TextAlign.Left;
  return (
    <td className={cn(cellPadding, ALIGN_CLASSES[align], 'overflow-hidden')}>
      <EditCell
        field={column.field}
        isDirty={isDirty}
        value={editing.editValues[column.field] ?? row[column.field]}
        onCancel={editing.cancelEdit}
        onSave={editing.saveEdit}
        onValueChange={editing.updateEditValue}
      />
    </td>
  );
});

EditableCell.displayName = 'EditableCell';

// -- ReadOnlyCell --

interface ReadOnlyCellProps {
  column: TableColumn;
  row: Record<string, unknown>;
  rowId: unknown;
  cellPadding: string;
  isDirty: boolean;
  editing: EditingHandlers | undefined;
  editingEnabled: boolean;
  selectionEnabled: boolean;
  selection: SelectionHandlers | undefined;
}

/** Render a read-only cell */
const ReadOnlyCell = memo(({
  column, row, rowId, cellPadding, isDirty,
  editing, editingEnabled, selectionEnabled, selection,
}: ReadOnlyCellProps): JSX.Element => {
  const align = column.textAlign ?? TextAlign.Left;
  const displayValue = getDirtyAwareDisplayValue({ isDirty, editing, rowId }, row, column);

  return (
    <td
      className={cn(
        cellPadding, 'text-text-primary', ALIGN_CLASSES[align],
        'overflow-hidden text-ellipsis whitespace-nowrap',
        isDirty && DIRTY_CELL_BG,
      )}
      data-testid={`cell-${String(rowId)}-${column.field}`}
      onClick={(e) => {
        if (selectionEnabled && isValueDefined(selection))
          selection.handleCellClick(row, column.field, e);
      }}
      onDoubleClick={() => {
        if (editingEnabled && isValueDefined(editing))
          editing.startEdit(rowId);
      }}
    >
      {displayValue}
    </td>
  );
});

ReadOnlyCell.displayName = 'ReadOnlyCell';

// -- Helpers --

interface CellEditContext {
  editingEnabled: boolean;
  editing: EditingHandlers | undefined;
  rowId: unknown;
  isEditingRow: boolean;
}

/** Check if a specific cell is currently in edit mode */
function isCellInEditMode(ctx: CellEditContext, field: string): boolean {
  if (ctx.isEditingRow) return true;
  if (!ctx.editingEnabled || !isValueDefined(ctx.editing)) return false;
  const editingCell = ctx.editing.editingCell;
  if (!isValueDefined(editingCell)) return false;
  return editingCell.rowId === ctx.rowId && editingCell.field === field;
}

export { EditableCell, ReadOnlyCell, isCellInEditMode };
export type { EditingHandlers, SelectionHandlers, CellEditContext };
