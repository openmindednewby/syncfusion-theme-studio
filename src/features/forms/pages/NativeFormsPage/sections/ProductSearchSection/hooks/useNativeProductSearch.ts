/**
 * useNativeProductSearch - Manages product search state and API queries.
 */
import { useState, useMemo, useCallback } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { useNativeSearchQueries } from './useNativeSearchQueries';

import type { NativeSearchFormData } from '../../../forms/NativeSearchForm/schema';

interface SearchParams {
  q: string;
  category?: string;
}

interface UseNativeProductSearchResult {
  categories: string[];
  products: ProductDto[];
  isSearching: boolean;
  hasSearched: boolean;
  hasResults: boolean;
  handleSearch: (data: NativeSearchFormData) => void;
}

export function useNativeProductSearch(): UseNativeProductSearchResult {
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

  const { categories, products, isSearching } = useNativeSearchQueries(queryInput);

  const handleSearch = useCallback((data: NativeSearchFormData) => {
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
