/**
 * Pagination section: demonstrates configurable page sizes and navigation.
 */
import { memo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { CopyableCodeSnippet } from '@/components/common';
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
  PAGE_SIZE_FIVE,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

const PAGINATION_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
];

const PAGE_SIZES = [PAGE_SIZE_FIVE];

export const PaginationSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.paginationDescription"
    testId="grid-showcase-pagination"
    titleKey="gridShowcase.paginationTitle"
  >
    <DataGrid
      allowPaging
      columns={PAGINATION_COLUMNS}
      data={EMPLOYEES}
      pageSettings={{ pageSize: PAGE_SIZE_FIVE, pageSizes: PAGE_SIZES }}
      testId="grid-pagination"
    />
    <CopyableCodeSnippet code='<DataGrid allowPaging columns={columns} data={data} pageSettings={{ pageSize: 5 }} />' />
  </ShowcaseSection>
));

PaginationSection.displayName = 'PaginationSection';
