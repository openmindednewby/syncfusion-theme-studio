/**
 * Shared utility functions and types for the table selection system.
 */

const DEFAULT_KEY_FIELD = 'id';

/** Unique key extractor for a data row */
type RowKeyFn = (row: Record<string, unknown>) => unknown;

/** Extract a stable key from a row object */
function defaultRowKey(row: Record<string, unknown>): unknown {
  return row[DEFAULT_KEY_FIELD];
}

/** Build a cell key string from rowId and field */
function buildCellKey(rowId: unknown, field: string): string {
  return `${String(rowId)}:${field}`;
}

/** Get rows matching a set of keys from the data array */
function getSelectedRows(
  data: Array<Record<string, unknown>>,
  selectedIds: Set<unknown>,
  keyFn: RowKeyFn,
): Array<Record<string, unknown>> {
  return data.filter((row) => selectedIds.has(keyFn(row)));
}

interface UseTableSelectionProps {
  data: Array<Record<string, unknown>>;
  selectionType?: 'Single' | 'Multiple';
  selectionMode?: 'Row' | 'Cell' | 'Both';
  checkboxEnabled?: boolean;
  rowKeyAccessor?: RowKeyFn;
  onRowSelected?: (row: Record<string, unknown>) => void;
  onRowDeselected?: (row: Record<string, unknown>) => void;
  onSelectionChange?: (selectedRows: Array<Record<string, unknown>>) => void;
}

interface ModifierKeys {
  ctrlKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
}

interface UseTableSelectionResult {
  selectedRowIds: Set<unknown>;
  selectedCells: Set<string>;
  isRowSelected: (rowId: unknown) => boolean;
  isCellSelected: (rowId: unknown, field: string) => boolean;
  isAllSelected: boolean;
  handleRowClick: (row: Record<string, unknown>, rowIndex: number, event: ModifierKeys) => void;
  handleCellClick: (row: Record<string, unknown>, field: string, event: ModifierKeys) => void;
  handleSelectAll: () => void;
  clearSelection: () => void;
}

export { defaultRowKey, buildCellKey, getSelectedRows };
export type {
  RowKeyFn, UseTableSelectionProps, UseTableSelectionResult, ModifierKeys,
};
