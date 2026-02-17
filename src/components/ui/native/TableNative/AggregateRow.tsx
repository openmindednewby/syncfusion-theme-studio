/**
 * AggregateRow renders a single footer row with computed aggregate values
 * aligned to their respective columns.
 */
import { memo } from 'react';

import { cn } from '@/utils/cn';

import type { ComputedAggregate } from './hooks/useTableAggregates';

const CELL_PADDING_STYLE: React.CSSProperties = { padding: 'var(--component-datagrid-cell-padding)' };

interface ColumnDef {
  field: string;
}

interface Props {
  columns: ColumnDef[];
  aggregateColumns: ComputedAggregate[];
  cellPadding: string;
  hasCheckboxColumn?: boolean;
}

const AggregateRow = ({
  columns,
  aggregateColumns,
  cellPadding,
  hasCheckboxColumn = false,
}: Props): JSX.Element => {
  /** Find the computed aggregate for a given field */
  const getAggregateForField = (field: string): ComputedAggregate | undefined =>
    aggregateColumns.find((ac) => ac.field === field);

  return (
    <tr
      className="border-t font-medium"
      data-testid="aggregate-row"
      style={{
        backgroundColor: 'var(--component-datagrid-footer-bg)',
        borderColor: 'var(--component-datagrid-cell-border)',
      }}
    >
      {hasCheckboxColumn ? <td className={cellPadding} style={CELL_PADDING_STYLE} /> : null}
      {columns.map((col) => {
        const agg = getAggregateForField(col.field);
        return (
          <td
            key={col.field}
            className={cn(cellPadding, 'text-sm')}
            data-testid={`aggregate-cell-${col.field}`}
            style={{ padding: 'var(--component-datagrid-cell-padding)', color: 'var(--component-datagrid-footer-text)' }}
          >
            {agg?.formatted ?? ''}
          </td>
        );
      })}
    </tr>
  );
};

export default memo(AggregateRow);
