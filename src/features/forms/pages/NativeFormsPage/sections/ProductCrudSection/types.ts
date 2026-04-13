/**
 * Types for the native ProductCrudSection feature.
 */
import type { ProductDto } from '@/api/generated/mockserver/models';

import type { NativeProductFormData } from '../../forms/NativeProductForm/schema';

export interface NativeProductCrudResult {
  products: ProductDto[];
  totalProducts: number;
  categories: string[];
  editingProduct: ProductDto | null;
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
  isMutating: boolean;
  setEditingProduct: (product: ProductDto | null) => void;
  handleFormSubmit: (data: NativeProductFormData) => void;
  handleDelete: (id: number) => void;
}
