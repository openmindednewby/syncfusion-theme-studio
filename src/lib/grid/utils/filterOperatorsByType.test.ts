import { describe, it, expect } from 'vitest';

import { ColumnType, FilterOperator } from '../types';
import { getOperatorsForType, getDefaultOperator } from './filterOperatorsByType';

describe('getOperatorsForType', () => {
  it('returns string operators for String type', () => {
    const ops = getOperatorsForType(ColumnType.String);
    expect(ops).toContain(FilterOperator.Contains);
    expect(ops).toContain(FilterOperator.StartsWith);
    expect(ops).toContain(FilterOperator.EndsWith);
    expect(ops).not.toContain(FilterOperator.GreaterThan);
  });

  it('returns numeric operators for Number type', () => {
    const ops = getOperatorsForType(ColumnType.Number);
    expect(ops).toContain(FilterOperator.GreaterThan);
    expect(ops).toContain(FilterOperator.LessThan);
    expect(ops).not.toContain(FilterOperator.Contains);
  });

  it('returns numeric operators for Date type', () => {
    const ops = getOperatorsForType(ColumnType.Date);
    expect(ops).toContain(FilterOperator.GreaterThan);
    expect(ops).toContain(FilterOperator.Equal);
    expect(ops).not.toContain(FilterOperator.StartsWith);
  });

  it('returns boolean operators for Boolean type', () => {
    const ops = getOperatorsForType(ColumnType.Boolean);
    expect(ops).toEqual([FilterOperator.Equal, FilterOperator.NotEqual]);
  });
});

describe('getDefaultOperator', () => {
  it('returns Contains for String', () => {
    expect(getDefaultOperator(ColumnType.String)).toBe(FilterOperator.Contains);
  });

  it('returns Equal for Number', () => {
    expect(getDefaultOperator(ColumnType.Number)).toBe(FilterOperator.Equal);
  });

  it('returns Equal for Date', () => {
    expect(getDefaultOperator(ColumnType.Date)).toBe(FilterOperator.Equal);
  });

  it('returns Equal for Boolean', () => {
    expect(getDefaultOperator(ColumnType.Boolean)).toBe(FilterOperator.Equal);
  });
});
