/**
 * Selection section: checkbox selection with row and cell modes.
 */
import { memo, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { SelectionSettingsModel } from '@syncfusion/ej2-react-grids';

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
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

const CHECKBOX_WIDTH = 50;

const SELECTION_COLUMNS: ColumnModel[] = [
  { field: 'checkbox', type: 'checkbox', width: CHECKBOX_WIDTH },
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
];

export const SelectionSection = memo((): JSX.Element => {
  const selectionSettings = useMemo(
    (): SelectionSettingsModel => ({
      type: 'Multiple',
      mode: 'Row',
      checkboxOnly: true,
    }),
    [],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.selectionDescription"
      testId="grid-showcase-selection"
      titleKey="gridShowcase.selectionTitle"
    >
      <DataGrid
        columns={SELECTION_COLUMNS}
        data={EMPLOYEES}
        selectionSettings={selectionSettings}
        testId="grid-selection"
      />
      <CopyableCodeSnippet code='<DataGrid columns={columns} data={data} selectionSettings={{ type: "Multiple", mode: "Row" }} />' />
    </ShowcaseSection>
  );
});

SelectionSection.displayName = 'SelectionSection';
