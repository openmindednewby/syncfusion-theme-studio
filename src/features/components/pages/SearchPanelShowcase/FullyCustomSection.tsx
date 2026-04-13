import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { IconDownload, IconRefreshLast24 } from '@/components/icons';
import {
  ButtonSize,
  DateRangePickerNative,
  IconButtonNative,
  IconButtonVariant,
  PanelAlign,
  SelectNative,
} from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { SearchPanel } from '@/features/components/shared/SearchPanel';
import { FM } from '@/localization/utils/helpers';
import { ComponentTestIds } from '@/shared/testIds.components';

function toDateString(date: Date): string {
  return date.toISOString().split('T')[0] ?? '';
}

const DAYS_AGO_7 = 7;

function getDefaultStartDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - DAYS_AGO_7);
  return toDateString(date);
}

const COLUMN_OPTIONS: SelectNativeOption[] = [
  { value: 'all', label: 'All Columns' },
  { value: 'name', label: 'Name' },
  { value: 'severity', label: 'Severity' },
  { value: 'status', label: 'Status' },
  { value: 'source', label: 'Source' },
];

const SEVERITY_OPTIONS: SelectNativeOption[] = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const STATUS_OPTIONS: SelectNativeOption[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

interface FullyCustomState {
  search: string;
  column: string;
  severity: string;
  status: string;
  startDate: string;
  endDate: string;
  lastAction: string;
}

function buildInitialState(): FullyCustomState {
  return {
    search: '',
    column: '',
    severity: '',
    status: '',
    startDate: getDefaultStartDate(),
    endDate: toDateString(new Date()),
    lastAction: '',
  };
}

const JSON_INDENT = 2;
const extraFilterStyle = { width: 'var(--component-search-panel-filter-width)' };

const FULLY_CUSTOM_CODE = `// All built-in actions hidden — re-assembled via leftSlot, rightSlot, and extraFilters
const [state, setState] = useState({
  search: '', column: '', severity: '', status: '',
  startDate: '2026-02-20', endDate: '2026-02-27', lastAction: '',
});
const handleSearch = useCallback((v: string) =>
  setState((p) => ({ ...p, search: v, lastAction: 'search' })), []);
const handleColumnChange = useCallback((v: string) =>
  setState((p) => ({ ...p, column: v, lastAction: 'columnChange' })), []);
const handleDateRangeChange = useCallback((start: string, end: string) =>
  setState((p) => ({ ...p, startDate: start, endDate: end, lastAction: 'dateRangeChange' })), []);

<SearchPanel
  columnOptions={COLUMN_OPTIONS}
  showFilterToggle={false} showMoreActions={false}
  showRefresh={false} showDateRange={false} showDownload={false}
  leftSlot={
    <DateRangePickerNative align={PanelAlign.Left}
      startDate={state.startDate} endDate={state.endDate}
      onRangeChange={handleDateRangeChange} />
  }
  rightSlot={<>
    <IconButtonNative icon={<IconRefreshLast24 />} onClick={handleRefresh} />
    <IconButtonNative icon={<IconDownload />} onClick={handleDownload} />
  </>}
  extraFilters={<>
    <SelectNative options={SEVERITY_OPTIONS} placeholder="Severity" onChange={handleSeverity} />
    <SelectNative options={STATUS_OPTIONS} placeholder="Status" onChange={handleStatus} />
  </>}
  onColumnChange={handleColumnChange}
  onSearch={handleSearch}
/>`;

export const FullyCustomSection = memo((): JSX.Element => {
  const [state, setState] = useState<FullyCustomState>(buildInitialState);

  const handleSearch = useCallback((value: string) => {
    setState((prev) => ({ ...prev, search: value, lastAction: 'search' }));
  }, []);

  const handleColumnChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, column: value, lastAction: 'columnChange' }));
  }, []);

  const handleDateRangeChange = useCallback((start: string, end: string) => {
    setState((prev) => ({ ...prev, startDate: start, endDate: end, lastAction: 'dateRangeChange' }));
  }, []);

  const handleRefresh = useCallback(() => {
    setState((prev) => ({ ...prev, lastAction: 'refresh' }));
  }, []);

  const handleDownload = useCallback(() => {
    setState((prev) => ({ ...prev, lastAction: 'download' }));
  }, []);

  const handleSeverityChange = useCallback((value: string | number) => {
    setState((prev) => ({ ...prev, severity: String(value), lastAction: 'severityChange' }));
  }, []);

  const handleStatusChange = useCallback((value: string | number) => {
    setState((prev) => ({ ...prev, status: String(value), lastAction: 'statusChange' }));
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.searchPanelShowcase.fullyCustom')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.searchPanelShowcase.fullyCustomDesc')}
        </p>
      </div>
      <SearchPanel
        columnOptions={COLUMN_OPTIONS}
        extraFilters={
          <>
            <div style={extraFilterStyle}>
              <SelectNative options={SEVERITY_OPTIONS} placeholder="Severity" onChange={handleSeverityChange} />
            </div>
            <div style={extraFilterStyle}>
              <SelectNative options={STATUS_OPTIONS} placeholder="Status" onChange={handleStatusChange} />
            </div>
          </>
        }
        leftSlot={
          <DateRangePickerNative
            align={PanelAlign.Left}
            endDate={state.endDate}
            startDate={state.startDate}
            testId="search-panel-custom-daterange"
            onRangeChange={handleDateRangeChange}
          />
        }
        rightSlot={
          <>
            <IconButtonNative
              ariaLabel={FM('common.refresh')}
              icon={<IconRefreshLast24 />}
              size={ButtonSize.Sm}
              variant={IconButtonVariant.Outline}
              onClick={handleRefresh}
            />
            <IconButtonNative
              ariaLabel={FM('common.download')}
              icon={<IconDownload className="h-4 w-4" />}
              size={ButtonSize.Sm}
              variant={IconButtonVariant.Outline}
              onClick={handleDownload}
            />
          </>
        }
        showDateRange={false}
        showDownload={false}
        showFilterToggle={false}
        showMoreActions={false}
        showRefresh={false}
        testId={ComponentTestIds.SEARCH_PANEL_FULLY_CUSTOM}
        onColumnChange={handleColumnChange}
        onSearch={handleSearch}
      />
      <div className="rounded-md border border-border bg-surface-elevated p-4">
        <h4 className="mb-2 text-sm font-medium text-text-primary">
          {FM('components.searchPanelShowcase.currentState')}
        </h4>
        <pre className="overflow-x-auto text-xs text-text-secondary" data-testid={ComponentTestIds.SEARCH_PANEL_FULLY_CUSTOM_STATE}>
          {JSON.stringify(state, null, JSON_INDENT)}
        </pre>
      </div>
      <CopyableCodeSnippet code={FULLY_CUSTOM_CODE} />
    </section>
  );
});

FullyCustomSection.displayName = 'FullyCustomSection';
