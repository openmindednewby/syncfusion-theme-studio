import { useState, useCallback, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import type { Product, Category } from '@/api/generated/models';
import { useGetAllProducts, useGetCategories } from '@/api/generated/products/products';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button, DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

const ID_WIDTH = 80;
const TITLE_WIDTH = 250;
const CATEGORY_WIDTH = 150;
const PRICE_WIDTH = 100;
const RATING_WIDTH = 100;
const STOCK_WIDTH = 100;
const VISIBLE_CATEGORIES_COUNT = 5;

interface CategoryFilterProps {
  selectedCategory: string;
  categories: Category[];
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({
  selectedCategory,
  categories,
  onCategoryChange,
}: CategoryFilterProps): JSX.Element => (
  <div className="flex flex-wrap gap-2" data-testid={TestIds.PRODUCTS_CATEGORY_FILTER}>
    <Button
      testId="category-filter-all"
      variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
      onClick={() => onCategoryChange('all')}
    >
      {FM('products.allCategories')}
    </Button>
    {categories.slice(0, VISIBLE_CATEGORIES_COUNT).map((cat) => {
      const isSelected = selectedCategory === cat.slug;
      const variant = isSelected ? 'primary' : 'secondary';

      return (
        <Button
          key={cat.slug}
          testId={`category-filter-${cat.slug}`}
          variant={variant}
          onClick={() => onCategoryChange(cat.slug ?? '')}
        >
          {cat.name}
        </Button>
      );
    })}
  </div>
);

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps): JSX.Element => (
  <div className="rounded-md bg-danger-50 border border-danger-200 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-danger-600 text-xl">Error</span>
        <div>
          <p className="text-sm font-medium text-danger-800">{FM('products.failedToLoad')}</p>
          <p className="text-xs text-danger-600">{message}</p>
        </div>
      </div>
      <Button testId="retry-button" variant="secondary" onClick={onRetry}>
        {FM('common.tryAgain')}
      </Button>
    </div>
  </div>
);

interface EmptyStateProps {
  category: string;
}

const EmptyState = ({ category }: EmptyStateProps): JSX.Element => (
  <div className="card p-6 text-center">
    <p className="text-lg font-medium text-text-primary">{FM('products.noProductsFound')}</p>
    <p className="mt-1 text-sm text-text-muted">{FM('products.noProductsInCategory', category)}</p>
  </div>
);

/** Transform product data for grid display */
function transformProductForGrid(product: Product): Record<string, unknown> {
  const price = isValueDefined(product.price) ? `$${product.price.toFixed(2)}` : '-';
  const rating = isValueDefined(product.rating) ? product.rating.toFixed(1) : '-';

  return {
    id: product.id,
    title: product.title,
    category: product.category ?? FM('common.unknown'),
    price,
    rating,
    stock: product.stock ?? 0,
  };
}

const ProductsListPage = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useGetAllProducts({ limit: 30 });

  const { data: categories = [] } = useGetCategories();

  const handleRetry = useCallback(async (): Promise<void> => {
    await refetchProducts();
  }, [refetchProducts]);

  const gridColumns: ColumnModel[] = useMemo(
    () => [
      { field: 'id', headerText: FM('common.id'), width: ID_WIDTH, textAlign: 'Right' },
      { field: 'title', headerText: FM('products.columns.title'), width: TITLE_WIDTH },
      { field: 'category', headerText: FM('common.category'), width: CATEGORY_WIDTH },
      { field: 'price', headerText: FM('products.columns.price'), width: PRICE_WIDTH, textAlign: 'Right' },
      { field: 'rating', headerText: FM('products.columns.rating'), width: RATING_WIDTH, textAlign: 'Center' },
      { field: 'stock', headerText: FM('products.columns.stock'), width: STOCK_WIDTH, textAlign: 'Right' },
    ],
    [],
  );

  const filteredProducts = useMemo(() => {
    const products = productsData?.products ?? [];
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [productsData?.products, selectedCategory]);

  const gridData = useMemo(() => {
    if (!isNotEmptyArray(filteredProducts)) return [];
    return filteredProducts.map(transformProductForGrid);
  }, [filteredProducts]);

  const errorMessage = isValueDefined(productsError) ? String(productsError) : 'An unexpected error occurred';
  const hasProducts = isNotEmptyArray(filteredProducts);
  const showEmptyState = !isLoadingProducts && !isProductsError && !hasProducts;
  const showDataGrid = !isLoadingProducts && !isProductsError && hasProducts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-text-primary">{FM('products.title')}</h2>
        {isNotEmptyArray(categories) && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}
      </div>

      {isLoadingProducts ? <LoadingSpinner /> : null}

      {isProductsError ? <ErrorMessage message={errorMessage} onRetry={handleRetry} /> : null}

      {showEmptyState ? <EmptyState category={selectedCategory} /> : null}

      {showDataGrid ? (
        <div className="card p-0">
          <DataGrid
            allowFiltering
            columns={gridColumns}
            data={gridData}
            emptyText={FM('products.noProductsFound')}
            height="400"
            testId={TestIds.PRODUCTS_GRID}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductsListPage;
