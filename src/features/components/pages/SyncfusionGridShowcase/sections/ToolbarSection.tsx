/**
 * Toolbar and context menu section: export buttons, search, right-click menu.
 */
import { memo, useMemo } from 'react';

import type { ColumnModel, ContextMenuItemModel } from '@syncfusion/ej2-grids';

import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';

import {
  EMPLOYEES,
  COL_WIDTH_ID,
  COL_WIDTH_NAME,
  COL_WIDTH_EMAIL,
  COL_WIDTH_ROLE,
  COL_WIDTH_DEPARTMENT,
  COL_WIDTH_STATUS,
  GRID_HEIGHT_DEFAULT,
} from './data';
import { ShowcaseSection } from './ShowcaseSection';

const TOOLBAR_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('common.id'), width: COL_WIDTH_ID, textAlign: 'Right' },
  { field: 'name', headerText: FM('common.name'), width: COL_WIDTH_NAME },
  { field: 'email', headerText: FM('common.email'), width: COL_WIDTH_EMAIL },
  { field: 'role', headerText: FM('common.role'), width: COL_WIDTH_ROLE },
  { field: 'department', headerText: FM('gridShowcase.department'), width: COL_WIDTH_DEPARTMENT },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
];

const TOOLBAR_ITEMS = ['Search', 'Print', 'ExcelExport', 'PdfExport'];

export const ToolbarSection = memo((): JSX.Element => {
  const contextMenuItems = useMemo(
    (): ContextMenuItemModel[] => [
      { text: FM('gridShowcase.contextAutoFit'), id: 'autofit', target: '.e-content' },
      { text: FM('gridShowcase.contextAutoFitAll'), id: 'autofitall', target: '.e-content' },
      { text: FM('gridShowcase.contextSortAsc'), id: 'sortasc', target: '.e-headercontent' },
      { text: FM('gridShowcase.contextSortDesc'), id: 'sortdesc', target: '.e-headercontent' },
    ],
    [],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.toolbarDescription"
      testId="grid-showcase-toolbar"
      titleKey="gridShowcase.toolbarTitle"
    >
      <DataGrid
        allowExcelExport
        allowPdfExport
        allowSorting
        columns={TOOLBAR_COLUMNS}
        contextMenuItems={contextMenuItems}
        data={EMPLOYEES}
        height={GRID_HEIGHT_DEFAULT}
        searchSettings={{ fields: ['name', 'email', 'role'], ignoreCase: true }}
        testId="grid-toolbar"
        toolbar={TOOLBAR_ITEMS}
      />
    </ShowcaseSection>
  );
});

ToolbarSection.displayName = 'ToolbarSection';
