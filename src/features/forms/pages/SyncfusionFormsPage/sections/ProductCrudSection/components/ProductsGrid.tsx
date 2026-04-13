/**
 * ProductsGrid - DataGrid sub-component for product CRUD.
 *
 * Renders the product list with edit/delete action buttons per row.
 */
import { useMemo, useCallback } from 'react';

import type { ColumnModel } from '@syncfusion/ej2-grids';

import type { ProductDto } from '@/api/generated/mockserver/models';
import { ButtonNative, ButtonVariant } from '@/components/ui/native';
import { DataGrid } from '@/components/ui/syncfusion';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

const GRID_HEIGHT = '400';

interface Props {
  gridData: Array<Record<string, unknown>>;
  columns: ColumnModel[];
  products: ProductDto[];
  onEdit: (product: ProductDto) => void;
  onDelete: (id: number) => void;
}

export const ProductsGrid = ({
  gridData,
  columns,
  products,
  onEdit,
  onDelete,
}: Props): JSX.Element => {
  /** Render action buttons for each row */
  const actionsTemplate = useCallback(
    (rowData: Record<string, unknown>) => {
      const productId = Number(rowData['id']);
      const product = products.find((p) => p.id === productId);

      return (
        <div className="flex gap-1">
          <ButtonNative
            testId={`product-edit-${String(productId)}`}
            variant={ButtonVariant.Ghost}
            onClick={() => {
              if (isValueDefined(product)) onEdit(product);
            }}
          >
            {FM('common.edit')}
          </ButtonNative>
          <ButtonNative
            testId={`product-delete-${String(productId)}`}
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

  // Add template to actions column
  const columnsWithActions = useMemo(
    () =>
      columns.map((col) =>
        col.field === 'actions' ? { ...col, template: actionsTemplate } : col,
      ),
    [columns, actionsTemplate],
  );

  return (
    <DataGrid
      columns={columnsWithActions}
      data={gridData}
      emptyText={FM('products.noProductsFound')}
      height={GRID_HEIGHT}
      testId="product-crud-grid"
    />
  );
};
