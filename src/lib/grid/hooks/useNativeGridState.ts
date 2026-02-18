import { useState, useCallback, useMemo, useEffect } from 'react';

import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { ColumnType, DataMode, FilterOperator, SortDirection, type GridConfig, type SortColumnConfig } from '../types';
import { detectColumnTypes } from '../utils/detectColumnTypes';
import { executeFilterComparison } from '../utils/executeFilter';
import { getDefaultOperator } from '../utils/filterOperatorsByType';

const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;
const NO_THRESHOLD = 0;

interface NativeGridStateResult {
  filterValues: Record<string, string>;
  filterOperators: Record<string, FilterOperator>;
  onFilterChange: (field: string, value: string) => void;
  onFilterOperatorChange: (field: string, operator: FilterOperator) => void;
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

function applyFilters(
  data: Array<Record<string, unknown>>,
  filters: Record<string, string>,
  columnTypes: Record<string, ColumnType>,
  filterOperators: Record<string, FilterOperator>,
): Array<Record<string, unknown>> {
  return data.filter((row) =>
    Object.entries(filters).every(([field, filterValue]) => {
      const type = columnTypes[field] ?? ColumnType.String;
      const operator = filterOperators[field] ?? getDefaultOperator(type);
      const isEmptyOp = operator === FilterOperator.Empty || operator === FilterOperator.NotEmpty;
      if (filterValue === '' && !isEmptyOp) return true;
      return executeFilterComparison(row[field], filterValue, type, operator);
    }),
  );
}

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

function useFilterState(): {
  filterValues: Record<string, string>;
  filterOperators: Record<string, FilterOperator>;
  onFilterChange: (field: string, value: string) => void;
  onFilterOperatorChange: (field: string, operator: FilterOperator) => void;
} {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [filterOperators, setFilterOperators] = useState<Record<string, FilterOperator>>({});
  const onFilterChange = useCallback((field: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
  }, []);
  const onFilterOperatorChange = useCallback((field: string, operator: FilterOperator) => {
    setFilterOperators((prev) => ({ ...prev, [field]: operator }));
  }, []);
  return { filterValues, filterOperators, onFilterChange, onFilterOperatorChange };
}

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

function usePaginationState(initialPageSize: number): {
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  resetPage: () => void;
} {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const onPageChange = useCallback((page: number) => { setCurrentPage(page); }, []);
  const onPageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(FIRST_PAGE);
  }, []);
  const resetPage = useCallback(() => { setCurrentPage(FIRST_PAGE); }, []);
  return { currentPage, pageSize, onPageChange, onPageSizeChange, resetPage };
}

interface DataPipelineInput {
  data: Array<Record<string, unknown>>;
  isClient: boolean;
  filterConfig: GridConfig['filter'];
  filterValues: Record<string, string>;
  filterOperators: Record<string, FilterOperator>;
  columnTypes: Record<string, ColumnType>;
  sortField: string | undefined;
  sortDirection: 'ascending' | 'descending' | undefined;
}

function useDataPipeline(input: DataPipelineInput): Array<Record<string, unknown>> {
  const { data, isClient, filterConfig, filterValues, filterOperators, columnTypes, sortField, sortDirection } = input;

  const filteredData = useMemo(() => {
    if (!isClient) return data;
    const isFilterRowEnabled = isValueDefined(filterConfig) && filterConfig.enabled;
    const hasActiveFilters = Object.values(filterValues).some((v) => v.length > 0);
    const hasEmptyOps = Object.values(filterOperators).some(
      (op) => op === FilterOperator.Empty || op === FilterOperator.NotEmpty,
    );
    const shouldFilter = isFilterRowEnabled || hasActiveFilters || hasEmptyOps;
    return shouldFilter ? applyFilters(data, filterValues, columnTypes, filterOperators) : data;
  }, [isClient, data, filterValues, filterOperators, columnTypes, filterConfig]);

  return useMemo(
    () => (isClient ? applySort(filteredData, sortField, sortDirection) : filteredData),
    [isClient, filteredData, sortField, sortDirection],
  );
}

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

  const { filterValues, filterOperators, onFilterChange, onFilterOperatorChange } = useFilterState();
  const { sortField, sortDirection, onSort } = useSortState(gridConfig?.defaultSort);
  const configPageSize = gridConfig?.pagination?.pageSize ?? DEFAULT_PAGE_SIZE;
  const { currentPage, pageSize, onPageChange, onPageSizeChange, resetPage } =
    usePaginationState(configPageSize);

  const sortedData = useDataPipeline({
    data, isClient, filterConfig: gridConfig?.filter, filterValues, filterOperators, columnTypes, sortField, sortDirection,
  });

  useEffect(() => { resetPage(); }, [filterValues, resetPage]);

  const { processedData, shouldShowPagination, totalItems, totalPages } =
    usePaginatedData(sortedData, gridConfig?.pagination, currentPage, pageSize);

  return {
    filterValues, filterOperators, onFilterChange, onFilterOperatorChange,
    sortField, sortDirection, onSort,
    currentPage, pageSize, totalPages, totalItems,
    onPageChange, onPageSizeChange, shouldShowPagination, columnTypes, processedData,
  };
}
