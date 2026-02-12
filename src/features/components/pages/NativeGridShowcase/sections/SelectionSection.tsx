/**
 * SelectionSection demonstrates row selection modes:
 * Single selection, Multiple selection, and Checkbox selection.
 */
import { memo, useCallback, useState } from 'react';

import { TableNative } from '@/components/ui/native';
import type { SelectionConfig } from '@/components/ui/native';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { EMPLOYEE_COLUMNS, EMPLOYEES } from '../sampleData';

type DataRow = Record<string, unknown>;

const SINGLE_SELECTION: SelectionConfig = { type: 'Single', mode: 'Row' };
const MULTI_SELECTION: SelectionConfig = { type: 'Multiple', mode: 'Row' };
const CHECKBOX_SELECTION: SelectionConfig = { type: 'Multiple', mode: 'Row', checkbox: true };

const SELECTION_MODES = ['single', 'multiple', 'checkbox'] as const;

type SelectionModeKey = (typeof SELECTION_MODES)[number];

const SELECTION_CONFIGS: Record<SelectionModeKey, SelectionConfig> = {
  single: SINGLE_SELECTION,
  multiple: MULTI_SELECTION,
  checkbox: CHECKBOX_SELECTION,
};

const SELECTION_TEST_IDS: Record<SelectionModeKey, string> = {
  single: TestIds.NATIVE_GRID_SELECT_SINGLE,
  multiple: TestIds.NATIVE_GRID_SELECT_MULTI,
  checkbox: TestIds.NATIVE_GRID_SELECT_CHECKBOX,
};

const ACTIVE_TAB_STYLE = 'border-primary-500 text-primary-600';
const INACTIVE_TAB_STYLE = 'border-transparent text-text-secondary hover:text-text-primary hover:border-border';
const ZERO_SELECTED = 0;

export const SelectionSection = memo((): JSX.Element => {
  const [activeMode, setActiveMode] = useState<SelectionModeKey>('single');
  const [selectedCount, setSelectedCount] = useState(ZERO_SELECTED);

  const handleSelectionChange = useCallback((rows: DataRow[]) => {
    setSelectedCount(rows.length);
  }, []);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.gridShowcase.sections.selection')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.gridShowcase.sections.selectionDesc')}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 border-b border-border" data-testid={TestIds.NATIVE_GRID_SELECT_TABS}>
          {SELECTION_MODES.map((mode) => (
            <button
              key={mode}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeMode === mode ? ACTIVE_TAB_STYLE : INACTIVE_TAB_STYLE
              }`}
              data-testid={`select-tab-${mode}`}
              type="button"
              onClick={() => setActiveMode(mode)}
            >
              {FM(`components.gridShowcase.selectionModes.${mode}`)}
            </button>
          ))}
        </div>
        <span className="text-sm text-text-secondary" data-testid={TestIds.NATIVE_GRID_SELECTED_COUNT}>
          {FM('components.gridShowcase.selectedCount', String(selectedCount))}
        </span>
      </div>
      <TableNative
        ariaLabel={FM('components.gridShowcase.sections.selection')}
        columns={EMPLOYEE_COLUMNS}
        data={EMPLOYEES}
        selectionConfig={SELECTION_CONFIGS[activeMode]}
        testId={SELECTION_TEST_IDS[activeMode]}
        onSelectionChange={handleSelectionChange}
      />
    </section>
  );
});

SelectionSection.displayName = 'SelectionSection';
