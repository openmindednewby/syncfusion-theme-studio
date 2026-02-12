/**
 * TableFooter renders the tfoot element with aggregate summary rows.
 */
import { memo } from 'react';

import AggregateRow from './AggregateRow';

import type { ComputedAggregateRow } from './hooks/useTableAggregates';

interface ColumnDef {
  field: string;
}

interface Props {
  columns: ColumnDef[];
  aggregateRows: ComputedAggregateRow[];
  cellPadding: string;
  hasCheckboxColumn?: boolean | undefined;
}

const TableFooter = ({
  columns,
  aggregateRows,
  cellPadding,
  hasCheckboxColumn = false,
}: Props): JSX.Element | null => {
  if (aggregateRows.length === 0) return null;

  return (
    <tfoot data-testid="table-footer">
      {aggregateRows.map((aggRow, idx) => (
        <AggregateRow
          key={`agg-row-${String(idx)}`}
          aggregateColumns={aggRow.columns}
          cellPadding={cellPadding}
          columns={columns}
          hasCheckboxColumn={hasCheckboxColumn}
        />
      ))}
    </tfoot>
  );
};

export default memo(TableFooter);
