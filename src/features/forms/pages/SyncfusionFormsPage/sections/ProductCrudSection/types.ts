/**
 * Types for the ProductCrudSection feature.
 */
import type { ProductDto } from '@/api/generated/mockserver/models';

import type { ProductFormData } from '../../forms/ProductForm/schema';

export interface ProductCrudResult {
  products: ProductDto[];
  totalProducts: number;
  categories: string[];
  editingProduct: ProductDto | null;
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
  isMutating: boolean;
  setEditingProduct: (product: ProductDto | null) => void;
  handleFormSubmit: (data: ProductFormData) => void;
  handleDelete: (id: number) => void;
}
