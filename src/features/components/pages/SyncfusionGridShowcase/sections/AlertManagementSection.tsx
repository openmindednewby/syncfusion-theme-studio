/**
 * Order Management showcase section: DataGrid with custom column templates
 * (priority badges, settlement tracking, value badges, action menus).
 * Dropdown actions fire toast feedback with row-specific data via closures.
 */
import { useCallback, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { PageSettingsModel, SelectionSettingsModel } from '@syncfusion/ej2-react-grids';

import { CopyableCodeSnippet } from '@/components/common';
import type { GridDropdownItem } from '@/components/ui/native';
import { useToast, ToastSeverity } from '@/components/ui/native';
import { DataGrid } from '@/components/ui/syncfusion';
import {
  priorityTemplate,
  statusTemplate,
  settlementTemplate,
  valueTemplate,
  brokerTemplate,
  executionMethodTemplate,
} from '@/features/alerts-incidents/pages/AlertsManagementPage/components';
import { TRADE_ORDERS, ORDER_COLUMNS } from '@/features/alerts-incidents/pages/AlertsManagementPage/data/alertData';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { TableActionMenu } from '@/features/components/shared/TableActionMenu';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';


const CHECKBOX_WIDTH = 50;
const PAGE_SIZE = 10;
const PAGE_SIZE_MEDIUM = 20;
const PAGE_SIZE_LARGE = 50;
const PAGE_COUNT = 10;

const SELECTION_SETTINGS: SelectionSettingsModel = {
  type: 'Multiple',
  mode: 'Row',
  checkboxOnly: true,
};

const PAGE_SETTINGS: PageSettingsModel = {
  pageSize: PAGE_SIZE,
  pageCount: PAGE_COUNT,
  pageSizes: [PAGE_SIZE, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE],
};

interface OrderTemplateData {
  id?: number;
  tickerSymbol?: string;
}

export const AlertManagementSection = (): JSX.Element => {
  const { addToast } = useToast();

  const actionsTemplate = useCallback(
    (data: OrderTemplateData): JSX.Element => {
      const orderId = String(data.id ?? '');
      const tickerSymbol = data.tickerSymbol ?? '';
      const toastTitle = FM('gridShowcase.actionToastTitle');

      const actions: GridDropdownItem[] = [
        {
          labelKey: 'gridShowcase.ignoreAlerts',
          testId: `order-action-ignore-${orderId}`,
          onClick: () => addToast({ severity: ToastSeverity.Info, title: toastTitle, message: FM('gridShowcase.actionIgnoreMessage', orderId, tickerSymbol) }),
        },
        {
          labelKey: 'gridShowcase.mergeAlerts',
          testId: `order-action-merge-${orderId}`,
          onClick: () => addToast({ severity: ToastSeverity.Info, title: toastTitle, message: FM('gridShowcase.actionMergeMessage', orderId, tickerSymbol) }),
        },
        {
          labelKey: 'gridShowcase.raiseIncident',
          testId: `order-action-raise-${orderId}`,
          onClick: () => addToast({ severity: ToastSeverity.Warning, title: toastTitle, message: FM('gridShowcase.actionRaiseMessage', orderId, tickerSymbol) }),
        },
        {
          labelKey: 'gridShowcase.addAlertFilter',
          testId: `order-action-add-filter-${orderId}`,
          onClick: () => addToast({ severity: ToastSeverity.Info, title: toastTitle, message: FM('gridShowcase.actionFilterMessage', orderId, tickerSymbol) }),
        },
      ];

      const handleView = (): void => {
        addToast({ severity: ToastSeverity.Success, title: toastTitle, message: FM('gridShowcase.actionViewMessage', orderId, tickerSymbol) });
      };

      return <TableActionMenu actions={actions} onViewClick={handleView} />;
    },
    [addToast],
  );

  const mapColumnTemplate = useCallback(
    (col: ColumnModel): ColumnModel => {
      if (col.field === 'priority') return { ...col, template: priorityTemplate };
      if (col.field === 'status') return { ...col, template: statusTemplate };
      if (col.field === 'settlementStatus') return { ...col, template: settlementTemplate };
      if (col.field === 'value') return { ...col, template: valueTemplate };
      if (col.field === 'broker') return { ...col, template: brokerTemplate };
      if (col.field === 'executionMethod') return { ...col, template: executionMethodTemplate };
      if (col.field === 'actions') return { ...col, template: actionsTemplate };
      return col;
    },
    [actionsTemplate],
  );

  const alertGridColumns = useMemo(
    (): ColumnModel[] => [
      { field: 'checkbox', type: 'checkbox', width: CHECKBOX_WIDTH },
      ...ORDER_COLUMNS.map(mapColumnTemplate),
    ],
    [mapColumnTemplate],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.alertManagementDesc"
      testId={TestIds.GRID_SHOWCASE_ALERT_MANAGEMENT}
      titleKey="gridShowcase.alertManagement"
    >
      <DataGrid
        allowPaging
        allowSorting
        columns={alertGridColumns}
        data={TRADE_ORDERS}
        pageSettings={PAGE_SETTINGS}
        selectionSettings={SELECTION_SETTINGS}
        testId={TestIds.GRID_ALERT_MANAGEMENT}
      />
      <CopyableCodeSnippet code='<DataGrid allowPaging allowSorting columns={alertColumns} data={alerts} selectionSettings={selectionSettings} />' />
    </ShowcaseSection>
  );
}

AlertManagementSection.displayName = 'AlertManagementSection';
