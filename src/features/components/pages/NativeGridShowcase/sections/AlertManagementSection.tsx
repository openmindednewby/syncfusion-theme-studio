/**
 * Order Management section for Native Grid: Trading-style table with
 * floor manager bar, KPI cards, toolbar, checkbox selection, and badge formatting.
 * Dropdown actions fire toast feedback with row-specific data via closures.
 */
import { type ReactNode, useState, useCallback, useMemo } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { TableNative, useToast, ToastSeverity } from '@/components/ui/native';
import type { GridDropdownItem, SelectionConfig, TableColumn  } from '@/components/ui/native';
import { AlertKpiCards, AlertShiftLeader, AlertToolbar } from '@/features/alerts-incidents/pages/AlertsManagementPage/components';
import { ShowcaseSection } from '@/features/components/shared/ShowcaseSection';
import { TableActionMenu } from '@/features/components/shared/TableActionMenu';
import type { GridConfig } from '@/lib/grid/types';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { TRADE_ORDERS, NATIVE_ORDER_COLUMNS } from '../alertData';

const PAGE_SIZE = 10;

const ORDER_SELECTION: SelectionConfig = {
  type: 'Multiple',
  mode: 'Row',
  checkbox: true,
};

const DEFAULT_START = '2026-01-01';
const DEFAULT_END = '2026-02-26';

export const AlertManagementSection = (): JSX.Element => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [startDate, setStartDate] = useState(DEFAULT_START);
  const [endDate, setEndDate] = useState(DEFAULT_END);
  const { addToast } = useToast();

  const handleToggleFilter = useCallback(() => {
    setIsFilterVisible((prev) => !prev);
  }, []);

  const handleDateRangeChange = useCallback((start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  const handleRefresh = useCallback(() => {
    addToast({ severity: ToastSeverity.Info, title: FM('gridShowcase.actionToastTitle'), message: FM('gridShowcase.refreshMessage') });
  }, [addToast]);

  const gridConfig = useMemo(
    (): GridConfig => ({
      filter: { enabled: isFilterVisible },
      pagination: { enabled: true, pageSize: PAGE_SIZE },
    }),
    [isFilterVisible],
  );

  const actionsTemplate = useCallback(
    (row: Record<string, unknown>): ReactNode => {
      const orderId = String(row['id'] ?? '');
      const tickerSymbol = String(row['tickerSymbol'] ?? '');
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

  const columns = useMemo(
    (): TableColumn[] => NATIVE_ORDER_COLUMNS.map((col) =>
      col.field === 'actions' ? { ...col, template: actionsTemplate } : col,
    ),
    [actionsTemplate],
  );

  return (
    <ShowcaseSection
      descriptionKey="gridShowcase.alertManagementDesc"
      testId="native-grid-showcase-alert-management"
      titleKey="gridShowcase.alertManagement"
    >
      <AlertShiftLeader />
      <AlertKpiCards />
      <AlertToolbar
        endDate={endDate}
        isFilterVisible={isFilterVisible}
        startDate={startDate}
        onDateRangeChange={handleDateRangeChange}
        onRefresh={handleRefresh}
        onToggleFilter={handleToggleFilter}
      />
      <TableNative
        hoverable
        showColumnMenu
        striped
        ariaLabel={FM('components.gridShowcase.sections.alertManagement')}
        columns={columns}
        data={TRADE_ORDERS}
        gridConfig={gridConfig}
        selectionConfig={ORDER_SELECTION}
        testId={TestIds.NATIVE_GRID_ALERT_MANAGEMENT}
      />
      <CopyableCodeSnippet code='<TableNative striped hoverable showColumnMenu columns={columns} data={data} selectionConfig={selectionConfig} gridConfig={gridConfig} />' />
    </ShowcaseSection>
  );
}

AlertManagementSection.displayName = 'AlertManagementSection';
