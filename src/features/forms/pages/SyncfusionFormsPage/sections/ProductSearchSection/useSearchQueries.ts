/**
 * useSearchQueries - Executes the appropriate API queries based on search mode.
 *
 * Handles text search, category-only search, and category filtering for categories dropdown.
 */
import { useMemo } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';
import {
  useMockServerWebProductsSearch,
  useMockServerWebProductsListCategories,
  useMockServerWebProductsListByCategory,
} from '@/api/generated/mockserver/products/products';
import { isValueDefined } from '@/utils/is';

interface SearchQueryInput {
  searchParams: { q: string; category?: string } | undefined;
  hasTextQuery: boolean;
  hasCategoryOnly: boolean;
}

interface SearchQueryResult {
  categories: string[];
  products: ProductDto[];
  isSearching: boolean;
}

export function useSearchQueries(input: SearchQueryInput): SearchQueryResult {
  const { searchParams, hasTextQuery, hasCategoryOnly } = input;

  const { data: categoriesData } = useMockServerWebProductsListCategories();
  const categories = categoriesData?.data ?? [];

  const queryParams = useMemo(() => ({ q: searchParams?.q ?? '' }), [searchParams?.q]);
  const searchOpts = useMemo(() => ({ query: { enabled: hasTextQuery } }), [hasTextQuery]);
  const categoryOpts = useMemo(() => ({ query: { enabled: hasCategoryOnly } }), [hasCategoryOnly]);

  const { data: searchData, isFetching: isSearchFetching } =
    useMockServerWebProductsSearch(queryParams, searchOpts);

  const { data: categoryData, isFetching: isCategoryFetching } =
    useMockServerWebProductsListByCategory(searchParams?.category ?? '', categoryOpts);

  const categoryFilter = searchParams?.category;
  const products = useMemo(() => {
    if (hasTextQuery) return filterByCategory(searchData?.data ?? [], categoryFilter);
    if (hasCategoryOnly) return categoryData?.data ?? [];
    return [];
  }, [hasTextQuery, hasCategoryOnly, searchData?.data, categoryData?.data, categoryFilter]);

  const isSearching =
    (hasTextQuery && isSearchFetching) || (hasCategoryOnly && isCategoryFetching);

  return { categories, products, isSearching };
}

/** Filter search results by category client-side */
function filterByCategory(results: ProductDto[], category: string | undefined): ProductDto[] {
  if (isValueDefined(category) && category !== '')
    return results.filter((p) => p.category === category);
  return results;
}
