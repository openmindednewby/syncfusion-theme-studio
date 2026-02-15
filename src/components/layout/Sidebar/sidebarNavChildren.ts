/**
 * Children data arrays for expandable sidebar navigation items.
 * Mirrors the features/ directory structure: products, forms.
 * Component children are in sidebarComponentGroups.ts.
 */
import { RoutePath } from '@/app/routePaths';
import { TestIds } from '@/shared/testIds';

import type { SubNavItem } from './NavExpandableItem';

export const PRODUCTS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ProductsNative, labelKey: 'menu.productsNative', testId: TestIds.NAV_PRODUCTS_NATIVE },
  { path: RoutePath.ProductsSyncfusion, labelKey: 'menu.productsSyncfusion', testId: TestIds.NAV_PRODUCTS_SYNCFUSION },
];

export const FORMS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.FormsNative, labelKey: 'menu.formsNative', testId: TestIds.NAV_FORMS_NATIVE },
  { path: RoutePath.FormsSyncfusion, labelKey: 'menu.formsSyncfusion', testId: TestIds.NAV_FORMS_SYNCFUSION },
];
