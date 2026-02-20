/**
 * DataRow renders a single table row with support for selection,
 * inline editing, dirty cell highlighting, and command buttons.
 */
import { memo, useCallback } from 'react';

import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import { CheckboxCell, CommandCellWrapper, DataCell } from './DataRowParts';

import type { EditingHandlers, SelectionHandlers, CellEditContext } from './DataRowCells';
import type { TableColumn } from '../types';

const EVEN_ROW_INDEX_DIVISOR = 2;
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
  selection?: SelectionHandlers;
  editingEnabled: boolean;
  editing?: EditingHandlers;
  allowEditing: boolean;
  allowDeleting: boolean;
  showCommandColumn: boolean;
}

interface RowStateInput {
  row: Record<string, unknown>;
  rowIndex: number;
  rowKeyField: string;
  selectionEnabled: boolean;
  selection: SelectionHandlers | undefined;
  editingEnabled: boolean;
  editing: EditingHandlers | undefined;
  showCommandColumn: boolean;
}

interface RowDerivedState {
  rowId: unknown;
  isSelected: boolean;
  isDeleted: boolean;
  isEditingRow: boolean;
  isOddRow: boolean;
  showCommand: boolean;
  editCtx: CellEditContext;
}

/** Compute all derived boolean state from raw props */
function computeRowState(input: RowStateInput): RowDerivedState {
  const { row, rowIndex, rowKeyField, selectionEnabled, selection } = input;
  const { editingEnabled, editing, showCommandColumn } = input;

  const rowId = row[rowKeyField] ?? rowIndex;
  const isSelected = selectionEnabled && selection?.isRowSelected(rowId) === true;
  const isDeleted = editingEnabled && editing?.isRowDeleted(rowId) === true;
  const isEditingRow = editingEnabled && editing?.editingRowId === rowId;
  const isOddRow = rowIndex % EVEN_ROW_INDEX_DIVISOR !== 0;
  const showCommand = showCommandColumn && editingEnabled && isValueDefined(editing);
  const editCtx: CellEditContext = { editingEnabled, editing, rowId, isEditingRow };

  return { rowId, isSelected, isDeleted, isEditingRow, isOddRow, showCommand, editCtx };
}

/** Compute the row background style based on striping */
function getRowBackgroundStyle(striped: boolean, isOddRow: boolean): React.CSSProperties {
  return {
    height: 'var(--component-datagrid-row-height)',
    backgroundColor: striped && isOddRow
      ? 'var(--component-datagrid-row-odd)'
      : 'var(--component-datagrid-row-even)',
    borderColor: 'var(--component-datagrid-cell-border)',
  };
}

const DataRow = ({
  row, rowIndex, columns, cellPadding,
  striped, hoverable, rowKeyField,
  showCheckbox, selectionEnabled, selection,
  editingEnabled, editing, allowEditing, allowDeleting, showCommandColumn,
}: Props): JSX.Element => {
  const state = computeRowState({
    row, rowIndex, rowKeyField,
    selectionEnabled, selection,
    editingEnabled, editing,
    showCommandColumn,
  });

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
        'border-b transition-colors',
        hoverable && 'native-grid-row-hoverable',
        state.isSelected && 'native-grid-row-selected',
        state.isDeleted && DELETED_ROW_OPACITY,
      )}
      data-testid={`table-row-${String(state.rowId)}`}
      style={getRowBackgroundStyle(striped, state.isOddRow)}
      onClick={handleRowClick}
    >
      {showCheckbox ? (
        <CheckboxCell
          isSelected={state.isSelected}
          row={row}
          rowId={state.rowId}
          rowIndex={rowIndex}
          selection={selection}
        />
      ) : null}
      {columns.map((column) => (
        <DataCell
          key={column.field}
          cellPadding={cellPadding}
          column={column}
          editCtx={state.editCtx}
          editing={editing}
          editingEnabled={editingEnabled}
          row={row}
          rowId={state.rowId}
          selection={selection}
          selectionEnabled={selectionEnabled}
        />
      ))}
      {state.showCommand && isValueDefined(editing) ? (
        <CommandCellWrapper
          allowDeleting={allowDeleting}
          allowEditing={allowEditing}
          cellPadding={cellPadding}
          editing={editing}
          isEditingRow={state.isEditingRow}
          rowId={state.rowId}
        />
      ) : null}
    </tr>
  );
};

export default memo(DataRow);
export type { SelectionHandlers, EditingHandlers, TableColumn as DataRowColumn };
