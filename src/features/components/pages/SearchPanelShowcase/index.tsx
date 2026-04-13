import { useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { SelectNative } from '@/components/ui/native';
import type { SelectNativeOption } from '@/components/ui/native';
import { FullyCustomSection } from '@/features/components/pages/SearchPanelShowcase/FullyCustomSection';
import { InteractiveSection } from '@/features/components/pages/SearchPanelShowcase/InteractiveSection';
import { SearchPanel } from '@/features/components/shared/SearchPanel';
import type { FilterConfig } from '@/features/components/shared/SearchPanel';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const ISO_DATE_LENGTH = 10;

function toDateString(date: Date): string {
  return date.toISOString().slice(0, ISO_DATE_LENGTH);
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
  { label: 'Category', options: SEVERITY_OPTIONS },
  { label: 'Assignee', options: STATUS_OPTIONS },
  { label: 'Priority', options: SEVERITY_OPTIONS },
  { label: 'Region', options: SOURCE_OPTIONS },
  { label: 'Type', options: STATUS_OPTIONS },
];

const DEFAULT_CODE = `const [expanded, setExpanded] = useState(false);
const [startDate, setStartDate] = useState('2026-02-20');
const [endDate, setEndDate] = useState('2026-02-27');

<SearchPanel
  columnOptions={COLUMN_OPTIONS}
  endDate={endDate}
  expanded={expanded}
  filters={SAMPLE_FILTERS}
  startDate={startDate}
  onDateRangeChange={(start, end) => { setStartDate(start); setEndDate(end); }}
  onToggleFilter={() => setExpanded((v) => !v)}
/>`;

const EXPANDED_CODE = `const [expanded, setExpanded] = useState(true);

<SearchPanel
  columnOptions={COLUMN_OPTIONS}
  endDate={endDate}
  expanded={expanded}
  filters={SAMPLE_FILTERS}
  startDate={startDate}
  onDateRangeChange={handleDateRangeChange}
  onToggleFilter={() => setExpanded((v) => !v)}
/>`;

const MINIMAL_CODE = `// Hide most built-in controls — only search + refresh + download remain
<SearchPanel
  showColumnPicker={false}
  showDateRange={false}
  showFilterToggle={false}
  showMoreActions={false}
/>`;

const SLOTS_CODE = `// Column picker with table-matching options, custom slots, extra filters via extraFilters
<SearchPanel
  columnOptions={COLUMN_OPTIONS}
  extraFilters={
    <>
      <div style={{ width: 'var(--component-search-panel-filter-width)' }}>
        <SelectNative options={SEVERITY_OPTIONS} placeholder="Severity" />
      </div>
      <div style={{ width: 'var(--component-search-panel-filter-width)' }}>
        <SelectNative options={STATUS_OPTIONS} placeholder="Status" />
      </div>
    </>
  }
  leftSlot={<span>Left Slot</span>}
  rightSlot={<span>Right Slot</span>}
  showFilterToggle={false}
/>`;

const slotStyle = { padding: '4px 8px', fontSize: '12px', borderRadius: '4px', background: 'var(--component-search-panel-bg)', border: '1px dashed var(--component-search-panel-border)' };
const extraFilterStyle = { width: 'var(--component-search-panel-filter-width)' };

const SearchPanelShowcase = (): JSX.Element => {
  const [expandedA, setExpandedA] = useState(false);
  const [expandedB, setExpandedB] = useState(true);
  const [startDate, setStartDate] = useState(getDefaultStartDate);
  const [endDate, setEndDate] = useState(() => toDateString(new Date()));

  const handleDateRangeChange = (start: string, end: string): void => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="h-full overflow-y-auto p-6" data-testid={TestIds.SEARCH_PANEL_SHOWCASE}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{FM('components.searchPanelShowcase.title')}</h2>
          <p className="mt-1 text-text-secondary">{FM('components.searchPanelShowcase.description')}</p>
        </div>
        <section className="card space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">{FM('components.searchPanelShowcase.defaultState')}</h3>
          <SearchPanel
            columnOptions={COLUMN_OPTIONS}
            endDate={endDate}
            expanded={expandedA}
            filters={SAMPLE_FILTERS}
            startDate={startDate}
            testId="search-panel-default"
            onDateRangeChange={handleDateRangeChange}
            onToggleFilter={() => setExpandedA((v) => !v)}
          />
          <CopyableCodeSnippet code={DEFAULT_CODE} />
        </section>
        <section className="card space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">{FM('components.searchPanelShowcase.expandedState')}</h3>
          <SearchPanel
            columnOptions={COLUMN_OPTIONS}
            endDate={endDate}
            expanded={expandedB}
            filters={SAMPLE_FILTERS}
            startDate={startDate}
            testId="search-panel-expanded"
            onDateRangeChange={handleDateRangeChange}
            onToggleFilter={() => setExpandedB((v) => !v)}
          />
          <CopyableCodeSnippet code={EXPANDED_CODE} />
        </section>
        <section className="card space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">{FM('components.searchPanelShowcase.minimalVariant')}</h3>
          <p className="text-sm text-text-secondary">{FM('components.searchPanelShowcase.minimalVariantDesc')}</p>
          <SearchPanel
            showColumnPicker={false}
            showDateRange={false}
            showFilterToggle={false}
            showMoreActions={false}
            testId="search-panel-minimal"
          />
          <CopyableCodeSnippet code={MINIMAL_CODE} />
        </section>
        <section className="card space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">{FM('components.searchPanelShowcase.customSlots')}</h3>
          <p className="text-sm text-text-secondary">{FM('components.searchPanelShowcase.customSlotsDesc')}</p>
          <SearchPanel
            columnOptions={COLUMN_OPTIONS}
            extraFilters={
              <>
                <div style={extraFilterStyle}>
                  <SelectNative options={SEVERITY_OPTIONS} placeholder="Severity" />
                </div>
                <div style={extraFilterStyle}>
                  <SelectNative options={STATUS_OPTIONS} placeholder="Status" />
                </div>
              </>
            }
            leftSlot={<span style={slotStyle}>{FM('components.searchPanelShowcase.leftSlot')}</span>}
            rightSlot={<span style={slotStyle}>{FM('components.searchPanelShowcase.rightSlot')}</span>}
            showFilterToggle={false}
            testId="search-panel-slots"
          />
          <CopyableCodeSnippet code={SLOTS_CODE} />
        </section>
        <FullyCustomSection />
        <InteractiveSection />
      </div>
    </div>
  );
};

export default SearchPanelShowcase;
