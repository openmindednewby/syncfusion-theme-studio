/**
 * useProductQueries - Fetches products list and categories from the API.
 */
import { useMemo } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';
import {
  useMockServerWebProductsList,
  useMockServerWebProductsListCategories,
} from '@/api/generated/mockserver/products/products';

const PRODUCTS_PAGE_SIZE = 10;
const INITIAL_SKIP = 0;

export interface ProductQueryResult {
  products: ProductDto[];
  totalProducts: number;
  categories: string[];
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
}

export function useProductQueries(): ProductQueryResult {
  const listParams = useMemo(() => ({ skip: INITIAL_SKIP, limit: PRODUCTS_PAGE_SIZE }), []);
  const { data: productsData, isLoading: isLoadingProducts } =
    useMockServerWebProductsList(listParams);
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useMockServerWebProductsListCategories();

  const responseData = productsData?.data;

  return {
    products: responseData?.items ?? [],
    totalProducts: responseData?.total ?? 0,
    categories: categoriesData?.data ?? [],
    isLoadingProducts,
    isLoadingCategories,
  };
}
