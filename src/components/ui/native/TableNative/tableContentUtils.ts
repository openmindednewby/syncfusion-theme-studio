/**
 * Utility functions for TableContent.
 *
 * Extracted to reduce file size and cyclomatic complexity
 * of the main TableContent component.
 */
import type { GridConfig } from '@/lib/grid/types';
import { isValueDefined } from '@/utils/is';

import type { AggregateRowDef } from './hooks/useTableAggregates';
import type { FeatureFlags, UseTableFeaturesProps } from './hooks/useTableFeatures';
import type { EditingConfig, GroupingConfig, SelectionConfig, TableColumn } from './types';

const EXTRA_COLS_NONE = 0;
const CHECKBOX_COL = 1;
const COMMAND_COL = 1;

export const COMPACT_TEXT = 'text-xs';
export const DEFAULT_TEXT = 'text-sm';

/** Calculate total column span including extra columns */
export function calcColSpan(columnCount: number, flags: FeatureFlags): number {
  const checkboxCols = flags.showCheckbox ? CHECKBOX_COL : EXTRA_COLS_NONE;
  const commandCols = flags.showCommandColumn ? COMMAND_COL : EXTRA_COLS_NONE;
  return columnCount + checkboxCols + commandCols;
}

/** Determine if filter row should be shown */
export function shouldShowFilter(gridConfig?: GridConfig): boolean {
  return isValueDefined(gridConfig?.filter) && gridConfig.filter.enabled;
}

/** Resolve editing/selection handlers based on feature flags */
export function resolveOptionalHandlers<T>(enabled: boolean, handlers: T): T | undefined {
  return enabled ? handlers : undefined;
}

export interface ColumnMenuHeaderProps {
  allColumns?: TableColumn[];
  hiddenFields?: Set<string>;
  openMenuField?: string | null;
  onMenuClose?: () => void;
  onMenuToggle?: (field: string) => void;
  onToggleColumnVisibility?: (field: string) => void;
}

/** Build column-menu-related props for TableHeader when column menu is enabled */
export function buildColumnMenuProps(
  allColumns: TableColumn[],
  visibility: { hiddenFields: Set<string>; toggleColumn: (field: string) => void },
  menu: { openField: string | null; close: () => void; toggle: (field: string) => void },
): ColumnMenuHeaderProps {
  return {
    allColumns,
    hiddenFields: visibility.hiddenFields,
    openMenuField: menu.openField,
    onMenuClose: menu.close,
    onMenuToggle: menu.toggle,
    onToggleColumnVisibility: visibility.toggleColumn,
  };
}

export interface PaginationProps {
  pageCount?: number;
  pageSizes?: number[];
  showFirstLastButtons?: boolean;
  showPageInfo?: boolean;
}

/** Extract pagination config from grid config to reduce optional chaining in the component */
export function extractPaginationConfig(gridConfig?: GridConfig): PaginationProps {
  const pagination = gridConfig?.pagination;
  const result: PaginationProps = {};
  if (isValueDefined(pagination?.pageCount)) result.pageCount = pagination.pageCount;
  if (isValueDefined(pagination?.pageSizes)) result.pageSizes = pagination.pageSizes;
  if (isValueDefined(pagination?.showFirstLastButtons)) result.showFirstLastButtons = pagination.showFirstLastButtons;
  if (isValueDefined(pagination?.showPageInfo)) result.showPageInfo = pagination.showPageInfo;
  return result;
}

/** Resolve table layout class from grid config */
export function resolveTableLayout(gridConfig?: GridConfig): string {
  return gridConfig?.tableLayout === 'auto' ? '' : 'table-fixed';
}

/** Check if dialog editing mode is active */
export function isDialogEditing(editingEnabled: boolean, editConfig?: EditingConfig): boolean {
  return editingEnabled && editConfig?.mode === 'Dialog';
}

/** Build optional selection/editing spread props for TableBody */
export function buildBodyOptionalProps<S, E>(
  flags: FeatureFlags, selection: S, editing: E,
): Record<string, unknown> {
  return {
    ...(flags.selectionEnabled ? { selection } : {}),
    ...(flags.editingEnabled ? { editing } : {}),
  };
}

interface FeatureCallbacks {
  selectionConfig: SelectionConfig | undefined;
  onRowSelected: ((row: Record<string, unknown>) => void) | undefined;
  onRowDeselected: ((row: Record<string, unknown>) => void) | undefined;
  onSelectionChange: ((rows: Array<Record<string, unknown>>) => void) | undefined;
  groupConfig: GroupingConfig | undefined;
  onGroupChange: ((columns: string[]) => void) | undefined;
  aggregates: AggregateRowDef[] | undefined;
  editConfig: EditingConfig | undefined;
  onSave: ((edited: Record<string, unknown>, original: Record<string, unknown>) => void) | undefined;
  onDelete: ((row: Record<string, unknown>) => void) | undefined;
  onAdd: ((row: Record<string, unknown>) => void) | undefined;
  onBatchSave: ((changes: {
    added: Array<Record<string, unknown>>;
    edited: Array<Record<string, unknown>>;
    deleted: Array<Record<string, unknown>>;
  }) => void) | undefined;
}

/** Build the optional feature props for useTableFeatures, omitting undefined keys. */
export function buildFeatureProps(
  processedData: Array<Record<string, unknown>>,
  columns: TableColumn[],
  callbacks: FeatureCallbacks,
): UseTableFeaturesProps {
  return {
    processedData,
    columns,
    ...(isValueDefined(callbacks.selectionConfig) ? { selectionConfig: callbacks.selectionConfig } : {}),
    ...(isValueDefined(callbacks.onRowSelected) ? { onRowSelected: callbacks.onRowSelected } : {}),
    ...(isValueDefined(callbacks.onRowDeselected) ? { onRowDeselected: callbacks.onRowDeselected } : {}),
    ...(isValueDefined(callbacks.onSelectionChange) ? { onSelectionChange: callbacks.onSelectionChange } : {}),
    ...(isValueDefined(callbacks.groupConfig) ? { groupConfig: callbacks.groupConfig } : {}),
    ...(isValueDefined(callbacks.onGroupChange) ? { onGroupChange: callbacks.onGroupChange } : {}),
    ...(isValueDefined(callbacks.aggregates) ? { aggregates: callbacks.aggregates } : {}),
    ...(isValueDefined(callbacks.editConfig) ? { editConfig: callbacks.editConfig } : {}),
    ...(isValueDefined(callbacks.onSave) ? { onSave: callbacks.onSave } : {}),
    ...(isValueDefined(callbacks.onDelete) ? { onDelete: callbacks.onDelete } : {}),
    ...(isValueDefined(callbacks.onAdd) ? { onAdd: callbacks.onAdd } : {}),
    ...(isValueDefined(callbacks.onBatchSave) ? { onBatchSave: callbacks.onBatchSave } : {}),
  };
}
