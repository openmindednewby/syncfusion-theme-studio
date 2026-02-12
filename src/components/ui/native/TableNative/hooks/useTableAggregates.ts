/**
 * Aggregates hook for TableNative.
 *
 * Computes footer summaries (Sum, Average, Count, Min, Max,
 * TrueCount, FalseCount, Custom) aligned to their columns.
 */
import { useMemo } from 'react';

import { AggregateType } from '@/lib/grid/types';

const ZERO = 0;

interface AggregateColumnDef {
  field: string;
  type: AggregateType;
  format?: (value: number) => string;
  customAggregate?: (data: Array<Record<string, unknown>>, field: string) => unknown;
}

interface AggregateRowDef {
  columns: AggregateColumnDef[];
}

interface ComputedAggregate {
  field: string;
  type: AggregateType;
  value: unknown;
  formatted: string;
}

interface ComputedAggregateRow {
  columns: ComputedAggregate[];
}

interface UseTableAggregatesProps {
  data: Array<Record<string, unknown>>;
  aggregates?: AggregateRowDef[] | undefined;
}

interface UseTableAggregatesResult {
  aggregateRows: ComputedAggregateRow[];
  hasAggregates: boolean;
  getAggregateValue: (rowIndex: number, field: string) => unknown;
}

/** Extract numeric values from a data column */
function extractNumbers(data: Array<Record<string, unknown>>, field: string): number[] {
  const numbers: number[] = [];
  for (const row of data) {
    const val = Number(row[field]);
    if (!Number.isNaN(val)) numbers.push(val);
  }
  return numbers;
}

/** Compute numeric aggregate (Sum/Average/Min/Max) */
function computeNumericAggregate(
  numbers: number[],
  type: AggregateType,
): number {
  if (numbers.length === ZERO) return ZERO;
  if (type === AggregateType.Sum) return numbers.reduce((acc, n) => acc + n, ZERO);
  if (type === AggregateType.Average) return numbers.reduce((acc, n) => acc + n, ZERO) / numbers.length;
  if (type === AggregateType.Min) return Math.min(...numbers);
  // Max is the only remaining case
  return Math.max(...numbers);
}

/** Compute a single aggregate value */
function computeAggregate(
  data: Array<Record<string, unknown>>,
  field: string,
  type: AggregateType,
  customFn?: (data: Array<Record<string, unknown>>, field: string) => unknown,
): unknown {
  if (type === AggregateType.Custom) return customFn?.(data, field) ?? ZERO;
  if (type === AggregateType.Count) return data.length;
  if (type === AggregateType.TrueCount) return data.filter((row) => row[field] === true).length;
  if (type === AggregateType.FalseCount) return data.filter((row) => row[field] === false).length;
  return computeNumericAggregate(extractNumbers(data, field), type);
}

/** Format a computed aggregate value for display */
function formatAggregateValue(
  value: unknown,
  type: AggregateType,
  customFormat?: (value: number) => string,
): string {
  if (typeof value !== 'number') return String(value ?? '');
  if (typeof customFormat === 'function') return customFormat(value);
  if (type === AggregateType.Average) return value.toFixed(2);

  const isNumericWithDecimals = type === AggregateType.Sum || type === AggregateType.Min;
  const showDecimals = isNumericWithDecimals || type === AggregateType.Max;
  if (showDecimals) {
    const isInteger = Number.isInteger(value);
    return isInteger ? String(value) : value.toFixed(2);
  }

  return String(value);
}

/** Build a label prefix for the aggregate type */
function getTypeLabel(type: AggregateType): string {
  const labels: Record<AggregateType, string> = {
    [AggregateType.Sum]: 'Sum',
    [AggregateType.Average]: 'Avg',
    [AggregateType.Count]: 'Count',
    [AggregateType.Min]: 'Min',
    [AggregateType.Max]: 'Max',
    [AggregateType.TrueCount]: 'True',
    [AggregateType.FalseCount]: 'False',
    [AggregateType.Custom]: '',
  };
  return labels[type];
}

/** Map a single aggregate column definition to its computed result */
function computeAggregateColumn(
  data: Array<Record<string, unknown>>,
  colDef: AggregateColumnDef,
): ComputedAggregate {
  const rawValue = computeAggregate(data, colDef.field, colDef.type, colDef.customAggregate);
  const formatted = formatAggregateValue(rawValue, colDef.type, colDef.format);
  const label = getTypeLabel(colDef.type);
  const displayValue = label !== '' ? `${label}: ${formatted}` : formatted;
  return { field: colDef.field, type: colDef.type, value: rawValue, formatted: displayValue };
}

/** Build a lookup map for fast aggregate value access */
function buildAggregateLookup(
  aggregateRows: ComputedAggregateRow[],
): Map<string, unknown> {
  const lookup = new Map<string, unknown>();
  for (let rowIdx = ZERO; rowIdx < aggregateRows.length; rowIdx++) {
    const row = aggregateRows[rowIdx];
    if (!row) continue;
    for (const col of row.columns)
      lookup.set(`${String(rowIdx)}:${col.field}`, col.value);
  }
  return lookup;
}

export function useTableAggregates({
  data,
  aggregates = [],
}: UseTableAggregatesProps): UseTableAggregatesResult {
  const hasAggregates = aggregates.length > ZERO;

  const aggregateRows = useMemo<ComputedAggregateRow[]>(() => {
    if (!hasAggregates) return [];
    return aggregates.map((rowDef) => ({
      columns: rowDef.columns.map((colDef) => computeAggregateColumn(data, colDef)),
    }));
  }, [data, aggregates, hasAggregates]);

  const getAggregateValue = useMemo(() => {
    const lookup = buildAggregateLookup(aggregateRows);
    return (rowIndex: number, field: string): unknown =>
      lookup.get(`${String(rowIndex)}:${field}`);
  }, [aggregateRows]);

  return { aggregateRows, hasAggregates, getAggregateValue };
}

export { computeAggregate, formatAggregateValue, getTypeLabel, extractNumbers };
export type {
  AggregateColumnDef,
  AggregateRowDef,
  ComputedAggregate,
  ComputedAggregateRow,
  UseTableAggregatesResult,
};

// Re-export for convenience
export { AggregateType };
