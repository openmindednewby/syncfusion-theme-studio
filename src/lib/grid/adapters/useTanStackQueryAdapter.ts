/**
 * TanStack Query adapter for server-side grid data.
 *
 * Wraps an Orval-generated query hook and automatically builds query
 * parameters from the grid's filter/sort/pagination state.
 * Provides a zero-boilerplate way to connect grids to API endpoints.
 */
import { useMemo } from 'react';

import { isValueDefined } from '@/utils/is';

import type { ServerQueryParams, TanStackQueryAdapterConfig } from '../types';

/** Default params builder: maps grid state to a flat query object */
function defaultParamsBuilder(params: ServerQueryParams): Record<string, unknown> {
  const query: Record<string, unknown> = {
    page: params.page,
    pageSize: params.pageSize,
  };

  if (isValueDefined(params.sortField)) {
    query['sortBy'] = params.sortField;
    query['sortOrder'] = params.sortDirection;
  }

  // Flatten filters into top-level query params
  for (const [key, value] of Object.entries(params.filters)) 
    if (value !== '' && isValueDefined(value)) query[key] = value;
  

  return query;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

interface AdapterResult<TData> {
  /** The query data (unwrapped from TanStack Query) */
  data: TData | undefined;
  /** Whether the query is loading */
  isLoading: boolean;
  /** Whether the query errored */
  isError: boolean;
  /** The error object */
  error: unknown;
  /** Refetch function */
  refetch: () => void;
}

/**
 * Build query parameters from grid state for use with TanStack Query hooks.
 *
 * @param gridState - Current filter/sort/page state from the grid
 * @param config - Adapter configuration with hook and optional params builder
 * @returns Query params ready to pass to the Orval hook
 */
export function buildQueryParams<TParams = Record<string, unknown>>(
  gridState: Partial<ServerQueryParams>,
  config: Pick<TanStackQueryAdapterConfig<TParams>, 'paramsBuilder' | 'staticParams'>,
): TParams {
  const params: ServerQueryParams = {
    filters: gridState.filters ?? {},
    page: gridState.page ?? DEFAULT_PAGE,
    pageSize: gridState.pageSize ?? DEFAULT_PAGE_SIZE,
    ...(isValueDefined(gridState.sortField) ? { sortField: gridState.sortField } : {}),
    ...(isValueDefined(gridState.sortDirection) ? { sortDirection: gridState.sortDirection } : {}),
  };

  if (isValueDefined(config.paramsBuilder)) return config.paramsBuilder(params);

  const built = defaultParamsBuilder(params);

  if (isValueDefined(config.staticParams)) 
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { ...built, ...(config.staticParams as Record<string, unknown>) } as TParams;
  

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return built as TParams;
}

/**
 * Hook that connects a TanStack Query (Orval) hook to grid state.
 *
 * @param config - Adapter configuration
 * @param gridState - Current grid filter/sort/page state
 * @returns Adapted query result
 */
export function useTanStackQueryAdapter<TData, TParams = Record<string, unknown>>(
  config: TanStackQueryAdapterConfig<TParams>,
  gridState: Partial<ServerQueryParams>,
): AdapterResult<TData> {
  const queryParams = useMemo(
    () => buildQueryParams(gridState, config),
    [gridState, config],
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const result = config.queryHook(queryParams) as {
    data?: { data?: TData };
    isLoading?: boolean;
    isError?: boolean;
    error?: unknown;
    refetch?: () => void;
  };

  return {
    data: result.data?.data,
    isLoading: result.isLoading ?? false,
    isError: result.isError ?? false,
    error: result.error,
    refetch: result.refetch ?? (() => {}),
  };
}
