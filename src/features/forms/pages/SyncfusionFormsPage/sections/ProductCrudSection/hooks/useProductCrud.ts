/**
 * useProductCrud - Composes product queries and mutations.
 *
 * Thin orchestrator that combines data fetching with CRUD operations.
 */
import { useState } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';

import { useProductMutations } from './useProductMutations';
import { useProductQueries } from './useProductQueries';

import type { ProductCrudResult } from '../types';

export function useProductCrud(): ProductCrudResult {
  const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);
  const queries = useProductQueries();
  const mutations = useProductMutations(editingProduct, setEditingProduct);

  return {
    ...queries,
    editingProduct,
    setEditingProduct,
    ...mutations,
  };
}
