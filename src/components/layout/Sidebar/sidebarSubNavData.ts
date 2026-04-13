/**
 * Sub-navigation data for the Administration Hub sidebar view.
 */
import { RoutePath } from '@/app/routePaths';
import { TestIds } from '@/shared/testIds';

import { IconName } from './utils/iconName';

import type { SubNavItem } from './components/NavExpandableItem';

export interface SubNavSection {
  id: string;
  labelKey: string;
  testId: string;
  expandTestId: string;
  iconName: IconName;
  children: SubNavItem[];
}

export const ADMIN_HUB_SECTIONS: SubNavSection[] = [
  {
    id: 'management',
    labelKey: 'sidebar.subNav.management',
    testId: TestIds.NAV_ADMIN_MANAGEMENT,
    expandTestId: TestIds.NAV_ADMIN_MANAGEMENT_EXPAND,
    iconName: IconName.User,
    children: [
      { path: RoutePath.AdminUserManagement, labelKey: 'sidebar.subNav.userManagement', testId: TestIds.NAV_ADMIN_USER_MGMT },
      { path: RoutePath.AdminRoleManagement, labelKey: 'sidebar.subNav.roleManagement', testId: TestIds.NAV_ADMIN_ROLE_MGMT },
    ],
  },
  {
    id: 'configuration',
    labelKey: 'sidebar.subNav.configuration',
    testId: TestIds.NAV_ADMIN_CONFIG,
    expandTestId: TestIds.NAV_ADMIN_CONFIG_EXPAND,
    iconName: IconName.Sliders,
    children: [
      { path: RoutePath.AdminThemeEditor, labelKey: 'sidebar.subNav.themeEditor', testId: TestIds.NAV_ADMIN_THEME },
      { path: RoutePath.AdminSystemSettings, labelKey: 'sidebar.subNav.systemSettings', testId: TestIds.NAV_ADMIN_SYSTEM },
    ],
  },
  {
    id: 'marketplace',
    labelKey: 'sidebar.subNav.marketplace',
    testId: TestIds.NAV_ADMIN_MARKETPLACE,
    expandTestId: TestIds.NAV_ADMIN_MARKETPLACE_EXPAND,
    iconName: IconName.Store,
    children: [
      { path: RoutePath.AdminIntegrations, labelKey: 'sidebar.subNav.integrations', testId: TestIds.NAV_ADMIN_INTEGRATIONS },
      { path: RoutePath.AdminPlugins, labelKey: 'sidebar.subNav.plugins', testId: TestIds.NAV_ADMIN_PLUGINS },
    ],
  },
  {
    id: 'resources',
    labelKey: 'sidebar.subNav.resources',
    testId: TestIds.NAV_ADMIN_RESOURCES,
    expandTestId: TestIds.NAV_ADMIN_RESOURCES_EXPAND,
    iconName: IconName.Wrench,
    children: [
      { path: RoutePath.AdminDocumentation, labelKey: 'sidebar.subNav.documentation', testId: TestIds.NAV_ADMIN_DOCS },
      { path: RoutePath.AdminSupport, labelKey: 'sidebar.subNav.support', testId: TestIds.NAV_ADMIN_SUPPORT },
    ],
  },
];
