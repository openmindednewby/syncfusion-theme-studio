import type { SheetModel } from '@syncfusion/ej2-react-spreadsheet';

import { buildBudgetTemplateSheet } from './budgetTemplateSheet';
import { buildEmployeeRosterSheet } from './employeeRosterSheet';
import { buildSalesReportSheet } from './salesReportSheet';

/** Returns all sample sheets for the Spreadsheet component. */
export function getSampleSheets(): SheetModel[] {
  const sheets: SheetModel[] = [
    buildSalesReportSheet(),
    buildBudgetTemplateSheet(),
    buildEmployeeRosterSheet(),
  ];
  return sheets;
}
