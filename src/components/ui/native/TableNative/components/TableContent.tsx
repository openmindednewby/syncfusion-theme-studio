/**
 * TableContent renders the inner table structure including header, body,
 * footer, pagination, and edit dialog.
 *
 * Extracted from the main TableNative to reduce complexity and file size.
 */
import { memo, useMemo } from 'react';

import { useNativeGridState } from '@/lib/grid/hooks/useNativeGridState';
import type { GridConfig } from '@/lib/grid/types';
import type { DataGridConfig } from '@/stores/theme/types';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';


import EditDialog from './EditDialog';
import GroupDropArea from './GroupDropArea';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import { useGridStyleOverrides } from '../../../shared/useGridStyleOverrides';
import { useColumnMenu } from '../columnMenu/useColumnMenu';
import { useColumnVisibility } from '../columnMenu/useColumnVisibility';
import { EditingActionsProvider } from '../EditingActionsContext';
import { useTableFeatures } from '../hooks/useTableFeatures';
import TablePagination from '../pagination/TablePagination';
import {
  buildBodyOptionalProps, buildColumnMenuProps, buildFeatureProps,
  calcColSpan, COMPACT_TEXT, DEFAULT_TEXT,
  extractPaginationConfig, isDialogEditing,
  resolveTableLayout, shouldShowFilter,
} from '../utils/tableContentUtils';

import type { GridDensity } from '../../../shared/GridDensity';
import type { AggregateRowDef } from '../hooks/useTableAggregates';
import type { EditingConfig, GroupingConfig, SelectionConfig, TableColumn } from '../types';

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
  density?: GridDensity;
  themeOverrides?: Partial<DataGridConfig>;
  /** Extra content rendered inside the command cell for each row (e.g. kebab menu) */
  commandExtra?: (row: Record<string, unknown>) => React.ReactNode;
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
  commandExtra,
  density, themeOverrides,
}: Props): JSX.Element => {
  const styleOverridesInput = useMemo(() => ({
    ...(isValueDefined(density) ? { density } : {}),
    ...(isValueDefined(themeOverrides) ? { themeOverrides } : {}),
  }), [density, themeOverrides]);
  const styleOverrides = useGridStyleOverrides(styleOverridesInput);
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

  const editingActions = useMemo(() => (flags.editingEnabled ? { startEdit: editing.startEdit, deleteRow: editing.deleteRow, saveEdit: editing.saveEdit, cancelEdit: editing.cancelEdit, editingRowId: editing.editingRowId } : null), [flags.editingEnabled, editing.startEdit, editing.deleteRow, editing.saveEdit, editing.cancelEdit, editing.editingRowId]);

  const { colSpan, isFilterEnabled, cellPadding, tableLayoutClass, showGroupDropArea, isDialogMode, columnMenuProps, paginationConfig, bodyOptionalProps } = useMemo(() => ({
    colSpan: calcColSpan(activeColumns.length, flags),
    isFilterEnabled: shouldShowFilter(gridConfig),
    cellPadding: compact ? COMPACT_TEXT : DEFAULT_TEXT,
    tableLayoutClass: resolveTableLayout(gridConfig),
    showGroupDropArea: flags.groupingEnabled && flags.showDropArea,
    isDialogMode: isDialogEditing(flags.editingEnabled, editConfig),
    columnMenuProps: showColumnMenu ? buildColumnMenuProps(columns, columnVisibility, columnMenu) : {},
    paginationConfig: extractPaginationConfig(gridConfig),
    bodyOptionalProps: buildBodyOptionalProps(flags, selection, editing),
  }), [activeColumns.length, flags, gridConfig, compact, editConfig, showColumnMenu, columns, columnVisibility, columnMenu, selection, editing]);

  return (
    <EditingActionsProvider value={editingActions}>
      <div className={cn('rounded-md border border-border', className)} style={styleOverrides}>
        <div className="overflow-x-auto">
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
              filterOperators={gridState.filterOperators}
              filterValues={gridState.filterValues}
              isAllSelected={selection.isAllSelected}
              isFilterEnabled={isFilterEnabled}
              showCheckbox={flags.showCheckbox}
              showColumnMenu={showColumnMenu}
              sortDirection={gridState.sortDirection}
              sortField={gridState.sortField}
              onFilterChange={gridState.onFilterChange}
              onFilterOperatorChange={gridState.onFilterOperatorChange}
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
              {...(isValueDefined(commandExtra) ? { commandExtra } : {})}
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
        </div>
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
    </EditingActionsProvider>
  );
};

export default memo(TableContent);
