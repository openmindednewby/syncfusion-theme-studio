import { useRef, useState, useCallback, useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { GridComponent } from '@syncfusion/ej2-react-grids';

import type { Product } from '@/api/generated/dummyjson/models';
import { useGetAllProducts, useGetCategories } from '@/api/generated/dummyjson/products/products';
import { LoadingSpinner } from '@/components/common/components/LoadingSpinner';
import { ExportToolbar } from '@/components/ui/shared';
import { DataGrid } from '@/components/ui/syncfusion';
import { buildExportFileName, useGridExport } from '@/hooks/useGridExport';
import type { GridConfig } from '@/lib/grid/types';
import { FilterType, SortDirection } from '@/lib/grid/types';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { CategoryFilter, EmptyState, ErrorMessage } from './components';

const ID_WIDTH = 80;
const TITLE_WIDTH = 250;
const CATEGORY_WIDTH = 150;
const PRICE_WIDTH = 100;
const RATING_WIDTH = 100;
const STOCK_WIDTH = 100;
const PRODUCTS_LIMIT = 30;
const DECIMAL_PLACES = 2;
const RATING_DECIMAL_PLACES = 1;
const DEFAULT_STOCK = 0;
const PAGINATION_THRESHOLD = 20;
const PAGE_SIZE_DEFAULT = 10;
const PAGE_SIZE_SMALL = 25;
const PAGE_SIZE_MEDIUM = 50;
const PAGE_SIZE_LARGE = 100;

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

const PRODUCTS_QUERY_PARAMS = { limit: PRODUCTS_LIMIT };

const GRID_CONFIG: GridConfig = {
  filter: { enabled: true, type: FilterType.Menu, autoCreate: true },
  defaultSort: [{ field: 'rating', direction: SortDirection.Descending }],
  pagination: {
    enabled: true,
    threshold: PAGINATION_THRESHOLD,
    pageSize: PAGE_SIZE_DEFAULT,
    pageSizes: [PAGE_SIZE_DEFAULT, PAGE_SIZE_SMALL, PAGE_SIZE_MEDIUM, PAGE_SIZE_LARGE],
  },
  export: { excel: true, pdf: true, csv: true },
};

const PRODUCTS_FILE_NAME = 'products';
const PDF_OPTIONS = { headerText: FM('products.title'), includePageNumbers: true };

const ProductsListPage = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const gridRef = useRef<GridComponent | undefined>(undefined);
  const exportFileName = useMemo(() => buildExportFileName(PRODUCTS_FILE_NAME), []);
  const { isExporting, exportToExcel, exportToCsv, exportToPdf } =
    useGridExport(gridRef, exportFileName, PDF_OPTIONS);

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useGetAllProducts(PRODUCTS_QUERY_PARAMS);

  const { data: categoriesData } = useGetCategories();
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
          <div className="flex justify-end p-3 pb-0">
            <ExportToolbar
              isExporting={isExporting}
              onExportCsv={exportToCsv}
              onExportExcel={exportToExcel}
              onExportPdf={exportToPdf}
            />
          </div>
          <DataGrid
            columns={gridColumns}
            data={gridData}
            emptyText={FM('products.noProductsFound')}
            gridConfig={GRID_CONFIG}
            gridRef={gridRef}
            height="400"
            testId={TestIds.PRODUCTS_GRID}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductsListPage;
