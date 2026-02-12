/**
 * AggregateRow renders a single footer row with computed aggregate values
 * aligned to their respective columns.
 */
import { memo } from 'react';

import { cn } from '@/utils/cn';

import type { ComputedAggregate } from './hooks/useTableAggregates';

interface ColumnDef {
  field: string;
}

interface Props {
  columns: ColumnDef[];
  aggregateColumns: ComputedAggregate[];
  cellPadding: string;
  hasCheckboxColumn?: boolean | undefined;
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
      className="bg-surface-elevated border-t border-border font-medium"
      data-testid="aggregate-row"
    >
      {hasCheckboxColumn ? <td className={cellPadding} /> : null}
      {columns.map((col) => {
        const agg = getAggregateForField(col.field);
        return (
          <td
            key={col.field}
            className={cn(cellPadding, 'text-text-primary text-sm')}
            data-testid={`aggregate-cell-${col.field}`}
          >
            {agg?.formatted ?? ''}
          </td>
        );
      })}
    </tr>
  );
};

export default memo(AggregateRow);
