/**
 * ProductsTable - Native table sub-component for product CRUD.
 *
 * Renders the product list with edit/delete action buttons per row
 * using TableNative instead of Syncfusion DataGrid.
 */
import { useMemo, useCallback } from 'react';

import type { ProductDto } from '@/api/generated/mockserver/models';
import { ButtonNative, ButtonVariant, TableNative } from '@/components/ui/native';
import type { TableColumn } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

const DECIMAL_PLACES = 2;
const DEFAULT_STOCK = 0;

interface Props {
  columns: TableColumn[];
  products: ProductDto[];
  onEdit: (product: ProductDto) => void;
  onDelete: (id: number) => void;
}

/** Transform ProductDto for table display */
function transformForTable(product: ProductDto): Record<string, unknown> {
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

export const ProductsTable = ({ columns, products, onEdit, onDelete }: Props): JSX.Element => {
  const actionsTemplate = useCallback(
    (rowData: Record<string, unknown>) => {
      const productId = Number(rowData['id']);
      const product = products.find((p) => p.id === productId);

      return (
        <div className="flex gap-1">
          <ButtonNative
            testId={`native-product-edit-${String(productId)}`}
            variant={ButtonVariant.Ghost}
            onClick={() => {
              if (isValueDefined(product)) onEdit(product);
            }}
          >
            {FM('common.edit')}
          </ButtonNative>
          <ButtonNative
            testId={`native-product-delete-${String(productId)}`}
            variant={ButtonVariant.Danger}
            onClick={() => onDelete(productId)}
          >
            {FM('common.delete')}
          </ButtonNative>
        </div>
      );
    },
    [products, onEdit, onDelete],
  );

  const columnsWithActions = useMemo(
    () =>
      columns.map((col) =>
        col.field === 'actions' ? { ...col, template: actionsTemplate } : col,
      ),
    [columns, actionsTemplate],
  );

  const tableData = useMemo(() => products.map(transformForTable), [products]);

  return (
    <TableNative
      columns={columnsWithActions}
      data={tableData}
      emptyText={FM('products.noProductsFound')}
      testId="native-product-crud-table"
    />
  );
};
