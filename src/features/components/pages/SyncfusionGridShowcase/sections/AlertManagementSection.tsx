/**
 * Alert Management section: SIEM-style grid with shift leader bar,
 * KPI cards, toolbar, severity badges, SLA tracking, and checkbox selection.
 */
import { memo, useCallback, useMemo, useState } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type {
  FilterSettingsModel,
  PageSettingsModel,
  SelectionSettingsModel,
} from '@syncfusion/ej2-react-grids';

import { CopyableCodeSnippet } from '@/components/common';
import { DataGrid } from '@/components/ui/syncfusion';
import { TestIds } from '@/shared/testIds';

import {
  severityTemplate,
  statusTemplate,
  slaTemplate,
  scoreTemplate,
  actionsTemplate,
  assigneeTemplate,
  automationStatusTemplate,
} from './AlertBadgeTemplates';
import { AlertKpiCards } from './AlertKpiCards';
import { AlertShiftLeader } from './AlertShiftLeader';
import { AlertToolbar } from './AlertToolbar';
import { ShowcaseSection } from './ShowcaseSection';
import { SECURITY_ALERTS, ALERT_COLUMNS } from '../data/alertData';

function mapColumnTemplate(col: ColumnModel): ColumnModel {
  if (col.field === 'severity') return { ...col, template: severityTemplate };
  if (col.field === 'status') return { ...col, template: statusTemplate };
  if (col.field === 'slaStatus') return { ...col, template: slaTemplate };
  if (col.field === 'score') return { ...col, template: scoreTemplate };
  if (col.field === 'assignee') return { ...col, template: assigneeTemplate };
  if (col.field === 'automationStatus') return { ...col, template: automationStatusTemplate };
  if (col.field === 'actions') return { ...col, template: actionsTemplate };
  return col;
}

const CHECKBOX_WIDTH = 50;
const PAGE_SIZE = 10;
const PAGE_SIZE_MEDIUM = 20;
const PAGE_SIZE_LARGE = 50;
const PAGE_COUNT = 10;

const ALERT_GRID_COLUMNS: ColumnModel[] = [
  { field: 'checkbox', type: 'checkbox', width: CHECKBOX_WIDTH },
  ...ALERT_COLUMNS.map(mapColumnTemplate),
];

export const AlertManagementSection = memo((): JSX.Element => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleToggleFilter = useCallback(() => {
    setIsFilterVisible((prev) => !prev);
  }, []);

  const selectionSettings = useMemo(
    (): SelectionSettingsModel => ({
      type: 'Multiple',
      mode: 'Row',
      checkboxOnly: true,
    }),
    [],
  );

  const filterSettings = useMemo(
    (): FilterSettingsModel => ({
      type: isFilterVisible ? 'FilterBar' : 'Menu',
    }),
    [isFilterVisible],
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
      testId={TestIds.GRID_SHOWCASE_ALERT_MANAGEMENT}
      titleKey="gridShowcase.alertManagement"
    >
      <AlertShiftLeader />
      <AlertKpiCards />
      <AlertToolbar
        isFilterVisible={isFilterVisible}
        onToggleFilter={handleToggleFilter}
      />
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
        testId={TestIds.GRID_ALERT_MANAGEMENT}
      />
      <CopyableCodeSnippet code='<DataGrid allowFiltering allowPaging allowSorting columns={columns} data={alerts} filterSettings={filterSettings} />' />
    </ShowcaseSection>
  );
});

AlertManagementSection.displayName = 'AlertManagementSection';
