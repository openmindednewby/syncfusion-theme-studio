import type { SheetModel } from '@syncfusion/ej2-react-spreadsheet';

const HEADER_STYLE = { fontWeight: 'bold' } as const;
const CURRENCY_FORMAT = '$#,##0';
const CURRENCY_DECIMAL_FORMAT = '$#,##0.00';

const COL_WIDTH_PRODUCT = 130;
const COL_WIDTH_MONTH = 120;
const COL_WIDTH_TOTAL = 130;

const HEADER_ROW = {
  cells: [
    { value: 'Product', style: HEADER_STYLE },
    { value: 'Jan', style: HEADER_STYLE },
    { value: 'Feb', style: HEADER_STYLE },
    { value: 'Mar', style: HEADER_STYLE },
    { value: 'Q1 Total', style: HEADER_STYLE },
  ],
};

const WIDGET_A_ROW = {
  cells: [
    { value: 'Widget A' },
    { value: '12500', format: CURRENCY_FORMAT },
    { value: '14200', format: CURRENCY_FORMAT },
    { value: '11800', format: CURRENCY_FORMAT },
    { formula: '=SUM(B2:D2)', format: CURRENCY_FORMAT },
  ],
};

const WIDGET_B_ROW = {
  cells: [
    { value: 'Widget B' },
    { value: '8700', format: CURRENCY_FORMAT },
    { value: '9100', format: CURRENCY_FORMAT },
    { value: '10500', format: CURRENCY_FORMAT },
    { formula: '=SUM(B3:D3)', format: CURRENCY_FORMAT },
  ],
};

const WIDGET_C_ROW = {
  cells: [
    { value: 'Widget C' },
    { value: '15300', format: CURRENCY_FORMAT },
    { value: '16800', format: CURRENCY_FORMAT },
    { value: '14900', format: CURRENCY_FORMAT },
    { formula: '=SUM(B4:D4)', format: CURRENCY_FORMAT },
  ],
};

const SERVICE_ROW = {
  cells: [
    { value: 'Service Plan' },
    { value: '5200', format: CURRENCY_FORMAT },
    { value: '5800', format: CURRENCY_FORMAT },
    { value: '6100', format: CURRENCY_FORMAT },
    { formula: '=SUM(B5:D5)', format: CURRENCY_FORMAT },
  ],
};

const TOTAL_ROW = {
  cells: [
    { value: 'Total', style: HEADER_STYLE },
    { formula: '=SUM(B2:B5)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
    { formula: '=SUM(C2:C5)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
    { formula: '=SUM(D2:D5)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
    { formula: '=SUM(E2:E5)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
  ],
};

const AVERAGE_ROW = {
  cells: [
    { value: 'Average', style: HEADER_STYLE },
    { formula: '=AVERAGE(B2:B5)', format: CURRENCY_DECIMAL_FORMAT },
    { formula: '=AVERAGE(C2:C5)', format: CURRENCY_DECIMAL_FORMAT },
    { formula: '=AVERAGE(D2:D5)', format: CURRENCY_DECIMAL_FORMAT },
    { formula: '=AVERAGE(E2:E5)', format: CURRENCY_DECIMAL_FORMAT },
  ],
};

const SALES_ROWS = [
  HEADER_ROW,
  WIDGET_A_ROW,
  WIDGET_B_ROW,
  WIDGET_C_ROW,
  SERVICE_ROW,
  TOTAL_ROW,
  { cells: [] },
  AVERAGE_ROW,
];

const SALES_COLUMNS = [
  { width: COL_WIDTH_PRODUCT },
  { width: COL_WIDTH_MONTH },
  { width: COL_WIDTH_MONTH },
  { width: COL_WIDTH_MONTH },
  { width: COL_WIDTH_TOTAL },
];

/** Sales Report sheet with monthly sales by product and SUM formulas. */
export function buildSalesReportSheet(): SheetModel {
  return {
    name: 'Sales Report',
     
    rows: SALES_ROWS,
    columns: SALES_COLUMNS,
  };
}
