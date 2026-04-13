import { describe, it, expect } from 'vitest';

import { ColumnType, FilterOperator } from '../types';
import { executeFilterComparison } from './executeFilter';

describe('executeFilterComparison', () => {
  describe('string operators', () => {
    it('Contains matches substring', () => {
      expect(executeFilterComparison('Hello World', 'world', ColumnType.String, FilterOperator.Contains)).toBe(true);
      expect(executeFilterComparison('Hello', 'xyz', ColumnType.String, FilterOperator.Contains)).toBe(false);
    });

    it('DoesNotContain excludes substring', () => {
      expect(executeFilterComparison('Hello', 'xyz', ColumnType.String, FilterOperator.DoesNotContain)).toBe(true);
      expect(executeFilterComparison('Hello', 'hell', ColumnType.String, FilterOperator.DoesNotContain)).toBe(false);
    });

    it('StartsWith checks prefix', () => {
      expect(executeFilterComparison('Hello World', 'hello', ColumnType.String, FilterOperator.StartsWith)).toBe(true);
      expect(executeFilterComparison('Hello World', 'world', ColumnType.String, FilterOperator.StartsWith)).toBe(false);
    });

    it('DoesNotStartWith checks prefix negation', () => {
      expect(executeFilterComparison('Hello', 'world', ColumnType.String, FilterOperator.DoesNotStartWith)).toBe(true);
      expect(executeFilterComparison('Hello', 'hell', ColumnType.String, FilterOperator.DoesNotStartWith)).toBe(false);
    });

    it('EndsWith checks suffix', () => {
      expect(executeFilterComparison('Hello World', 'world', ColumnType.String, FilterOperator.EndsWith)).toBe(true);
      expect(executeFilterComparison('Hello World', 'hello', ColumnType.String, FilterOperator.EndsWith)).toBe(false);
    });

    it('DoesNotEndWith checks suffix negation', () => {
      expect(executeFilterComparison('Hello', 'world', ColumnType.String, FilterOperator.DoesNotEndWith)).toBe(true);
      expect(executeFilterComparison('Hello', 'ello', ColumnType.String, FilterOperator.DoesNotEndWith)).toBe(false);
    });

    it('Equal matches exact (case-insensitive)', () => {
      expect(executeFilterComparison('Hello', 'hello', ColumnType.String, FilterOperator.Equal)).toBe(true);
      expect(executeFilterComparison('Hello', 'hell', ColumnType.String, FilterOperator.Equal)).toBe(false);
    });

    it('NotEqual rejects exact match', () => {
      expect(executeFilterComparison('Hello', 'world', ColumnType.String, FilterOperator.NotEqual)).toBe(true);
      expect(executeFilterComparison('Hello', 'hello', ColumnType.String, FilterOperator.NotEqual)).toBe(false);
    });
  });

  describe('number operators', () => {
    it('Equal matches number', () => {
      expect(executeFilterComparison(42, '42', ColumnType.Number, FilterOperator.Equal)).toBe(true);
      expect(executeFilterComparison(42, '43', ColumnType.Number, FilterOperator.Equal)).toBe(false);
    });

    it('GreaterThan compares correctly', () => {
      expect(executeFilterComparison(10, '5', ColumnType.Number, FilterOperator.GreaterThan)).toBe(true);
      expect(executeFilterComparison(5, '10', ColumnType.Number, FilterOperator.GreaterThan)).toBe(false);
    });

    it('LessThanOrEqual compares correctly', () => {
      expect(executeFilterComparison(5, '5', ColumnType.Number, FilterOperator.LessThanOrEqual)).toBe(true);
      expect(executeFilterComparison(3, '5', ColumnType.Number, FilterOperator.LessThanOrEqual)).toBe(true);
      expect(executeFilterComparison(6, '5', ColumnType.Number, FilterOperator.LessThanOrEqual)).toBe(false);
    });

    it('returns false for NaN filter value', () => {
      expect(executeFilterComparison(42, 'abc', ColumnType.Number, FilterOperator.Equal)).toBe(false);
    });
  });

  describe('date operators', () => {
    it('Equal matches date', () => {
      expect(executeFilterComparison('2024-01-15T10:00:00', '2024-01-15', ColumnType.Date, FilterOperator.Equal)).toBe(true);
      expect(executeFilterComparison('2024-01-15T10:00:00', '2024-01-16', ColumnType.Date, FilterOperator.Equal)).toBe(false);
    });

    it('GreaterThan compares dates', () => {
      expect(executeFilterComparison('2024-02-01', '2024-01-01', ColumnType.Date, FilterOperator.GreaterThan)).toBe(true);
      expect(executeFilterComparison('2024-01-01', '2024-02-01', ColumnType.Date, FilterOperator.GreaterThan)).toBe(false);
    });
  });

  describe('boolean operators', () => {
    it('Equal matches boolean string', () => {
      expect(executeFilterComparison(true, 'true', ColumnType.Boolean, FilterOperator.Equal)).toBe(true);
      expect(executeFilterComparison(false, 'true', ColumnType.Boolean, FilterOperator.Equal)).toBe(false);
    });

    it('NotEqual rejects matching boolean', () => {
      expect(executeFilterComparison(true, 'true', ColumnType.Boolean, FilterOperator.NotEqual)).toBe(false);
      expect(executeFilterComparison(false, 'true', ColumnType.Boolean, FilterOperator.NotEqual)).toBe(true);
    });
  });

  describe('Empty / NotEmpty operators', () => {
    it('Empty returns true for null/undefined/empty string', () => {
      expect(executeFilterComparison(null, '', ColumnType.String, FilterOperator.Empty)).toBe(true);
      expect(executeFilterComparison(undefined, '', ColumnType.String, FilterOperator.Empty)).toBe(true);
      expect(executeFilterComparison('', '', ColumnType.String, FilterOperator.Empty)).toBe(true);
      expect(executeFilterComparison('hello', '', ColumnType.String, FilterOperator.Empty)).toBe(false);
    });

    it('NotEmpty returns true for non-empty values', () => {
      expect(executeFilterComparison('hello', '', ColumnType.String, FilterOperator.NotEmpty)).toBe(true);
      expect(executeFilterComparison(42, '', ColumnType.Number, FilterOperator.NotEmpty)).toBe(true);
      expect(executeFilterComparison(null, '', ColumnType.String, FilterOperator.NotEmpty)).toBe(false);
    });
  });
});
