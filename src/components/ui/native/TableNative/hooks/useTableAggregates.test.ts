import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useTableAggregates, computeAggregate, formatAggregateValue, getTypeLabel, AggregateType } from './useTableAggregates';

const MOCK_DATA = [
  { id: 1, name: 'Alice', salary: 80000, active: true },
  { id: 2, name: 'Bob', salary: 60000, active: false },
  { id: 3, name: 'Charlie', salary: 90000, active: true },
  { id: 4, name: 'Diana', salary: 70000, active: true },
  { id: 5, name: 'Eve', salary: 85000, active: false },
];

describe('computeAggregate', () => {
  it('computes Sum correctly', () => {
    const result = computeAggregate(MOCK_DATA, 'salary', AggregateType.Sum);
    expect(result).toBe(385000);
  });

  it('computes Average correctly', () => {
    const result = computeAggregate(MOCK_DATA, 'salary', AggregateType.Average);
    expect(result).toBe(77000);
  });

  it('computes Count correctly', () => {
    const result = computeAggregate(MOCK_DATA, 'salary', AggregateType.Count);
    expect(result).toBe(5);
  });

  it('computes Min correctly', () => {
    const result = computeAggregate(MOCK_DATA, 'salary', AggregateType.Min);
    expect(result).toBe(60000);
  });

  it('computes Max correctly', () => {
    const result = computeAggregate(MOCK_DATA, 'salary', AggregateType.Max);
    expect(result).toBe(90000);
  });

  it('computes TrueCount correctly', () => {
    const result = computeAggregate(MOCK_DATA, 'active', AggregateType.TrueCount);
    expect(result).toBe(3);
  });

  it('computes FalseCount correctly', () => {
    const result = computeAggregate(MOCK_DATA, 'active', AggregateType.FalseCount);
    expect(result).toBe(2);
  });

  it('handles Custom aggregate function', () => {
    const customFn = vi.fn().mockReturnValue(42);
    const result = computeAggregate(MOCK_DATA, 'salary', AggregateType.Custom, customFn);
    expect(result).toBe(42);
    expect(customFn).toHaveBeenCalledWith(MOCK_DATA, 'salary');
  });

  it('returns 0 for Custom without function', () => {
    const result = computeAggregate(MOCK_DATA, 'salary', AggregateType.Custom);
    expect(result).toBe(0);
  });

  it('returns 0 for empty data with numeric aggregates', () => {
    expect(computeAggregate([], 'salary', AggregateType.Sum)).toBe(0);
    expect(computeAggregate([], 'salary', AggregateType.Average)).toBe(0);
    expect(computeAggregate([], 'salary', AggregateType.Min)).toBe(0);
    expect(computeAggregate([], 'salary', AggregateType.Max)).toBe(0);
  });

  it('returns 0 for Count on empty data', () => {
    expect(computeAggregate([], 'salary', AggregateType.Count)).toBe(0);
  });

  it('handles non-numeric values gracefully', () => {
    const result = computeAggregate(MOCK_DATA, 'name', AggregateType.Sum);
    expect(result).toBe(0);
  });
});

describe('formatAggregateValue', () => {
  it('formats Average to 2 decimal places', () => {
    expect(formatAggregateValue(77000.123, AggregateType.Average)).toBe('77000.12');
  });

  it('formats Sum as integer when applicable', () => {
    expect(formatAggregateValue(385000, AggregateType.Sum)).toBe('385000');
  });

  it('formats Sum as decimal when not integer', () => {
    expect(formatAggregateValue(385000.5, AggregateType.Sum)).toBe('385000.50');
  });

  it('uses custom format function when provided', () => {
    const customFormat = (v: number): string => `$${v.toLocaleString()}`;
    expect(formatAggregateValue(385000, AggregateType.Sum, customFormat)).toBe('$385,000');
  });

  it('handles non-number values', () => {
    expect(formatAggregateValue('hello', AggregateType.Count)).toBe('hello');
  });

  it('handles null/undefined', () => {
    expect(formatAggregateValue(null, AggregateType.Count)).toBe('');
  });
});

describe('getTypeLabel', () => {
  it('returns correct labels', () => {
    expect(getTypeLabel(AggregateType.Sum)).toBe('Sum');
    expect(getTypeLabel(AggregateType.Average)).toBe('Avg');
    expect(getTypeLabel(AggregateType.Count)).toBe('Count');
    expect(getTypeLabel(AggregateType.Min)).toBe('Min');
    expect(getTypeLabel(AggregateType.Max)).toBe('Max');
    expect(getTypeLabel(AggregateType.TrueCount)).toBe('True');
    expect(getTypeLabel(AggregateType.FalseCount)).toBe('False');
    expect(getTypeLabel(AggregateType.Custom)).toBe('');
  });
});

describe('useTableAggregates hook', () => {
  it('returns no aggregates when none configured', () => {
    const { result } = renderHook(() =>
      useTableAggregates({ data: MOCK_DATA }),
    );

    expect(result.current.hasAggregates).toBe(false);
    expect(result.current.aggregateRows).toEqual([]);
  });

  it('computes single aggregate row', () => {
    const { result } = renderHook(() =>
      useTableAggregates({
        data: MOCK_DATA,
        aggregates: [
          {
            columns: [
              { field: 'salary', type: AggregateType.Sum },
              { field: 'active', type: AggregateType.TrueCount },
            ],
          },
        ],
      }),
    );

    expect(result.current.hasAggregates).toBe(true);
    expect(result.current.aggregateRows.length).toBe(1);

    const firstRow = result.current.aggregateRows[0]!;
    expect(firstRow.columns.length).toBe(2);

    const salaryAgg = firstRow.columns.find((c) => c.field === 'salary')!;
    expect(salaryAgg.value).toBe(385000);
    expect(salaryAgg.formatted).toBe('Sum: 385000');

    const activeAgg = firstRow.columns.find((c) => c.field === 'active')!;
    expect(activeAgg.value).toBe(3);
    expect(activeAgg.formatted).toBe('True: 3');
  });

  it('computes multiple aggregate rows', () => {
    const { result } = renderHook(() =>
      useTableAggregates({
        data: MOCK_DATA,
        aggregates: [
          { columns: [{ field: 'salary', type: AggregateType.Sum }] },
          { columns: [{ field: 'salary', type: AggregateType.Average }] },
        ],
      }),
    );

    expect(result.current.aggregateRows.length).toBe(2);
  });

  it('getAggregateValue looks up computed values', () => {
    const { result } = renderHook(() =>
      useTableAggregates({
        data: MOCK_DATA,
        aggregates: [
          { columns: [{ field: 'salary', type: AggregateType.Sum }] },
        ],
      }),
    );

    expect(result.current.getAggregateValue(0, 'salary')).toBe(385000);
    expect(result.current.getAggregateValue(0, 'nonexistent')).toBeUndefined();
  });

  it('applies custom format function', () => {
    const { result } = renderHook(() =>
      useTableAggregates({
        data: MOCK_DATA,
        aggregates: [
          {
            columns: [
              {
                field: 'salary',
                type: AggregateType.Sum,
                format: (v: number) => `$${String(v)}`,
              },
            ],
          },
        ],
      }),
    );

    const agg = result.current.aggregateRows[0]!.columns[0]!;
    expect(agg.formatted).toBe('Sum: $385000');
  });
});
