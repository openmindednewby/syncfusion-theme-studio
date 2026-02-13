/**
 * Product grid column definitions for the CRUD DataGrid.
 */
import type { ColumnModel } from '@syncfusion/ej2-grids';

import { FM } from '@/localization/helpers';

const ID_WIDTH = 60;
const TITLE_WIDTH = 200;
const CATEGORY_WIDTH = 140;
const PRICE_WIDTH = 100;
const BRAND_WIDTH = 140;
const STOCK_WIDTH = 80;
const ACTIONS_WIDTH = 120;

export function getProductColumns(): ColumnModel[] {
  return [
    { field: 'id', headerText: FM('common.id'), width: ID_WIDTH, textAlign: 'Right' },
    { field: 'title', headerText: FM('products.columns.title'), width: TITLE_WIDTH },
    { field: 'category', headerText: FM('common.category'), width: CATEGORY_WIDTH },
    { field: 'price', headerText: FM('products.columns.price'), width: PRICE_WIDTH, textAlign: 'Right' },
    { field: 'brand', headerText: FM('forms.product.brand'), width: BRAND_WIDTH },
    { field: 'stock', headerText: FM('products.columns.stock'), width: STOCK_WIDTH, textAlign: 'Right' },
    { field: 'actions', headerText: FM('table.actions'), width: ACTIONS_WIDTH },
  ];
}
