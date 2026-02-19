/**
 * Row drag and drop section: reorderable rows.
 */
import { memo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

import {
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_ROLE,
  COL_WIDTH_DEPARTMENT,
  COL_WIDTH_STATUS,
  PAGE_SIZE_FIVE,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

import type { Employee } from './data';

const DRAG_DATA: Employee[] = [
  { id: 1, name: 'Alice Martin', email: 'alice@co.com', role: 'Manager', status: 'Active', department: 'Engineering', salary: 95000, hireDate: '2020-03-15', country: 'USA' },
  { id: 2, name: 'Bob Chen', email: 'bob@co.com', role: 'Developer', status: 'Active', department: 'Engineering', salary: 82000, hireDate: '2021-06-01', country: 'Canada' },
  { id: 3, name: 'Clara Diaz', email: 'clara@co.com', role: 'Designer', status: 'Active', department: 'Design', salary: 78000, hireDate: '2019-11-20', country: 'UK' },
  { id: 4, name: 'Dan Evans', email: 'dan@co.com', role: 'Developer', status: 'Inactive', department: 'Engineering', salary: 88000, hireDate: '2018-01-10', country: 'USA' },
  { id: 5, name: 'Eva Fischer', email: 'eva@co.com', role: 'Analyst', status: 'Active', department: 'Analytics', salary: 72000, hireDate: '2022-04-05', country: 'Germany' },
];

const DRAG_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
];

export const DragDropSection = memo((): JSX.Element => (
  <ShowcaseSection
    descriptionKey="gridShowcase.dragDropDescription"
    testId="grid-showcase-drag-drop"
    titleKey="gridShowcase.dragDropTitle"
  >
    <DataGrid
      allowRowDragAndDrop
      allowSorting
      columns={DRAG_COLUMNS}
      data={DRAG_DATA}
      pageSettings={{ pageSize: PAGE_SIZE_FIVE }}
      testId="grid-drag-drop"
    />
    <CopyableCodeSnippet code='<DataGrid allowRowDragAndDrop columns={columns} data={data} />' />
  </ShowcaseSection>
));

DragDropSection.displayName = 'DragDropSection';
