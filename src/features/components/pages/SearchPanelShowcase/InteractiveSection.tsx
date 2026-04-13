import { memo, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import type { SelectNativeOption } from '@/components/ui/native';
import { SearchPanel } from '@/features/components/shared/SearchPanel';
import type { FilterConfig } from '@/features/components/shared/SearchPanel';
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

interface SearchPanelState {
  search: string;
  column: string;
  startDate: string;
  endDate: string;
  expanded: boolean;
  filters: Record<string, string>;
  lastAction: string;
}

function buildInitialState(): SearchPanelState {
  return {
    search: '',
    column: '',
    startDate: getDefaultStartDate(),
    endDate: toDateString(new Date()),
    expanded: true,
    filters: {},
    lastAction: '',
  };
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

const SOURCE_OPTIONS: SelectNativeOption[] = [
  { value: 'all', label: 'All' },
  { value: 'firewall', label: 'Firewall' },
  { value: 'ids', label: 'IDS/IPS' },
  { value: 'endpoint', label: 'Endpoint' },
  { value: 'cloud', label: 'Cloud' },
];

const SAMPLE_FILTERS: FilterConfig[] = [
  { label: 'Severity', options: SEVERITY_OPTIONS },
  { label: 'Status', options: STATUS_OPTIONS },
  { label: 'Source', options: SOURCE_OPTIONS },
];

const JSON_INDENT = 2;

const INTERACTIVE_CODE = `// Full interactive demo — every callback updates a shared state object
interface SearchPanelState {
  search: string; column: string; startDate: string; endDate: string;
  expanded: boolean; filters: Record<string, string>; lastAction: string;
}
const [state, setState] = useState<SearchPanelState>(buildInitialState);

const handleSearch = useCallback((value: string) => {
  setState((prev) => ({ ...prev, search: value, lastAction: 'search' }));
}, []);
const handleColumnChange = useCallback((value: string) => {
  setState((prev) => ({ ...prev, column: value, lastAction: 'columnChange' }));
}, []);
const handleFilterChange = useCallback((label: string, value: string) => {
  setState((prev) => ({
    ...prev, filters: { ...prev.filters, [label]: value },
    lastAction: \`filterChange:\${label}\`,
  }));
}, []);
const handleToggleFilter = useCallback(() => {
  setState((prev) => ({ ...prev, expanded: !prev.expanded, lastAction: 'toggleFilter' }));
}, []);

<SearchPanel
  columnOptions={COLUMN_OPTIONS}
  endDate={state.endDate}
  expanded={state.expanded}
  filters={SAMPLE_FILTERS}
  startDate={state.startDate}
  onColumnChange={handleColumnChange}
  onDateRangeChange={handleDateRangeChange}
  onDownload={handleDownload}
  onFilterChange={handleFilterChange}
  onRefresh={handleRefresh}
  onSearch={handleSearch}
  onToggleFilter={handleToggleFilter}
/>`;

export const InteractiveSection = memo((): JSX.Element => {
  const [state, setState] = useState<SearchPanelState>(buildInitialState);

  const handleSearch = useCallback((value: string) => {
    setState((prev) => ({ ...prev, search: value, lastAction: 'search' }));
  }, []);

  const handleColumnChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, column: value, lastAction: 'columnChange' }));
  }, []);

  const handleDateRangeChange = useCallback((start: string, end: string) => {
    setState((prev) => ({ ...prev, startDate: start, endDate: end, lastAction: 'dateRangeChange' }));
  }, []);

  const handleFilterChange = useCallback((filterLabel: string, value: string) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, [filterLabel]: value },
      lastAction: `filterChange:${filterLabel}`,
    }));
  }, []);

  const handleToggleFilter = useCallback(() => {
    setState((prev) => ({ ...prev, expanded: !prev.expanded, lastAction: 'toggleFilter' }));
  }, []);

  const handleRefresh = useCallback(() => {
    setState((prev) => ({ ...prev, lastAction: 'refresh' }));
  }, []);

  const handleDownload = useCallback(() => {
    setState((prev) => ({ ...prev, lastAction: 'download' }));
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.searchPanelShowcase.interactive')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.searchPanelShowcase.interactiveDesc')}
        </p>
      </div>
      <SearchPanel
        columnOptions={COLUMN_OPTIONS}
        endDate={state.endDate}
        expanded={state.expanded}
        filters={SAMPLE_FILTERS}
        startDate={state.startDate}
        testId={ComponentTestIds.SEARCH_PANEL_INTERACTIVE}
        onColumnChange={handleColumnChange}
        onDateRangeChange={handleDateRangeChange}
        onDownload={handleDownload}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        onSearch={handleSearch}
        onToggleFilter={handleToggleFilter}
      />
      <div className="rounded-md border border-border bg-surface-elevated p-4">
        <h4 className="mb-2 text-sm font-medium text-text-primary">
          {FM('components.searchPanelShowcase.currentState')}
        </h4>
        <pre className="overflow-x-auto text-xs text-text-secondary" data-testid={ComponentTestIds.SEARCH_PANEL_INTERACTIVE_STATE}>
          {JSON.stringify(state, null, JSON_INDENT)}
        </pre>
      </div>
      <CopyableCodeSnippet code={INTERACTIVE_CODE} />
    </section>
  );
});

InteractiveSection.displayName = 'InteractiveSection';
