/**
 * Shared utility functions and types for the table editing system.
 */

export const CELL_KEY_SEPARATOR = ':';
export const DEFAULT_KEY_FIELD = 'id';

export interface TableColumnDef {
  field: string;
  headerText: string;
}

export interface BatchChanges {
  added: Array<Record<string, unknown>>;
  edited: Array<Record<string, unknown>>;
  deleted: Array<Record<string, unknown>>;
}

export interface EditingCell {
  rowId: unknown;
  field: string;
}

export interface UseTableEditingResult {
  editingRowId: unknown;
  editingCell: EditingCell | null;
  editValues: Record<string, unknown>;
  dirtyRows: Set<unknown>;
  dirtyCells: Map<string, unknown>;
  isEditing: boolean;
  isDialogOpen: boolean;
  batchAdded: Array<Record<string, unknown>>;
  batchDeleted: Set<unknown>;
  startEdit: (rowId: unknown) => void;
  startCellEdit: (rowId: unknown, field: string) => void;
  updateEditValue: (field: string, value: unknown) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  deleteRow: (rowId: unknown) => void;
  addNewRow: () => void;
  saveBatch: () => void;
  cancelBatch: () => void;
  getCellValue: (rowId: unknown, field: string) => unknown;
  isCellDirty: (rowId: unknown, field: string) => boolean;
  isRowDeleted: (rowId: unknown) => boolean;
}

/** Build a cell key from row id and field name */
export function buildCellKey(rowId: unknown, field: string): string {
  return `${String(rowId)}${CELL_KEY_SEPARATOR}${field}`;
}

/** Find a row by its key value */
export function findRowByKey(
  data: Array<Record<string, unknown>>,
  keyField: string,
  keyValue: unknown,
): Record<string, unknown> | undefined {
  return data.find((row) => row[keyField] === keyValue);
}

/** Build edit values from a row's current data */
export function buildEditValues(
  row: Record<string, unknown>,
  columns: TableColumnDef[],
): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const col of columns) values[col.field] = row[col.field];
  return values;
}

/** Create an empty row with all column fields set to empty string */
export function createEmptyRow(columns: TableColumnDef[]): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  for (const col of columns) row[col.field] = '';
  return row;
}
