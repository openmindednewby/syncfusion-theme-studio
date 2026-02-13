/**
 * Product Search Section
 *
 * Orchestrates SearchForm + results DataGrid.
 * Uses MockServer product search/category APIs with on-submit search.
 */
import { useMemo } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import type { ProductDto } from '@/api/generated/mockserver/models';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { isNotEmptyArray, isValueDefined } from '@/utils/is';

import { useProductSearch } from './useProductSearch';
import { SearchForm } from '../../forms/SearchForm';

const TITLE_WIDTH = 250;
const CATEGORY_WIDTH = 150;
const PRICE_WIDTH = 100;
const BRAND_WIDTH = 150;
const RATING_WIDTH = 100;
const STOCK_WIDTH = 100;
const DECIMAL_PLACES = 2;
const RATING_DECIMAL_PLACES = 1;
const DEFAULT_STOCK = 0;
const GRID_HEIGHT = '400';

/** Transform a ProductDto for grid display */
function transformProductForGrid(product: ProductDto): Record<string, unknown> {
  const price = isValueDefined(product.price)
    ? `$${product.price.toFixed(DECIMAL_PLACES)}`
    : '-';
  const rating = isValueDefined(product.rating)
    ? product.rating.toFixed(RATING_DECIMAL_PLACES)
    : '-';

  return {
    id: product.id,
    title: product.title ?? '-',
    category: product.category ?? FM('common.unknown'),
    price,
    brand: product.brand ?? '-',
    rating,
    stock: product.stock ?? DEFAULT_STOCK,
  };
}

export const ProductSearchSection = (): JSX.Element => {
  const { categories, products, isSearching, hasSearched, hasResults, handleSearch } =
    useProductSearch();

  const gridData = useMemo(() => {
    if (!isNotEmptyArray(products)) return [];
    return products.map(transformProductForGrid);
  }, [products]);

  const gridColumns: ColumnModel[] = useMemo(
    () => [
      { field: 'title', headerText: FM('products.columns.title'), width: TITLE_WIDTH },
      { field: 'category', headerText: FM('common.category'), width: CATEGORY_WIDTH },
      {
        field: 'price',
        headerText: FM('products.columns.price'),
        width: PRICE_WIDTH,
        textAlign: 'Right',
      },
      { field: 'brand', headerText: FM('forms.search.brand'), width: BRAND_WIDTH },
      {
        field: 'rating',
        headerText: FM('products.columns.rating'),
        width: RATING_WIDTH,
        textAlign: 'Center',
      },
      {
        field: 'stock',
        headerText: FM('products.columns.stock'),
        width: STOCK_WIDTH,
        textAlign: 'Right',
      },
    ],
    [],
  );

  const showEmptyState = hasSearched && !isSearching && !hasResults;
  const showDataGrid = hasSearched && !isSearching && hasResults;

  return (
    <div className="space-y-4" data-testid={TestIds.PRODUCT_SEARCH_SECTION}>
      <SearchForm
        categories={categories}
        isSearching={isSearching}
        onSubmit={handleSearch}
      />

      {isSearching ? <LoadingSpinner /> : null}

      {showEmptyState ? (
        <div className="card p-6 text-center">
          <p className="text-lg font-medium text-text-primary">
            {FM('forms.search.noResults')}
          </p>
          <p className="mt-1 text-sm text-text-muted">
            {FM('forms.search.noResultsHint')}
          </p>
        </div>
      ) : null}

      {showDataGrid ? (
        <div>
          <p className="mb-2 text-sm text-text-secondary">
            {FM('forms.search.resultCount', String(products.length))}
          </p>
          <div className="card p-0">
            <DataGrid
              columns={gridColumns}
              data={gridData}
              emptyText={FM('forms.search.noResults')}
              height={GRID_HEIGHT}
              testId={TestIds.PRODUCT_SEARCH_GRID}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
