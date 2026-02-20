/**
 * TableBody renders the tbody element with data rows.
 *
 * Supports regular rows, grouped rows with collapse/expand,
 * selection highlighting, inline editing, and command columns.
 */
import { memo, useCallback } from 'react';

import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import DataRow from './DataRow';
import GroupRow from './GroupRow';

import type { SelectionHandlers, EditingHandlers, DataRowColumn } from './DataRow';
import type { GroupedData } from '../hooks/useTableGrouping';

const DEFAULT_KEY_FIELD = 'id';

interface RowRenderConfig {
  columns: DataRowColumn[];
  colSpan: number;
  cellPadding: string;
  striped: boolean;
  hoverable: boolean;
  rowKeyField: string;
  showCheckbox: boolean;
  selectionEnabled: boolean;
  selection?: SelectionHandlers;
  editingEnabled?: boolean;
  editing?: EditingHandlers;
  allowEditing?: boolean;
  allowDeleting?: boolean;
  showCommandColumn?: boolean;
}

/** Render a single data row for a grouped item */
function renderGroupItem(
  item: Record<string, unknown>, flatIndex: number, config: RowRenderConfig,
): JSX.Element {
  return (
    <DataRow
      key={String(item[config.rowKeyField] ?? flatIndex)}
      allowDeleting={config.allowDeleting ?? false}
      allowEditing={config.allowEditing ?? false}
      cellPadding={config.cellPadding}
      columns={config.columns}
      editingEnabled={config.editingEnabled ?? false}
      hoverable={config.hoverable}
      row={item}
      rowIndex={flatIndex}
      rowKeyField={config.rowKeyField}
      selectionEnabled={config.selectionEnabled}
      showCheckbox={config.showCheckbox}
      showCommandColumn={config.showCommandColumn ?? false}
      striped={config.striped}
      {...(isValueDefined(config.selection) ? { selection: config.selection } : {})}
      {...(isValueDefined(config.editing) ? { editing: config.editing } : {})}
    />
  );
}

/** Type guard: check if grouped items are nested groups rather than data rows */
function isNestedGroupItems(
  items: Array<Record<string, unknown>> | GroupedData[],
): items is GroupedData[] {
  const firstItem = items[0];
  return isValueDefined(firstItem) && 'key' in firstItem && 'field' in firstItem;
}

/** Append child rows from a single group to the rows array */
function appendGroupChildren(
  group: GroupedData, rows: JSX.Element[],
  config: RowRenderConfig, onToggle: (key: string) => void,
): void {
  if (group.isCollapsed) return;

  if (isNestedGroupItems(group.items))
    rows.push(...renderGroupedRows(group.items, config, onToggle));
  else
    for (const item of group.items) rows.push(renderGroupItem(item, rows.length, config));
}

/** Recursively render grouped data with group header rows */
function renderGroupedRows(
  groupedData: GroupedData[], config: RowRenderConfig,
  onToggle: (key: string) => void,
): JSX.Element[] {
  const rows: JSX.Element[] = [];

  for (const group of groupedData) {
    rows.push(
      <GroupRow
        key={group.key}
        colSpan={config.colSpan}
        count={group.count}
        field={group.field}
        groupKey={group.key}
        isCollapsed={group.isCollapsed}
        level={group.level}
        value={group.value}
        onToggle={onToggle}
      />,
    );

    appendGroupChildren(group, rows, config, onToggle);
  }

  return rows;
}

interface Props {
  columns: DataRowColumn[];
  data: Array<Record<string, unknown>>;
  groupedData: GroupedData[] | null;
  cellPadding: string;
  striped: boolean;
  hoverable: boolean;
  emptyText: string;
  colSpan: number;
  rowKeyField?: string;
  showCheckbox?: boolean;
  selectionEnabled?: boolean;
  selection?: SelectionHandlers;
  editingEnabled?: boolean;
  editing?: EditingHandlers;
  allowEditing?: boolean;
  allowDeleting?: boolean;
  showCommandColumn?: boolean;
}

const TableBody = ({
  columns, data, groupedData, cellPadding,
  striped, hoverable, emptyText, colSpan,
  rowKeyField = DEFAULT_KEY_FIELD,
  showCheckbox = false,
  selectionEnabled = false, selection,
  editingEnabled = false, editing,
  allowEditing = false, allowDeleting = false,
  showCommandColumn = false,
}: Props): JSX.Element => {
  const handleGroupToggle = useCallback(
    (_key: string) => {
      // Toggle is handled at the parent level via grouping hook
    },
    [],
  );

  const config: RowRenderConfig = {
    columns, colSpan, cellPadding, striped, hoverable, rowKeyField,
    showCheckbox, selectionEnabled,
    allowEditing, allowDeleting, showCommandColumn,
    ...(isValueDefined(selection) ? { selection } : {}),
    ...(isValueDefined(editing) ? { editing } : {}),
    ...(isValueDefined(editingEnabled) ? { editingEnabled } : {}),
  };

  if (isValueDefined(groupedData))
    return (
      <tbody>
        {renderGroupedRows(groupedData, config, handleGroupToggle)}
      </tbody>
    );

  if (!isNotEmptyArray(data))
    return (
      <tbody>
        <tr>
          <td className="px-4 py-8 text-center text-text-secondary" colSpan={colSpan}>
            {emptyText}
          </td>
        </tr>
      </tbody>
    );

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <DataRow
          key={String(row[rowKeyField] ?? rowIndex)}
          allowDeleting={allowDeleting}
          allowEditing={allowEditing}
          cellPadding={cellPadding}
          columns={columns}
          editingEnabled={editingEnabled}
          hoverable={hoverable}
          row={row}
          rowIndex={rowIndex}
          rowKeyField={rowKeyField}
          selectionEnabled={selectionEnabled}
          showCheckbox={showCheckbox}
          showCommandColumn={showCommandColumn}
          striped={striped}
          {...(isValueDefined(selection) ? { selection } : {})}
          {...(isValueDefined(editing) ? { editing } : {})}
        />
      ))}
    </tbody>
  );
};

export default memo(TableBody);
