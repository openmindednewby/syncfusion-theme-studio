/**
 * useProductMutations - Handles product create/update/delete mutations.
 *
 * Returns mutation handlers and pending state.
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

import type { ProductFormData } from '../../forms/ProductForm/schema';

export interface ProductMutationResult {
  isMutating: boolean;
  handleFormSubmit: (data: ProductFormData) => void;
  handleDelete: (id: number) => void;
}

/** Maps form data to the API request payload */
function toApiPayload(data: ProductFormData): UpdateProductRequest {
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

// eslint-disable-next-line smart-max-lines/smart-max-lines -- combines 3 mutations with invalidation
export function useProductMutations(
  editingProduct: ProductDto | null,
  setEditingProduct: (p: ProductDto | null) => void,
): ProductMutationResult {
  const queryClient = useQueryClient();
  const createMutation = useMockServerWebProductsCreate();
  const updateMutation = useMockServerWebProductsUpdate();
  const deleteMutation = useMockServerWebProductsDelete();

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const invalidate = useCallback((): void => {
    queryClient.invalidateQueries({
      queryKey: getMockServerWebProductsListQueryKey(),
    }).catch(() => { /* fire-and-forget */ });
  }, [queryClient]);

  const handleFormSubmit = useCallback(
    (data: ProductFormData) => {
      const payload = toApiPayload(data);
      const onDone = (): void => { setEditingProduct(null); invalidate(); };

      if (isValueDefined(editingProduct?.id))
        updateMutation.mutate({ id: editingProduct.id, data: payload }, { onSuccess: onDone });
      else
        createMutation.mutate({ data: payload }, { onSuccess: invalidate });
    },
    [editingProduct, createMutation, updateMutation, invalidate, setEditingProduct],
  );

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate({ id }, {
        onSuccess: () => {
          if (editingProduct?.id === id) setEditingProduct(null);
          invalidate();
        },
      });
    },
    [deleteMutation, editingProduct, invalidate, setEditingProduct],
  );

  return { isMutating, handleFormSubmit, handleDelete };
}
