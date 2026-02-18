/**
 * Maps column types to their available filter operators and defaults.
 */
import { ColumnType, FilterOperator } from '../types';

const STRING_OPERATORS: FilterOperator[] = [
  FilterOperator.Contains,
  FilterOperator.DoesNotContain,
  FilterOperator.StartsWith,
  FilterOperator.DoesNotStartWith,
  FilterOperator.EndsWith,
  FilterOperator.DoesNotEndWith,
  FilterOperator.Equal,
  FilterOperator.NotEqual,
  FilterOperator.Empty,
  FilterOperator.NotEmpty,
];

const NUMERIC_OPERATORS: FilterOperator[] = [
  FilterOperator.Equal,
  FilterOperator.NotEqual,
  FilterOperator.GreaterThan,
  FilterOperator.GreaterThanOrEqual,
  FilterOperator.LessThan,
  FilterOperator.LessThanOrEqual,
  FilterOperator.Empty,
  FilterOperator.NotEmpty,
];

const BOOLEAN_OPERATORS: FilterOperator[] = [
  FilterOperator.Equal,
  FilterOperator.NotEqual,
];

/** Returns the valid filter operators for a given column type */
export function getOperatorsForType(type: ColumnType): FilterOperator[] {
  switch (type) {
    case ColumnType.String:
      return STRING_OPERATORS;
    case ColumnType.Number:
    case ColumnType.Date:
      return NUMERIC_OPERATORS;
    case ColumnType.Boolean:
      return BOOLEAN_OPERATORS;
    default:
      return STRING_OPERATORS;
  }
}

/** Returns the default filter operator for a given column type */
export function getDefaultOperator(type: ColumnType): FilterOperator {
  switch (type) {
    case ColumnType.String:
      return FilterOperator.Contains;
    case ColumnType.Number:
    case ColumnType.Date:
    case ColumnType.Boolean:
      return FilterOperator.Equal;
    default:
      return FilterOperator.Contains;
  }
}
