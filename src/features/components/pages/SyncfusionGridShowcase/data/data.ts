/**
 * Sample data constants for the Syncfusion DataGrid showcase.
 * Each section uses a typed dataset with named width constants.
 */

// --- Column width constants ---
export const COL_WIDTH_ID = 80;
export const COL_WIDTH_NAME = 160;
export const COL_WIDTH_EMAIL = 220;
export const COL_WIDTH_ROLE = 120;
export const COL_WIDTH_STATUS = 120;
export const COL_WIDTH_DEPARTMENT = 140;
export const COL_WIDTH_SALARY = 130;
export const COL_WIDTH_HIRE_DATE = 150;
export const COL_WIDTH_COUNTRY = 140;
export const COL_WIDTH_QUANTITY = 110;
export const COL_WIDTH_PRICE = 110;
export const COL_WIDTH_TOTAL = 120;
export const COL_WIDTH_ORDER_DATE = 150;
export const COL_WIDTH_PRODUCT = 160;
export const COL_WIDTH_COMMAND = 200;

// --- Grid height constants ---
export const GRID_HEIGHT_DEFAULT = 350;
export const GRID_HEIGHT_TALL = 400;
export const GRID_HEIGHT_VIRTUAL = 400;

// --- Page size constants ---
export const PAGE_SIZE_FIVE = 5;
export const PAGE_SIZE_TEN = 10;

// --- Frozen column count ---
export const FROZEN_COLUMN_COUNT = 1;

// --- Virtualization ---
export const VIRTUAL_ROW_COUNT = 1000;
export const VIRTUAL_ROW_HEIGHT = 36;

// --- Employee data ---
export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  salary: number;
  hireDate: string;
  country: string;
}

export const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Alice Martin', email: 'alice@co.com', role: 'Manager', status: 'Active', department: 'Engineering', salary: 95000, hireDate: '2020-03-15', country: 'USA' },
  { id: 2, name: 'Bob Chen', email: 'bob@co.com', role: 'Developer', status: 'Active', department: 'Engineering', salary: 82000, hireDate: '2021-06-01', country: 'Canada' },
  { id: 3, name: 'Clara Diaz', email: 'clara@co.com', role: 'Designer', status: 'Active', department: 'Design', salary: 78000, hireDate: '2019-11-20', country: 'UK' },
  { id: 4, name: 'Dan Evans', email: 'dan@co.com', role: 'Developer', status: 'Inactive', department: 'Engineering', salary: 88000, hireDate: '2018-01-10', country: 'USA' },
  { id: 5, name: 'Eva Fischer', email: 'eva@co.com', role: 'Analyst', status: 'Active', department: 'Analytics', salary: 72000, hireDate: '2022-04-05', country: 'Germany' },
  { id: 6, name: 'Frank Garcia', email: 'frank@co.com', role: 'Developer', status: 'Active', department: 'Engineering', salary: 91000, hireDate: '2020-08-22', country: 'USA' },
  { id: 7, name: 'Grace Hill', email: 'grace@co.com', role: 'Manager', status: 'Active', department: 'Sales', salary: 98000, hireDate: '2017-05-14', country: 'Australia' },
  { id: 8, name: 'Hiro Ito', email: 'hiro@co.com', role: 'Designer', status: 'Inactive', department: 'Design', salary: 75000, hireDate: '2021-09-30', country: 'Japan' },
  { id: 9, name: 'Ivy Jones', email: 'ivy@co.com', role: 'Analyst', status: 'Active', department: 'Analytics', salary: 70000, hireDate: '2023-01-18', country: 'Canada' },
  { id: 10, name: 'Jack Kim', email: 'jack@co.com', role: 'Developer', status: 'Active', department: 'Engineering', salary: 86000, hireDate: '2019-07-25', country: 'USA' },
];

// --- Order data (for aggregates) ---
export interface Order {
  orderId: number;
  customer: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  orderDate: string;
  country: string;
}

export const ORDERS: Order[] = [
  { orderId: 1001, customer: 'Alice Martin', product: 'Laptop', quantity: 2, price: 1200, total: 2400, orderDate: '2024-01-15', country: 'USA' },
  { orderId: 1002, customer: 'Bob Chen', product: 'Monitor', quantity: 3, price: 450, total: 1350, orderDate: '2024-01-18', country: 'Canada' },
  { orderId: 1003, customer: 'Clara Diaz', product: 'Keyboard', quantity: 5, price: 85, total: 425, orderDate: '2024-02-02', country: 'UK' },
  { orderId: 1004, customer: 'Dan Evans', product: 'Mouse', quantity: 10, price: 35, total: 350, orderDate: '2024-02-10', country: 'USA' },
  { orderId: 1005, customer: 'Eva Fischer', product: 'Laptop', quantity: 1, price: 1200, total: 1200, orderDate: '2024-02-14', country: 'Germany' },
  { orderId: 1006, customer: 'Frank Garcia', product: 'Monitor', quantity: 2, price: 450, total: 900, orderDate: '2024-03-01', country: 'USA' },
  { orderId: 1007, customer: 'Grace Hill', product: 'Headset', quantity: 4, price: 120, total: 480, orderDate: '2024-03-05', country: 'Australia' },
  { orderId: 1008, customer: 'Hiro Ito', product: 'Webcam', quantity: 6, price: 95, total: 570, orderDate: '2024-03-12', country: 'Japan' },
];

/**
 * Generate a large dataset for virtualization demo.
 * Uses modular arithmetic to cycle through base data patterns.
 */
export function generateVirtualData(count: number): Employee[] {
  const departments = ['Engineering', 'Design', 'Analytics', 'Sales', 'Marketing'];
  const roles = ['Developer', 'Designer', 'Analyst', 'Manager', 'Lead'];
  const statuses = ['Active', 'Inactive'];
  const countries = ['USA', 'Canada', 'UK', 'Germany', 'Japan', 'Australia'];
  const BASE_SALARY = 60000;
  const SALARY_RANGE = 50000;
  const MONTHS_IN_YEAR = 12;

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `emp${i + 1}@co.com`,
    role: roles[i % roles.length] ?? 'Developer',
    status: statuses[i % statuses.length] ?? 'Active',
    department: departments[i % departments.length] ?? 'Engineering',
    salary: BASE_SALARY + Math.round((i * SALARY_RANGE) / count),
    hireDate: `2020-${String((i % MONTHS_IN_YEAR) + 1).padStart(2, '0')}-15`,
    country: countries[i % countries.length] ?? 'USA',
  }));
}
