/**
 * Editing section: inline editing with command column (Edit/Delete/Save/Cancel).
 */
import { memo, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { EditSettingsModel } from '@syncfusion/ej2-react-grids';

import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

import {
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_EMAIL,
  COL_WIDTH_ROLE,
  COL_WIDTH_COMMAND,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

import type { Employee } from './data';

const INITIAL_EDIT_DATA: Employee[] = [
  { id: 1, name: 'Alice Martin', email: 'alice@co.com', role: 'Manager', status: 'Active', department: 'Engineering', salary: 95000, hireDate: '2020-03-15', country: 'USA' },
  { id: 2, name: 'Bob Chen', email: 'bob@co.com', role: 'Developer', status: 'Active', department: 'Engineering', salary: 82000, hireDate: '2021-06-01', country: 'Canada' },
  { id: 3, name: 'Clara Diaz', email: 'clara@co.com', role: 'Designer', status: 'Active', department: 'Design', salary: 78000, hireDate: '2019-11-20', country: 'UK' },
  { id: 4, name: 'Dan Evans', email: 'dan@co.com', role: 'Developer', status: 'Inactive', department: 'Engineering', salary: 88000, hireDate: '2018-01-10', country: 'USA' },
  { id: 5, name: 'Eva Fischer', email: 'eva@co.com', role: 'Analyst', status: 'Active', department: 'Analytics', salary: 72000, hireDate: '2022-04-05', country: 'Germany' },
];

const EDIT_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, isPrimaryKey: true, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  {
    field: 'commands',
    headerText: FM('table.actions'),
    width: COL_WIDTH_COMMAND,
    commands: [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat', content: FM('common.edit') } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', content: FM('common.delete') } },
      { type: 'Save', buttonOption: { cssClass: 'e-flat', content: FM('common.save') } },
      { type: 'Cancel', buttonOption: { cssClass: 'e-flat', content: FM('common.cancel') } },
    ],
  },
];

export const EditingSection = memo((): JSX.Element => {
  const editSettings = useMemo(
    (): EditSettingsModel => ({
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
    }),
    [],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.editingDescription"
      testId="grid-showcase-editing"
      titleKey="gridShowcase.editingTitle"
    >
      <DataGrid
        columns={EDIT_COLUMNS}
        data={INITIAL_EDIT_DATA}
        editSettings={editSettings}
        testId="grid-editing"
      />
    </ShowcaseSection>
  );
});

EditingSection.displayName = 'EditingSection';
