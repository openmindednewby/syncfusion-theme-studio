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

import { useColumnMenu } from './columnMenu/useColumnMenu';
import { useColumnVisibility } from './columnMenu/useColumnVisibility';
import EditDialog from './EditDialog';
import GroupDropArea from './GroupDropArea';
import { useTableFeatures } from './hooks/useTableFeatures';
import TablePagination from './pagination/TablePagination';
import TableBody from './TableBody';
import {
  buildBodyOptionalProps, buildColumnMenuProps, buildFeatureProps,
  calcColSpan, COMPACT_TEXT, DEFAULT_TEXT,
  extractPaginationConfig, isDialogEditing,
  resolveTableLayout, shouldShowFilter,
} from './tableContentUtils';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

import type { AggregateRowDef } from './hooks/useTableAggregates';
import type { EditingConfig, GroupingConfig, SelectionConfig, TableColumn } from './types';

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
}: Props): JSX.Element => {
  const columnMenu = useColumnMenu();
  const columnVisibility = useColumnVisibility(columns);
  const activeColumns = showColumnMenu ? columnVisibility.visibleColumns : columns;
  const fields = useMemo(() => activeColumns.map((c) => c.field), [activeColumns]);
  const gridState = useNativeGridState(data, fields, gridConfig);

  const featureProps = buildFeatureProps(gridState.processedData, activeColumns, {
    selectionConfig, onRowSelected, onRowDeselected, onSelectionChange,
    groupConfig, onGroupChange, aggregates,
    editConfig, onSave, onDelete, onAdd, onBatchSave,
  });
  const { flags, selection, grouping, aggregateResult, editing } = useTableFeatures(featureProps);

  const colSpan = calcColSpan(activeColumns.length, flags);
  const isFilterEnabled = shouldShowFilter(gridConfig);
  const cellPadding = compact ? COMPACT_TEXT : DEFAULT_TEXT;
  const tableLayoutClass = resolveTableLayout(gridConfig);
  const showGroupDropArea = flags.groupingEnabled && flags.showDropArea;
  const isDialogMode = isDialogEditing(flags.editingEnabled, editConfig);
  const columnMenuProps = showColumnMenu
    ? buildColumnMenuProps(columns, columnVisibility, columnMenu)
    : {};
  const paginationConfig = extractPaginationConfig(gridConfig);
  const bodyOptionalProps = buildBodyOptionalProps(flags, selection, editing);

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
          cellPadding={cellPadding}
          columns={activeColumns}
          columnTypes={gridState.columnTypes}
          draggableHeaders={showGroupDropArea}
          fields={fields}
          filterValues={gridState.filterValues}
          isAllSelected={selection.isAllSelected}
          isFilterEnabled={isFilterEnabled}
          showCheckbox={flags.showCheckbox}
          showColumnMenu={showColumnMenu}
          sortDirection={gridState.sortDirection}
          sortField={gridState.sortField}
          onFilterChange={gridState.onFilterChange}
          onSelectAll={selection.handleSelectAll}
          onSort={gridState.onSort}
          {...columnMenuProps}
        />
        <TableBody
          allowDeleting={flags.allowDeleting}
          allowEditing={flags.allowEditing}
          cellPadding={cellPadding}
          colSpan={colSpan}
          columns={activeColumns}
          data={gridState.processedData}
          editingEnabled={flags.editingEnabled}
          emptyText={emptyText}
          groupedData={grouping.groupedData}
          hoverable={hoverable}
          selectionEnabled={flags.selectionEnabled}
          showCheckbox={flags.showCheckbox}
          showCommandColumn={flags.showCommandColumn}
          striped={striped}
          {...bodyOptionalProps}
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
          pageSize={gridState.pageSize}
          {...paginationConfig}
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
