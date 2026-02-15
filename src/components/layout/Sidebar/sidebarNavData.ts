/**
 * Navigation data configuration for the sidebar.
 * Mirrors the features/ directory structure:
 *   dashboard, products, forms, components.
 */
import { RoutePath, RoutePrefix } from '@/app/routePaths';
import { TestIds } from '@/shared/testIds';

import { IconName } from './iconName';
import { COMPONENTS_CHILDREN } from './sidebarComponentGroups';
import { FORMS_CHILDREN, PRODUCTS_CHILDREN } from './sidebarNavChildren';
import { SubNavId } from './subNavId';

import type { NavChild } from './NavExpandableItem';

/** A simple (non-expandable) nav item */
export interface SidebarNavItem {
  id: string;
  labelKey: string;
  testId: string;
  path?: string;
  iconName: IconName;
  subNavId?: SubNavId;
}

/** An expandable nav item with children */
export interface SidebarExpandableItem {
  id: string;
  labelKey: string;
  testId: string;
  expandTestId: string;
  pathPrefix: string;
  iconName: IconName;
  children: NavChild[];
}

export type SidebarNavEntry = SidebarNavItem | SidebarExpandableItem;

export function isExpandableEntry(
  entry: SidebarNavEntry,
): entry is SidebarExpandableItem {
  return 'children' in entry;
}

export const MAIN_NAV_ITEMS: SidebarNavEntry[] = [
  {
    id: 'dashboard',
    labelKey: 'sidebar.nav.dashboard',
    testId: TestIds.NAV_HOME,
    path: RoutePath.Dashboard,
    iconName: IconName.Dashboard,
  },
  {
    id: 'products',
    labelKey: 'sidebar.nav.products',
    testId: TestIds.NAV_PRODUCTS,
    expandTestId: TestIds.NAV_PRODUCTS_EXPAND,
    pathPrefix: RoutePrefix.Products,
    iconName: IconName.Folder,
    children: PRODUCTS_CHILDREN,
  },
  {
    id: 'forms',
    labelKey: 'sidebar.nav.forms',
    testId: TestIds.NAV_FORMS,
    expandTestId: TestIds.NAV_FORMS_EXPAND,
    pathPrefix: RoutePrefix.Forms,
    iconName: IconName.FormInput,
    children: FORMS_CHILDREN,
  },
  {
    id: 'components',
    labelKey: 'sidebar.nav.components',
    testId: TestIds.NAV_COMPONENTS,
    expandTestId: TestIds.NAV_COMPONENTS_EXPAND,
    pathPrefix: RoutePrefix.Components,
    iconName: IconName.Layout,
    children: COMPONENTS_CHILDREN,
  },
  {
    id: 'analytics',
    labelKey: 'sidebar.nav.analyticsReporting',
    testId: TestIds.NAV_ANALYTICS,
    path: RoutePath.Dashboard,
    iconName: IconName.BarChart,
  },
  {
    id: 'soar',
    labelKey: 'sidebar.nav.soar',
    testId: TestIds.NAV_SOAR,
    path: RoutePath.Dashboard,
    iconName: IconName.Cog,
  },
];

export const BOTTOM_NAV_ITEMS: SidebarNavItem[] = [
  {
    id: 'admin-hub',
    labelKey: 'sidebar.nav.adminHub',
    testId: TestIds.NAV_ADMIN_HUB,
    iconName: IconName.Settings,
    subNavId: SubNavId.AdminHub,
  },
  {
    id: 'marketplace',
    labelKey: 'sidebar.nav.marketplace',
    testId: TestIds.NAV_MARKETPLACE,
    path: RoutePath.Dashboard,
    iconName: IconName.Store,
  },
];
