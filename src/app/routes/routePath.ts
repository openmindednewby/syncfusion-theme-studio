// Full absolute paths used for navigation (navigate(), NavLink, etc.)

export const enum RoutePath {
  // Auth
  Root = '/',
  Login = '/login',

  // Dashboard
  Dashboard = '/dashboard',

  // Products
  Products = '/dashboard/products',
  ProductsNative = '/dashboard/products/native',
  ProductsSyncfusion = '/dashboard/products/syncfusion',

  // Components
  Components = '/dashboard/components',
  ComponentsNative = '/dashboard/components/native',
  ComponentsSyncfusion = '/dashboard/components/syncfusion',
  ComponentsGrid = '/dashboard/components/grid',
  ComponentsGridNative = '/dashboard/components/grid/native',
  ComponentsGridSyncfusion = '/dashboard/components/grid/syncfusion',

  // Forms
  Forms = '/dashboard/forms',
  FormsSyncfusion = '/dashboard/forms/syncfusion',
  FormsNative = '/dashboard/forms/native',
}
