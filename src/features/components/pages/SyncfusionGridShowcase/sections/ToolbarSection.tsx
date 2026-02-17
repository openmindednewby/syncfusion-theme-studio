/**
 * Toolbar and context menu section: export buttons, search, right-click menu.
 */
import { memo } from 'react';

import type { ColumnModel, ContextMenuItem } from '@syncfusion/ej2-grids';

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

// Use Syncfusion's built-in context menu items so the grid handles actions
// automatically (AutoFit, Sort, etc.) without needing a custom click handler.
const CONTEXT_MENU_ITEMS: ContextMenuItem[] = [
  'AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
];

export const ToolbarSection = memo((): JSX.Element => (
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
      contextMenuItems={CONTEXT_MENU_ITEMS}
      data={EMPLOYEES}
      searchSettings={{ fields: ['name', 'email', 'role'], ignoreCase: true }}
      testId="grid-toolbar"
      toolbar={TOOLBAR_ITEMS}
    />
  </ShowcaseSection>
));

ToolbarSection.displayName = 'ToolbarSection';
