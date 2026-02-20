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

import type { ProductFormData } from '../../../forms/ProductForm/schema';

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

/** Returns a stable callback that invalidates the products list query */
function useInvalidateProducts(): () => void {
  const queryClient = useQueryClient();

  return useCallback((): void => {
    queryClient
      .invalidateQueries({
        queryKey: getMockServerWebProductsListQueryKey(),
      })
      .catch(() => {
        /* fire-and-forget */
      });
  }, [queryClient]);
}

/** Handles delete mutation with editing state cleanup */
function useProductDelete(
  editingProduct: ProductDto | null,
  setEditingProduct: (p: ProductDto | null) => void,
  invalidate: () => void
): {
  deleteMutation: ReturnType<typeof useMockServerWebProductsDelete>;
  handleDelete: (id: number) => void;
} {
  const deleteMutation = useMockServerWebProductsDelete();

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate(
        { id },
        {
          onSuccess: () => {
            if (editingProduct?.id === id) setEditingProduct(null);
            invalidate();
          },
        }
      );
    },
    [deleteMutation, editingProduct, invalidate, setEditingProduct]
  );

  return { deleteMutation, handleDelete };
}

export function useProductMutations(
  editingProduct: ProductDto | null,
  setEditingProduct: (p: ProductDto | null) => void
): ProductMutationResult {
  const createMutation = useMockServerWebProductsCreate();
  const updateMutation = useMockServerWebProductsUpdate();
  const invalidate = useInvalidateProducts();
  const { deleteMutation, handleDelete } = useProductDelete(
    editingProduct,
    setEditingProduct,
    invalidate
  );

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleFormSubmit = useCallback(
    (data: ProductFormData) => {
      const payload = toApiPayload(data);
      const onDone = (): void => {
        setEditingProduct(null);
        invalidate();
      };

      if (isValueDefined(editingProduct?.id))
        updateMutation.mutate({ id: editingProduct.id, data: payload }, { onSuccess: onDone });
      else createMutation.mutate({ data: payload }, { onSuccess: invalidate });
    },
    [editingProduct, createMutation, updateMutation, invalidate, setEditingProduct]
  );

  return { isMutating, handleFormSubmit, handleDelete };
}
