import { memo, useCallback, useMemo, useState } from 'react';

import type { SheetModel } from '@syncfusion/ej2-react-spreadsheet';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';


import { SheetSelector } from './components/SheetSelector';
import { SpreadsheetView } from './components/SpreadsheetView';
import { getSampleSheets } from '../../data/sampleSheets';


const INITIAL_SHEET_INDEX = 0;

const SpreadsheetPage = memo((): JSX.Element => {
  const [activeSheet, setActiveSheet] = useState(INITIAL_SHEET_INDEX);
  const allSheets = useMemo((): SheetModel[] => getSampleSheets(), []);

  const handleSheetChange = useCallback((index: number) => {
    setActiveSheet(index);
  }, []);

  return (
    <div className="space-y-4" data-testid={TestIds.SPREADSHEET_PAGE}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            {FM('spreadsheet.title')}
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            {FM('spreadsheet.description')}
          </p>
        </div>
      </div>
      <SheetSelector activeSheet={activeSheet} onSheetChange={handleSheetChange} />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <SpreadsheetView sheets={allSheets} />
      </div>
    </div>
  );
});

SpreadsheetPage.displayName = 'SpreadsheetPage';

export default SpreadsheetPage;
