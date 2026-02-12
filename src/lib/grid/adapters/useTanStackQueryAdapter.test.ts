import { describe, it, expect } from 'vitest';

import { SortDirection } from '../types';
import { buildQueryParams } from './useTanStackQueryAdapter';

describe('buildQueryParams', () => {
  it('builds default params with page and pageSize', () => {
    const result = buildQueryParams(
      { page: 2, pageSize: 25 },
      {},
    );

    expect(result).toEqual(
      expect.objectContaining({ page: 2, pageSize: 25 }),
    );
  });

  it('includes sort params when provided', () => {
    const result = buildQueryParams(
      { page: 1, pageSize: 10, sortField: 'name', sortDirection: SortDirection.Ascending },
      {},
    );

    expect(result).toEqual(
      expect.objectContaining({ sortBy: 'name', sortOrder: SortDirection.Ascending }),
    );
  });

  it('flattens filter values into query params', () => {
    const result = buildQueryParams(
      { page: 1, pageSize: 10, filters: { category: 'electronics', minPrice: 50 } },
      {},
    );

    expect(result).toEqual(
      expect.objectContaining({ category: 'electronics', minPrice: 50 }),
    );
  });

  it('excludes empty filter values', () => {
    const result = buildQueryParams(
      { page: 1, pageSize: 10, filters: { name: '', category: 'books' } },
      {},
    );

    expect(result).toEqual(expect.objectContaining({ category: 'books' }));
    expect(result).not.toHaveProperty('name');
  });

  it('merges static params', () => {
    const result = buildQueryParams(
      { page: 1, pageSize: 10 },
      { staticParams: { tenantId: 'abc-123' } },
    );

    expect(result).toEqual(
      expect.objectContaining({ tenantId: 'abc-123', page: 1, pageSize: 10 }),
    );
  });

  it('uses custom paramsBuilder when provided', () => {
    const customBuilder = (params: { page: number; pageSize: number }): { offset: number; limit: number } => ({
      offset: (params.page - 1) * params.pageSize,
      limit: params.pageSize,
    });

    const result = buildQueryParams(
      { page: 3, pageSize: 10 },
      { paramsBuilder: customBuilder },
    );

    expect(result).toEqual({ offset: 20, limit: 10 });
  });

  it('defaults page to 1 and pageSize to 10 when not provided', () => {
    const result = buildQueryParams({}, {});

    expect(result).toEqual(expect.objectContaining({ page: 1, pageSize: 10 }));
  });
});
