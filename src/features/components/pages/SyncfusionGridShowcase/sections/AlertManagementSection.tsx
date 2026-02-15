/**
 * Alert Management section: SIEM-style grid with shift leader bar,
 * KPI cards, toolbar, severity badges, SLA tracking, and checkbox selection.
 */
import { memo, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type {
  FilterSettingsModel,
  PageSettingsModel,
  SelectionSettingsModel,
} from '@syncfusion/ej2-react-grids';

import { DataGrid } from '@/components/ui/syncfusion';

import {
  severityTemplate,
  statusTemplate,
  slaTemplate,
  scoreTemplate,
  actionsTemplate,
} from './AlertBadgeTemplates';
import { SECURITY_ALERTS, ALERT_COLUMNS } from './alertData';
import { AlertKpiCards } from './AlertKpiCards';
import { AlertShiftLeader } from './AlertShiftLeader';
import { AlertToolbar } from './AlertToolbar';
import { ShowcaseSection } from './ShowcaseSection';

const CHECKBOX_WIDTH = 50;
const PAGE_SIZE = 10;
const PAGE_SIZE_MEDIUM = 20;
const PAGE_SIZE_LARGE = 50;
const PAGE_COUNT = 10;

function mapColumnTemplate(col: ColumnModel): ColumnModel {
  if (col.field === 'severity') return { ...col, template: severityTemplate };
  if (col.field === 'status') return { ...col, template: statusTemplate };
  if (col.field === 'slaStatus') return { ...col, template: slaTemplate };
  if (col.field === 'score') return { ...col, template: scoreTemplate };
  if (col.field === 'actions') return { ...col, template: actionsTemplate };
  return col;
}

const ALERT_GRID_COLUMNS: ColumnModel[] = [
  { field: 'checkbox', type: 'checkbox', width: CHECKBOX_WIDTH },
  ...ALERT_COLUMNS.map(mapColumnTemplate),
];

export const AlertManagementSection = memo((): JSX.Element => {
  const selectionSettings = useMemo(
    (): SelectionSettingsModel => ({
      type: 'Multiple',
      mode: 'Row',
      checkboxOnly: true,
    }),
    [],
  );

  const filterSettings = useMemo(
    (): FilterSettingsModel => ({ type: 'Menu' }),
    [],
  );

  const pageSettings = useMemo(
    (): PageSettingsModel => ({
      pageSize: PAGE_SIZE,
      pageCount: PAGE_COUNT,
      pageSizes: [PAGE_SIZE, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE],
    }),
    [],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.alertManagementDesc"
      testId="grid-showcase-alert-management"
      titleKey="gridShowcase.alertManagement"
    >
      <AlertShiftLeader />
      <AlertKpiCards />
      <AlertToolbar />
      <DataGrid
        allowFiltering
        allowPaging
        allowSorting
        showColumnMenu
        columns={ALERT_GRID_COLUMNS}
        data={SECURITY_ALERTS}
        filterSettings={filterSettings}
        pageSettings={pageSettings}
        selectionSettings={selectionSettings}
        testId="grid-alert-management"
      />
    </ShowcaseSection>
  );
});

AlertManagementSection.displayName = 'AlertManagementSection';
