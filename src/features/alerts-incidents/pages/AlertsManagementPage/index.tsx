/**
 * Order Management page: Trading-style grid with floor manager bar,
 * KPI cards, search panel, priority badges, settlement tracking, and checkbox selection.
 * Fetches orders from POST /api/alert via the generated Orval function.
 */
import { memo, useCallback, useMemo, useRef, useState } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type {
  FilterSettingsModel,
  GridComponent,
  PageSettingsModel,
  SelectionSettingsModel,
} from '@syncfusion/ej2-react-grids';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { mockServerWebAlertsListAlerts } from '@/api/generated/mockserver/alert/alert';
import { ExportToolbar } from '@/components/ui/shared';
import { DataGrid } from '@/components/ui/syncfusion';
import { SearchPanel } from '@/features/components/shared/SearchPanel';
import { buildExportFileName, useGridExport } from '@/hooks/useGridExport';
import { TestIds } from '@/shared/testIds';

import {
  AlertShiftLeader,
  AlertKpiCards,
  priorityTemplate,
  statusTemplate,
  settlementTemplate,
  valueTemplate,
  actionsTemplate,
  brokerTemplate,
  executionMethodTemplate,
} from './components';
import { ORDER_COLUMNS } from './data/alertData';
import { mapOrderDtoToTradeOrder } from './utils/alertMapper';
import { toIsoWithOffset } from './utils/dateConversion';

function mapColumnTemplate(col: ColumnModel): ColumnModel {
  if (col.field === 'priority') return { ...col, template: priorityTemplate };
  if (col.field === 'status') return { ...col, template: statusTemplate };
  if (col.field === 'settlementStatus') return { ...col, template: settlementTemplate };
  if (col.field === 'value') return { ...col, template: valueTemplate };
  if (col.field === 'broker') return { ...col, template: brokerTemplate };
  if (col.field === 'executionMethod') return { ...col, template: executionMethodTemplate };
  if (col.field === 'actions') return { ...col, template: actionsTemplate };
  return col;
}

const CHECKBOX_WIDTH = 50;
const PAGE_SIZE = 10;
const PAGE_SIZE_MEDIUM = 20;
const PAGE_SIZE_LARGE = 50;
const PAGE_COUNT = 10;
const MS_PER_DAY = 86400000;
const PAD_WIDTH = 2;

function toYmd(date: Date): string {
  const y = String(date.getFullYear());
  const m = String(date.getMonth() + 1).padStart(PAD_WIDTH, '0');
  const d = String(date.getDate()).padStart(PAD_WIDTH, '0');
  return `${y}-${m}-${d}`;
}

const TODAY = toYmd(new Date());
const YESTERDAY = toYmd(new Date(Date.now() - MS_PER_DAY));

const ORDER_GRID_COLUMNS: ColumnModel[] = [
  { field: 'checkbox', type: 'checkbox', width: CHECKBOX_WIDTH },
  ...ORDER_COLUMNS.map(mapColumnTemplate),
];

const EMPTY_ORDERS: never[] = [];
const ALERTS_FILE_NAME = 'alerts';
const PDF_OPTIONS = { headerText: 'Order Management', includePageNumbers: true };

const AlertsManagementPage = memo((): JSX.Element => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(YESTERDAY);
  const [endDate, setEndDate] = useState(TODAY);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const gridRef = useRef<GridComponent | undefined>(undefined);
  const exportFileName = useMemo(() => buildExportFileName(ALERTS_FILE_NAME), []);
  const { isExporting, exportToExcel, exportToCsv, exportToPdf } =
    useGridExport(gridRef, exportFileName, PDF_OPTIONS);

  const orderQueryKey = useMemo(
    () => ['orders', 'list', startDate, endDate] as const,
    [startDate, endDate],
  );

  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: orderQueryKey,
    queryFn: async () => mockServerWebAlertsListAlerts({
      fromDate: toIsoWithOffset(startDate),
      toDate: toIsoWithOffset(endDate, true),
      page: 0,
      size: PAGE_SIZE_LARGE,
    }),
  });

  const orders = useMemo(
    () => response?.data.alerts?.map(mapOrderDtoToTradeOrder) ?? EMPTY_ORDERS,
    [response],
  );

  const handleDateRangeChange = useCallback((start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: [...orderQueryKey] });
  }, [queryClient, orderQueryKey]);

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
    <div className="space-y-4">
      <AlertShiftLeader />
      <AlertKpiCards />
      <div className="flex items-center justify-between gap-3">
        <SearchPanel
          showDownload
          showFilterToggle
          showRefresh
          endDate={endDate}
          expanded={isFilterVisible}
          showColumnPicker={false}
          showMoreActions={false}
          startDate={startDate}
          testId={TestIds.ALERT_TOOLBAR}
          onDateRangeChange={handleDateRangeChange}
          onRefresh={handleRefresh}
          onToggleFilter={handleToggleFilter}
        />
        <ExportToolbar
          isExporting={isExporting}
          onExportCsv={exportToCsv}
          onExportExcel={exportToExcel}
          onExportPdf={exportToPdf}
        />
      </div>
      <DataGrid
        key={isLoading ? 'loading' : 'loaded'}
        allowExcelExport
        allowPaging
        allowPdfExport
        allowSorting
        columns={ORDER_GRID_COLUMNS}
        data={orders}
        filterSettings={filterSettings}
        gridRef={gridRef}
        isLoading={isFetching}
        pageSettings={pageSettings}
        selectionSettings={selectionSettings}
        testId={TestIds.GRID_ALERT_MANAGEMENT}
      />
    </div>
  );
});

AlertsManagementPage.displayName = 'AlertsManagementPage';

export default AlertsManagementPage;
