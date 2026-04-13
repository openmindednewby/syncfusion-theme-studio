/**
 * AggregatesSection demonstrates footer aggregate summaries
 * including Sum, Average, Count, Min, and Max.
 */
import { memo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { AggregateType, TableNative } from '@/components/ui/native';
import type { AggregateRowDef } from '@/components/ui/native';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { FM } from '@/localization/utils/helpers';
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
  <ShowcaseSection
    descriptionKey="gridShowcase.aggregatesDescription"
    testId="native-grid-showcase-aggregates"
    titleKey="gridShowcase.aggregatesTitle"
  >
    <TableNative
      aggregates={AGGREGATE_ROWS}
      ariaLabel={FM('components.gridShowcase.sections.aggregates')}
      columns={ORDER_COLUMNS}
      data={ORDERS}
      testId={TestIds.NATIVE_GRID_AGGREGATES}
    />
    <CopyableCodeSnippet code='<TableNative columns={columns} data={data} aggregates={[{ columns: [{ field: "price", type: AggregateType.Sum }] }]} />' />
  </ShowcaseSection>
));

AggregatesSection.displayName = 'AggregatesSection';
