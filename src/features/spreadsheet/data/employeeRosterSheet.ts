import type { SheetModel } from '@syncfusion/ej2-react-spreadsheet';

const HEADER_STYLE = { fontWeight: 'bold' } as const;

const COL_WIDTH_NAME = 160;
const COL_WIDTH_DEPT = 130;
const COL_WIDTH_EMAIL = 230;
const COL_WIDTH_DATE = 120;
const COL_WIDTH_STATUS = 100;

const ROSTER_ROWS = [
  {
    cells: [
      { value: 'Name', style: HEADER_STYLE },
      { value: 'Department', style: HEADER_STYLE },
      { value: 'Email', style: HEADER_STYLE },
      { value: 'Start Date', style: HEADER_STYLE },
      { value: 'Status', style: HEADER_STYLE },
    ],
  },
  {
    cells: [
      { value: 'Alice Johnson' },
      { value: 'Engineering' },
      { value: 'alice.johnson@example.com' },
      { value: '2022-03-15' },
      { value: 'Active' },
    ],
  },
  {
    cells: [
      { value: 'Bob Smith' },
      { value: 'Marketing' },
      { value: 'bob.smith@example.com' },
      { value: '2021-07-01' },
      { value: 'Active' },
    ],
  },
  {
    cells: [
      { value: 'Carol Davis' },
      { value: 'Engineering' },
      { value: 'carol.davis@example.com' },
      { value: '2023-01-10' },
      { value: 'Active' },
    ],
  },
  {
    cells: [
      { value: 'Dan Wilson' },
      { value: 'Sales' },
      { value: 'dan.wilson@example.com' },
      { value: '2020-11-20' },
      { value: 'On Leave' },
    ],
  },
  {
    cells: [
      { value: 'Eva Martinez' },
      { value: 'Design' },
      { value: 'eva.martinez@example.com' },
      { value: '2022-09-05' },
      { value: 'Active' },
    ],
  },
  {
    cells: [
      { value: 'Frank Lee' },
      { value: 'Engineering' },
      { value: 'frank.lee@example.com' },
      { value: '2021-04-18' },
      { value: 'Active' },
    ],
  },
  {
    cells: [
      { value: 'Grace Kim' },
      { value: 'HR' },
      { value: 'grace.kim@example.com' },
      { value: '2023-06-22' },
      { value: 'Active' },
    ],
  },
  { cells: [] },
  {
    cells: [
      { value: 'Total Employees', style: HEADER_STYLE },
      { formula: '=COUNTA(A2:A8)', style: HEADER_STYLE },
    ],
  },
];

const ROSTER_COLUMNS = [
  { width: COL_WIDTH_NAME },
  { width: COL_WIDTH_DEPT },
  { width: COL_WIDTH_EMAIL },
  { width: COL_WIDTH_DATE },
  { width: COL_WIDTH_STATUS },
];

/** Employee Roster sheet with personnel data. */
export function buildEmployeeRosterSheet(): SheetModel {
  return {
    name: 'Employee Roster',
     
    rows: ROSTER_ROWS,
    columns: ROSTER_COLUMNS,
  };
}
