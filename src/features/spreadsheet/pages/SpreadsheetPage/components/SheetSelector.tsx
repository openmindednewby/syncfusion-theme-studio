import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const SHEET_KEYS = ['salesReport', 'budgetTemplate', 'employeeRoster'] as const;

interface SheetSelectorProps {
  activeSheet: number;
  onSheetChange: (index: number) => void;
}

/** Buttons to switch between pre-loaded sample data sheets. */
export const SheetSelector = memo(
  ({ activeSheet, onSheetChange }: SheetSelectorProps): JSX.Element => (
    <div className="flex items-center gap-3" data-testid={TestIds.SPREADSHEET_SHEET_SELECTOR}>
      <span className="text-sm font-medium text-text-secondary">
        {FM('spreadsheet.sampleSheets')}
      </span>
      {SHEET_KEYS.map((key, index) => (
        <button
          key={key}
          className={`rounded-md px-3 py-1 text-sm transition-colors ${
            activeSheet === index
              ? 'bg-primary text-white'
              : 'bg-surface-alt text-text-secondary hover:bg-surface-hover'
          }`}
          data-testid={`${TestIds.SPREADSHEET_SHEET_BTN}-${key}`}
          type="button"
          onClick={() => onSheetChange(index)}
        >
          {FM(`spreadsheet.sheets.${key}.name`)}
        </button>
      ))}
    </div>
  ),
);

SheetSelector.displayName = 'SheetSelector';
