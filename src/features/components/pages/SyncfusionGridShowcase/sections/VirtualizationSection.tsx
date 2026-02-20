/**
 * Virtualization section: large dataset with row virtualization.
 */
import { memo, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';

import { ShowcaseSection } from './ShowcaseSection';
import {
  generateVirtualData,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_EMAIL,
  COL_WIDTH_ROLE,
  COL_WIDTH_DEPARTMENT,
  COL_WIDTH_SALARY,
  COL_WIDTH_STATUS,
  GRID_HEIGHT_VIRTUAL,
  VIRTUAL_ROW_COUNT,
  VIRTUAL_ROW_HEIGHT,
} from '../data/data';

const VIRTUAL_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
  { field: 'salary', headerText: FM('gridShowcase.salary'), width: COL_WIDTH_SALARY, format: 'C0', textAlign: 'Right' },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
];

export const VirtualizationSection = memo((): JSX.Element => {
  const virtualData = useMemo(() => generateVirtualData(VIRTUAL_ROW_COUNT), []);

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.virtualizationDescription"
      testId="grid-showcase-virtualization"
      titleKey="gridShowcase.virtualizationTitle"
    >
      <DataGrid
        enableVirtualization
        columns={VIRTUAL_COLUMNS}
        data={virtualData}
        height={GRID_HEIGHT_VIRTUAL}
        pageSettings={{ pageSize: VIRTUAL_ROW_COUNT }}
        rowHeight={VIRTUAL_ROW_HEIGHT}
        testId="grid-virtualization"
      />
      <CopyableCodeSnippet code='<DataGrid enableVirtualization columns={columns} data={largeData} height="400px" />' />
    </ShowcaseSection>
  );
});

VirtualizationSection.displayName = 'VirtualizationSection';
