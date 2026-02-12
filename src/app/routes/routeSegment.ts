// Relative segments used inside nested route definitions (children of /dashboard)

export const enum RouteSegment {
  // Products
  Products = 'products',
  ProductsNative = 'products/native',
  ProductsSyncfusion = 'products/syncfusion',

  // Components
  Components = 'components',
  ComponentsNative = 'components/native',
  ComponentsSyncfusion = 'components/syncfusion',
  ComponentsGrid = 'components/grid',
  ComponentsGridNative = 'components/grid/native',
  ComponentsGridSyncfusion = 'components/grid/syncfusion',

  // Forms
  Forms = 'forms',
  FormsSyncfusion = 'forms/syncfusion',
  FormsNative = 'forms/native',
}
