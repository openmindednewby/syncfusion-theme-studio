/**
 * TableContent renders the inner table structure including header, body,
 * footer, pagination, and edit dialog.
 *
 * Extracted from the main TableNative to reduce complexity and file size.
 */
import { memo, useMemo } from 'react';

import { useNativeGridState } from '@/lib/grid/hooks/useNativeGridState';
import type { GridConfig } from '@/lib/grid/types';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

import { useColumnMenu } from './columnMenu/useColumnMenu';
import { useColumnVisibility } from './columnMenu/useColumnVisibility';
import EditDialog from './EditDialog';
import GroupDropArea from './GroupDropArea';
import { useTableFeatures } from './hooks/useTableFeatures';
import TablePagination from './pagination/TablePagination';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

import type { AggregateRowDef } from './hooks/useTableAggregates';
import type { FeatureFlags } from './hooks/useTableFeatures';
import type { EditingConfig, GroupingConfig, SelectionConfig, TableColumn } from './types';

const EXTRA_COLS_NONE = 0;
const CHECKBOX_COL = 1;
const COMMAND_COL = 1;
const COMPACT_TEXT = 'text-xs';
const DEFAULT_TEXT = 'text-sm';

/** Calculate total column span including extra columns */
function calcColSpan(columnCount: number, flags: FeatureFlags): number {
  const checkboxCols = flags.showCheckbox ? CHECKBOX_COL : EXTRA_COLS_NONE;
  const commandCols = flags.showCommandColumn ? COMMAND_COL : EXTRA_COLS_NONE;
  return columnCount + checkboxCols + commandCols;
}

/** Determine if filter row should be shown */
function shouldShowFilter(gridConfig?: GridConfig): boolean {
  return isValueDefined(gridConfig?.filter) && gridConfig.filter.enabled;
}

/** Resolve editing/selection handlers based on feature flags */
function resolveOptionalHandlers<T>(enabled: boolean, handlers: T): T | undefined {
  return enabled ? handlers : undefined;
}

interface Props {
  columns: TableColumn[];
  data: Array<Record<string, unknown>>;
  gridConfig?: GridConfig;
  testId?: string;
  ariaLabel?: string;
  emptyText?: string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  className?: string;
  selectionConfig?: SelectionConfig;
  onRowSelected?: (row: Record<string, unknown>) => void;
  onRowDeselected?: (row: Record<string, unknown>) => void;
  onSelectionChange?: (rows: Array<Record<string, unknown>>) => void;
  groupConfig?: GroupingConfig;
  onGroupChange?: (columns: string[]) => void;
  aggregates?: AggregateRowDef[];
  editConfig?: EditingConfig;
  onSave?: (edited: Record<string, unknown>, original: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  onAdd?: (row: Record<string, unknown>) => void;
  onBatchSave?: (changes: { added: Array<Record<string, unknown>>; edited: Array<Record<string, unknown>>; deleted: Array<Record<string, unknown>> }) => void;
  tableRef: React.Ref<HTMLTableElement>;
  showColumnMenu?: boolean;
}

const TableContent = ({
  columns, data, gridConfig, testId, ariaLabel,
  emptyText = '', striped = true, hoverable = true, compact = false, className,
  selectionConfig, onRowSelected, onRowDeselected, onSelectionChange,
  groupConfig, onGroupChange,
  aggregates,
  editConfig, onSave, onDelete, onAdd, onBatchSave,
  tableRef,
  showColumnMenu = false,
  // eslint-disable-next-line complexity -- conditional rendering for grid features (filter/group/edit/aggregate/paginate)
}: Props): JSX.Element => {
  const columnMenu = useColumnMenu();
  const columnVisibility = useColumnVisibility(columns);
  const activeColumns = showColumnMenu ? columnVisibility.visibleColumns : columns;
  const fields = useMemo(() => activeColumns.map((c) => c.field), [activeColumns]);
  const gridState = useNativeGridState(data, fields, gridConfig);

  const { flags, selection, grouping, aggregateResult, editing } = useTableFeatures({
    processedData: gridState.processedData, columns: activeColumns,
    selectionConfig, onRowSelected, onRowDeselected, onSelectionChange,
    groupConfig, onGroupChange, aggregates,
    editConfig, onSave, onDelete, onAdd, onBatchSave,
  });

  const colSpan = calcColSpan(activeColumns.length, flags);
  const isFilterEnabled = shouldShowFilter(gridConfig);
  const cellPadding = compact ? COMPACT_TEXT : DEFAULT_TEXT;
  const tableLayoutClass = gridConfig?.tableLayout === 'auto' ? '' : 'table-fixed';
  const showGroupDropArea = flags.groupingEnabled && flags.showDropArea;
  const isDialogMode = flags.editingEnabled && editConfig?.mode === 'Dialog';

  return (
    <div className={cn('overflow-x-auto rounded-md border border-border', className)}>
      {showGroupDropArea ? (
        <GroupDropArea
          groupColumns={grouping.groupColumns}
          onAddGroup={grouping.addGroup}
          onRemoveGroup={grouping.removeGroup}
        />
      ) : null}
      <table
        ref={tableRef}
        aria-label={ariaLabel}
        className={cn('w-full border-collapse', tableLayoutClass)}
        data-testid={testId}
      >
        <TableHeader
          allColumns={showColumnMenu ? columns : undefined}
          cellPadding={cellPadding}
          columns={activeColumns}
          columnTypes={gridState.columnTypes}
          draggableHeaders={showGroupDropArea}
          fields={fields}
          filterValues={gridState.filterValues}
          hiddenFields={showColumnMenu ? columnVisibility.hiddenFields : undefined}
          isAllSelected={selection.isAllSelected}
          isFilterEnabled={isFilterEnabled}
          openMenuField={showColumnMenu ? columnMenu.openField : undefined}
          showCheckbox={flags.showCheckbox}
          showColumnMenu={showColumnMenu}
          sortDirection={gridState.sortDirection}
          sortField={gridState.sortField}
          onFilterChange={gridState.onFilterChange}
          onMenuClose={showColumnMenu ? columnMenu.close : undefined}
          onMenuToggle={showColumnMenu ? columnMenu.toggle : undefined}
          onSelectAll={selection.handleSelectAll}
          onSort={gridState.onSort}
          onToggleColumnVisibility={showColumnMenu ? columnVisibility.toggleColumn : undefined}
        />
        <TableBody
          allowDeleting={flags.allowDeleting}
          allowEditing={flags.allowEditing}
          cellPadding={cellPadding}
          colSpan={colSpan}
          columns={activeColumns}
          data={gridState.processedData}
          editing={resolveOptionalHandlers(flags.editingEnabled, editing)}
          editingEnabled={flags.editingEnabled}
          emptyText={emptyText}
          groupedData={grouping.groupedData}
          hoverable={hoverable}
          selection={resolveOptionalHandlers(flags.selectionEnabled, selection)}
          selectionEnabled={flags.selectionEnabled}
          showCheckbox={flags.showCheckbox}
          showCommandColumn={flags.showCommandColumn}
          striped={striped}
        />
        {aggregateResult.hasAggregates ? (
          <TableFooter
            aggregateRows={aggregateResult.aggregateRows}
            cellPadding={cellPadding}
            columns={activeColumns}
            hasCheckboxColumn={flags.showCheckbox}
          />
        ) : null}
      </table>
      {gridState.shouldShowPagination ? (
        <TablePagination
          currentPage={gridState.currentPage}
          pageCount={gridConfig?.pagination?.pageCount}
          pageSize={gridState.pageSize}
          pageSizes={gridConfig?.pagination?.pageSizes}
          showFirstLastButtons={gridConfig?.pagination?.showFirstLastButtons}
          showPageInfo={gridConfig?.pagination?.showPageInfo}
          totalItems={gridState.totalItems}
          totalPages={gridState.totalPages}
          onPageChange={gridState.onPageChange}
          onPageSizeChange={gridState.onPageSizeChange}
        />
      ) : null}
      {isDialogMode ? (
        <EditDialog
          columns={activeColumns}
          editValues={editing.editValues}
          isOpen={editing.isDialogOpen}
          onCancel={editing.cancelEdit}
          onSave={editing.saveEdit}
          onValueChange={editing.updateEditValue}
        />
      ) : null}
    </div>
  );
};

export default memo(TableContent);
