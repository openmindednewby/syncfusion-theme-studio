/**
 * useNativeProductCrud - Composes product queries and mutations.
 */
import { useState } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';

import { useNativeProductMutations } from './useNativeProductMutations';
import { useNativeProductQueries } from './useNativeProductQueries';

import type { NativeProductCrudResult } from '../types';

export function useNativeProductCrud(): NativeProductCrudResult {
  const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);
  const queries = useNativeProductQueries();
  const mutations = useNativeProductMutations(editingProduct, setEditingProduct);

  return {
    ...queries,
    editingProduct,
    setEditingProduct,
    ...mutations,
  };
}
