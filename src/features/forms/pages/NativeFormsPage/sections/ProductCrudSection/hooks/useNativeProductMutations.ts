/**
 * useNativeProductMutations - Handles product create/update/delete mutations.
 */
import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { ProductDto, UpdateProductRequest } from '@/api/generated/mockserver/models';
import {
  useMockServerWebProductsCreate,
  useMockServerWebProductsUpdate,
  useMockServerWebProductsDelete,
  getMockServerWebProductsListQueryKey,
} from '@/api/generated/mockserver/products/products';
import { isValueDefined } from '@/utils/is';

import type { NativeProductFormData } from '../../../forms/NativeProductForm/schema';

export interface NativeProductMutationResult {
  isMutating: boolean;
  handleFormSubmit: (data: NativeProductFormData) => void;
  handleDelete: (id: number) => void;
}

/** Maps form data to the API request payload */
function toApiPayload(data: NativeProductFormData): UpdateProductRequest {
  const payload: UpdateProductRequest = {
    title: data.productName,
    category: data.category,
    price: data.price,
    stock: data.stock,
  };

  if (isValueDefined(data.description)) payload.description = data.description;
  if (isValueDefined(data.brand)) payload.brand = data.brand;

  return payload;
}

/** Returns a stable callback that invalidates the products list query */
function useInvalidateProducts(): () => void {
  const queryClient = useQueryClient();

  return useCallback((): void => {
    queryClient
      .invalidateQueries({ queryKey: getMockServerWebProductsListQueryKey() })
      .catch(() => undefined);
  }, [queryClient]);
}

export function useNativeProductMutations(
  editingProduct: ProductDto | null,
  setEditingProduct: (p: ProductDto | null) => void,
): NativeProductMutationResult {
  const createMutation = useMockServerWebProductsCreate();
  const updateMutation = useMockServerWebProductsUpdate();
  const deleteMutation = useMockServerWebProductsDelete();
  const invalidate = useInvalidateProducts();

  const handleFormSubmit = useCallback((data: NativeProductFormData) => {
    const payload = toApiPayload(data);
    const onDone = (): void => { setEditingProduct(null); invalidate(); };
    if (isValueDefined(editingProduct?.id))
      updateMutation.mutate({ id: editingProduct.id, data: payload }, { onSuccess: onDone });
    else createMutation.mutate({ data: payload }, { onSuccess: invalidate });
  }, [editingProduct, createMutation, updateMutation, invalidate, setEditingProduct]);

  const handleDelete = useCallback((id: number) => {
    const onDone = (): void => {
      if (editingProduct?.id === id) setEditingProduct(null);
      invalidate();
    };
    deleteMutation.mutate({ id }, { onSuccess: onDone });
  }, [deleteMutation, editingProduct, invalidate, setEditingProduct]);

  return {
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    handleFormSubmit,
    handleDelete,
  };
}
