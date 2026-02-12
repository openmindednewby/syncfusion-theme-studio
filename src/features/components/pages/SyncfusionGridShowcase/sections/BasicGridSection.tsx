/**
 * Basic DataGrid section: sorting, filtering, and pagination.
 */
import { memo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_EMAIL,
  COL_WIDTH_ROLE,
  COL_WIDTH_STATUS,
  COL_WIDTH_DEPARTMENT,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

const BASIC_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
];

export const BasicGridSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.basicDescription"
    testId="grid-showcase-basic"
    titleKey="gridShowcase.basicTitle"
  >
    <DataGrid
      allowFiltering
      allowPaging
      allowSorting
      columns={BASIC_COLUMNS}
      data={EMPLOYEES}
      testId="grid-basic"
    />
  </ShowcaseSection>
));

BasicGridSection.displayName = 'BasicGridSection';
