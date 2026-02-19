/**
 * Grouping section: group drop area and grouped columns.
 */
import { memo, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { GroupSettingsModel } from '@syncfusion/ej2-react-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_ROLE,
  COL_WIDTH_DEPARTMENT,
  COL_WIDTH_STATUS,
  COL_WIDTH_COUNTRY,
  GRID_HEIGHT_TALL,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

const GROUP_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'country', headerText: FM('gridShowcase.country'), width: COL_WIDTH_COUNTRY },
];

export const GroupingSection = memo((): JSX.Element => {
  const groupSettings = useMemo(
    (): GroupSettingsModel => ({
      columns: ['department'],
      showDropArea: true,
    }),
    [],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.groupingDescription"
      testId="grid-showcase-grouping"
      titleKey="gridShowcase.groupingTitle"
    >
      <DataGrid
        allowGrouping
        allowSorting
        columns={GROUP_COLUMNS}
        data={EMPLOYEES}
        groupSettings={groupSettings}
        height={GRID_HEIGHT_TALL}
        testId="grid-grouping"
      />
      <CopyableCodeSnippet code='<DataGrid allowGrouping columns={columns} data={data} groupSettings={{ columns: ["department"] }} />' />
    </ShowcaseSection>
  );
});

GroupingSection.displayName = 'GroupingSection';
