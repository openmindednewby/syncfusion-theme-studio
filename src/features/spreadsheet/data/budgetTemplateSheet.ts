import type { SheetModel } from '@syncfusion/ej2-react-spreadsheet';

const HEADER_STYLE = { fontWeight: 'bold' } as const;
const CURRENCY_FORMAT = '$#,##0';

const COL_WIDTH_CATEGORY = 150;
const COL_WIDTH_AMOUNT = 130;

const BUDGET_ROWS = [
  {
    cells: [
      { value: 'Category', style: HEADER_STYLE },
      { value: 'Budgeted', style: HEADER_STYLE },
      { value: 'Actual', style: HEADER_STYLE },
      { value: 'Variance', style: HEADER_STYLE },
    ],
  },
  { cells: [{ value: 'INCOME', style: HEADER_STYLE }] },
  {
    cells: [
      { value: 'Product Revenue' },
      { value: '85000', format: CURRENCY_FORMAT },
      { value: '92300', format: CURRENCY_FORMAT },
      { formula: '=C3-B3', format: CURRENCY_FORMAT },
    ],
  },
  {
    cells: [
      { value: 'Service Revenue' },
      { value: '25000', format: CURRENCY_FORMAT },
      { value: '23100', format: CURRENCY_FORMAT },
      { formula: '=C4-B4', format: CURRENCY_FORMAT },
    ],
  },
  {
    cells: [
      { value: 'Total Income', style: HEADER_STYLE },
      { formula: '=SUM(B3:B4)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
      { formula: '=SUM(C3:C4)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
      { formula: '=C5-B5', format: CURRENCY_FORMAT, style: HEADER_STYLE },
    ],
  },
  { cells: [] },
  { cells: [{ value: 'EXPENSES', style: HEADER_STYLE }] },
  {
    cells: [
      { value: 'Salaries' },
      { value: '45000', format: CURRENCY_FORMAT },
      { value: '45000', format: CURRENCY_FORMAT },
      { formula: '=C8-B8', format: CURRENCY_FORMAT },
    ],
  },
  {
    cells: [
      { value: 'Marketing' },
      { value: '12000', format: CURRENCY_FORMAT },
      { value: '14500', format: CURRENCY_FORMAT },
      { formula: '=C9-B9', format: CURRENCY_FORMAT },
    ],
  },
  {
    cells: [
      { value: 'Operations' },
      { value: '8000', format: CURRENCY_FORMAT },
      { value: '7200', format: CURRENCY_FORMAT },
      { formula: '=C10-B10', format: CURRENCY_FORMAT },
    ],
  },
  {
    cells: [
      { value: 'Total Expenses', style: HEADER_STYLE },
      { formula: '=SUM(B8:B10)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
      { formula: '=SUM(C8:C10)', format: CURRENCY_FORMAT, style: HEADER_STYLE },
      { formula: '=C11-B11', format: CURRENCY_FORMAT, style: HEADER_STYLE },
    ],
  },
  { cells: [] },
  {
    cells: [
      { value: 'NET PROFIT', style: HEADER_STYLE },
      { formula: '=B5-B11', format: CURRENCY_FORMAT, style: HEADER_STYLE },
      { formula: '=C5-C11', format: CURRENCY_FORMAT, style: HEADER_STYLE },
      { formula: '=C13-B13', format: CURRENCY_FORMAT, style: HEADER_STYLE },
    ],
  },
];

const BUDGET_COLUMNS = [
  { width: COL_WIDTH_CATEGORY },
  { width: COL_WIDTH_AMOUNT },
  { width: COL_WIDTH_AMOUNT },
  { width: COL_WIDTH_AMOUNT },
];

/** Budget Template sheet with income/expense categories. */
export function buildBudgetTemplateSheet(): SheetModel {
  return {
    name: 'Budget Template',
     
    rows: BUDGET_ROWS,
    columns: BUDGET_COLUMNS,
  };
}
