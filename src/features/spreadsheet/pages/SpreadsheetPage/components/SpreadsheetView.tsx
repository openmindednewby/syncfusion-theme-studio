import { memo, useEffect, useMemo, useRef } from 'react';

import {
  SpreadsheetComponent,
  Inject,
  Ribbon,
  FormulaBar,
  SheetTabs,
  Selection,
  Edit,
  CellFormat,
  NumberFormat,
  Formula,
  Sort,
  Filter,
  Open,
  Save,
  ConditionalFormatting,
} from '@syncfusion/ej2-react-spreadsheet';
import type { SheetModel } from '@syncfusion/ej2-react-spreadsheet';

import { TestIds } from '@/shared/testIds';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils';

import { SPREADSHEET_HEIGHT } from '../../../constants';


const SPREADSHEET_SERVICES = [
  Ribbon,
  FormulaBar,
  SheetTabs,
  Selection,
  Edit,
  CellFormat,
  NumberFormat,
  Formula,
  Sort,
  Filter,
  Open,
  Save,
  ConditionalFormatting,
];

interface SpreadsheetViewProps {
  sheets: SheetModel[];
}

/** Syncfusion Spreadsheet wrapper with formula support and theme integration. */
export const SpreadsheetView = memo(({ sheets }: SpreadsheetViewProps): JSX.Element => {
  const spreadsheetRef = useRef<SpreadsheetComponent>(null);

  useEffect(() => {
    loadSyncfusionCss(SyncfusionCssModule.Spreadsheet).catch(() => {});
  }, []);

  const sheetData = useMemo((): SheetModel[] => [...sheets], [sheets]);

  return (
    <div data-testid={TestIds.SPREADSHEET_VIEW}>
      <SpreadsheetComponent
        ref={spreadsheetRef}
        allowConditionalFormat
        allowFiltering
        allowNumberFormatting
        allowSorting
        height={SPREADSHEET_HEIGHT}
        openUrl=""
        saveUrl=""
        sheets={sheetData}
      >
        <Inject services={SPREADSHEET_SERVICES} />
      </SpreadsheetComponent>
    </div>
  );
});

SpreadsheetView.displayName = 'SpreadsheetView';
