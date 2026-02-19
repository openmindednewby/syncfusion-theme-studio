/**
 * AggregatesSection demonstrates footer aggregate summaries
 * including Sum, Average, Count, Min, and Max.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { AggregateType, TableNative } from '@/components/ui/native';
import type { AggregateRowDef } from '@/components/ui/native';
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
    <CopyableCodeSnippet code='<TableNative columns={columns} data={data} aggregates={[{ columns: [{ field: "price", type: AggregateType.Sum }] }]} />' />
  </section>
));

AggregatesSection.displayName = 'AggregatesSection';
