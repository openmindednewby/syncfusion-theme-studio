/**
 * ProductCrudSection - Full CRUD interface for products.
 *
 * Renders a product form (create/edit) above a DataGrid that shows
 * all products from the MockServer API. Supports edit and delete actions.
 */
import { useMemo, useCallback } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';
import { LoadingSpinner } from '@/components/common/components/LoadingSpinner';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import type { SelectOption } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { getProductColumns } from './columns';
import { ProductsGrid } from './components/ProductsGrid';
import { useProductCrud } from './hooks/useProductCrud';
import { FormSection } from '../../components/FormSection';
import { ProductForm } from '../../forms/ProductForm';

import type { ProductFormData } from '../../forms/ProductForm/schema';


export const ProductCrudSection = (): JSX.Element => {
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
  } = useProductCrud();

  const categoryOptions: SelectOption[] = useMemo(
    () => categories.map((cat): SelectOption => ({ value: cat, label: cat })),
    [categories],
  );

  const formDefaults = useMemo(
    () => (isValueDefined(editingProduct) ? toFormDefaults(editingProduct) : undefined),
    [editingProduct],
  );

  const columns = useMemo(() => getProductColumns(), []);
  const gridData = useMemo(() => products.map(transformForGrid), [products]);

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
  const formTitle = isEditing
    ? FM('forms.product.editTitle')
    : FM('forms.product.title');
  const formDescription = isEditing
    ? FM('forms.product.editDescription')
    : FM('forms.product.description');

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <FormSection description={formDescription} title={formTitle}>
        {isEditing ? (
          <div className="mb-4 flex items-center justify-between rounded-md bg-primary-50 px-4 py-2 dark:bg-primary-900/20">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {FM('forms.product.editingBanner', editingProduct.title ?? '')}
            </span>
            <ButtonNative
              testId="product-form-cancel-edit"
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
          <ProductForm
            categories={categoryOptions}
            isEditing={isEditing}
            isSubmitting={isMutating}
            onSubmit={handleFormSubmit}
            {...(isValueDefined(formDefaults) ? { defaultValues: formDefaults } : {})}
          />
        )}
      </FormSection>

      {/* Products DataGrid */}
      <div className="card p-0">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-lg font-semibold text-text-primary">
            {FM('forms.product.gridTitle')}
          </h3>
        </div>
        {isLoadingProducts ? (
          <LoadingSpinner />
        ) : (
          <ProductsGrid
            columns={columns}
            gridData={gridData}
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

const DECIMAL_PLACES = 2;
const DEFAULT_STOCK = 0;

/** Transform ProductDto for grid display */
function transformForGrid(product: ProductDto): Record<string, unknown> {
  const price = isValueDefined(product.price)
    ? `$${product.price.toFixed(DECIMAL_PLACES)}`
    : '-';

  return {
    id: product.id,
    title: product.title ?? '',
    category: product.category ?? FM('common.unknown'),
    price,
    brand: product.brand ?? '-',
    stock: product.stock ?? DEFAULT_STOCK,
  };
}

/** Map a ProductDto to form default values */
function toFormDefaults(product: ProductDto): Partial<ProductFormData> {
  return {
    productName: product.title ?? '',
    category: product.category ?? '',
    price: product.price ?? 0,
    description: product.description ?? undefined,
    brand: product.brand ?? undefined,
    stock: product.stock ?? 0,
  };
}
