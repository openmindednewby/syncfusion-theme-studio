/**
 * useProductSearch - Manages product search state and API queries.
 *
 * Handles text search via useMockServerWebProductsSearch and
 * category-only search via useMockServerWebProductsListByCategory.
 */
import { useState, useMemo, useCallback } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { useSearchQueries } from './useSearchQueries';

import type { SearchFormData } from '../../forms/SearchForm/schema';

interface SearchParams {
  q: string;
  category?: string;
}

interface UseProductSearchResult {
  categories: string[];
  products: ProductDto[];
  isSearching: boolean;
  hasSearched: boolean;
  hasResults: boolean;
  handleSearch: (data: SearchFormData) => void;
}

export function useProductSearch(): UseProductSearchResult {
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>(undefined);

  const hasTextQuery = isValueDefined(searchParams) && searchParams.q !== '';
  const hasCategoryOnly =
    isValueDefined(searchParams) &&
    searchParams.q === '' &&
    isValueDefined(searchParams.category) &&
    searchParams.category !== '';

  const queryInput = useMemo(
    () => ({ searchParams, hasTextQuery, hasCategoryOnly }),
    [searchParams, hasTextQuery, hasCategoryOnly],
  );

  const { categories, products, isSearching } = useSearchQueries(queryInput);

  const handleSearch = useCallback((data: SearchFormData) => {
    const params: SearchParams = { q: data.query };
    if (isValueDefined(data.category)) params.category = data.category;
    setSearchParams(params);
  }, []);

  return {
    categories,
    products,
    isSearching,
    hasSearched: isValueDefined(searchParams),
    hasResults: isNotEmptyArray(products),
    handleSearch,
  };
}
