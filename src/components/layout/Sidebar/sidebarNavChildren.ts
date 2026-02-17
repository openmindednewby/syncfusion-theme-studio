/**
 * Children data arrays for expandable sidebar navigation items.
 * Themed SIEM children matching the Figma sidebar design.
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

export const ALERTS_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ComponentsGridSyncfusion, labelKey: 'sidebar.nav.alertsManagement', testId: TestIds.NAV_FORMS_SYNCFUSION },
  { path: RoutePath.ComponentsGridNative, labelKey: 'sidebar.nav.incidentsManagement', testId: TestIds.NAV_FORMS_NATIVE },
];

export const ATTACK_SURFACE_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ComponentsButtonSyncfusion, labelKey: 'sidebar.nav.vulnerabilityScanner', testId: TestIds.NAV_COMPONENTS_SYNCFUSION },
  { path: RoutePath.ComponentsButtonNative, labelKey: 'sidebar.nav.assetDiscovery', testId: TestIds.NAV_COMPONENTS_NATIVE },
];

export const THREAT_INTEL_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ComponentsInputSyncfusion, labelKey: 'sidebar.nav.feedManager', testId: TestIds.NAV_PRODUCTS_SYNCFUSION },
  { path: RoutePath.ComponentsInputNative, labelKey: 'sidebar.nav.iocSearch', testId: TestIds.NAV_PRODUCTS_NATIVE },
];

export const PERFORMANCE_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ComponentsSelectSyncfusion, labelKey: 'sidebar.nav.serviceMonitoring', testId: TestIds.NAV_COMPONENTS_SYNCFUSION },
  { path: RoutePath.ComponentsSelectNative, labelKey: 'sidebar.nav.healthChecks', testId: TestIds.NAV_COMPONENTS_NATIVE },
];

export const COMPLIANCE_CHILDREN: SubNavItem[] = [
  { path: RoutePath.ComponentsCheckboxSyncfusion, labelKey: 'sidebar.nav.policyAudit', testId: TestIds.NAV_COMPONENTS_SYNCFUSION },
  { path: RoutePath.ComponentsCheckboxNative, labelKey: 'sidebar.nav.complianceChecks', testId: TestIds.NAV_COMPONENTS_NATIVE },
  { path: RoutePath.FormsSyncfusion, labelKey: 'sidebar.nav.auditForms', testId: TestIds.NAV_FORMS_SYNCFUSION },
  { path: RoutePath.FormsNative, labelKey: 'sidebar.nav.formTemplates', testId: TestIds.NAV_FORMS_NATIVE },
];
