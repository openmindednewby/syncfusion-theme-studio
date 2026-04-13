/**
 * Sample data constants for the Native Grid Showcase sections.
 *
 * Each dataset is tailored for a specific feature demonstration:
 * employees for basic/grouping, orders for aggregates, products for editing.
 */
import { TextAlign } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';

function pickFromArray<T>(arr: T[], index: number): T {
  // Array is guaranteed non-empty; modulo ensures valid index
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- index is always in bounds via modulo
  return arr[index % arr.length]!;
}

// --- Magic number constants ---
const EMPLOYEE_COUNT = 25;
const SALARY_BASE = 55000;
const SALARY_INCREMENT = 5000;
const AGE_BASE = 25;
const AGE_INCREMENT = 3;
const ORDER_COUNT = 15;
const PRICE_BASE = 19.99;
const PRICE_INCREMENT = 12.5;
const QTY_BASE = 1;
const QTY_INCREMENT = 2;
const PRODUCT_COUNT = 8;
const STOCK_BASE = 10;
const STOCK_INCREMENT = 15;
const PRODUCT_PRICE_BASE = 9.99;
const PRODUCT_PRICE_INCREMENT = 8.0;
const COL_WIDTH_NARROW = 80;
const COL_WIDTH_SMALL = 100;
const COL_WIDTH_NAME = 150;
const COL_WIDTH_MEDIUM = 120;
const COL_WIDTH_WIDE = 130;
const CURRENCY_DECIMALS = 2;
const COL_WIDTH_ACTIONS = 180;

// --- Lookup arrays ---
const FIRST_NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank',
  'Grace', 'Hank', 'Iris', 'Jack', 'Kate', 'Leo', 'Mia', 'Noah', 'Olivia',
  'Paul', 'Quinn', 'Rosa', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara'];
const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design'];
const CITIES = ['New York', 'London', 'Tokyo', 'Berlin', 'Sydney', 'Toronto'];
const CATEGORIES = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports'];
const PRODUCT_NAMES = [
  'Wireless Mouse', 'USB Keyboard', 'Monitor Stand', 'Desk Lamp',
  'Webcam HD', 'Headphones', 'Cable Organizer', 'Mouse Pad',
];

// --- Type definitions ---
interface Employee {
  id: number;
  name: string;
  department: string;
  city: string;
  salary: number;
  age: number;
  active: boolean;
}

interface Order {
  id: number;
  product: string;
  category: string;
  price: number;
  quantity: number;
  total: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
}

// --- Builder functions ---
// eslint-disable-next-line enforce-function-style/enforce-function-style -- must follow constants they reference (no-use-before-define)
function buildEmployeeRow(index: number): Record<string, unknown> {
  return { ...buildEmployee(index) };
}

// eslint-disable-next-line enforce-function-style/enforce-function-style -- must follow constants they reference (no-use-before-define)
function buildOrderRow(index: number): Record<string, unknown> {
  return { ...buildOrder(index) };
}

// eslint-disable-next-line enforce-function-style/enforce-function-style -- must follow constants they reference (no-use-before-define)
function buildProductRow(index: number): Record<string, unknown> {
  return { ...buildProduct(index) };
}

function buildEmployee(index: number): Employee {
  return {
    id: index + 1,
    name: FIRST_NAMES[index] ?? `Employee ${String(index + 1)}`,
    department: pickFromArray(DEPARTMENTS, index),
    city: pickFromArray(CITIES, index),
    salary: SALARY_BASE + index * SALARY_INCREMENT,
    age: AGE_BASE + index * AGE_INCREMENT,
    active: index % 2 === 0,
  };
}

function buildOrder(index: number): Order {
  const price = Math.round((PRICE_BASE + index * PRICE_INCREMENT) * 100) / 100;
  const quantity = QTY_BASE + index * QTY_INCREMENT;
  return {
    id: index + 1,
    product: `Product ${String(index + 1)}`,
    category: pickFromArray(CATEGORIES, index),
    price,
    quantity,
    total: Math.round(price * quantity * 100) / 100,
  };
}

function buildProduct(index: number): Product {
  return {
    id: index + 1,
    name: PRODUCT_NAMES[index] ?? `Product ${String(index + 1)}`,
    category: pickFromArray(CATEGORIES, index),
    price: Math.round((PRODUCT_PRICE_BASE + index * PRODUCT_PRICE_INCREMENT) * 100) / 100,
    stock: STOCK_BASE + index * STOCK_INCREMENT,
    active: index % 2 === 0,
  };
}

// --- Exported data arrays ---
export const EMPLOYEES: Array<Record<string, unknown>> = Array.from(
  { length: EMPLOYEE_COUNT },
  (_, i) => buildEmployeeRow(i),
);

export const ORDERS: Array<Record<string, unknown>> = Array.from(
  { length: ORDER_COUNT },
  (_, i) => buildOrderRow(i),
);

export const PRODUCTS: Array<Record<string, unknown>> = Array.from(
  { length: PRODUCT_COUNT },
  (_, i) => buildProductRow(i),
);

// --- Column definitions ---
export const EMPLOYEE_COLUMNS: TableColumn[] = [
  { field: 'id', headerText: 'ID', width: COL_WIDTH_NARROW, textAlign: TextAlign.Right },
  { field: 'name', headerText: 'Name', minWidth: COL_WIDTH_NAME, textAlign: TextAlign.Left },
  { field: 'department', headerText: 'Department', minWidth: COL_WIDTH_MEDIUM, textAlign: TextAlign.Left },
  { field: 'city', headerText: 'City', minWidth: COL_WIDTH_MEDIUM, textAlign: TextAlign.Left },
  { field: 'salary', headerText: 'Salary', width: COL_WIDTH_WIDE, textAlign: TextAlign.Right,
    format: (v) => `$${Number(v).toLocaleString()}` },
  { field: 'age', headerText: 'Age', width: COL_WIDTH_NARROW, textAlign: TextAlign.Right },
  { field: 'active', headerText: 'Active', width: COL_WIDTH_SMALL, textAlign: TextAlign.Center },
];

export const ACTIONS_COLUMN: TableColumn = { field: 'actions', headerText: 'Actions', width: COL_WIDTH_ACTIONS, textAlign: TextAlign.Center };

export const ORDER_COLUMNS: TableColumn[] = [
  { field: 'id', headerText: 'ID', width: COL_WIDTH_NARROW, textAlign: TextAlign.Right },
  { field: 'product', headerText: 'Product', minWidth: COL_WIDTH_NAME },
  { field: 'category', headerText: 'Category', minWidth: COL_WIDTH_MEDIUM },
  { field: 'price', headerText: 'Price', width: COL_WIDTH_MEDIUM, textAlign: TextAlign.Right,
    format: (v) => `$${Number(v).toFixed(CURRENCY_DECIMALS)}` },
  { field: 'quantity', headerText: 'Qty', width: COL_WIDTH_NARROW, textAlign: TextAlign.Right },
  { field: 'total', headerText: 'Total', width: COL_WIDTH_WIDE, textAlign: TextAlign.Right,
    format: (v) => `$${Number(v).toFixed(CURRENCY_DECIMALS)}` },
];

export const PRODUCT_COLUMNS: TableColumn[] = [
  { field: 'id', headerText: 'ID', width: COL_WIDTH_NARROW, textAlign: TextAlign.Right },
  { field: 'name', headerText: 'Name', minWidth: COL_WIDTH_NAME },
  { field: 'category', headerText: 'Category', minWidth: COL_WIDTH_MEDIUM },
  { field: 'price', headerText: 'Price', width: COL_WIDTH_MEDIUM, textAlign: TextAlign.Right,
    format: (v) => `$${Number(v).toFixed(CURRENCY_DECIMALS)}` },
  { field: 'stock', headerText: 'Stock', width: COL_WIDTH_NARROW, textAlign: TextAlign.Right },
  { field: 'active', headerText: 'Active', width: COL_WIDTH_NARROW, textAlign: TextAlign.Center },
];
