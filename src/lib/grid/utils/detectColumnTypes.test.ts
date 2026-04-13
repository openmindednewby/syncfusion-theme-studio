import { describe, it, expect } from 'vitest';

import { ColumnType } from '../types';
import { detectColumnTypes } from './detectColumnTypes';

describe('detectColumnTypes', () => {
  const fields = ['name', 'age', 'active', 'createdAt'];

  it('detects string columns from text data', () => {
    const data = [{ name: 'Alice', age: 30, active: true, createdAt: '2024-01-01' }];
    const result = detectColumnTypes(data, ['name']);
    expect(result['name']).toBe(ColumnType.String);
  });

  it('detects number columns from numeric data', () => {
    const data = [{ name: 'Alice', age: 30, active: true, createdAt: '2024-01-01' }];
    const result = detectColumnTypes(data, ['age']);
    expect(result['age']).toBe(ColumnType.Number);
  });

  it('detects boolean columns', () => {
    const data = [{ name: 'Alice', age: 30, active: true, createdAt: '2024-01-01' }];
    const result = detectColumnTypes(data, ['active']);
    expect(result['active']).toBe(ColumnType.Boolean);
  });

  it('detects date columns from ISO date strings', () => {
    const data = [{ name: 'Alice', age: 30, active: true, createdAt: '2024-01-01' }];
    const result = detectColumnTypes(data, ['createdAt']);
    expect(result['createdAt']).toBe(ColumnType.Date);
  });

  it('detects all column types in a single call', () => {
    const data = [{ name: 'Alice', age: 30, active: true, createdAt: '2024-01-15T10:00:00Z' }];
    const result = detectColumnTypes(data, fields);

    expect(result['name']).toBe(ColumnType.String);
    expect(result['age']).toBe(ColumnType.Number);
    expect(result['active']).toBe(ColumnType.Boolean);
    expect(result['createdAt']).toBe(ColumnType.Date);
  });

  it('respects per-column overrides', () => {
    const data = [{ name: 'Alice', age: 30 }];
    const overrides = { age: ColumnType.String };
    const result = detectColumnTypes(data, ['name', 'age'], overrides);

    expect(result['age']).toBe(ColumnType.String);
  });

  it('defaults to String when all sample values are null or empty', () => {
    const data = [{ name: undefined }, { name: '' }, { name: undefined }];
    const result = detectColumnTypes(
      data as Array<Record<string, unknown>>,
      ['name'],
    );
    expect(result['name']).toBe(ColumnType.String);
  });

  it('samples only the first 10 rows', () => {
    const data = Array.from({ length: 15 }, (_, i) => ({
      value: i < 10 ? 'text' : 42,
    }));
    const result = detectColumnTypes(data as Array<Record<string, unknown>>, ['value']);
    expect(result['value']).toBe(ColumnType.String);
  });

  it('skips null values and uses first non-null for detection', () => {
    const data = [
      { score: undefined },
      { score: undefined },
      { score: 95 },
    ];
    const result = detectColumnTypes(data as Array<Record<string, unknown>>, ['score']);
    expect(result['score']).toBe(ColumnType.Number);
  });

  it('detects Date objects as date type', () => {
    const data = [{ createdAt: new Date('2024-06-15') }];
    const result = detectColumnTypes(data as Array<Record<string, unknown>>, ['createdAt']);
    expect(result['createdAt']).toBe(ColumnType.Date);
  });

  it('returns empty record for empty fields array', () => {
    const data = [{ name: 'Alice' }];
    const result = detectColumnTypes(data, []);
    expect(result).toEqual({});
  });
});
