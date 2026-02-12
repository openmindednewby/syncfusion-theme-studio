/**
 * Aggregates section: footer summaries (sum, average, count).
 */
import { memo, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { DataGrid } from '@/components/ui/syncfusion';
import { AggregateType } from '@/lib/grid/types';
import type { AggregateRowConfig } from '@/lib/grid/types';
import { FM } from '@/localization/helpers';

import {
  ORDERS,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_PRODUCT,
  COL_WIDTH_QUANTITY,
  COL_WIDTH_PRICE,
  COL_WIDTH_TOTAL,
  COL_WIDTH_COUNTRY,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

const AGGREGATE_COLUMNS: ColumnModel[] = [
  { field: 'orderId', headerText: FM('gridShowcase.orderId'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'customer', headerText: FM('gridShowcase.customer'), width: COL_WIDTH_NAME },
  { field: 'product', headerText: FM('gridShowcase.product'), width: COL_WIDTH_PRODUCT },
  { field: 'quantity', headerText: FM('gridShowcase.quantity'), width: COL_WIDTH_QUANTITY, textAlign: 'Right' },
  { field: 'price', headerText: FM('gridShowcase.price'), width: COL_WIDTH_PRICE, format: 'C0', textAlign: 'Right' },
  { field: 'total', headerText: FM('gridShowcase.total'), width: COL_WIDTH_TOTAL, format: 'C0', textAlign: 'Right' },
  { field: 'country', headerText: FM('gridShowcase.country'), width: COL_WIDTH_COUNTRY },
];

export const AggregatesSection = memo((): JSX.Element => {
  const aggregates = useMemo(
    (): AggregateRowConfig[] => [
      {
        columns: [
          { field: 'quantity', type: AggregateType.Sum, footerTemplate: 'Total: ${Sum}' },
          { field: 'total', type: AggregateType.Sum, format: 'C0', footerTemplate: 'Sum: ${Sum}' },
          { field: 'price', type: AggregateType.Average, format: 'C0', footerTemplate: 'Avg: ${Average}' },
          { field: 'orderId', type: AggregateType.Count, footerTemplate: 'Count: ${Count}' },
        ],
      },
    ],
    [],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.aggregatesDescription"
      testId="grid-showcase-aggregates"
      titleKey="gridShowcase.aggregatesTitle"
    >
      <DataGrid
        allowSorting
        aggregates={aggregates}
        columns={AGGREGATE_COLUMNS}
        data={ORDERS}
        testId="grid-aggregates"
      />
    </ShowcaseSection>
  );
});

AggregatesSection.displayName = 'AggregatesSection';
