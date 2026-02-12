/**
 * TableNative - Zero-dependency themed table using native HTML.
 *
 * Provides a configurable data table with column sorting, striped rows,
 * hover effects, compact mode, empty state, filtering, pagination,
 * selection, grouping, aggregates, and editing.
 * Accepts an optional `gridConfig` for declarative feature setup.
 * Uses Tailwind CSS utility classes with theme CSS variables.
 */
import { memo, forwardRef } from 'react';

import type { GridConfig } from '@/lib/grid/types';

import TableContent from './TableContent';

import type { AggregateRowDef } from './hooks/useTableAggregates';
import type { EditingConfig, GroupingConfig, SelectionConfig, TableColumn } from './types';

interface Props {
  /** Column definitions */
  columns: TableColumn[];
  /** Row data - each object is keyed by column field names */
  data: Array<Record<string, unknown>>;
  /** Declarative grid configuration (filter, sort, pagination) */
  gridConfig?: GridConfig;
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label for the table */
  ariaLabel?: string;
  /** Text shown when data is empty */
  emptyText?: string;
  /** Alternating row colors (default: true) */
  striped?: boolean;
  /** Row hover effect (default: true) */
  hoverable?: boolean;
  /** Smaller padding for compact display */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;

  // Selection
  selectionConfig?: SelectionConfig;
  onRowSelected?: (row: Record<string, unknown>) => void;
  onRowDeselected?: (row: Record<string, unknown>) => void;
  onSelectionChange?: (rows: Array<Record<string, unknown>>) => void;

  // Grouping
  groupConfig?: GroupingConfig;
  onGroupChange?: (columns: string[]) => void;

  // Aggregates
  aggregates?: AggregateRowDef[];

  // Editing
  editConfig?: EditingConfig;
  onSave?: (edited: Record<string, unknown>, original: Record<string, unknown>) => void;
  onDelete?: (row: Record<string, unknown>) => void;
  onAdd?: (row: Record<string, unknown>) => void;
  onBatchSave?: (changes: { added: Array<Record<string, unknown>>; edited: Array<Record<string, unknown>>; deleted: Array<Record<string, unknown>> }) => void;
}

const TableNative = forwardRef<HTMLTableElement, Props>(
  (props, ref): JSX.Element => (
    <TableContent
      {...props}
      tableRef={ref}
    />
  ),
);

TableNative.displayName = 'TableNative';

export default memo(TableNative);
export type { Props as TableNativeProps, TableColumn, SelectionConfig, EditingConfig, GroupingConfig };
