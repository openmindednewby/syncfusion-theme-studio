/**
 * AggregatesSection demonstrates footer aggregate summaries
 * including Sum, Average, Count, Min, and Max.
 */
import { memo } from 'react';

import TableNative from '@/components/ui/TableNative';
import { AggregateType } from '@/components/ui/TableNative/hooks/useTableAggregates';
import type { AggregateRowDef } from '@/components/ui/TableNative/hooks/useTableAggregates';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { ORDER_COLUMNS, ORDERS } from '../sampleData';

const AGGREGATE_ROWS: AggregateRowDef[] = [
  {
    columns: [
      { field: 'id', type: AggregateType.Count },
      { field: 'price', type: AggregateType.Average },
      { field: 'quantity', type: AggregateType.Sum },
      { field: 'total', type: AggregateType.Sum },
    ],
  },
  {
    columns: [
      { field: 'price', type: AggregateType.Min },
      { field: 'total', type: AggregateType.Max },
    ],
  },
];

export const AggregatesSection = memo((): JSX.Element => (
  <section className="card space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-text-primary">
        {FM('components.gridShowcase.sections.aggregates')}
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        {FM('components.gridShowcase.sections.aggregatesDesc')}
      </p>
    </div>
    <TableNative
      aggregates={AGGREGATE_ROWS}
      ariaLabel={FM('components.gridShowcase.sections.aggregates')}
      columns={ORDER_COLUMNS}
      data={ORDERS}
      testId={TestIds.NATIVE_GRID_AGGREGATES}
    />
  </section>
));

AggregatesSection.displayName = 'AggregatesSection';
