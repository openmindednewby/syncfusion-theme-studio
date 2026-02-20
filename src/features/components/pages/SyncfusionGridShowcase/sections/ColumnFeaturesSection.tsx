/**
 * Column features section: resizing, reordering, frozen columns, column chooser.
 */
import { memo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

import { ShowcaseSection } from './ShowcaseSection';
import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_EMAIL,
  COL_WIDTH_ROLE,
  COL_WIDTH_STATUS,
  COL_WIDTH_DEPARTMENT,
  COL_WIDTH_SALARY,
  COL_WIDTH_COUNTRY,
  FROZEN_COLUMN_COUNT,
} from '../data/data';

const COLUMN_FEATURE_COLS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'salary', headerText: FM('gridShowcase.salary'), width: COL_WIDTH_SALARY, format: 'C0', textAlign: 'Right' },
  { field: 'country', headerText: FM('gridShowcase.country'), width: COL_WIDTH_COUNTRY },
];

const TOOLBAR_ITEMS = ['ColumnChooser'];

export const ColumnFeaturesSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.columnFeaturesDescription"
    testId="grid-showcase-column-features"
    titleKey="gridShowcase.columnFeaturesTitle"
  >
    <DataGrid
      allowReordering
      allowResizing
      showColumnChooser
      columns={COLUMN_FEATURE_COLS}
      data={EMPLOYEES}
      frozenColumns={FROZEN_COLUMN_COUNT}
      testId="grid-column-features"
      toolbar={TOOLBAR_ITEMS}
    />
    <CopyableCodeSnippet code='<DataGrid allowResizing allowReordering showColumnChooser columns={columns} data={data} frozenColumns={2} />' />
  </ShowcaseSection>
));

ColumnFeaturesSection.displayName = 'ColumnFeaturesSection';
