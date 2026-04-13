/**
 * ProductCrudSection (Native) - Full CRUD interface for products.
 *
 * Renders a native product form (create/edit) above a TableNative that shows
 * all products from the MockServer API. Supports edit and delete actions.
 */
import { useMemo, useCallback } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';
import { LoadingSpinner } from '@/components/common/components/LoadingSpinner';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { getNativeProductColumns } from './columns';
import { ProductsTable } from './components/ProductsTable';
import { useNativeProductCrud } from './hooks/useNativeProductCrud';
import { FormSection } from '../../../SyncfusionFormsPage/components/FormSection';
import { NativeProductForm } from '../../forms/NativeProductForm';

import type { NativeProductFormData } from '../../forms/NativeProductForm/schema';

interface SelectOption {
  value: string;
  label: string;
}

/** Map a ProductDto to form default values */
function toFormDefaults(product: ProductDto): Partial<NativeProductFormData> {
  return {
    productName: product.title ?? '',
    category: product.category ?? '',
    price: product.price ?? 0,
    description: product.description ?? undefined,
    brand: product.brand ?? undefined,
    stock: product.stock ?? 0,
  };
}

export const NativeProductCrudSection = (): JSX.Element => {
  const {
    products,
    categories,
    editingProduct,
    isLoadingProducts,
    isLoadingCategories,
    isMutating,
    setEditingProduct,
    handleFormSubmit,
    handleDelete,
  } = useNativeProductCrud();

  const categoryOptions: SelectOption[] = useMemo(
    () => categories.map((cat): SelectOption => ({ value: cat, label: cat })),
    [categories],
  );

  const formDefaults = useMemo(
    () => (isValueDefined(editingProduct) ? toFormDefaults(editingProduct) : undefined),
    [editingProduct],
  );

  const columns = useMemo(() => getNativeProductColumns(), []);

  const handleEdit = useCallback(
    (product: ProductDto) => {
      setEditingProduct(product);
    },
    [setEditingProduct],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingProduct(null);
  }, [setEditingProduct]);

  const isEditing = isValueDefined(editingProduct);
  const formTitle = isEditing ? FM('forms.product.editTitle') : FM('forms.product.title');
  const formDescription = isEditing
    ? FM('forms.product.editDescription')
    : FM('forms.product.description');

  return (
    <div className="space-y-6">
      <FormSection description={formDescription} title={formTitle}>
        {isEditing ? (
          <div className="mb-4 flex items-center justify-between rounded-md bg-primary-50 px-4 py-2 dark:bg-primary-900/20">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {FM('forms.product.editingBanner', editingProduct.title ?? '')}
            </span>
            <ButtonNative
              testId="native-product-form-cancel-edit"
              variant={ButtonVariant.Ghost}
              onClick={handleCancelEdit}
            >
              {FM('common.cancel')}
            </ButtonNative>
          </div>
        ) : null}

        {isLoadingCategories ? (
          <LoadingSpinner size="sm" />
        ) : (
          <NativeProductForm
            categories={categoryOptions}
            isEditing={isEditing}
            isSubmitting={isMutating}
            onSubmit={handleFormSubmit}
            {...(isValueDefined(formDefaults) ? { defaultValues: formDefaults } : {})}
          />
        )}
      </FormSection>

      <div className="card p-0">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-lg font-semibold text-text-primary">
            {FM('forms.product.gridTitle')}
          </h2>
        </div>
        {isLoadingProducts ? (
          <LoadingSpinner />
        ) : (
          <ProductsTable
            columns={columns}
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};
