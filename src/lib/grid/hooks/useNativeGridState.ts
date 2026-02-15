/**
 * State manager for the native table's filter, sort, and pagination.
 *
 * Provides a single hook that manages all grid state and exposes
 * a data pipeline: raw data -> filter -> sort -> paginate.
 */
import { useState, useCallback, useMemo, useEffect } from 'react';

import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { ColumnType, DataMode, SortDirection } from '../types';
import { detectColumnTypes } from '../utils/detectColumnTypes';

import type { GridConfig, SortColumnConfig } from '../types';

const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;
const NO_THRESHOLD = 0;

interface NativeGridStateResult {
  filterValues: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  sortField: string | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
  onSort: (field: string) => void;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  shouldShowPagination: boolean;
  columnTypes: Record<string, ColumnType>;
  processedData: Array<Record<string, unknown>>;
}

/** Apply client-side filters to data */
function applyFilters(
  data: Array<Record<string, unknown>>,
  filters: Record<string, string>,
  columnTypes: Record<string, ColumnType>,
): Array<Record<string, unknown>> {
  return data.filter((row) =>
    Object.entries(filters).every(([field, filterValue]) => {
      if (filterValue === '') return true;

      const cellValue = row[field];
      const type = columnTypes[field] ?? ColumnType.String;

      if (type === ColumnType.Boolean) return String(cellValue) === filterValue;

      if (type === ColumnType.Number) {
        const num = Number(cellValue);
        const filterNum = Number(filterValue);
        return !Number.isNaN(filterNum) && num === filterNum;
      }

      if (type === ColumnType.Date) {
        const cellDate = isValueDefined(cellValue) ? String(cellValue).split('T')[0] : '';
        return cellDate === filterValue;
      }

      // String: case-insensitive contains
      const str = isValueDefined(cellValue) ? String(cellValue).toLowerCase() : '';
      return str.includes(filterValue.toLowerCase());
    }),
  );
}

/** Apply client-side sort to data */
function applySort(
  data: Array<Record<string, unknown>>,
  field: string | undefined,
  direction: 'ascending' | 'descending' | undefined,
): Array<Record<string, unknown>> {
  if (!isValueDefined(field) || !isValueDefined(direction)) return data;

  const sortField = field;
  return [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const aStr = isValueDefined(aVal) ? String(aVal) : '';
    const bStr = isValueDefined(bVal) ? String(bVal) : '';
    const aNum = Number(aVal);
    const bNum = Number(bVal);
    const bothNumeric = !Number.isNaN(aNum) && !Number.isNaN(bNum);

    const comparison = bothNumeric ? aNum - bNum : aStr.localeCompare(bStr);
    return direction === 'ascending' ? comparison : -comparison;
  });
}

function mapSortDirection(
  sortCol?: SortColumnConfig,
): 'ascending' | 'descending' | undefined {
  if (!isValueDefined(sortCol)) return undefined;
  return sortCol.direction === SortDirection.Ascending ? 'ascending' : 'descending';
}

/** Manages filter state for native grid */
function useFilterState(): {
  filterValues: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
} {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const onFilterChange = useCallback((field: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
  }, []);
  return { filterValues, onFilterChange };
}

/** Manages sort state for native grid */
function useSortState(defaultSort?: SortColumnConfig[]): {
  sortField: string | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
  onSort: (field: string) => void;
} {
  const initialSort = isNotEmptyArray(defaultSort) ? defaultSort[0] : undefined;
  const [sortState, setSortState] = useState<{
    field: string | undefined;
    direction: 'ascending' | 'descending' | undefined;
  }>({
    field: initialSort?.field,
    direction: mapSortDirection(initialSort),
  });

  const onSort = useCallback((field: string) => {
    setSortState((prev) => {
      const isSameField = prev.field === field;
      const isCurrentlyAsc = isSameField && prev.direction === 'ascending';
      return {
        field,
        direction: isCurrentlyAsc ? 'descending' : 'ascending',
      };
    });
  }, []);

  return { sortField: sortState.field, sortDirection: sortState.direction, onSort };
}

/** Manages pagination state for native grid */
function usePaginationState(initialPageSize: number): {
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  resetPage: () => void;
} {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const onPageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(FIRST_PAGE);
  }, []);

  const resetPage = useCallback(() => {
    setCurrentPage(FIRST_PAGE);
  }, []);

  return { currentPage, pageSize, onPageChange, onPageSizeChange, resetPage };
}

interface DataPipelineInput {
  data: Array<Record<string, unknown>>;
  isClient: boolean;
  filterConfig: GridConfig['filter'];
  filterValues: Record<string, string>;
  columnTypes: Record<string, ColumnType>;
  sortField: string | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
}

/** Run the client-side data pipeline: filter -> sort */
function useDataPipeline(input: DataPipelineInput): Array<Record<string, unknown>> {
  const { data, isClient, filterConfig, filterValues, columnTypes, sortField, sortDirection } = input;

  const filteredData = useMemo(() => {
    if (!isClient) return data;
    const isFilterEnabled = isValueDefined(filterConfig) && filterConfig.enabled;
    return isFilterEnabled ? applyFilters(data, filterValues, columnTypes) : data;
  }, [isClient, data, filterValues, columnTypes, filterConfig]);

  return useMemo(
    () => (isClient ? applySort(filteredData, sortField, sortDirection) : filteredData),
    [isClient, filteredData, sortField, sortDirection],
  );
}

/** Determine if pagination should show and slice the data accordingly */
function usePaginatedData(
  sortedData: Array<Record<string, unknown>>,
  paginationConfig: GridConfig['pagination'],
  currentPage: number,
  pageSize: number,
): { processedData: Array<Record<string, unknown>>; shouldShowPagination: boolean; totalItems: number; totalPages: number } {
  const totalItems = sortedData.length;
  const totalPages = Math.max(FIRST_PAGE, Math.ceil(totalItems / pageSize));
  const isPaginationEnabled = isValueDefined(paginationConfig) && paginationConfig.enabled;
  const threshold = paginationConfig?.threshold ?? NO_THRESHOLD;
  const shouldShowPagination = isPaginationEnabled && totalItems > threshold;

  const processedData = useMemo(() => {
    if (!shouldShowPagination) return sortedData;
    const start = (currentPage - FIRST_PAGE) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, shouldShowPagination, currentPage, pageSize]);

  return { processedData, shouldShowPagination, totalItems, totalPages };
}

export function useNativeGridState(
  data: Array<Record<string, unknown>>,
  fields: string[],
  gridConfig?: GridConfig,
): NativeGridStateResult {
  const mode = gridConfig?.mode;
  const isClient = !isValueDefined(mode) || mode === DataMode.Client;

  const columnTypes = useMemo(
    () => detectColumnTypes(data, fields, gridConfig?.filter?.columnTypeOverrides),
    [data, fields, gridConfig?.filter?.columnTypeOverrides],
  );

  const { filterValues, onFilterChange } = useFilterState();
  const { sortField, sortDirection, onSort } = useSortState(gridConfig?.defaultSort);
  const configPageSize = gridConfig?.pagination?.pageSize ?? DEFAULT_PAGE_SIZE;
  const { currentPage, pageSize, onPageChange, onPageSizeChange, resetPage } =
    usePaginationState(configPageSize);

  const sortedData = useDataPipeline({
    data, isClient, filterConfig: gridConfig?.filter, filterValues, columnTypes, sortField, sortDirection,
  });

  useEffect(() => { resetPage(); }, [filterValues, resetPage]);

  const { processedData, shouldShowPagination, totalItems, totalPages } =
    usePaginatedData(sortedData, gridConfig?.pagination, currentPage, pageSize);

  return {
    filterValues, onFilterChange, sortField, sortDirection, onSort,
    currentPage, pageSize, totalPages, totalItems,
    onPageChange, onPageSizeChange, shouldShowPagination, columnTypes, processedData,
  };
}
