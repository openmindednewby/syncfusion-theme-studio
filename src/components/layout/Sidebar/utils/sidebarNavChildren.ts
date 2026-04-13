/**
 * Children data arrays for expandable sidebar navigation items.
 * Themed children matching the Figma sidebar design.
 * Component children are in sidebarComponentGroups.ts.
 */
import { RoutePath } from '@/app/routePaths';
import { TestIds } from '@/shared/testIds';

import { IconName } from '../utils/iconName';

import type { SubNavItem } from '../components/NavExpandableItem';

export const DASHBOARD_CHILDREN: SubNavItem[] = [
  { path: RoutePath.DashboardOverview, labelKey: 'sidebar.nav.dashboardOverview', testId: TestIds.NAV_DASHBOARD_OVERVIEW, iconName: IconName.Activity },
  { path: RoutePath.DashboardMetrics, labelKey: 'sidebar.nav.dashboardMetrics', testId: TestIds.NAV_DASHBOARD_METRICS, iconName: IconName.TrendingUp },
  { path: RoutePath.DashboardKpis, labelKey: 'sidebar.nav.dashboardKpis', testId: TestIds.NAV_DASHBOARD_KPIS, iconName: IconName.Target },
];

export const PRODUCTS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ProductsNative, labelKey: 'menu.productsNative', testId: TestIds.NAV_PRODUCTS_NATIVE },
  { path: RoutePath.ProductsSyncfusion, labelKey: 'menu.productsSyncfusion', testId: TestIds.NAV_PRODUCTS_SYNCFUSION },
];

export const ALERTS_INCIDENTS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.AlertsManagement, labelKey: 'sidebar.nav.alertsManagement', testId: TestIds.NAV_ALERTS_MGMT },
  { path: RoutePath.IncidentsManagement, labelKey: 'sidebar.nav.incidentsManagement', testId: TestIds.NAV_INCIDENTS_MGMT },
];

export const FORMS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.FormsNative, labelKey: 'menu.formsNative', testId: TestIds.NAV_FORMS_NATIVE },
  { path: RoutePath.FormsSyncfusion, labelKey: 'menu.formsSyncfusion', testId: TestIds.NAV_FORMS_SYNCFUSION },
];

export const BUSINESS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.Customers, labelKey: 'sidebar.nav.customers', testId: TestIds.NAV_CUSTOMERS },
  { path: RoutePath.Invoices, labelKey: 'sidebar.nav.invoices', testId: TestIds.NAV_INVOICES },
  { path: RoutePath.Orders, labelKey: 'sidebar.nav.orders', testId: TestIds.NAV_ORDERS },
  { path: RoutePath.Inventory, labelKey: 'sidebar.nav.inventory', testId: TestIds.NAV_INVENTORY },
];
