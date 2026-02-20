import { useState, useCallback, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import type { Product, Category } from '@/api/generated/dummyjson/models';
import { useGetAllProducts, useGetCategories } from '@/api/generated/dummyjson/products/products';
import { LoadingSpinner } from '@/components/common/components/LoadingSpinner';
import { Button, ButtonVariant, DataGrid } from '@/components/ui/syncfusion';
import type { GridConfig } from '@/lib/grid/types';
import { FilterType, SortDirection } from '@/lib/grid/types';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

const ID_WIDTH = 80;
const TITLE_WIDTH = 250;
const CATEGORY_WIDTH = 150;
const PRICE_WIDTH = 100;
const RATING_WIDTH = 100;
const STOCK_WIDTH = 100;
const VISIBLE_CATEGORIES_COUNT = 5;
const PRODUCTS_LIMIT = 30;
const DECIMAL_PLACES = 2;
const RATING_DECIMAL_PLACES = 1;
const DEFAULT_STOCK = 0;
const PAGINATION_THRESHOLD = 20;
const PAGE_SIZE_DEFAULT = 10;
const PAGE_SIZE_SMALL = 25;
const PAGE_SIZE_MEDIUM = 50;
const PAGE_SIZE_LARGE = 100;
const PRODUCTS_QUERY_PARAMS = { limit: PRODUCTS_LIMIT };

const GRID_CONFIG: GridConfig = {
  filter: {
    enabled: true,
    type: FilterType.Menu,
    autoCreate: true,
  },
  defaultSort: [{ field: 'rating', direction: SortDirection.Descending }],
  pagination: {
    enabled: true,
    threshold: PAGINATION_THRESHOLD,
    pageSize: PAGE_SIZE_DEFAULT,
    pageSizes: [PAGE_SIZE_DEFAULT, PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE],
  },
};

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
      variant={selectedCategory === 'all' ? ButtonVariant.Primary : ButtonVariant.Secondary}
      onClick={() => onCategoryChange('all')}
    >
      {FM('products.allCategories')}
    </Button>
    {categories.slice(0, VISIBLE_CATEGORIES_COUNT).map((cat) => {
      const isSelected = selectedCategory === cat.slug;
      const variant = isSelected ? ButtonVariant.Primary : ButtonVariant.Secondary;

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
        <span className="text-danger-600 text-xl">{FM('common.error')}</span>
        <div>
          <p className="text-sm font-medium text-danger-800">{FM('products.failedToLoad')}</p>
          <p className="text-xs text-danger-600">{message}</p>
        </div>
      </div>
      <Button testId="retry-button" variant={ButtonVariant.Secondary} onClick={onRetry}>
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
  const price = isValueDefined(product.price) ? `$${product.price.toFixed(DECIMAL_PLACES)}` : '-';
  const rating = isValueDefined(product.rating) ? product.rating.toFixed(RATING_DECIMAL_PLACES) : '-';

  return {
    id: product.id,
    title: product.title,
    category: product.category ?? FM('common.unknown'),
    price,
    rating,
    stock: product.stock ?? DEFAULT_STOCK,
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
  } = useGetAllProducts(PRODUCTS_QUERY_PARAMS);

  const { data: categoriesData } = useGetCategories();
  // Orval 8.x wraps response in { data, status, headers }
  const categories = categoriesData?.data ?? [];

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
    // Orval 8.x wraps response in { data, status, headers }
    const responseData = productsData?.data;
    const products = responseData?.products ?? [];
    if (selectedCategory === 'all') return products;
    return products.filter((p: Product) => p.category === selectedCategory);
  }, [productsData?.data, selectedCategory]);

  const gridData = useMemo(() => {
    if (!isNotEmptyArray(filteredProducts)) return [];
    return filteredProducts.map(transformProductForGrid);
  }, [filteredProducts]);

  const errorMessage = isValueDefined(productsError) ? String(productsError) : FM('common.unexpectedError');
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
            columns={gridColumns}
            data={gridData}
            emptyText={FM('products.noProductsFound')}
            gridConfig={GRID_CONFIG}
            height="400"
            testId={TestIds.PRODUCTS_GRID}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductsListPage;
