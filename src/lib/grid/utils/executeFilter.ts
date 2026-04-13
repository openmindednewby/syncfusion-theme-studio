/**
 * Pure filter execution logic for native grid.
 * Each function compares a cell value against a filter value using the given operator.
 */
import { isValueDefined } from '@/utils/is';

import { ColumnType, FilterOperator } from '../types';

/** Dispatches filter comparison based on column type */
export function executeFilterComparison(
  cellValue: unknown,
  filterValue: string,
  columnType: ColumnType,
  operator: FilterOperator,
): boolean {
  // Empty/NotEmpty operators don't need a filter value
  if (operator === FilterOperator.Empty || operator === FilterOperator.NotEmpty) {
    const isEmpty = !isValueDefined(cellValue) || String(cellValue).trim().length === 0;
    return operator === FilterOperator.Empty ? isEmpty : !isEmpty;
  }

  if (columnType === ColumnType.Boolean)
    return operator === FilterOperator.Equal
      ? String(cellValue) === filterValue
      : String(cellValue) !== filterValue;

  if (columnType === ColumnType.Number) {
    const num = Number(cellValue);
    const filterNum = Number(filterValue);
    if (Number.isNaN(filterNum)) return false;
    return executeNumberFilter(num, filterNum, operator);
  }

  if (columnType === ColumnType.Date) {
    const cellDate = isValueDefined(cellValue) ? (String(cellValue).split('T')[0] ?? '') : '';
    return executeDateFilter(cellDate, filterValue, operator);
  }

  const str = isValueDefined(cellValue) ? String(cellValue) : '';
  return executeStringFilter(str, filterValue, operator);
}

function executeStringFilter(cell: string, filter: string, op: FilterOperator): boolean {
  const c = cell.toLowerCase();
  const f = filter.toLowerCase();
  switch (op) {
    case FilterOperator.Contains: return c.includes(f);
    case FilterOperator.DoesNotContain: return !c.includes(f);
    case FilterOperator.StartsWith: return c.startsWith(f);
    case FilterOperator.DoesNotStartWith: return !c.startsWith(f);
    case FilterOperator.EndsWith: return c.endsWith(f);
    case FilterOperator.DoesNotEndWith: return !c.endsWith(f);
    case FilterOperator.Equal: return c === f;
    case FilterOperator.NotEqual: return c !== f;
    case FilterOperator.Empty: return c.length === 0;
    case FilterOperator.NotEmpty: return c.length > 0;
    case FilterOperator.GreaterThan:
    case FilterOperator.GreaterThanOrEqual:
    case FilterOperator.LessThan:
    case FilterOperator.LessThanOrEqual:
    default: return c.includes(f);
  }
}

function executeNumberFilter(cell: number, filter: number, op: FilterOperator): boolean {
  switch (op) {
    case FilterOperator.Equal: return cell === filter;
    case FilterOperator.NotEqual: return cell !== filter;
    case FilterOperator.GreaterThan: return cell > filter;
    case FilterOperator.GreaterThanOrEqual: return cell >= filter;
    case FilterOperator.LessThan: return cell < filter;
    case FilterOperator.LessThanOrEqual: return cell <= filter;
    case FilterOperator.Empty: return Number.isNaN(cell);
    case FilterOperator.NotEmpty: return !Number.isNaN(cell);
    case FilterOperator.Contains:
    case FilterOperator.DoesNotContain:
    case FilterOperator.StartsWith:
    case FilterOperator.DoesNotStartWith:
    case FilterOperator.EndsWith:
    case FilterOperator.DoesNotEndWith:
    default: return cell === filter;
  }
}

function executeDateFilter(cellDate: string, filterDate: string, op: FilterOperator): boolean {
  switch (op) {
    case FilterOperator.Equal: return cellDate === filterDate;
    case FilterOperator.NotEqual: return cellDate !== filterDate;
    case FilterOperator.GreaterThan: return cellDate > filterDate;
    case FilterOperator.GreaterThanOrEqual: return cellDate >= filterDate;
    case FilterOperator.LessThan: return cellDate < filterDate;
    case FilterOperator.LessThanOrEqual: return cellDate <= filterDate;
    case FilterOperator.Empty: return cellDate.length === 0;
    case FilterOperator.NotEmpty: return cellDate.length > 0;
    case FilterOperator.Contains:
    case FilterOperator.DoesNotContain:
    case FilterOperator.StartsWith:
    case FilterOperator.DoesNotStartWith:
    case FilterOperator.EndsWith:
    case FilterOperator.DoesNotEndWith:
    default: return cellDate === filterDate;
  }
}
